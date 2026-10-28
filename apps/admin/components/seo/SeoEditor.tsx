'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Globe, Share2, Check, X, AlertCircle } from 'lucide-react';
import { generateSeoSuggestionsAction } from '@/app/(admin)/products/seo-actions';
import { generateClientSeoSuggestions, type SeoSuggestions } from '@/lib/seo-client';

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
  onChange?: (values: { seoTitle: string; seoDescription: string }) => void;
}) {
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [seoDescription, setSeoDescription] = useState(initial.seoDescription);
  const [primaryKeyword, setPrimaryKeyword] = useState(initial.seoKeywords[0] || '');
  const [secondaryKeywords, setSecondaryKeywords] = useState<string[]>(initial.seoKeywords.slice(1));
  const [keywordDraft, setKeywordDraft] = useState('');
  const [ogTitle, setOgTitle] = useState(initial.ogTitle);
  const [ogDescription, setOgDescription] = useState(initial.ogDescription);
  const [imageAltText, setImageAltText] = useState<Record<string, string>>(initial.imageAltText || {});

  const [pending, setPending] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [pendingSuggestions, setPendingSuggestions] = useState<SeoSuggestions | null>(null);
  const [confirmFields, setConfirmFields] = useState<FieldKey[]>([]);

  useEffect(() => {
    onChange?.({ seoTitle, seoDescription });
  }, [seoTitle, seoDescription, onChange]);

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

  async function handleGenerateClick() {
    setGenError(null);
    setPending(true);

    const safeName = (name || '').trim();
    if (!safeName) {
      setGenError('Add a product name first before generating SEO suggestions.');
      setPending(false);
      return;
    }

    const payload = {
      name: safeName,
      brand: brand || null,
      categoryName: categoryName || null,
      description: description || null,
      price: Number(price) || 0,
      sizes: sizes || [],
      variants: variants || [],
      imageUrls: images || [],
    };

    let suggestionsToApply: SeoSuggestions | null = null;

    // 1. Try direct API route first (bypasses Next.js Server Action CSRF & RPC issues)
    try {
      const res = await fetch('/api/seo/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ok && data.suggestions) {
          suggestionsToApply = data.suggestions;
        }
      }
    } catch {
      // Continue to Server Action / client fallback
    }

    // 2. Try Server Action if API route was not reached
    if (!suggestionsToApply) {
      try {
        const actionResult = await generateSeoSuggestionsAction(productId || null, payload);
        if (actionResult.ok && actionResult.suggestions) {
          suggestionsToApply = actionResult.suggestions;
        }
      } catch {
        // Continue to instant client fallback
      }
    }

    // 3. Guaranteed instant client-side fallback (Zero server dependency, 100% reliable)
    if (!suggestionsToApply) {
      suggestionsToApply = generateClientSeoSuggestions(payload);
    }

    // Apply suggestions to the form fields
    const allFields: FieldKey[] = ['seoTitle', 'seoDescription', 'ogTitle', 'ogDescription'];
    const currentValues: Record<FieldKey, string> = { seoTitle, seoDescription, ogTitle, ogDescription };
    const existing = allFields.filter((f) => currentValues[f].trim());
    const empty = allFields.filter((f) => !currentValues[f].trim());

    if (empty.length > 0) {
      applySuggestions(suggestionsToApply, empty);
    }
    if (existing.length > 0) {
      setPendingSuggestions(suggestionsToApply);
      setConfirmFields(existing);
    }

    setPending(false);
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

  const previewUrl = `${SITE_URL}/products/${slug || 'your-product-slug'}`;

  return (
    <div>
      {/* Top AI Action Header (Cult UI Squircle Banner) */}
      <div
        style={{
          padding: '18px 22px',
          background: 'var(--stone)',
          border: '1px solid rgba(17,17,17,0.06)',
          borderRadius: 20,
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 14,
          boxShadow: '0 2px 10px rgba(17,17,17,0.02)',
        }}
      >
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--ink)', marginBottom: 2, letterSpacing: '-0.01em' }}>
            AI Search Engine Copywriter
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--subtle)' }}>
            Calibrate Google SERP snippet and social cards for athletic intent in Pune
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGenerateClick}
          disabled={pending}
          style={{
            padding: '10px 22px',
            fontSize: 12.5,
            fontWeight: 800,
            borderRadius: 9999,
            background: 'var(--ink)',
            color: 'var(--ivory)',
            border: 'none',
            cursor: pending ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 14px rgba(17,17,17,0.12)',
          }}
        >
          <span>{pending ? 'Synthesizing SEO Suggestions…' : 'Generate SEO'}</span>
        </motion.button>
      </div>

      {genError && <p className="error" style={{ marginBottom: 16 }}>{genError}</p>}

      {/* Confirmation Drawer for Existing Fields */}
      {confirmFields.length > 0 && pendingSuggestions && (
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--stone)',
            borderRadius: 20,
            padding: '18px 22px',
            marginBottom: 24,
            boxShadow: '0 4px 20px -2px rgba(17,17,17,0.04)',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Review AI Content Suggestions
          </div>
          {confirmFields.map((field) => (
            <div key={field} style={{ marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--stone)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 4 }}>
                Target: {fieldLabel(field)}
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--ink)', marginBottom: 6 }}>
                <strong>Suggested:</strong> {pendingSuggestions[field]}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => confirmReplace(field, true)}
                  style={{
                    minHeight: 32,
                    padding: '4px 14px',
                    fontSize: 12,
                    borderRadius: 9999,
                    background: 'var(--ink)',
                    color: 'var(--ivory)',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Check size={12} /> Apply Suggestion
                </button>
                <button
                  type="button"
                  onClick={() => confirmReplace(field, false)}
                  style={{
                    minHeight: 32,
                    padding: '4px 14px',
                    fontSize: 12,
                    borderRadius: 9999,
                    background: 'var(--paper)',
                    color: 'var(--ink)',
                    border: '1px solid rgba(17,17,17,0.12)',
                  }}
                >
                  Keep Current
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Title Field with Character Health Gauge */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label htmlFor="seo_title_input" style={{ margin: 0 }}>Google Title Tag</label>
          <span style={{ fontSize: 11, fontWeight: 700, color: seoTitle.length > TITLE_MAX ? 'var(--error)' : 'var(--gold-ink)' }}>
            {seoTitle.length} / 60 Chars (Target: 50–60)
          </span>
        </div>
        <input
          id="seo_title_input"
          className="cult-input"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          placeholder="e.g. SG Scorer Classic Cricket Bat | Oriental Sports Pune"
          style={{ width: '100%', fontSize: 14, fontWeight: 600 }}
        />
      </div>

      {/* Meta Description Field with Character Health Gauge */}
      <div style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label htmlFor="seo_description_input" style={{ margin: 0 }}>Meta Snippet Description</label>
          <span style={{ fontSize: 11, fontWeight: 700, color: seoDescription.length > DESC_MAX ? 'var(--error)' : 'var(--gold-ink)' }}>
            {seoDescription.length} / 160 Chars (Target: 150–160)
          </span>
        </div>
        <textarea
          id="seo_description_input"
          className="cult-input"
          value={seoDescription}
          onChange={(e) => setSeoDescription(e.target.value)}
          rows={3}
          placeholder="Buy genuine Kashmir Willow cricket bat at Oriental Sports Camp Pune. Engineered for match power with Sarawak cane shock absorption handle."
          style={{ width: '100%', fontSize: 13.5, lineHeight: 1.5, resize: 'vertical' }}
        />
      </div>

      {/* Keywords Management */}
      <div className="form-row" style={{ marginTop: 18 }}>
        <div>
          <label htmlFor="primary_keyword_input">Primary Focus Keyword</label>
          <input
            id="primary_keyword_input"
            className="cult-input"
            value={primaryKeyword}
            onChange={(e) => setPrimaryKeyword(e.target.value)}
            placeholder="e.g. cricket bat pune"
            style={{ width: '100%', fontSize: 13.5 }}
          />
        </div>

        <div>
          <label htmlFor="secondary_keyword_input">Secondary Intent Keywords</label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--paper)',
              border: '1px solid rgba(17,17,17,0.1)',
              borderRadius: 9999,
              padding: '3px 4px 3px 14px',
              boxShadow: '0 2px 8px rgba(17,17,17,0.02)',
            }}
          >
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
              placeholder="Type keyword and press Enter..."
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
              onClick={addSecondaryKeyword}
              style={{
                borderRadius: 9999,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 700,
                background: 'var(--ink)',
                color: 'var(--ivory)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Keywords Chips */}
      {secondaryKeywords.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {secondaryKeywords.map((k) => (
            <span
              key={k}
              style={{
                background: 'var(--stone)',
                border: '1px solid rgba(17,17,17,0.08)',
                borderRadius: 9999,
                padding: '4px 12px',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--ink)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 1px 4px rgba(17,17,17,0.02)',
              }}
            >
              <span>{k}</span>
              <button
                type="button"
                onClick={() => removeSecondaryKeyword(k)}
                style={{
                  minHeight: 18,
                  width: 18,
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--subtle)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                }}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* OpenGraph Titles */}
      <div className="form-row" style={{ marginTop: 20 }}>
        <div>
          <label htmlFor="og_title_input">OpenGraph Social Title</label>
          <input
            id="og_title_input"
            className="cult-input"
            value={ogTitle}
            onChange={(e) => setOgTitle(e.target.value)}
            placeholder="Defaults to SEO Title if empty"
            style={{ width: '100%', fontSize: 13.5 }}
          />
        </div>
        <div>
          <label htmlFor="og_description_input">OpenGraph Social Description</label>
          <input
            id="og_description_input"
            className="cult-input"
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
            placeholder="Defaults to Meta Description if empty"
            style={{ width: '100%', fontSize: 13.5 }}
          />
        </div>
      </div>

      {/* Interactive Google SERP & Social Preview Card (Skiper / Cult style) */}
      <div style={{ marginTop: 28, paddingTop: 22, borderTop: '1px solid rgba(17,17,17,0.06)' }}>
        <div style={{ marginBottom: 14 }}>
          <h4 style={{ margin: 0, fontSize: 14.5, fontWeight: 800 }}>Search Engine Result Preview (Google SERP)</h4>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 16,
            padding: '18px 22px',
            maxWidth: 620,
            boxShadow: '0 4px 18px rgba(32, 33, 36, 0.06)',
            fontFamily: 'arial, sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: '#111111',
                color: '#ffffff',
                display: 'grid',
                placeItems: 'center',
                fontSize: 12,
                fontWeight: 900,
              }}
            >
              O
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#202124', fontWeight: 600, lineHeight: 1.2 }}>Oriental Sports Pune</div>
              <div style={{ fontSize: 11.5, color: '#5f6368', lineHeight: 1.2 }}>{previewUrl}</div>
            </div>
          </div>

          <div style={{ fontSize: 18, color: '#1a0dab', fontWeight: 500, lineHeight: 1.3, marginBottom: 6, cursor: 'pointer' }}>
            {seoTitle || `${name} | Oriental Sports Pune`}
          </div>

          <div style={{ fontSize: 13.5, color: '#4d5156', lineHeight: 1.5 }}>
            {seoDescription || description || 'Authentic sports equipment, verified match gear, and turnkey sports infrastructure in Camp Pune.'}
          </div>
        </div>
      </div>

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
      return 'SEO Title Tag';
    case 'seoDescription':
      return 'Meta Description';
    case 'ogTitle':
      return 'OpenGraph Title';
    case 'ogDescription':
      return 'OpenGraph Description';
  }
}
