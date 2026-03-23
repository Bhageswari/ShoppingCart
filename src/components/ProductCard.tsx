import { memo } from 'react';
import type { LocalCartProduct } from '../types/cart';
import { LABELS } from '../constants/labels';

interface Props {
  product: LocalCartProduct;
  onRemove: (id: number) => void;
}

export const ProductCard = memo(function ProductCard({ product, onRemove }: Props) {
  return (
    <article
      className={`product-card${product.removing ? ' product-card--removing' : ''}`}
      aria-label={product.title}
    >
      {/* Product title */}
      <h3 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
        {product.title}
      </h3>

      {/* Discounted line price */}
      <p
        className="text-xl font-semibold"
        style={{ color: 'var(--color-primary)' }}
        aria-label={`${LABELS.price} $${product.discountedTotal.toFixed(2)}`}
      >
        ${product.discountedTotal.toFixed(2)}
      </p>

      {/* Remove button */}
      <button
        type="button"
        className="btn-remove"
        onClick={() => onRemove(product.id)}
        aria-label={LABELS.removeFromCart(product.title)}
      >
        {LABELS.remove}
      </button>
    </article>
  );
});
