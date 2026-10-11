/**
 * Image library for Oriental Sports.
 *
 * Every entry carries honest alt text and a focal point so crops can be
 * art-directed per breakpoint. Local photographs are served as WebP at two
 * widths; Unsplash photographs use the CDN's width parameter for srcset.
 * No image here is presented as an Oriental Sports project or the store itself.
 */

export interface MediaImage {
  src: string;
  srcSet?: string;
  alt: string;
  /** CSS object-position — where the subject sits in the frame. */
  position?: string;
}

const local = (path: string, alt: string, widths: [number, number], position = 'center'): MediaImage => ({
  src: `${path}.webp`,
  srcSet: `${path}-sm.webp ${widths[0]}w, ${path}.webp ${widths[1]}w`,
  alt,
  position,
});

export const unsplashUrl = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;

const unsplash = (id: string, alt: string, position = 'center'): MediaImage => ({
  src: unsplashUrl(id, 1400),
  srcSet: [480, 800, 1200, 1800].map((w) => `${unsplashUrl(id, w)} ${w}w`).join(', '),
  alt,
  position,
});

export const IMAGES = {
  // ---- Local photography ----------------------------------------------------
  badmintonSmash: local('/images/hero/hero_train_perform', 'Badminton player jumping for a smash under arena lights', [800, 1376], '72% 30%'),
  courtDusk: local('/images/hero/hero_court_build', 'Floodlit outdoor hard court at dusk, fenced on all sides', [640, 992], '58% 55%'),
  athleteBatRacquet: local('/images/hero/hero_gear_pune', 'Player holding a cricket bat and a tennis racquet on a floodlit court', [800, 1376], '70% 35%'),
  pickleballNet: local('/images/categories/pickleball_category', 'Pickleball paddle and ball beside the net on a blue court', [700, 1200], '55% 70%'),

  // ---- Sport photography (Unsplash) -----------------------------------------
  cricketStrike: unsplash('1593341646782-e0b495cff86d', 'Batsman driving a cricket ball, dust flying off the pitch', 'center 40%'),
  cricketStadium: unsplash('1540747913346-19e32dc3e97e', 'Cricket stadium under floodlights during an evening match'),
  cricketBall: unsplash('1690111354184-cceee42df518', 'Worn red leather cricket ball on grass'),
  tennisClay: unsplash('1554068865-24cecd4e34b8', 'Overhead view of a player serving on a red clay tennis court'),
  tennisGrass: unsplash('1622279457486-62dcc4a431d6', 'Player hitting a forehand on an outdoor tennis court'),
  badmintonHall: unsplash('1626224583764-f87db24ac4ea', 'Badminton player leaping for a shot in an indoor hall', 'center 35%'),
  pickleballCorner: unsplash('1711996151738-657bd95b7cdb', 'Pickleball resting in the corner of a blue and green court'),
  pickleballPaddles: unsplash('1693142518820-78d7a05f1546', 'Two pickleball paddles and balls at the net'),
  tableTennisHall: unsplash('1511067007398-7e4b90cfa4bc', 'Table tennis tables in a dark club hall'),
  tableTennisBat: unsplash('1534158914592-062992fbe900', 'Table tennis bat resting on a green table'),
  squashPlayer: unsplash('1554290813-ec6a2a72e5c7', 'Squash player reaching for a shot inside a court, black and white'),
  squashCourts: unsplash('1711294545092-303f7161017c', 'Row of glass-backed squash courts with timber floors', 'center 60%'),
  fitnessBarbell: unsplash('1574680096145-d05b474e2155', 'Athlete holding a barbell across the shoulders, black and white'),
  fitnessDumbbells: unsplash('1584735935682-2f2b69dff9d2', 'Dumbbells and resistance bands on a wooden floor'),
  carromPlay: unsplash('1768518354646-33833e95a24d', 'Group of men gathered around a carrom board game'),
  carromBoard: unsplash('1652558973183-a3f046921163', 'Carrom board with coins and striker, close up'),
  volleyballSunset: unsplash('1612872087720-bb876e2e67d1', 'Beach volleyball players silhouetted at sunset'),
  volleyballBall: unsplash('1592656094267-764a45160876', 'Volleyball on sand in front of the net'),
  kitBag: unsplash('1672223303533-05fddcbf6e6c', 'Racquet kit bag lying on a blue court with tennis balls'),
  turfFootball: unsplash('1574629810360-7efbbe195018', 'Football at a player’s feet on synthetic turf'),

  // ---- Court surfaces (material close-ups) ---------------------------------
  surfaceBlueLines: unsplash('1552741775-7817c0c85843', 'White line markings on a blue acrylic court'),
  surfaceNet: unsplash('1622669253059-e345500cf0e9', 'Tennis net across a blue and green hard court'),
  surfaceClay: unsplash('1465125672495-63cdc2fa22ed', 'White line on a red clay court surface'),
  surfaceCorner: unsplash('1622668459907-f1fa3113bbcf', 'Corner of a blue court with green run-off'),
} satisfies Record<string, MediaImage>;

/** Fallback when a remote image fails — a local photo, never a remote placeholder. */
export const FALLBACK_IMAGE = '/images/hero/hero_court_build-sm.webp';

/** Legacy keys kept for pages that still reference MEDIA. */
export const MEDIA = {
  heroSlide1: IMAGES.badmintonSmash.src,
  heroSlide2: IMAGES.courtDusk.src,
  heroSlide3: IMAGES.courtDusk.src,
  heroSports: IMAGES.badmintonSmash.src,
  heroSportsMobile: IMAGES.badmintonSmash.src,
  fallbackImage: FALLBACK_IMAGE,
  shopPillar: IMAGES.badmintonSmash.src,
  buildPillar: IMAGES.courtDusk.src,
  cricketHero: IMAGES.cricketStadium.src,
  tennisHero: IMAGES.tennisClay.src,
  pickleballHero: IMAGES.pickleballNet.src,
  badmintonHero: IMAGES.badmintonHall.src,
  tableTennisHero: IMAGES.tableTennisHall.src,
  squashHero: IMAGES.squashPlayer.src,
  fitnessHero: IMAGES.fitnessBarbell.src,
  recreationHero: IMAGES.carromPlay.src,
  accessoriesHero: IMAGES.kitBag.src,
  puneCampExterior: IMAGES.courtDusk.src,
};
