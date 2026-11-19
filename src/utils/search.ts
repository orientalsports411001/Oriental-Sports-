/**
 * Substring matching for the storefront's search boxes.
 *
 * Plain `includes()` is unforgiving about spacing, which matters here because
 * product names carry units: "Hex Dumbbells — 10 kg" would not be found by a
 * shopper typing "10kg", and "Table Tennis" would not be found by "tabletennis".
 * So a match is accepted either literally, or with spacing and dashes removed
 * from both sides.
 */
const strip = (value: string): string => value.replace(/[\s\-–—_/]+/g, '');

export function looseIncludes(haystack: string | undefined | null, needle: string): boolean {
  if (!haystack || !needle) return false;
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();
  return h.includes(n) || strip(h).includes(strip(n));
}
