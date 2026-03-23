export const LABELS = {
  // Shopping Cart
  shoppingCart: 'Shopping Cart',
  cartContains: 'Cart contains',
  product: 'product',
  products: 'products',
  total: 'Total:',
  failedToLoadCart: 'Failed to load cart:',
  cartEmpty: 'Your cart is empty.',
  reset: 'Reset',
  cartItems: 'Cart items',
  resetCartAriaLabel: 'Reset cart to original items',
  
  // Product Card
  price: 'Price:',
  remove: 'Remove',
  removeFromCart: (productTitle: string) => `Remove ${productTitle} from cart`,
} as const;
