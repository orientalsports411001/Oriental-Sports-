'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteCloudinaryAssetAction } from '@/app/(admin)/products/cloudinary-actions';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPE_PREFIX = 'image/';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://orientalsports.in').replace(/\/+$/, '');

function resolveImageUrl(url: string): string {
  return url.startsWith('/') ? `${SITE_URL}${url}` : url;
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
  const [manualUrl, setManualUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const uploadFile = useCallback(async (file: File) => {
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
        onChange([...imagesRef.current, { url: localResult.secure_url, publicId: localResult.public_id }]);
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
          onChange([...imagesRef.current, { url: localResult.secure_url, publicId: localResult.public_id }]);
          setUploads((prev) => prev.filter((u) => u.fileName !== file.name));
          return;
        }

        const body = await uploadRes.json().catch(() => ({}));
        throw new Error(body?.error?.message || `Upload failed (${uploadRes.status}).`);
      }

      const result = await uploadRes.json();
      onChange([...imagesRef.current, { url: result.secure_url, publicId: result.public_id }]);
      setUploads((prev) => prev.filter((u) => u.fileName !== file.name));
    } catch (err: any) {
      setUploads((prev) => prev.map((u) => (u.fileName === file.name ? { ...u, progress: 0, error: err.message } : u)));
    }
  }, [onChange]);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    Array.from(fileList).forEach((file) => void uploadFile(file));
  }

  async function handleDelete(index: number) {
    const target = images[index];
    setDeleteError(null);

    if (target.publicId && !target.publicId.startsWith('local_')) {
      const result = await deleteCloudinaryAssetAction(target.publicId);
      if (!result.ok) {
        setDeleteError(`Could not delete from Cloudinary: ${result.error || 'unknown error'}`);
        return;
      }
    }

    onChange(images.filter((_, i) => i !== index));
  }

  function moveImage(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function addManualUrl() {
    const url = manualUrl.trim();
    if (!url) return;
    onChange([...images, { url }]);
    setManualUrl('');
  }

  return (
    <div>
      {/* Tactile Dropzone */}
      <motion.div
        whileHover={{ scale: 1.006, borderColor: 'var(--ink)' }}
        whileTap={{ scale: 0.995 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        style={{
          border: `1.5px dashed ${dragOver ? 'var(--ink)' : 'rgba(17,17,17,0.14)'}`,
          borderRadius: 20,
          padding: '32px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? 'var(--stone)' : 'var(--paper)',
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
              background: 'var(--stone)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--ink)',
              fontWeight: 800,
              fontSize: 20,
            }}
          >
            +
          </div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--ink)', marginBottom: 4, letterSpacing: '-0.01em' }}>
              Drag and drop product photos, or click to browse
            </div>
            <div style={{ fontSize: 12, color: 'var(--subtle)' }}>
              WebP, high-res JPG, and transparent PNG supported (up to 10MB per file)
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </motion.div>

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
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', marginRight: 10 }}>
            URL
          </span>
          <input
            type="url"
            placeholder="Or paste an image URL (/images/products/... or CDN)"
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
            }}
          />
          <button
            type="button"
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
              background: 'var(--ink)',
              color: 'var(--ivory)',
              border: 'none',
              cursor: 'pointer',
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
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--subtle)', marginBottom: 12 }}>
            Current Media Assets (First card is primary storefront photo)
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
                      src={resolveImageUrl(img.url)}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.src = '/images/products/cricket_bat_willow.webp';
                      }}
                    />
                    {i === 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          background: 'var(--ink)',
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
                        Primary
                      </span>
                    )}
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
