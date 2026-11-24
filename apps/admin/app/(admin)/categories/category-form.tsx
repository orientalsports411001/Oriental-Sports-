type CategoryFormValues = {
  id?: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  sort_order: number;
  enquire_whatsapp?: boolean;
};

export function CategoryForm({
  category,
  action,
  error,
}: {
  category?: Partial<CategoryFormValues>;
  action: (formData: FormData) => void;
  error?: string;
}) {
  return (
    <form action={action}>
      {error && <p className="error">{error}</p>}

      <div className="form-row">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" defaultValue={category?.name || ''} required style={{ width: '100%' }} />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input id="slug" name="slug" defaultValue={category?.slug || ''} required style={{ width: '100%' }} />
        </div>
      </div>

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" defaultValue={category?.description || ''} rows={3} style={{ width: '100%' }} />

      <div className="form-row">
        <div>
          <label htmlFor="image">Image URL</label>
          <input id="image" name="image" defaultValue={category?.image || ''} style={{ width: '100%' }} />
        </div>
        <div>
          <label htmlFor="sort_order">Sort order</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={category?.sort_order ?? 0} style={{ width: '100%' }} />
        </div>
      </div>

      <label
        htmlFor="enquire_whatsapp"
        style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 20, minHeight: 44, cursor: 'pointer', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}
      >
        <input
          id="enquire_whatsapp"
          name="enquire_whatsapp"
          type="checkbox"
          defaultChecked={category?.enquire_whatsapp ?? false}
          style={{ width: 20, height: 20, marginTop: 2, flexShrink: 0 }}
        />
        <span>
          <strong>Enquire on WhatsApp instead of Add to bag</strong>
          <br />
          <span style={{ fontSize: 13, opacity: 0.75 }}>
            Every product in this discipline shows an Enquire on WhatsApp button on the website. You can also tick this on a single product.
          </span>
        </span>
      </label>

      <div style={{ marginTop: 24 }}>
        <button type="submit">{category?.id ? 'Save changes' : 'Create category'}</button>
      </div>
    </form>
  );
}
