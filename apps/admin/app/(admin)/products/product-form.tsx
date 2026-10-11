type ProductFormValues = {
  id?: string;
  name: string;
  slug: string;
  category_slug: string | null;
  brand: string | null;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  images: string[] | null;
  sizes: unknown[] | null;
  variants: unknown[] | null;
  stock_quantity: number;
  low_stock_threshold: number;
  status: string;
};

type Category = { slug: string; name: string };

/**
 * Shared create/edit form. A plain Server Component — it posts to a Server
 * Action (passed in as `action`), so no client-side JS is required for the
 * core create/update path.
 */
export function ProductForm({
  product,
  categories,
  action,
  error,
}: {
  product?: Partial<ProductFormValues>;
  categories: Category[];
  action: (formData: FormData) => void;
  error?: string;
}) {
  return (
    <form action={action}>
      {error && <p className="error">{error}</p>}

      <div className="form-row">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" defaultValue={product?.name || ''} required style={{ width: '100%' }} />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input id="slug" name="slug" defaultValue={product?.slug || ''} required style={{ width: '100%' }} />
        </div>
      </div>

      <div className="form-row">
        <div>
          <label htmlFor="category_slug">Category</label>
          <select id="category_slug" name="category_slug" defaultValue={product?.category_slug || ''} style={{ width: '100%' }}>
            <option value="">— none —</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <input id="brand" name="brand" defaultValue={product?.brand || ''} style={{ width: '100%' }} />
        </div>
      </div>

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" defaultValue={product?.description || ''} rows={4} style={{ width: '100%' }} />

      <div className="form-row">
        <div>
          <label htmlFor="price">Price (INR)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price ?? ''}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label htmlFor="compare_at_price">Compare-at price (optional)</label>
          <input
            id="compare_at_price"
            name="compare_at_price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.compare_at_price ?? ''}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <label htmlFor="images">Images (one URL per line)</label>
      <textarea
        id="images"
        name="images"
        defaultValue={(product?.images || []).join('\n')}
        rows={3}
        style={{ width: '100%' }}
      />

      <label htmlFor="sizes">Sizes (one per line, optional)</label>
      <textarea
        id="sizes"
        name="sizes"
        defaultValue={Array.isArray(product?.sizes) ? (product?.sizes as string[]).join('\n') : ''}
        rows={2}
        style={{ width: '100%' }}
      />

      <label htmlFor="variants">
        Variants JSON (optional — array of {'{'}id, name, price, inStock{'}'})
      </label>
      <textarea
        id="variants"
        name="variants"
        defaultValue={product?.variants ? JSON.stringify(product.variants, null, 2) : '[]'}
        rows={4}
        style={{ width: '100%', fontFamily: 'monospace' }}
      />

      <div className="form-row">
        <div>
          <label htmlFor="stock_quantity">Stock quantity</label>
          <input
            id="stock_quantity"
            name="stock_quantity"
            type="number"
            min="0"
            defaultValue={product?.stock_quantity ?? 0}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label htmlFor="low_stock_threshold">Low stock threshold</label>
          <input
            id="low_stock_threshold"
            name="low_stock_threshold"
            type="number"
            min="0"
            defaultValue={product?.low_stock_threshold ?? 5}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={product?.status || 'draft'} style={{ width: '100%' }}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <button type="submit">{product?.id ? 'Save changes' : 'Create product'}</button>
      </div>
    </form>
  );
}
