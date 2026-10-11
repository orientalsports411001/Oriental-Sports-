import { Product } from '../types';

/**
 * Gym Equipment — treadmills from "Gym Equipments.xlsx" (sheets "Commercial
 * Treadmill" and "Domestic Treadmill"). Names, descriptions and MRP are copied
 * from the workbook. Nothing else is stated: no dimensions, speeds, warranty,
 * stock or discounts, because the workbook does not list them.
 * Images are the original embedded workbook images, mapped by sheet row
 * (see /images/products/gym-equipment/image_manifest.json).
 */

type Kind = 'commercial' | 'domestic';

interface Row {
  /** Workbook sheet row — kept so the image mapping can be audited. */
  row: number;
  name: string;
  /** Description column, verbatim. Empty when the workbook leaves it blank. */
  listed: string;
  mrp: number;
  slug: string;
  /** Manufacturer exactly as written in the product name. Commercial rows name none. */
  brand?: string;
  /** Motor part of the listing, when the description holds one. */
  motor?: string;
}

const KINDS = {
  commercial: { subcategory: 'commercial-treadmills', subcategoryName: 'Commercial Treadmills', label: 'Commercial treadmill' },
  domestic: { subcategory: 'domestic-treadmills', subcategoryName: 'Domestic Treadmills', label: 'Domestic treadmill' },
} as const;

const MISSING = 'Specifications for this model are not listed yet. Ask the Camp store for details.';

const build = (kind: Kind, r: Row): Product => {
  const k = KINDS[kind];
  const specs: Record<string, string> = {};
  if (r.brand) specs['Manufacturer'] = r.brand;
  specs['Type'] = k.label;
  specs['Model'] = r.name.replace(/\s*(Light\s+)?(Commercial\s+)?(Curve\s+)?Treadmill.*$/i, '').trim();
  if (r.motor) specs['Motor'] = r.motor;
  if (r.listed && r.listed !== r.motor) specs['Also listed'] = r.listed.replace(r.motor ?? '', '').trim();
  specs['Quantity'] = '1 Nos';
  specs['MRP'] = `₹${r.mrp.toLocaleString('en-IN')}`;

  return {
    id: `prod-gym-${r.slug}`,
    slug: r.slug,
    name: r.name,
    category: 'gym-equipment',
    categoryName: 'Gym Equipment',
    subcategory: k.subcategory,
    subcategoryName: k.subcategoryName,
    productType: 'treadmill',
    brand: r.brand ?? '',
    price: r.mrp,
    currency: 'INR',
    quantityUnit: '1 Nos',
    priceLabel: 'MRP',
    availabilityNote: 'Availability on request from the Camp store',
    rating: 0,
    reviewsCount: 0,
    inStock: true,
    images: [`/images/products/gym-equipment/${r.slug}.jpeg`],
    description: r.listed || MISSING,
    features: [],
    specs,
    seoTitle: `${r.name} | Oriental Sports Pune`,
    seoDescription: `${r.name}${r.listed ? ` — ${r.listed}` : ''}. MRP ₹${r.mrp.toLocaleString('en-IN')}. Oriental Sports, MG Road, Camp, Pune.`,
  };
};

const COMMERCIAL: Row[] = [
  { row: 7, name: 'Genesis 9i Commercial Treadmill', listed: '5HP AC Motor 27"', motor: '5HP AC Motor', mrp: 525000, slug: 'genesis-9i-commercial-treadmill' },
  { row: 17, name: 'T-3300 Commercial Treadmill', listed: '5HP AC Motor', motor: '5HP AC Motor', mrp: 350000, slug: 't-3300-commercial-treadmill' },
  { row: 28, name: 'T-1212 Commercial Treadmill', listed: '5HP AC Motor', motor: '5HP AC Motor', mrp: 262500, slug: 't-1212-commercial-treadmill' },
  { row: 39, name: 'Q3 Light Commercial Treadmill', listed: '3HP AC Motor', motor: '3HP AC Motor', mrp: 156250, slug: 'q3-light-commercial-treadmill' },
  { row: 50, name: 'X10 Light Commercial Treadmill', listed: '4HP AC Motor', motor: '4HP AC Motor', mrp: 243750, slug: 'x10-light-commercial-treadmill' },
  { row: 62, name: 'Q5 Light Commercial Treadmill', listed: '4HP AC Motor', motor: '4HP AC Motor', mrp: 202500, slug: 'q5-light-commercial-treadmill' },
  { row: 74, name: 'T-6666 Curve Treadmill', listed: '', mrp: 337500, slug: 't-6666-curve-treadmill' },
  { row: 86, name: 'T-6262 Curve Treadmill', listed: '', mrp: 190000, slug: 't-6262-curve-treadmill' },
  { row: 98, name: 'Q8 Commercial Treadmill', listed: '5HP AC Motor', motor: '5HP AC Motor', mrp: 262500, slug: 'q8-commercial-treadmill' },
  { row: 110, name: 'Q7 Commercial Treadmill', listed: '4.5HP AC Motor', motor: '4.5HP AC Motor', mrp: 231250, slug: 'q7-commercial-treadmill' },
];

const DOMESTIC: Row[] = [
  { row: 8, name: 'T-102 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2HP DC Motor', motor: '2HP DC Motor', mrp: 75000, slug: 't-102-treadmill-vivafitness' },
  { row: 18, name: 'T-415 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.25HP Motor', motor: '2.25HP Motor', mrp: 85000, slug: 't-415-treadmill-vivafitness' },
  { row: 29, name: 'T-425 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.25HP Motor', motor: '2.25HP Motor', mrp: 92500, slug: 't-425-treadmill-vivafitness' },
  { row: 40, name: 'T-902 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.5HP AC Motor', motor: '2.5HP AC Motor', mrp: 116250, slug: 't-902-treadmill-vivafitness' },
  { row: 51, name: 'T-906 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.5HP AC Motor', motor: '2.5HP AC Motor', mrp: 137500, slug: 't-906-treadmill-vivafitness' },
  { row: 63, name: 'T-911 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.5HP AC Motor', motor: '2.5HP AC Motor', mrp: 152500, slug: 't-911-treadmill-vivafitness' },
  { row: 75, name: 'T-145 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.25HP DC Motor', motor: '2.25HP DC Motor', mrp: 72500, slug: 't-145-treadmill-vivafitness' },
  { row: 87, name: 'T-19 Treadmill (Adidas)', brand: 'Adidas', listed: '4HP Motor', motor: '4HP Motor', mrp: 89900, slug: 't-19-treadmill-adidas' },
];

export const GYM_PRODUCTS: Product[] = [
  ...COMMERCIAL.map((r) => build('commercial', r)),
  ...DOMESTIC.map((r) => build('domestic', r)),
];
