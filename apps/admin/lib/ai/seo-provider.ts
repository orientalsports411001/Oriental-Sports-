import 'server-only';

/**
 * AI-assisted SEO suggestion generation for the product SEO editor.
 *
 * Kept behind a small interface (`SeoProvider`) so the Server Action that
 * calls this can be exercised in a local test script with a fake
 * implementation (malformed JSON, timeout, etc.) without hitting the real
 * Anthropic API or needing a key.
 */

export type SeoSuggestionInput = {
  name: string;
  brand: string | null;
  categoryName: string | null;
  description: string | null;
  price: number;
  sizes?: string[] | null;
  variants?: unknown[] | null;
  imageUrls: string[];
};

export type SeoSuggestions = {
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  imageAltTexts: Record<string, string>;
};

export type SeoProviderError =
  | { kind: 'missing_api_key'; message: string }
  | { kind: 'timeout'; message: string }
  | { kind: 'rate_limited'; message: string }
  | { kind: 'http_error'; message: string; status?: number }
  | { kind: 'malformed_response'; message: string };

export type SeoProviderResult =
  | { ok: true; suggestions: SeoSuggestions }
  | { ok: false; error: SeoProviderError };

export interface SeoProvider {
  generateSeoSuggestions(input: SeoSuggestionInput): Promise<SeoProviderResult>;
}

const DEFAULT_MODEL = 'claude-haiku-5-5';
const REQUEST_TIMEOUT_MS = 20_000;

/**
 * Hand-written type guard — no zod dependency exists anywhere in this repo,
 * so one isn't being added just for this. Rejects malformed AI output rather
 * than silently accepting it.
 */
export function isSeoSuggestions(value: unknown): value is SeoSuggestions {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;

  if (typeof v.seoTitle !== 'string') return false;
  if (typeof v.seoDescription !== 'string') return false;
  if (typeof v.primaryKeyword !== 'string') return false;
  if (typeof v.ogTitle !== 'string') return false;
  if (typeof v.ogDescription !== 'string') return false;

  if (!Array.isArray(v.secondaryKeywords) || !v.secondaryKeywords.every((k) => typeof k === 'string')) {
    return false;
  }

  if (
    typeof v.imageAltTexts !== 'object' ||
    v.imageAltTexts === null ||
    Array.isArray(v.imageAltTexts)
  ) {
    return false;
  }
  const altTexts = v.imageAltTexts as Record<string, unknown>;
  for (const key of Object.keys(altTexts)) {
    if (typeof altTexts[key] !== 'string') return false;
  }

  return true;
}

/** Extracts the first top-level JSON object from a string, if present. */
function extractJsonObject(text: string): string | null {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}

function buildPrompt(input: SeoSuggestionInput): string {
  const specsLines: string[] = [];
  if (input.sizes && input.sizes.length > 0) {
    specsLines.push(`Sizes: ${input.sizes.join(', ')}`);
  }
  if (input.variants && Array.isArray(input.variants) && input.variants.length > 0) {
    specsLines.push(`Variants: ${JSON.stringify(input.variants)}`);
  }

  return `You are writing e-commerce SEO metadata for a real sports-goods product. Use ONLY the facts given below — never invent technical specifications, certifications, materials, or claims that are not present in this data. Do not keyword-stuff.

Product name: ${input.name}
Brand: ${input.brand || 'Not specified'}
Category: ${input.categoryName || 'Not specified'}
Price: INR ${input.price}
Description: ${input.description || 'Not specified'}
${specsLines.length > 0 ? specsLines.join('\n') : ''}
Product image URLs (write one short, literal, descriptive alt text per image, based only on the product name/category/description — do not guess visual details you cannot know):
${input.imageUrls.length > 0 ? input.imageUrls.map((u) => `- ${u}`).join('\n') : '(no images)'}

Return ONLY a single JSON object, no markdown fences, no commentary, with exactly this shape:
{
  "seoTitle": string (ideally 50-60 characters, include the product name),
  "seoDescription": string (ideally 150-160 characters, factual summary with a soft call to action),
  "primaryKeyword": string (the single most relevant search term for this product),
  "secondaryKeywords": string[] (3-6 related search terms, no duplicates of the primary keyword),
  "ogTitle": string (can match seoTitle or be a slightly more social-friendly variant),
  "ogDescription": string (can match seoDescription or be a slightly more social-friendly variant),
  "imageAltTexts": object mapping each given image URL (exact string) to a short alt text string
}`;
}

class AnthropicSeoProvider implements SeoProvider {
  async generateSeoSuggestions(input: SeoSuggestionInput): Promise<SeoProviderResult> {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return {
        ok: false,
        error: {
          kind: 'missing_api_key',
          message: 'AI SEO generation needs ANTHROPIC_API_KEY configured.',
        },
      };
    }

    const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 1024,
          messages: [{ role: 'user', content: buildPrompt(input) }],
        }),
        signal: controller.signal,
      });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return {
          ok: false,
          error: { kind: 'timeout', message: 'AI SEO generation timed out. Please try again.' },
        };
      }
      return {
        ok: false,
        error: {
          kind: 'http_error',
          message: `Could not reach the AI service: ${err instanceof Error ? err.message : 'unknown error'}`,
        },
      };
    } finally {
      clearTimeout(timeout);
    }

    if (response.status === 429) {
      return {
        ok: false,
        error: { kind: 'rate_limited', message: 'AI service is rate-limited right now — please try again shortly.' },
      };
    }

    if (!response.ok) {
      let detail = '';
      try {
        detail = await response.text();
      } catch {
        // ignore
      }
      return {
        ok: false,
        error: {
          kind: 'http_error',
          status: response.status,
          message: `AI service returned an error (${response.status})${detail ? `: ${detail.slice(0, 300)}` : ''}`,
        },
      };
    }

    let body: unknown;
    try {
      body = await response.json();
    } catch {
      return {
        ok: false,
        error: { kind: 'malformed_response', message: 'AI service returned a response that was not valid JSON.' },
      };
    }

    const content = (body as { content?: Array<{ type?: string; text?: string }> })?.content;
    const textBlock = Array.isArray(content) ? content.find((c) => c.type === 'text') : undefined;
    const text = textBlock?.text;

    if (typeof text !== 'string' || !text.trim()) {
      return {
        ok: false,
        error: { kind: 'malformed_response', message: 'AI service response did not contain any text content.' },
      };
    }

    const jsonSlice = extractJsonObject(text);
    if (!jsonSlice) {
      return {
        ok: false,
        error: { kind: 'malformed_response', message: 'Could not find a JSON object in the AI response.' },
      };
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonSlice);
    } catch {
      return {
        ok: false,
        error: { kind: 'malformed_response', message: 'AI response JSON was malformed and could not be parsed.' },
      };
    }

    if (!isSeoSuggestions(parsed)) {
      return {
        ok: false,
        error: { kind: 'malformed_response', message: 'AI response did not match the expected SEO suggestions shape.' },
      };
    }

    return { ok: true, suggestions: parsed };
  }
}

let providerOverride: SeoProvider | null = null;

/** Test-only hook — lets a local script inject a fake provider. Never used in request code paths unless explicitly set. */
export function __setSeoProviderForTesting(provider: SeoProvider | null) {
  providerOverride = provider;
}

export function getSeoProvider(): SeoProvider {
  return providerOverride ?? new AnthropicSeoProvider();
}
