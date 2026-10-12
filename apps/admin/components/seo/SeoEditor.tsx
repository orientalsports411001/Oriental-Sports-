'use client';

import { useMemo, useState, useTransition } from 'react';
import { generateSeoSuggestionsAction } from '@/app/(admin)/products/seo-actions';
import type { SeoSuggestions } from '@/lib/ai/seo-provider';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://orientalsports.in').replace(/\/+$/, '');

const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;

type FieldKey = 'seoTitle' | 'seoDescription' | 'ogTitle' | 'ogDescription';

export type SeoEditorInitial = {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  imageAltText: Record<string, string>;
};

export function SeoEditor({
  productId,
  slug,
  name,
  brand,
  categoryName,
  description,
  price,
  sizes,
  variants,
  images,
  initial,
}: {
  productId?: string;
  slug: string;
  name: string;
  brand: string;
  categoryName: string;
  description: string;
  price: number;
  sizes: string[];
  variants: unknown[];
  images: string[];
  initial: SeoEditorInitial;
}) {
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [seoDescription, setSeoDescription] = useState(initial.seoDescription);
  const [primaryKeyword, setPrimaryKeyword] = useState(initial.seoKeywords[0] || '');
  const [secondaryKeywords, setSecondaryKeywords] = useState<string[]>(initial.seoKeywords.slice(1));
  const [keywordDraft, setKeywordDraft] = useState('');
  const [ogTitle, setOgTitle] = useState(initial.ogTitle);
  const [ogDescription, setOgDescription] = useState(initial.ogDescription);
  const [imageAltText, setImageAltText] = useState<Record<string, string>>(initial.imageAltText || {});

  const [pending, generating] = useTransition();
  const [genError, setGenError] = useState<string | null>(null);
  const [pendingSuggestions, setPendingSuggestions] = useState<SeoSuggestions | null>(null);
  const [confirmFields, setConfirmFields] = useState<FieldKey[]>([]);

  const allKeywords = useMemo(
    () => [primaryKeyword, ...secondaryKeywords].map((k) => k.trim()).filter(Boolean),
    [primaryKeyword, secondaryKeywords]
  );

  function addSecondaryKeyword() {
    const value = keywordDraft.trim();
    if (!value) return;
    if (!secondaryKeywords.includes(value) && value !== primaryKeyword) {
      setSecondaryKeywords((prev) => [...prev, value]);
    }
    setKeywordDraft('');
  }

  function removeSecondaryKeyword(value: string) {
    setSecondaryKeywords((prev) => prev.filter((k) => k !== value));
  }

  function applySuggestions(suggestions: SeoSuggestions, fieldsToApply?: FieldKey[]) {
    const apply = (field: FieldKey) => !fieldsToApply || fieldsToApply.includes(field);

    if (apply('seoTitle')) setSeoTitle(suggestions.seoTitle);
    if (apply('seoDescription')) setSeoDescription(suggestions.seoDescription);
    if (apply('ogTitle')) setOgTitle(suggestions.ogTitle);
    if (apply('ogDescription')) setOgDescription(suggestions.ogDescription);

    // Keywords and alt text are additive/empty-only — they don't carry the
    // same "silently overwrite custom work" risk as the free-text fields
    // above, but still only fill empty slots.
    if (!primaryKeyword && suggestions.primaryKeyword) {
      setPrimaryKeyword(suggestions.primaryKeyword);
    }
    if (secondaryKeywords.length === 0 && suggestions.secondaryKeywords.length > 0) {
      setSecondaryKeywords(suggestions.secondaryKeywords);
    }

    setImageAltText((prev) => {
      const next = { ...prev };
      for (const url of images) {
        if (!next[url] && suggestions.imageAltTexts[url]) {
          next[url] = suggestions.imageAltTexts[url];
        }
      }
      return next;
    });
  }

  function handleGenerateClick() {
    setGenError(null);
    generating(async () => {
      const result = await generateSeoSuggestionsAction(productId || null, {
        name,
        brand,
        categoryName,
        description,
        price,
        sizes,
        variants,
        imageUrls: images,
      });

      if (!result.ok) {
        setGenError(result.error);
        return;
      }

      const allFields: FieldKey[] = ['seoTitle', 'seoDescription', 'ogTitle', 'ogDescription'];
      const currentValues: Record<FieldKey, string> = { seoTitle, seoDescription, ogTitle, ogDescription };
      const existing = allFields.filter((f) => currentValues[f].trim());
      const empty = allFields.filter((f) => !currentValues[f].trim());

      // Empty fields apply immediately; fields with a value already wait for
      // an explicit per-field confirmation below so AI output never silently
      // overwrites something the admin typed.
      if (empty.length > 0) {
        applySuggestions(result.suggestions, empty);
      }
      if (existing.length > 0) {
        setPendingSuggestions(result.suggestions);
        setConfirmFields(existing);
      }
    });
  }

  function confirmReplace(field: FieldKey, replace: boolean) {
    if (pendingSuggestions && replace) {
      applySuggestions(pendingSuggestions, [field]);
    }
    const remaining = confirmFields.filter((f) => f !== field);
    setConfirmFields(remaining);
    if (remaining.length === 0) {
      setPendingSuggestions(null);
    }
  }

  const warnings: string[] = [];
  if (!seoTitle.trim()) warnings.push('SEO title is empty.');
  else if (seoTitle.length > TITLE_MAX) warnings.push(`SEO title is ${seoTitle.length} characters — over the ~${TITLE_MAX} guidance.`);
  if (!seoDescription.trim()) warnings.push('Meta description is empty.');
  else if (seoDescription.length > DESC_MAX) warnings.push(`Meta description is ${seoDescription.length} characters — over the ~${DESC_MAX} guidance.`);
  images.forEach((url, i) => {
    if (!imageAltText[url]?.trim()) warnings.push(`Image ${i + 1} has no alt text.`);
  });

  const previewUrl = `${SITE_URL}/products/${slug || 'your-product-slug'}`;

  return (
    <div className="card" style={{ marginTop: 24 }}>
      <h2>SEO</h2>

      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="button" onClick={handleGenerateClick} disabled={pending}>
          {pending ? 'Generating…' : 'Generate SEO with AI'}
        </button>
        {genError && <span className="error">{genError}</span>}
      </div>

      {confirmFields.length > 0 && pendingSuggestions && (
        <div className="card" style={{ background: '#fff8e1', marginBottom: 16 }}>
          {confirmFields.map((field) => (
            <div key={field} style={{ marginBottom: 8 }}>
              <p>
                Replace existing {fieldLabel(field)}?
                <br />
                <em>Current:</em> {currentValue(field, { seoTitle, seoDescription, ogTitle, ogDescription }) || '(empty)'}
                <br />
                <em>Suggested:</em> {pendingSuggestions[field]}
              </p>
              <button type="button" onClick={() => confirmReplace(field, true)}>
                Replace
              </button>{' '}
              <button type="button" onClick={() => confirmReplace(field, false)}>
                Keep existing
              </button>
            </div>
          ))}
        </div>
      )}

      <label htmlFor="seo_title_input">SEO page title ({seoTitle.length} chars — aim for {TITLE_MIN}-{TITLE_MAX})</label>
      <input
        id="seo_title_input"
        value={seoTitle}
        onChange={(e) => setSeoTitle(e.target.value)}
        style={{ width: '100%' }}
      />

      <label htmlFor="seo_description_input" style={{ marginTop: 12, display: 'block' }}>
        Meta description ({seoDescription.length} chars — aim for {DESC_MIN}-{DESC_MAX})
      </label>
      <textarea
        id="seo_description_input"
        value={seoDescription}
        onChange={(e) => setSeoDescription(e.target.value)}
        rows={3}
        style={{ width: '100%' }}
      />

      <div className="form-row" style={{ marginTop: 12 }}>
        <div>
          <label htmlFor="primary_keyword_input">Primary keyword</label>
          <input
            id="primary_keyword_input"
            value={primaryKeyword}
            onChange={(e) => setPrimaryKeyword(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label htmlFor="secondary_keyword_input">Secondary keywords</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="secondary_keyword_input"
              value={keywordDraft}
              onChange={(e) => setKeywordDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSecondaryKeyword();
                }
              }}
              style={{ flex: 1 }}
            />
            <button type="button" onClick={addSecondaryKeyword}>
              Add
            </button>
          </div>
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {secondaryKeywords.map((k) => (
              <span
                key={k}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  padding: '4px 8px',
                  fontSize: 13,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {k}
                <button
                  type="button"
                  onClick={() => removeSecondaryKeyword(k)}
                  aria-label={`Remove ${k}`}
                  style={{ minWidth: 44, minHeight: 44, lineHeight: 1 }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="form-row" style={{ marginTop: 12 }}>
        <div>
          <label htmlFor="og_title_input">Open Graph title</label>
          <input id="og_title_input" value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div>
          <label htmlFor="og_description_input">Open Graph description</label>
          <input
            id="og_description_input"
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {images.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h3>Image alt text</h3>
          {images.map((url, i) => (
            <div key={url} style={{ marginBottom: 8 }}>
              <label htmlFor={`alt_text_${i}`} style={{ fontSize: 13, wordBreak: 'break-all' }}>
                {url}
              </label>
              <input
                id={`alt_text_${i}`}
                value={imageAltText[url] || ''}
                onChange={(e) => setImageAltText((prev) => ({ ...prev, [url]: e.target.value }))}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>
      )}

      {warnings.length > 0 && (
        <ul style={{ color: '#b45309', marginTop: 16 }}>
          {warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 20 }}>
        <h3>Search result preview</h3>
        <div style={{ border: '1px solid #ddd', borderRadius: 6, padding: 12, maxWidth: 560, fontFamily: 'arial, sans-serif' }}>
          <div style={{ color: '#202124', fontSize: 14 }}>{previewUrl}</div>
          <div style={{ color: '#1a0dab', fontSize: 18, lineHeight: 1.3 }}>{seoTitle || name || 'Product title'}</div>
          <div style={{ color: '#4d5156', fontSize: 13, lineHeight: 1.4 }}>
            {seoDescription || description || 'Meta description will appear here.'}
          </div>
        </div>

        <h3 style={{ marginTop: 16 }}>Social share preview</h3>
        <div style={{ border: '1px solid #ddd', borderRadius: 8, maxWidth: 400, overflow: 'hidden' }}>
          <div style={{ background: '#eee', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
            {images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[0].startsWith('/') ? `${SITE_URL}${images[0]}` : images[0]}
                alt=""
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
              />
            ) : (
              'No image'
            )}
          </div>
          <div style={{ padding: 10 }}>
            <div style={{ fontSize: 12, color: '#65676b', textTransform: 'uppercase' }}>{SITE_URL.replace(/^https?:\/\//, '')}</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{ogTitle || seoTitle || name || 'Product title'}</div>
            <div style={{ fontSize: 13, color: '#65676b' }}>{ogDescription || seoDescription || 'Social description will appear here.'}</div>
          </div>
        </div>
      </div>

      {/* Hidden inputs — submitted as part of the enclosing product form's
          FormData alongside the plain fields in product-form.tsx. */}
      <input type="hidden" name="seo_title" value={seoTitle} />
      <input type="hidden" name="seo_description" value={seoDescription} />
      <input type="hidden" name="seo_keywords" value={allKeywords.join('\n')} />
      <input type="hidden" name="og_title" value={ogTitle} />
      <input type="hidden" name="og_description" value={ogDescription} />
      <input type="hidden" name="image_alt_text" value={JSON.stringify(imageAltText)} />
    </div>
  );
}

function fieldLabel(field: FieldKey): string {
  switch (field) {
    case 'seoTitle':
      return 'SEO title';
    case 'seoDescription':
      return 'meta description';
    case 'ogTitle':
      return 'Open Graph title';
    case 'ogDescription':
      return 'Open Graph description';
  }
}

function currentValue(
  field: FieldKey,
  values: { seoTitle: string; seoDescription: string; ogTitle: string; ogDescription: string }
): string {
  return values[field];
}
