/**
 * Partner brands shown in the homepage "Partner brands" band.
 *
 * To add a partner: drop its logo (WebP with transparent background, dark
 * artwork — the logo sits on an ivory plate) in public/images/partners/,
 * then add one entry below. The grid reflows on its own.
 */
export interface PartnerBrand {
  id: string;
  name: string;
  /** Brand website. Opens in a new tab. */
  url: string;
  /** Hostname shown under the logo so the link is never a mystery. */
  displayUrl: string;
  /** 900px-wide logo. */
  logo: string;
  /** 450px-wide logo, used by srcset on small screens. */
  logoSmall: string;
  logoWidth: number;
  logoHeight: number;
  /** One or two plain sentences on what the brand makes, taken from the brand's own site. */
  summary: string;
  /** Exact `brand` value on shop products, so "See it in the shop" opens the brand filter. Leave out when the shop lists none. */
  shopBrand?: string;
}

export const PARTNER_BRANDS: PartnerBrand[] = [
  {
    id: 'body-solid',
    name: 'Body-Solid',
    url: 'https://bodysolid.com/',
    displayUrl: 'bodysolid.com',
    logo: '/images/partners/body-solid.webp',
    logoSmall: '/images/partners/body-solid-sm.webp',
    logoWidth: 900,
    logoHeight: 165,
    summary:
      'Strength, cardio and functional training equipment for home gyms and commercial gyms. The full range is on the brand\u2019s own site.',
  },
  {
    id: 'viva-fitness',
    name: 'Viva Fitness',
    url: 'https://www.vivafitness.net/',
    displayUrl: 'vivafitness.net',
    logo: '/images/partners/viva-fitness.webp',
    logoSmall: '/images/partners/viva-fitness-sm.webp',
    logoWidth: 855,
    logoHeight: 275,
    summary:
      'An Indian fitness equipment brand with commercial and home ranges: treadmills, elliptical trainers, bikes, rowers and strength training.',
    shopBrand: 'Vivafitness',
  },
  {
    id: 'cougar-sports',
    name: 'Cougar Sports',
    url: 'https://cougarsports.in/',
    displayUrl: 'cougarsports.in',
    logo: '/images/partners/cougar-sports.webp',
    logoSmall: '/images/partners/cougar-sports-sm.webp',
    logoWidth: 564,
    logoHeight: 222,
    summary:
      'Sold by NATSPO Industries Pvt Ltd and shipped across India. The range covers strength and weights, core training, flexibility, home fitness and speed training, plus accessories for football, cricket, table tennis, skating and swimming.',
    shopBrand: 'Cougar',
  },
];
