-- Cloudinary image management: track each uploaded image's Cloudinary
-- public_id alongside the delivery URL already stored in products.images,
-- so the admin app can call Cloudinary's destroy API when an image is
-- removed instead of only dropping it from the array.
--
-- Keyed by delivery URL (the same string stored in products.images and used
-- as the key into products.image_alt_text) -> Cloudinary public_id. Local
-- "/images/..." entries are never present as keys here — they are not
-- Cloudinary assets and have nothing to delete remotely.
alter table public.products
  add column if not exists cloudinary_public_ids jsonb default '{}'::jsonb;
