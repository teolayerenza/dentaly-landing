import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, CreditCard, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FlowButton } from '@/components/ui/flow-button';
import { useSubscription } from '@/hooks/useSubscription';

interface FormData {
  email: string;
}

interface SubscribeModalProps {
  open: boolean;
  onClose: () => void;
  plan: 'monthly' | 'annual';
}

const PLAN_LABELS: Record<'monthly' | 'annual', { label: string; price: string; detail: string }> = {
  monthly: {
    label: 'Plan Pro · Mensual',
    price: '$24.000',
    detail: 'por mes',
  },
  annual: {
    label: 'Plan Pro · Anual',
    price: '$20.000',
    detail: 'por mes · facturado mensualmente',
  },
};

export function SubscribeModal({ open, onClose, plan }: SubscribeModalProps) {
  const { subscribe, loading, error } = useSubscription();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  /* Lock body scroll while modal is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      reset();
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, reset]);

  /* Close on Escape */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  if (!open) return null;

  const planInfo = PLAN_LABELS[plan];

  const onSubmit = (data: FormData) => {
    subscribe(data.email, plan);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal
        aria-labelledby="subscribe-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary" />

          <div className="p-6 sm:p-8">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5 text-brand-primary" />
              </div>
              <h2
                id="subscribe-modal-title"
                className="font-display text-2xl font-bold text-gray-900"
              >
                Suscribite a Dentaly Pro
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Serás redirigido a Mercado Pago para completar el pago de forma segura.
              </p>
            </div>

            {/* Plan summary */}
            <div className="bg-brand-light rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-brand-primary">{planInfo.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{planInfo.detail}</p>
              </div>
              <p className="font-display font-extrabold text-2xl text-gray-900">
                {planInfo.price}
                <span className="text-sm font-normal text-gray-400"> ARS</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="tu@clinica.com.ar"
                  className={cn(
                    'w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400',
                    'focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary',
                    'transition-colors',
                    errors.email ? 'border-red-400' : 'border-gray-200',
                  )}
                  {...register('email', {
                    required: 'El email es requerido.',
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Error de API */}
              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              )}

              <FlowButton
                type="submit"
                variant="primary"
                size="lg"
                className="mt-1 w-full justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirigiendo a Mercado Pago…
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Ir a pagar
                  </>
                )}
              </FlowButton>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4">
              Pago 100% seguro procesado por Mercado Pago. Cancelás cuando quieras.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
