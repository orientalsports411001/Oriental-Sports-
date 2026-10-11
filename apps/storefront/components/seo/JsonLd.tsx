/**
 * Renders one or more Schema.org structured-data blocks as
 * <script type="application/ld+json"> tags. Server component — no 'use client'.
 * Pass real data only; callers must omit fields they can't back with a DB value
 * rather than inventing one (see AGENTS.md: zero fabricated claims).
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
