'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { deleteCloudinaryAssetAction } from '@/app/(admin)/products/cloudinary-actions';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPE_PREFIX = 'image/';

export type GalleryImage = {
  /** The delivery URL stored in products.images — local "/images/..." path or a Cloudinary secure_url. */
  url: string;
  /** Only set for Cloudinary-uploaded images; used to delete the remote asset. */
  publicId?: string;
};

type UploadState = { fileName: string; progress: number; error?: string };

/**
 * Product image gallery: thumbnails of every current image (existing local
 * paths and Cloudinary uploads alike), drag-and-drop/click upload straight
 * to Cloudinary via a server-signed request, reordering, per-image delete
 * (which also deletes the Cloudinary asset when there is one), and upload
 * progress/error state.
 *
 * `images` is controlled by the parent form (product-form.tsx) so the SEO
 * editor's per-image alt-text list — which keys off the same URL strings —
 * stays in sync with uploads/deletes/reorders made here, rather than each
 * component tracking its own stale copy of the array.
 *
 * Keeps the same contract the rest of the form and the SEO editor rely on:
 * the `images` hidden input is still a newline-joined list of URL strings,
 * first = primary. `cloudinary_public_ids` is a second hidden input
 * (JSON map of url -> public_id) so edits can delete the right Cloudinary
 * asset later.
 */
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Concurrent uploads each append to the *current* array rather than a
  // snapshot captured when the upload started, so two files finishing close
  // together don't clobber one another.
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
    const uploadKey = `${file.name}-${file.size}-${Date.now()}`;

    if (!file.type.startsWith(ACCEPTED_TYPE_PREFIX)) {
      setUploads((prev) => [...prev, { fileName: file.name, progress: 0, error: 'Not an image file.' }]);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setUploads((prev) => [...prev, { fileName: file.name, progress: 0, error: 'File is larger than 10MB.' }]);
      return;
    }

    setUploads((prev) => [...prev, { fileName: file.name, progress: 5 }]);

    try {
      const signRes = await fetch('/api/cloudinary/sign', { method: 'POST' });
      if (!signRes.ok) {
        const body = await signRes.json().catch(() => ({}));
        throw new Error(body.error || `Could not sign upload (${signRes.status}).`);
      }
      const signed: {
        cloudName: string;
        apiKey: string;
        timestamp: number;
        folder: string;
        allowedFormats: string;
        signature: string;
      } = await signRes.json();

      setUploads((prev) => prev.map((u) => (u.fileName === file.name ? { ...u, progress: 25 } : u)));

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
        const body = await uploadRes.json().catch(() => ({}));
        throw new Error(body?.error?.message || `Cloudinary upload failed (${uploadRes.status}).`);
      }

      const result: { secure_url: string; public_id: string } = await uploadRes.json();

      onChange([...imagesRef.current, { url: result.secure_url, publicId: result.public_id }]);
      setUploads((prev) => prev.filter((u) => u.fileName !== file.name));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed.';
      setUploads((prev) => prev.map((u) => (u.fileName === file.name ? { ...u, progress: 0, error: message } : u)));
    }
    void uploadKey;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    Array.from(fileList).forEach((file) => void uploadFile(file));
  }

  async function handleDelete(index: number) {
    const target = images[index];
    setDeleteError(null);

    if (target.publicId) {
      const result = await deleteCloudinaryAssetAction(target.publicId);
      if (!result.ok) {
        setDeleteError(`Could not delete image from Cloudinary: ${result.error || 'unknown error'}`);
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

  function dismissUpload(fileName: string) {
    setUploads((prev) => prev.filter((u) => u.fileName !== fileName));
  }

  return (
    <div>
      <label>Images</label>

      <div
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
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
        }}
        style={{
          border: `2px dashed ${dragOver ? '#4b5563' : '#ccc'}`,
          borderRadius: 8,
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? '#f3f4f6' : 'transparent',
          minHeight: 44,
        }}
      >
        <p style={{ margin: 0, fontSize: 14 }}>Click or drag images here to upload (JPG, PNG, WebP — max 10MB each)</p>
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
      </div>

      {uploads.length > 0 && (
        <ul style={{ marginTop: 8, padding: 0, listStyle: 'none' }}>
          {uploads.map((u) => (
            <li key={u.fileName} style={{ fontSize: 13, marginBottom: 4 }}>
              {u.error ? (
                <span className="error">
                  {u.fileName}: {u.error}{' '}
                  <button type="button" onClick={() => dismissUpload(u.fileName)} style={{ minHeight: 24 }}>
                    Dismiss
                  </button>
                </span>
              ) : (
                <span>
                  {u.fileName} — uploading… {u.progress}%
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {deleteError && <p className="error">{deleteError}</p>}

      {images.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 12,
            marginTop: 12,
          }}
        >
          {images.map((img, i) => (
            <div
              key={img.url}
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div style={{ position: 'relative', height: 100, background: '#f3f4f6' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0.3';
                  }}
                />
                {i === 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 4,
                      left: 4,
                      background: '#111',
                      color: '#fff',
                      fontSize: 11,
                      padding: '2px 6px',
                      borderRadius: 4,
                    }}
                  >
                    Primary
                  </span>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 4,
                  gap: 4,
                }}
              >
                <div style={{ display: 'flex', gap: 2 }}>
                  <button
                    type="button"
                    onClick={() => moveImage(i, -1)}
                    disabled={i === 0}
                    aria-label="Move earlier"
                    style={{ minWidth: 44, minHeight: 44 }}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(i, 1)}
                    disabled={i === images.length - 1}
                    aria-label="Move later"
                    style={{ minWidth: 44, minHeight: 44 }}
                  >
                    ↓
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(i)}
                  aria-label="Delete image"
                  style={{ minWidth: 44, minHeight: 44, color: '#b91c1c' }}
                >
                  Delete
                </button>
              </div>
              <p
                title={img.url}
                style={{
                  fontSize: 11,
                  color: '#666',
                  margin: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {img.url}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Submitted as part of the enclosing product form's FormData. */}
      <input type="hidden" name="images" value={imagesValue} />
      <input type="hidden" name="cloudinary_public_ids" value={publicIdsValue} />
    </div>
  );
}
