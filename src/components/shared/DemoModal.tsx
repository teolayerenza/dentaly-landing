/**
 * DemoModal
 * Form to request a demo. On submit → opens WhatsApp with a pre-filled message.
 * No backend required.
 *
 * 🔧 Replace WHATSAPP_NUMBER with the actual number (country code + number, no + or spaces).
 *    Example: Argentina +54 9 11 1234-5678 → "5491112345678"
 */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FlowButton } from '@/components/ui/flow-button';

// ─── 🔧 CONFIG ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '5492213033623'; // TODO: replace with real number
// ──────────────────────────────────────────────────────────────────────────────

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  consulta?: string;
}

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

export function DemoModal({ open, onClose }: DemoModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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

  const onSubmit = (data: FormData) => {
    const message = [
      '¡Hola! Me contacto desde la web de Dentaly y me gustaría solicitar una demo. 😊',
      '',
      `*Nombre:* ${data.nombre}`,
      `*Email:* ${data.email}`,
      `*Teléfono:* ${data.telefono}`,
      data.consulta ? `*Consulta:* ${data.consulta}` : '',
      '',
      '¡Muchas gracias!',
    ]
      .filter((l) => l !== undefined)
      .join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
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
        aria-labelledby="demo-modal-title"
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
                <MessageCircle className="w-5 h-5 text-brand-primary" />
              </div>
              <h2
                id="demo-modal-title"
                className="font-display text-2xl font-bold text-gray-900"
              >
                Solicitá tu demo
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Completá el formulario y te contactamos por WhatsApp en minutos.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="María González"
                  className={cn(
                    'w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400',
                    'focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary',
                    'transition-colors',
                    errors.nombre ? 'border-red-400' : 'border-gray-200'
                  )}
                  {...register('nombre', { required: 'El nombre es requerido.' })}
                />
                {errors.nombre && (
                  <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
                )}
              </div>

              {/* Email */}
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
                    errors.email ? 'border-red-400' : 'border-gray-200'
                  )}
                  {...register('email', {
                    required: 'El email es requerido.',
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido.' },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Teléfono / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+54 11 1234-5678"
                  className={cn(
                    'w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400',
                    'focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary',
                    'transition-colors',
                    errors.telefono ? 'border-red-400' : 'border-gray-200'
                  )}
                  {...register('telefono', { required: 'El teléfono es requerido.' })}
                />
                {errors.telefono && (
                  <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>
                )}
              </div>

              {/* Consulta (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Consulta{' '}
                  <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="¿Cuántos profesionales tiene tu clínica? ¿Usás algún sistema actualmente?"
                  className={cn(
                    'w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 resize-none',
                    'focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary',
                    'transition-colors border-gray-200'
                  )}
                  {...register('consulta')}
                />
              </div>

              <FlowButton
                type="submit"
                variant="primary"
                size="lg"
                className="mt-1 w-full justify-center"
                disabled={isSubmitting}
              >
                <MessageCircle className="w-4 h-4" />
                Enviar por WhatsApp
              </FlowButton>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4">
              Te respondemos en horario comercial. Sin compromiso.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
