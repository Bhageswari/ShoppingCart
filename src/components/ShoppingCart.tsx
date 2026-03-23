import { useCallback, useMemo, useState } from 'react';
import { useCart } from '../hooks/useCart';
import type { LocalCartProduct } from '../types/cart';
import { ProductCard } from './ProductCard';
import { SkeletonGrid } from './SkeletonGrid';
import { LABELS } from '../constants/labels';

const REMOVE_ANIMATION_MS = 300;

export function ShoppingCart() {
  const { cart, status, error } = useCart();

  const [localProducts, setLocalProducts] = useState<LocalCartProduct[] | null>(null);

  if (cart && localProducts === null) {
    setLocalProducts(cart.products.map((p) => ({ ...p })));
  }

  const handleRemove = useCallback((id: number) => {
    setLocalProducts((prev) => {
      if (!prev) return prev;
      return prev.map((p) => (p.id === id ? { ...p, removing: true } : p));
    });

    setTimeout(() => {
      setLocalProducts((prev) => prev?.filter((p) => p.id !== id) ?? null);
    }, REMOVE_ANIMATION_MS);
  }, []);

  const handleReset = useCallback(() => {
    if (!cart) return;
    setLocalProducts(cart.products.map((p) => ({ ...p })));
  }, [cart]);

  const { totalItems, grandTotal } = useMemo(() => {
    if (!localProducts) return { totalItems: 0, grandTotal: 0 };
    const active = localProducts.filter((p) => !p.removing);
    return {
      totalItems: active.length,
      grandTotal: active.reduce((sum, p) => sum + p.discountedTotal, 0),
    };
  }, [localProducts]);

  return (
    <section
      className="mx-auto max-w-5xl p-6 rounded-xl"
      style={{ background: 'var(--color-surface)' }}
      aria-label="Shopping Cart"
    >
      <header className="mb-1">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
          {LABELS.shoppingCart}
        </h1>
        {status === 'success' && (
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <p className="text-xl font-semibold" style={{ color: 'var(--color-primary)' }}>
              <span aria-live="polite" aria-atomic="true">
                {LABELS.cartContains} {totalItems} {totalItems === 1 ? LABELS.product : LABELS.products}
              </span>
            </p>
            <p className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
              {LABELS.total}&nbsp;
              <span aria-live="polite" aria-atomic="true">
                ${grandTotal.toFixed(2)}
              </span>
            </p>
          </div>
        )}
      </header>

      {(status === 'idle' || status === 'loading') && <SkeletonGrid />}

      {status === 'error' && (
        <p role="alert" className="text-sm" style={{ color: 'var(--color-danger)' }}>
          {LABELS.failedToLoadCart} {error}
        </p>
      )}

      {status === 'success' && localProducts && (
        <>
          {localProducts.length === 0 ? (
            <p className="text-sm py-4" style={{ color: 'var(--color-secondary)' }}>
              {LABELS.cartEmpty}
            </p>
          ) : (
            <div className="cart-grid" role="list" aria-label={LABELS.cartItems}>
              {localProducts.map((product) => (
                <div key={product.id} role="listitem">
                  <ProductCard product={product} onRemove={handleRemove} />
                </div>
              ))}
            </div>
          )}

          <footer
            className="mt-6 pt-4 flex justify-start"
            style={{ borderTop: '2px solid #9ca3af' }}
          >
            <button
              type="button"
              className="btn-reset"
              onClick={handleReset}
              aria-label={LABELS.resetCartAriaLabel}
            >
              {LABELS.reset}
            </button>
          </footer>
        </>
      )}
    </section>
  );
}
