import { useLanguage } from '../contexts/LanguageContext';
import { X } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfirmationDialog({ isOpen, onClose }: ConfirmationDialogProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-3xl max-w-md w-full p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
          aria-label={t.confirmationClose}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-[32px] text-[#1d1d1f] mb-4">
              {t.confirmationTitle}
            </h2>
          </div>

          <p className="text-[18px] text-[#6e6e73] mb-8 leading-relaxed">
            {t.confirmationMessage}
          </p>

          <button
            onClick={onClose}
            className="bg-black text-white hover:bg-black/80 px-10 py-4 rounded-full transition-colors w-full"
          >
            {t.confirmationClose}
          </button>
        </div>
      </div>
    </div>
  );
}
