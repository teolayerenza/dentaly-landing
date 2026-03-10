import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

interface UseSubscriptionResult {
  subscribe: (plan: 'monthly' | 'annual') => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useSubscription(): UseSubscriptionResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (plan: 'monthly' | 'annual') => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? 'Error al conectar con el servidor.');
      }

      const { init_point } = await res.json();
      const a = document.createElement('a');
      a.href = init_point;
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      console.error('[useSubscription] error:', err);
      alert('[DEBUG] Error: ' + msg);
      setError(msg);
      setLoading(false);
    }
  };

  return { subscribe, loading, error };
}
