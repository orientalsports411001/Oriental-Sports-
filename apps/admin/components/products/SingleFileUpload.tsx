'use client';

import { useCallback, useRef, useState } from 'react';
import { FileText, Trash2, Video as VideoIcon, ExternalLink } from 'lucide-react';
import { deleteCloudinaryAssetAction } from '@/app/(admin)/products/cloudinary-actions';

export type UploadedFile = { url: string; publicId?: string };

interface SingleFileUploadProps {
  kind: 'video' | 'pdf';
  value: UploadedFile | null;
  onChange: (value: UploadedFile | null) => void;
  label: string;
  hint: string;
  accept: string;
  maxBytes: number;
  maxLabel: string;
}

/**
 * A single-slot upload (one product video, or one spec-sheet PDF) — the
 * gallery's 5-photo model doesn't fit either of these, so this is a
 * separate, simpler control: one file, replace or remove it, same visual
 * language and signed-upload mechanism as ImageGallery.
 */
export function SingleFileUpload({ kind, value, onChange, label, hint, accept, maxBytes, maxLabel }: SingleFileUploadProps) {
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resourceType = kind === 'video' ? 'video' : 'raw';

  const upload = useCallback(
    async (file: File) => {
      setError(null);
      if (kind === 'video' && !file.type.startsWith('video/')) {
        setError('Not a video file.');
        return;
      }
      if (kind === 'pdf' && file.type !== 'application/pdf') {
        setError('Not a PDF file.');
        return;
      }
      if (file.size > maxBytes) {
        setError(`File exceeds the ${maxLabel} limit.`);
        return;
      }

      setProgress(5);
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        let signRes = await fetch(`${basePath}/api/cloudinary/sign?kind=${kind}`, { method: 'POST' });
        if (!signRes.ok && signRes.status === 404) {
          signRes = await fetch(`${basePath}/admin/api/cloudinary/sign?kind=${kind}`, { method: 'POST' });
        }
        if (!signRes.ok) {
          const body = await signRes.json().catch(() => ({}));
          throw new Error(body.error || `Could not sign upload (${signRes.status}).`);
        }
        const signed = await signRes.json();
        setProgress(30);
        if (signed.local) {
          throw new Error('File hosting is not configured on the server, so this file was not saved.');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', signed.apiKey);
        formData.append('timestamp', String(signed.timestamp));
        formData.append('signature', signed.signature);
        formData.append('folder', signed.folder);
        formData.append('allowed_formats', signed.allowedFormats);

        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${signed.cloudName}/${signed.resourceType}/upload`, {
          method: 'POST',
          body: formData,
        });
        setProgress(90);
        if (!uploadRes.ok) {
          const body = await uploadRes.json().catch(() => ({}));
          throw new Error(body?.error?.message || `Upload failed (${uploadRes.status}).`);
        }
        const result = await uploadRes.json();

        // Replacing an existing file: remove the old asset so it doesn't
        // sit orphaned in Cloudinary.
        if (value?.publicId) {
          await deleteCloudinaryAssetAction(value.publicId, resourceType).catch(() => {});
        }
        onChange({ url: result.secure_url, publicId: result.public_id });
        setProgress(null);
      } catch (err: any) {
        setProgress(null);
        setError(err?.message || 'Upload failed. Please try again.');
      }
    },
    [kind, maxBytes, maxLabel, onChange, resourceType, value]
  );

  async function handleRemove() {
    setError(null);
    if (value?.publicId) {
      const result = await deleteCloudinaryAssetAction(value.publicId, resourceType);
      if (!result.ok) {
        setError(`Could not delete from Cloudinary: ${result.error || 'unknown error'}`);
        return;
      }
    }
    onChange(null);
  }

  const fileName = value?.url ? decodeURIComponent(value.url.split('/').pop() || 'file') : '';

  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
        {label}
      </label>
      <p style={{ margin: '0 0 12px', fontSize: 12.5, color: 'var(--subtle)' }}>{hint}</p>

      {value ? (
        <div
          style={{
            border: '1px solid rgba(17,17,17,0.1)',
            borderRadius: 16,
            background: 'var(--paper)',
            padding: 14,
            display: 'flex',
            flexDirection: kind === 'video' ? 'column' : 'row',
            alignItems: kind === 'video' ? 'stretch' : 'center',
            gap: 12,
          }}
        >
          {kind === 'video' ? (
            <video src={value.url} controls style={{ width: '100%', maxHeight: 320, borderRadius: 10, background: '#000' }} />
          ) : (
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--stone)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <FileText size={20} color="var(--ink)" />
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {fileName}
            </div>
            <a
              href={value.url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: 12,
                color: 'var(--subtle)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                minHeight: 44,
                padding: '4px 0',
                marginLeft: -2,
                paddingLeft: 2,
              }}
            >
              Open in new tab <ExternalLink size={12} />
            </a>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                minHeight: 44,
                minWidth: 44,
                padding: '0 14px',
                borderRadius: 10,
                border: '1px solid rgba(17,17,17,0.12)',
                background: 'var(--stone)',
                color: 'var(--ink)',
                fontSize: 12.5,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              aria-label={`Remove ${label.toLowerCase()}`}
              style={{
                width: 44,
                height: 44,
                padding: 0,
                borderRadius: 10,
                border: '1px solid rgba(192,57,43,0.2)',
                background: 'rgba(192,57,43,0.08)',
                color: 'var(--error)',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files?.[0]) upload(e.dataTransfer.files[0]);
          }}
          style={{
            border: `1.5px dashed ${dragOver ? 'var(--ink)' : 'rgba(17,17,17,0.14)'}`,
            borderRadius: 16,
            padding: '26px 20px',
            textAlign: 'center',
            cursor: progress !== null ? 'wait' : 'pointer',
            background: dragOver ? 'var(--stone)' : 'var(--paper)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--stone)', display: 'grid', placeItems: 'center', color: 'var(--ink)' }}>
              {kind === 'video' ? <VideoIcon size={18} /> : <FileText size={18} />}
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)' }}>
              {progress !== null ? `Uploading… ${progress}%` : `Click to browse, or drag a ${kind === 'video' ? 'video' : 'PDF'} here`}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--subtle)' }}>Up to {maxLabel}</div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = '';
        }}
      />

      {error && (
        <p style={{ marginTop: 8, fontSize: 12.5, color: 'var(--error)' }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
