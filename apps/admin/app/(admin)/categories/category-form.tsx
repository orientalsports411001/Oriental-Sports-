type CategoryFormValues = {
  id?: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  sort_order: number;
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

      <div style={{ marginTop: 24 }}>
        <button type="submit">{category?.id ? 'Save changes' : 'Create category'}</button>
      </div>
    </form>
  );
}
