import { memo } from 'react';
import type { LocalCartProduct } from '../types/cart';

interface Props {
  product: LocalCartProduct;
  onRemove: (id: number) => void;
}

export const ProductCard = memo(function ProductCard({ product, onRemove }: Props) {
  return (
    <article
      className={`bg-white border border-black rounded-xl p-4 flex flex-col justify-between min-h-[120px] transition-opacity duration-300 h-full select-none ${
        product.removing ? 'opacity-40' : ''
      }`}
      aria-label={product.title}
      aria-busy={product.removing}
    >
      <div>
        {/* Product title */}
        <h3 className="text-lg font-bold text-black leading-snug">
          {product.title}
        </h3>

        {/* Price */}
        <p
          className="text-sm text-black mt-2"
          aria-label={`Price $${product.discountedTotal.toFixed(2)}`}
        >
          ${product.discountedTotal.toFixed(2)}
        </p>
      </div>

      {/* Remove button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onRemove(product.id)}
          className="bg-gray-200 text-black text-sm px-4 py-1.5 rounded hover:bg-gray-300 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
          aria-label={`Remove ${product.title} from cart`}
        >
          Remove
        </button>
      </div>
    </article>
  );
});