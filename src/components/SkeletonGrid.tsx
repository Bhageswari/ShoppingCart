export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="cart-grid" aria-busy="true" aria-label="Loading cart items">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="product-card"
          style={{ minHeight: 'calc(var(--card-min-width) * 0.55)' }}
          aria-hidden="true"
        >
          <div className="skeleton h-4 w-3/4 mb-1" />
          <div className="skeleton h-3 w-1/2" />
          <div className="skeleton h-4 w-1/3 mt-auto" />
          <div className="skeleton h-7 w-20 self-end rounded" />
        </div>
      ))}
    </div>
  );
}
