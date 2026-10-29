'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteCloudinaryAssetAction } from '@/app/(admin)/products/cloudinary-actions';
import { getOptimizedImageUrl } from '@/lib/cloudinary-url';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_IMAGES = 5;
const ACCEPTED_TYPE_PREFIX = 'image/';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://orientalsports.in').replace(/\/+$/, '');

function resolveImageUrl(url: string): string {
  return url.startsWith('/') ? `${SITE_URL}${url}` : url;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to process image file.'));
    reader.readAsDataURL(file);
  });
}

export type GalleryImage = {
  url: string;
  publicId?: string;
};

type UploadState = { fileName: string; progress: number; error?: string };

export function ImageGallery({
  images,
  onChange,
}: {
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
}) {
  const [uploads, setUploads] = useState<UploadState[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [limitNotice, setLimitNotice] = useState<string | null>(null);
  const [manualUrl, setManualUrl] = useState('');
  const [cloudinaryStatus, setCloudinaryStatus] = useState<{
    configured?: boolean;
    cloudName?: string | null;
    missing?: string[];
  } | null>(null);
  const [showCloudinaryGuide, setShowCloudinaryGuide] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    fetch(`${basePath}/api/cloudinary/sign`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setCloudinaryStatus(data);
        }
      })
      .catch(() => {
        setCloudinaryStatus({
          configured: false,
          missing: ['NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'],
        });
      });
  }, []);

  const imagesRef = useRef(images);
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  const imagesValue = images.map((i) => i.url).join('\n');
  const publicIdsValue = JSON.stringify(
    images.reduce<Record<string, string>>((acc, i) => {
      if (i.publicId) acc[i.url] = i.publicId;
      return acc;
    }, {})
  );

  const addImageSafely = useCallback((newImg: GalleryImage) => {
    const current = imagesRef.current;
    if (current.length >= MAX_IMAGES) return;
    const nextList = [...current, newImg].slice(0, MAX_IMAGES);
    imagesRef.current = nextList;
    onChange(nextList);
  }, [onChange]);

  const uploadFile = useCallback(async (file: File) => {
    if (imagesRef.current.length >= MAX_IMAGES) {
      setLimitNotice(`Maximum limit reached: You can upload up to ${MAX_IMAGES} photos.`);
      return;
    }

    if (!file.type.startsWith(ACCEPTED_TYPE_PREFIX)) {
      setUploads((prev) => [...prev, { fileName: file.name, progress: 0, error: 'Not an image file.' }]);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setUploads((prev) => [...prev, { fileName: file.name, progress: 0, error: 'File exceeds 10MB limit.' }]);
      return;
    }

    setUploads((prev) => [...prev, { fileName: file.name, progress: 5 }]);

    try {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      // Try /api/cloudinary/sign first, then fallback to /admin/api/cloudinary/sign if needed
      let signRes = await fetch(`${basePath}/api/cloudinary/sign`, { method: 'POST' });
      if (!signRes.ok && signRes.status === 404) {
        signRes = await fetch(`${basePath}/admin/api/cloudinary/sign`, { method: 'POST' });
      }

      if (!signRes.ok) {
        const body = await signRes.json().catch(() => ({}));
        throw new Error(body.error || `Could not sign upload (${signRes.status}).`);
      }
      const signed = await signRes.json();

      setUploads((prev) => prev.map((u) => (u.fileName === file.name ? { ...u, progress: 30 } : u)));

      // If Cloudinary is not configured or returned local fallback, upload directly to local API
      if (signed.local) {
        const localFormData = new FormData();
        localFormData.append('file', file);

        const localRes = await fetch(`${basePath}/api/upload`, {
          method: 'POST',
          body: localFormData,
        });

        if (!localRes.ok) {
          const body = await localRes.json().catch(() => ({}));
          throw new Error(body.error || `Local upload failed (${localRes.status}).`);
        }

        const localResult = await localRes.json();
        setUploads((prev) => prev.map((u) => (u.fileName === file.name ? { ...u, progress: 100 } : u)));
        addImageSafely({ url: localResult.secure_url, publicId: localResult.public_id });
        setUploads((prev) => prev.filter((u) => u.fileName !== file.name));
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signed.apiKey);
      formData.append('timestamp', String(signed.timestamp));
      formData.append('signature', signed.signature);
      formData.append('folder', signed.folder);
      formData.append('allowed_formats', signed.allowedFormats);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      setUploads((prev) => prev.map((u) => (u.fileName === file.name ? { ...u, progress: 90 } : u)));

      if (!uploadRes.ok) {
        // If Cloudinary rejects upload (e.g. "cloud_name is disabled"), seamlessly fallback to local asset storage
        const localFormData = new FormData();
        localFormData.append('file', file);

        const localRes = await fetch(`${basePath}/api/upload`, {
          method: 'POST',
          body: localFormData,
        });

        if (localRes.ok) {
          const localResult = await localRes.json();
          setUploads((prev) => prev.map((u) => (u.fileName === file.name ? { ...u, progress: 100 } : u)));
          addImageSafely({ url: localResult.secure_url, publicId: localResult.public_id });
          setUploads((prev) => prev.filter((u) => u.fileName !== file.name));
          return;
        }

        const body = await uploadRes.json().catch(() => ({}));
        throw new Error(body?.error?.message || `Upload failed (${uploadRes.status}).`);
      }

      const result = await uploadRes.json();
      addImageSafely({ url: result.secure_url, publicId: result.public_id });
      setUploads((prev) => prev.filter((u) => u.fileName !== file.name));
    } catch (err: any) {
      console.warn('Server upload was rejected or serverless filesystem unavailable. Activating instant client-side asset reader fallback:', err);
      try {
        const clientDataUrl = await readFileAsDataUrl(file);
        setUploads((prev) => prev.map((u) => (u.fileName === file.name ? { ...u, progress: 100 } : u)));
        addImageSafely({ url: clientDataUrl, publicId: `client_${Date.now()}` });
        setUploads((prev) => prev.filter((u) => u.fileName !== file.name));
      } catch (readErr: any) {
        setUploads((prev) => prev.map((u) => (u.fileName === file.name ? { ...u, progress: 0, error: readErr?.message || 'Could not process image.' } : u)));
      }
    }
  }, [addImageSafely]);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setLimitNotice(null);

    const currentCount = imagesRef.current.length;
    if (currentCount >= MAX_IMAGES) {
      setLimitNotice(`Maximum limit reached: You can upload up to ${MAX_IMAGES} photos per product.`);
      return;
    }

    const remainingSlots = MAX_IMAGES - currentCount;
    const filesArray = Array.from(fileList);
    const filesToUpload = filesArray.slice(0, remainingSlots);

    if (filesArray.length > remainingSlots) {
      setLimitNotice(`Only ${remainingSlots} photo slot${remainingSlots === 1 ? '' : 's'} available (up to ${MAX_IMAGES} photos total). Uploading first ${remainingSlots}.`);
    }

    // Process files sequentially to ensure state stability
    for (const file of filesToUpload) {
      await uploadFile(file);
    }
  }

  async function handleDelete(index: number) {
    const target = images[index];
    setDeleteError(null);
    setLimitNotice(null);

    if (target.publicId && !target.publicId.startsWith('local_') && !target.publicId.startsWith('client_')) {
      const result = await deleteCloudinaryAssetAction(target.publicId);
      if (!result.ok) {
        setDeleteError(`Could not delete from Cloudinary: ${result.error || 'unknown error'}`);
        return;
      }
    }

    const nextList = images.filter((_, i) => i !== index);
    imagesRef.current = nextList;
    onChange(nextList);
  }

  function moveImage(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    imagesRef.current = next;
    onChange(next);
  }

  function addManualUrl() {
    const url = manualUrl.trim();
    if (!url) return;
    setLimitNotice(null);

    if (images.length >= MAX_IMAGES) {
      setLimitNotice(`Maximum limit reached: You can upload up to ${MAX_IMAGES} photos per product.`);
      return;
    }

    const nextList = [...images, { url }].slice(0, MAX_IMAGES);
    imagesRef.current = nextList;
    onChange(nextList);
    setManualUrl('');
  }

  const isMaxReached = images.length >= MAX_IMAGES;

  return (
    <div>
      {/* Cloudinary Status & Config Helper Banner */}
      {cloudinaryStatus && !cloudinaryStatus.configured && (
        <div
          style={{
            marginBottom: 20,
            padding: '16px 20px',
            borderRadius: 14,
            background: 'rgba(234, 179, 8, 0.08)',
            border: '1px solid rgba(234, 179, 8, 0.28)',
            color: 'var(--ink)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>⚡</span>
              <div>
                <strong style={{ fontSize: 13.5, color: '#B45309' }}>
                  Cloudinary Auto-Scaling: Not Configured (Local Fallback Active)
                </strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--subtle)' }}>
                  Uploads currently fallback to local storage. Configure Cloudinary for automatic WebP/AVIF compression and responsive scaling across screen sizes.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowCloudinaryGuide((prev) => !prev)}
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#B45309',
                background: 'rgba(234, 179, 8, 0.15)',
                border: '1px solid rgba(234, 179, 8, 0.35)',
                borderRadius: 8,
                padding: '6px 12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {showCloudinaryGuide ? 'Hide Setup Guide ▲' : 'Setup Guide ▼'}
            </button>
          </div>

          {showCloudinaryGuide && (
            <div
              style={{
                marginTop: 14,
                paddingTop: 14,
                borderTop: '1px solid rgba(234, 179, 8, 0.2)',
                fontSize: 12,
                lineHeight: 1.6,
                color: 'var(--ink)',
              }}
            >
              <p style={{ margin: '0 0 8px', fontWeight: 700 }}>
                To connect Cloudinary in 3 quick steps:
              </p>
              <ol style={{ margin: '0 0 10px', paddingLeft: 20 }}>
                <li>
                  Sign in or create a free account at{' '}
                  <a
                    href="https://console.cloudinary.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#B45309', textDecoration: 'underline' }}
                  >
                    console.cloudinary.com
                  </a>
                </li>
                <li>Go to <strong>Settings → Access Keys</strong> and copy your credentials.</li>
                <li>Add the following 3 variables to <code>apps/admin/.env.local</code>:</li>
              </ol>
              <pre
                style={{
                  background: 'rgba(0, 0, 0, 0.05)',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontFamily: 'monospace',
                  fontSize: 11.5,
                  overflowX: 'auto',
                  margin: '0 0 10px',
                }}
              >
{`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret`}
              </pre>
              <p style={{ margin: 0, fontSize: 11.5, color: 'var(--subtle)' }}>
                Missing right now:{' '}
                <strong>{cloudinaryStatus.missing?.join(', ') || 'credentials'}</strong>. Restart the server once updated.
              </p>
            </div>
          )}
        </div>
      )}

      {cloudinaryStatus && cloudinaryStatus.configured && (
        <div
          style={{
            marginBottom: 20,
            padding: '10px 16px',
            borderRadius: 12,
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            color: '#15803D',
            fontSize: 12.5,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>✓</span>
          <span>
            <strong>Cloudinary Connected:</strong> Direct signed uploads and automatic multi-screen scaling active (
            <code>{cloudinaryStatus.cloudName}</code>).
          </span>
        </div>
      )}

      {/* Tactile Dropzone */}
      <motion.div
        whileHover={{ scale: isMaxReached ? 1 : 1.006, borderColor: isMaxReached ? 'rgba(17,17,17,0.14)' : 'var(--ink)' }}
        whileTap={{ scale: isMaxReached ? 1 : 0.995 }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isMaxReached) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (isMaxReached) {
            setLimitNotice(`Maximum limit reached: You can upload up to ${MAX_IMAGES} photos per product.`);
            return;
          }
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => {
          if (isMaxReached) {
            setLimitNotice(`Maximum limit reached: You can upload up to ${MAX_IMAGES} photos per product.`);
            return;
          }
          fileInputRef.current?.click();
        }}
        role="button"
        tabIndex={0}
        style={{
          border: `1.5px dashed ${dragOver ? 'var(--ink)' : isMaxReached ? 'rgba(74, 222, 128, 0.35)' : 'rgba(17,17,17,0.14)'}`,
          borderRadius: 20,
          padding: '30px 24px',
          textAlign: 'center',
          cursor: isMaxReached ? 'default' : 'pointer',
          background: isMaxReached ? 'rgba(46, 107, 60, 0.08)' : dragOver ? 'var(--stone)' : 'var(--paper)',
          boxShadow: '0 4px 20px -2px rgba(17,17,17,0.03)',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: isMaxReached ? 'rgba(74, 222, 128, 0.2)' : 'var(--stone)',
              display: 'grid',
              placeItems: 'center',
              color: isMaxReached ? '#4ADE80' : 'var(--ink)',
              fontWeight: 800,
              fontSize: isMaxReached ? 16 : 20,
            }}
          >
            {isMaxReached ? '✓' : '+'}
          </div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--ink)', marginBottom: 4, letterSpacing: '-0.01em' }}>
              {isMaxReached
                ? `All 5 of 5 Photos Uploaded`
                : `Upload up to 5 product photos, or click to browse (${images.length}/${MAX_IMAGES})`}
            </div>
            <div style={{ fontSize: 12, color: 'var(--subtle)' }}>
              {isMaxReached
                ? 'Maximum 5 photos reached. Reorder with ‹ › or delete any card below to replace.'
                : `WebP, JPG, and PNG supported (up to 10MB per file) • ${MAX_IMAGES - images.length} photo slot${MAX_IMAGES - images.length === 1 ? '' : 's'} remaining`}
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={isMaxReached}
          style={{ display: 'none' }}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </motion.div>

      {/* Limit / Notice Banner */}
      {limitNotice && (
        <div
          style={{
            marginTop: 12,
            padding: '10px 16px',
            borderRadius: 12,
            background: 'rgba(234, 179, 8, 0.12)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            color: '#EAB308',
            fontSize: 12.5,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <span>{limitNotice}</span>
          <button
            type="button"
            onClick={() => setLimitNotice(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#EAB308',
              fontSize: 16,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Manual URL Input Bar (Watermelon Pill Bar) */}
      <div style={{ marginTop: 14 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--paper)',
            border: '1px solid rgba(17,17,17,0.1)',
            borderRadius: 9999,
            padding: '4px 6px 4px 16px',
            boxShadow: '0 2px 10px rgba(17,17,17,0.03)',
            opacity: isMaxReached ? 0.6 : 1,
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', marginRight: 10 }}>
            URL
          </span>
          <input
            type="url"
            disabled={isMaxReached}
            placeholder={isMaxReached ? "Maximum 5 photos reached (delete a photo below to attach via URL)" : "Or paste an image URL (/images/products/... or CDN)"}
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addManualUrl();
              }
            }}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 13,
              color: 'var(--ink)',
              padding: '8px 0',
              cursor: isMaxReached ? 'not-allowed' : 'text',
            }}
          />
          <button
            type="button"
            disabled={isMaxReached}
            onClick={addManualUrl}
            style={{
              borderRadius: 9999,
              padding: '8px 16px',
              fontSize: 12,
              fontWeight: 800,
              minHeight: 34,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: isMaxReached ? 'rgba(17,17,17,0.3)' : 'var(--ink)',
              color: 'var(--ivory)',
              border: 'none',
              cursor: isMaxReached ? 'not-allowed' : 'pointer',
            }}
          >
            + Attach
          </button>
        </div>
      </div>

      {uploads.length > 0 && (
        <ul style={{ marginTop: 12, padding: 0, listStyle: 'none' }}>
          {uploads.map((u) => (
            <li
              key={u.fileName}
              style={{
                fontSize: 13,
                marginBottom: 6,
                padding: '8px 12px',
                background: 'var(--stone)',
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{u.fileName} — uploading {u.progress}%</span>
              {u.error && <span className="error" style={{ margin: 0, padding: '2px 8px' }}>{u.error}</span>}
            </li>
          ))}
        </ul>
      )}

      {deleteError && <p className="error" style={{ marginTop: 12 }}>{deleteError}</p>}

      {/* Gallery Cards Grid */}
      {images.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--subtle)' }}>
              Current Media Assets ({images.length}/{MAX_IMAGES}) • First card is primary storefront cover
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: isMaxReached ? '#4ADE80' : 'var(--subtle)',
              }}
            >
              {isMaxReached ? 'Maximum 5 Photos (Full)' : `${MAX_IMAGES - images.length} photo slot${MAX_IMAGES - images.length === 1 ? '' : 's'} available`}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 14,
            }}
          >
            <AnimatePresence>
              {images.map((img, i) => (
                <motion.div
                  key={img.url}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    border: i === 0 ? '2px solid var(--ink)' : '1px solid rgba(17,17,17,0.08)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: 'var(--paper)',
                    boxShadow: i === 0 ? '0 8px 24px -4px rgba(17,17,17,0.1)' : '0 2px 8px rgba(17,17,17,0.03)',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ position: 'relative', height: 130, background: 'var(--stone)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getOptimizedImageUrl(resolveImageUrl(img.url), { width: 400, quality: 'auto' })}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.src = '/images/products/cricket_bat_willow.webp';
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        background: i === 0 ? 'var(--ink)' : 'rgba(17,17,17,0.7)',
                        color: 'var(--ivory)',
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '3px 9px',
                        borderRadius: 9999,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                      }}
                    >
                      {i === 0 ? 'Primary Cover' : `Photo ${i + 1}`}
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '8px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(17,17,17,0.06)',
                      background: 'var(--paper)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => moveImage(i, -1)}
                        disabled={i === 0}
                        aria-label="Move left"
                        style={{
                          width: 28,
                          height: 28,
                          padding: 0,
                          borderRadius: '50%',
                          border: '1px solid rgba(17,17,17,0.1)',
                          background: 'var(--stone)',
                          color: 'var(--ink)',
                          display: 'grid',
                          placeItems: 'center',
                          cursor: i === 0 ? 'not-allowed' : 'pointer',
                          opacity: i === 0 ? 0.4 : 1,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(i, 1)}
                        disabled={i === images.length - 1}
                        aria-label="Move right"
                        style={{
                          width: 28,
                          height: 28,
                          padding: 0,
                          borderRadius: '50%',
                          border: '1px solid rgba(17,17,17,0.1)',
                          background: 'var(--stone)',
                          color: 'var(--ink)',
                          display: 'grid',
                          placeItems: 'center',
                          cursor: i === images.length - 1 ? 'not-allowed' : 'pointer',
                          opacity: i === images.length - 1 ? 0.4 : 1,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        ›
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(i)}
                      aria-label="Delete image"
                      style={{
                        width: 28,
                        height: 28,
                        padding: 0,
                        borderRadius: '50%',
                        border: '1px solid rgba(192,57,43,0.2)',
                        background: 'rgba(192,57,43,0.08)',
                        color: 'var(--error)',
                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',
                        fontSize: 15,
                        fontWeight: 700,
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <div
                    title={img.url}
                    style={{
                      padding: '4px 10px',
                      fontSize: 10,
                      color: 'var(--subtle)',
                      background: 'var(--stone)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {img.url}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      <input type="hidden" name="images" value={imagesValue} />
      <input type="hidden" name="cloudinary_public_ids" value={publicIdsValue} />
    </div>
  );
}
