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
  },
];
