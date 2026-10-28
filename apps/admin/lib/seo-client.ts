export type SeoSuggestions = {
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  imageAltTexts: Record<string, string>;
};

export function generateClientSeoSuggestions(input: {
  name: string;
  brand?: string | null;
  categoryName?: string | null;
  description?: string | null;
  price?: number;
  imageUrls?: string[];
}): SeoSuggestions {
  const brandPart = (input.brand || '').trim() ? `${input.brand!.trim()} ` : '';
  const namePart = (input.name || 'Athletic Gear').trim();
  const catPart = (input.categoryName || '').trim() ? ` | ${input.categoryName!.trim()}` : '';

  // Target 50-60 chars for Google Title Tag
  let seoTitle = `${brandPart}${namePart}${catPart} | Oriental Sports Pune`;
  if (seoTitle.length > 60) {
    seoTitle = `${brandPart}${namePart} | Oriental Sports Pune`;
  }
  if (seoTitle.length > 60) {
    seoTitle = `${namePart} | Oriental Sports Pune`;
  }
  if (seoTitle.length > 60) {
    seoTitle = seoTitle.slice(0, 57) + '...';
  }

  // Target 150-160 chars for Meta Snippet Description
  const priceSnippet = input.price && input.price > 0 ? ` Available at INR ${input.price}.` : '';
  let seoDescription = `Buy genuine ${brandPart}${namePart} at Oriental Sports Pune.${priceSnippet} Premium tournament equipment with expert curation, verified authenticity and nationwide shipping.`;
  if (seoDescription.length > 160) {
    seoDescription = `Buy authentic ${namePart} at Oriental Sports Pune.${priceSnippet} Premium match-grade equipment with verified quality and fast nationwide shipping.`;
  }
  if (seoDescription.length > 160) {
    seoDescription = seoDescription.slice(0, 157) + '...';
  }

  const primaryKeyword = `${namePart.toLowerCase()} pune`;

  const secondaryKeywords: string[] = [
    `${namePart.toLowerCase()} online`,
    input.brand ? `${input.brand.toLowerCase()} sports gear` : 'sports equipment pune',
    input.categoryName ? `${input.categoryName.toLowerCase()} camp pune` : 'oriental sports pune',
    'authentic sports goods',
  ].filter((k, idx, arr) => k !== primaryKeyword && arr.indexOf(k) === idx);

  const ogTitle = `${brandPart}${namePart} — Official Equipment`;
  const ogDescription = `Discover genuine ${brandPart}${namePart} at Oriental Sports Pune. Built for athletes and competitive matchplay. Order online or visit our Camp store.`;

  const imageAltTexts: Record<string, string> = {};
  const urls = Array.isArray(input.imageUrls) ? input.imageUrls : [];
  for (const url of urls) {
    if (typeof url === 'string') {
      imageAltTexts[url] = `${brandPart}${namePart} official product photo — Oriental Sports Pune`;
    }
  }

  return {
    seoTitle,
    seoDescription,
    primaryKeyword,
    secondaryKeywords,
    ogTitle,
    ogDescription,
    imageAltTexts,
  };
}
