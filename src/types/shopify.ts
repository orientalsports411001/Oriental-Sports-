/**
 * TypeScript definitions for Shopify Storefront API (GraphQL).
 */

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariantNode {
  id: string;
  title: string;
  availableForSale: boolean;
  sku?: string | null;
  price: ShopifyPrice;
  compareAtPrice?: ShopifyPrice | null;
  selectedOptions?: ShopifySelectedOption[];
  image?: ShopifyImage | null;
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  productType?: string;
  vendor?: string;
  tags?: string[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice?: ShopifyPrice;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyPrice;
  };
  featuredImage?: ShopifyImage | null;
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyProductVariantNode;
    }>;
  };
}

export interface ShopifyCollectionNode {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: ShopifyImage | null;
  products?: {
    edges: Array<{
      node: ShopifyProductNode;
    }>;
  };
}

export interface ShopifyCartLineInput {
  merchandiseId: string; // The Shopify Variant GID (gid://shopify/ProductVariant/...)
  quantity: number;
  attributes?: Array<{ key: string; value: string }>;
}

export interface ShopifyCartLineUpdateInput {
  id: string; // The Shopify Cart Line GID
  quantity: number;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount?: ShopifyPrice;
  };
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      handle: string;
      featuredImage?: ShopifyImage | null;
    };
    price: ShopifyPrice;
    image?: ShopifyImage | null;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyPrice;
    totalAmount: ShopifyPrice;
    totalTaxAmount?: ShopifyPrice | null;
    totalDutyAmount?: ShopifyPrice | null;
  };
  discountCodes?: Array<{
    code: string;
    applicable: boolean;
  }>;
  lines: {
    edges: Array<{
      node: ShopifyCartLine;
    }>;
  };
}
