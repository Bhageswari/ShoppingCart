import { useEffect, useState } from 'react';
import type { Cart } from '../types/cart';

const CART_URL = 'https://dummyjson.com/carts/11';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseCartResult {
  cart: Cart | null;
  status: Status;
  error: string | null;
}

export function useCart(): UseCartResult {
  const [cart, setCart] = useState<Cart | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setStatus('loading');
      try {
        const res = await fetch(CART_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Cart = await res.json();
        setCart(data);
        setStatus('success');
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setError((err as Error).message ?? 'Unknown error');
        setStatus('error');
      }
    };

    load();

    return () => controller.abort();
  }, []);

  return { cart, status, error };
}