export default function AdminLoading() {
  return (
    <div className="admin-loading" role="status" aria-label="Loading page">
      <div className="admin-skeleton admin-skeleton-title" />
      <div className="admin-skeleton-grid">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="admin-skeleton admin-skeleton-tile" />
        ))}
      </div>
      <div className="admin-skeleton admin-skeleton-panel" />
    </div>
  );
}
