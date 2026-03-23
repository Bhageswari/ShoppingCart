export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      className="px-5 grid grid-cols-1 md:grid-cols-3 gap-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading cart items"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-black rounded-xl p-4 flex flex-col justify-between min-h-[120px] animate-pulse"
          aria-hidden="true"
        >
          <div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
          </div>

          <div className="flex justify-end mt-4">
            <div className="h-7 w-20 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}