'use server';

import { redirect } from 'next/navigation';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';

function buildPayload(formData: FormData) {
  return {
    slug: String(formData.get('slug') || '').trim(),
    name: String(formData.get('name') || '').trim(),
    description: String(formData.get('description') || '').trim() || null,
    image: String(formData.get('image') || '').trim() || null,
    sort_order: Number(formData.get('sort_order') || 0),
  };
}

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const admin = createServiceRoleClient();
  const payload = buildPayload(formData);

  const { error } = await admin.from('categories').insert(payload);
  if (error) {
    redirect(`/categories/new?error=${encodeURIComponent(error.message)}`);
  }
  redirect('/categories');
}

export async function updateCategory(categoryId: string, formData: FormData) {
  await requireAdmin();
  const admin = createServiceRoleClient();
  const payload = buildPayload(formData);

  const { error } = await admin
    .from('categories')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', categoryId);

  if (error) {
    redirect(`/categories/${categoryId}/edit?error=${encodeURIComponent(error.message)}`);
  }
  redirect(`/categories/${categoryId}/edit?saved=1`);
}
