/**
 * Headless Shopify Storefront API Service Layer.
 *
 * Provides typed GraphQL queries, mutations, cart session persistence,
 * and seamless fallback to curated local sports catalog data when offline
 * or during headless transition.
 */

import { Product, SportCategory, CartItem } from '../types';
import { PRODUCTS } from '../data/products';
import {
  ShopifyProductNode,
  ShopifyCart,
  ShopifyCartLineInput,
  ShopifyCartLineUpdateInput,
} from '../types/shopify';

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-10';

export const isShopifyConfigured = (): boolean => {
  return (
    Boolean(SHOPIFY_DOMAIN) &&
    Boolean(STOREFRONT_ACCESS_TOKEN) &&
    !STOREFRONT_ACCESS_TOKEN.includes('your_public_storefront_access_token')
  );
};

const getStorefrontEndpoint = () => {
  const domain = SHOPIFY_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return `https://${domain}/api/${API_VERSION}/graphql.json`;
};

/**
 * Execute a Storefront API GraphQL query
 */
export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new Error('Shopify credentials are not configured in environment.');
  }

  const endpoint = getStorefrontEndpoint();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify API error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(`Shopify GraphQL errors: ${json.errors.map((e: any) => e.message).join(', ')}`);
  }

  return json.data as T;
}

// ============================================================================
// GraphQL Query Definitions
// ============================================================================

const PRODUCT_FRAGMENT = `
  id
  title
  handle
  description
  availableForSale
  productType
  vendor
  tags
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  featuredImage {
    url
    altText
  }
  images(first: 6) {
    edges {
      node {
        url
        altText
      }
    }
  }
  variants(first: 20) {
    edges {
      node {
        id
        title
        availableForSale
        sku
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ${PRODUCT_FRAGMENT}
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_FRAGMENT}
    }
  }
`;

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
    totalTaxAmount {
      amount
      currencyCode
    }
  }
  discountCodes {
    code
    applicable
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
            product {
              id
              title
              handle
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_DISCOUNT_MUTATION = `
  mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ${CART_FIELDS}
    }
  }
`;

// ============================================================================
// Data Adapters: Shopify GraphQL Node <-> Internal Product Model
// ============================================================================

export function mapShopifyProductToAppProduct(node: ShopifyProductNode): Product {
  const minPrice = parseFloat(node.priceRange.minVariantPrice.amount);
  const comparePrice = node.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
    : undefined;

  const images = node.images.edges.map((e) => e.node.url);
  if (images.length === 0 && node.featuredImage) {
    images.push(node.featuredImage.url);
  }

  // Derive sport category from tags or productType
  const tagList = (node.tags || []).map((t) => t.toLowerCase());
  const typeLower = (node.productType || '').toLowerCase();

  let category: SportCategory = 'accessories';
  if (typeLower.includes('cricket') || tagList.includes('cricket')) category = 'cricket';
  else if (typeLower.includes('tennis') || tagList.includes('tennis')) category = 'tennis';
  else if (typeLower.includes('pickleball') || tagList.includes('pickleball')) category = 'pickleball';
  else if (typeLower.includes('badminton') || tagList.includes('badminton')) category = 'badminton';
  else if (typeLower.includes('table tennis') || tagList.includes('table-tennis')) category = 'table-tennis';
  else if (typeLower.includes('squash') || tagList.includes('squash')) category = 'squash';
  else if (typeLower.includes('fitness') || tagList.includes('fitness')) category = 'fitness';
  else if (typeLower.includes('volleyball') || tagList.includes('volleyball')) category = 'volleyball';
  else if (typeLower.includes('carrom') || typeLower.includes('recreation')) category = 'recreation';

  const categoryNameMap: Record<SportCategory, string> = {
    cricket: 'Cricket',
    football: 'Football',
    tennis: 'Tennis',
    pickleball: 'Pickleball',
    badminton: 'Badminton',
    'table-tennis': 'Table Tennis',
    squash: 'Squash',
    fitness: 'Fitness & Conditioning',
    'gym-equipment': 'Gym Equipment',
    volleyball: 'Volleyball',
    recreation: 'Recreation & Board Sports',
    accessories: 'Accessories & Protection',
  };

  const variants = node.variants.edges.map(({ node: v }) => ({
    id: v.id,
    name: v.title === 'Default Title' ? 'Standard' : v.title,
    inStock: v.availableForSale,
    priceDelta: parseFloat(v.price.amount) - minPrice,
    shopifyVariantId: v.id,
    sku: v.sku || undefined,
  }));

  const defaultVariantId = node.variants.edges[0]?.node?.id;

  return {
    id: node.id,
    shopifyId: node.id,
    shopifyVariantId: defaultVariantId,
    handle: node.handle,
    slug: node.handle,
    name: node.title,
    category,
    categoryName: categoryNameMap[category] || 'Equipment',
    brand: node.vendor || 'Oriental Sports',
    price: minPrice,
    originalPrice: comparePrice && comparePrice > minPrice ? comparePrice : undefined,
    rating: 4.9,
    reviewsCount: 14,
    badge: node.tags?.includes('bestseller') ? 'BESTSELLER' : undefined,
    images: images.length > 0 ? images : ['/images/hero/hero_court_build.webp'],
    description: node.description || 'Verified match-grade sports equipment from Oriental Sports Pune.',
    features: [
      'Authentic certified inventory from Pune Camp store',
      'Immediate in-store verification & warranty support',
    ],
    specs: {
      Origin: 'Oriental Sports Camp, Pune',
      Discipline: categoryNameMap[category],
    },
    variants,
    productType: 'gear',
    inStock: node.availableForSale,
    isFeatured: node.tags?.includes('featured') || false,
  };
}

// ============================================================================
// Public Catalog API
// ============================================================================

export async function getShopifyProducts(limit = 50): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return PRODUCTS;
  }

  try {
    const data = await shopifyFetch<{
      products: { edges: Array<{ node: ShopifyProductNode }> };
    }>({
      query: PRODUCTS_QUERY,
      variables: { first: limit },
    });

    return data.products.edges.map((e) => mapShopifyProductToAppProduct(e.node));
  } catch (error) {
    console.warn('[Shopify Service] Failed to fetch live products, using fallback:', error);
    return PRODUCTS;
  }
}

export async function getShopifyProductByHandle(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured()) {
    return PRODUCTS.find((p) => p.slug === handle || p.handle === handle) || null;
  }

  try {
    const data = await shopifyFetch<{ product: ShopifyProductNode | null }>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });

    if (!data.product) {
      return PRODUCTS.find((p) => p.slug === handle) || null;
    }

    return mapShopifyProductToAppProduct(data.product);
  } catch (error) {
    console.warn('[Shopify Service] Error fetching product by handle, using fallback:', error);
    return PRODUCTS.find((p) => p.slug === handle) || null;
  }
}

// ============================================================================
// Headless Shopify Cart API
// ============================================================================

export async function createShopifyCart(lines: ShopifyCartLineInput[] = []): Promise<ShopifyCart | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const data = await shopifyFetch<{
      cartCreate: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
    }>({
      query: CART_CREATE_MUTATION,
      variables: { input: { lines } },
    });

    if (data.cartCreate.userErrors.length > 0) {
      console.error('[Shopify Cart] userErrors:', data.cartCreate.userErrors);
    }
    return data.cartCreate.cart;
  } catch (err) {
    console.warn('[Shopify Cart] Failed to create cart:', err);
    return null;
  }
}

export async function addLinesToShopifyCart(
  cartId: string,
  lines: ShopifyCartLineInput[]
): Promise<ShopifyCart | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const data = await shopifyFetch<{
      cartLinesAdd: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
    }>({
      query: CART_LINES_ADD_MUTATION,
      variables: { cartId, lines },
    });
    return data.cartLinesAdd.cart;
  } catch (err) {
    console.warn('[Shopify Cart] Failed to add lines:', err);
    return null;
  }
}

export async function updateShopifyCartLines(
  cartId: string,
  lines: ShopifyCartLineUpdateInput[]
): Promise<ShopifyCart | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const data = await shopifyFetch<{
      cartLinesUpdate: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
    }>({
      query: CART_LINES_UPDATE_MUTATION,
      variables: { cartId, lines },
    });
    return data.cartLinesUpdate.cart;
  } catch (err) {
    console.warn('[Shopify Cart] Failed to update lines:', err);
    return null;
  }
}

export async function removeShopifyCartLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const data = await shopifyFetch<{
      cartLinesRemove: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
    }>({
      query: CART_LINES_REMOVE_MUTATION,
      variables: { cartId, lineIds },
    });
    return data.cartLinesRemove.cart;
  } catch (err) {
    console.warn('[Shopify Cart] Failed to remove lines:', err);
    return null;
  }
}

export async function applyShopifyDiscount(
  cartId: string,
  discountCode: string
): Promise<ShopifyCart | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const data = await shopifyFetch<{
      cartDiscountCodesUpdate: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
    }>({
      query: CART_DISCOUNT_MUTATION,
      variables: { cartId, discountCodes: [discountCode] },
    });
    return data.cartDiscountCodesUpdate.cart;
  } catch (err) {
    console.warn('[Shopify Cart] Failed to apply discount:', err);
    return null;
  }
}

export async function fetchShopifyCart(cartId: string): Promise<ShopifyCart | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
      query: GET_CART_QUERY,
      variables: { cartId },
    });
    return data.cart;
  } catch (err) {
    console.warn('[Shopify Cart] Failed to fetch cart:', err);
    return null;
  }
}
