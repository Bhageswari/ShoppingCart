import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCart } from '../hooks/useCart';
import type { LocalCartProduct } from '../types/cart';
import { ProductCard } from './ProductCard';
import { SkeletonGrid } from './SkeletonGrid';

const REMOVE_ANIMATION_MS = 300;

export function ShoppingCart() {
  const { cart, status, error } = useCart();
  const [localProducts, setLocalProducts] = useState<LocalCartProduct[]>([]);

  useEffect(() => {
    if (cart) {
      setLocalProducts(
        cart.products.map((p) => ({
          ...p,
          removing: false,
        }))
      );
    }
  }, [cart]);

  const handleRemove = useCallback((id: number) => {
    setLocalProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, removing: true } : p
      )
    );

    setTimeout(() => {
      setLocalProducts((prev) =>
        prev.filter((p) => p.id !== id)
      );
    }, REMOVE_ANIMATION_MS);
  }, []);

  const handleReset = useCallback(() => {
    if (!cart) return;
    setLocalProducts(
      cart.products.map((p) => ({
        ...p,
        removing: false,
      }))
    );
  }, [cart]);

  const { totalItems, grandTotal } = useMemo(() => {
    const active = localProducts.filter((p) => !p.removing);

    return {
      totalItems: active.length,
      grandTotal: active.reduce(
        (sum, p) => sum + p.discountedTotal,
        0
      ),
    };
  }, [localProducts]);

  return (
    <section
      className="max-w-4xl mx-auto bg-white rounded-xl"
      aria-labelledby="cart-heading"
    >
      {/* Header */}
      <div className="px-5 pt-6 mb-6">
        <h1
          id="cart-heading"
          className="text-2xl font-bold text-black"
        >
          Shopping Cart
        </h1>

        <div
          className="flex justify-between items-center mt-2"
          aria-live="polite"
        >
          <p className="text-base font-medium text-black">
            Cart contains {totalItems} products
          </p>

          <h2 className="text-base font-semibold text-black">
            Total: ${grandTotal.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* Loading */}
      {(status === 'idle' || status === 'loading') && (
        <div role="status" aria-live="polite">
          <span className="sr-only">Loading cart items...</span>
          <SkeletonGrid />
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <p
          className="text-sm text-red-500 px-5"
          role="alert"
        >
          Failed to load cart: {error}
        </p>
      )}

      {/* Content */}
      {status === 'success' && (
        <>
          {localProducts.length === 0 ? (
            <p
              className="text-sm text-black py-4 px-5"
              role="status"
            >
              Your cart is empty.
            </p>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              role="list"
              aria-label="Shopping cart items"
            >
              {localProducts.map((product) => (
                <div role="listitem" key={product.id}>
                  <ProductCard
                    product={product}
                    onRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="px-4 border-t border-gray-300 mt-6 pt-4">
            <button
              onClick={handleReset}
              className="bg-gray-200 text-black text-sm px-4 py-1.5 rounded hover:bg-gray-300 transition cursor-pointer"
              aria-label="Reset cart to original items"
            >
              Reset
            </button>
          </div>
        </>
      )}
    </section>
  );
}