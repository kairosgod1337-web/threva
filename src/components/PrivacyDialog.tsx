import { useLanguage } from '../contexts/LanguageContext';
import { X, Shield } from 'lucide-react';

interface PrivacyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyDialog({ isOpen, onClose }: PrivacyDialogProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
          aria-label={t.closeButton}
        >
          <X className="w-6 h-6" />
        </button>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-[32px] text-[#1d1d1f]">
              {t.privacyDialogTitle}
            </h2>
          </div>

          <div className="space-y-6 text-[#1d1d1f]">
            <p className="text-[20px]">
              {t.privacyDialogIntro}
            </p>

            <div className="space-y-4">
              <p className="text-[16px] leading-relaxed whitespace-pre-line text-[#6e6e73]">
                {t.privacyDialogCollection}
              </p>

              <p className="text-[16px] leading-relaxed whitespace-pre-line text-[#6e6e73]">
                {t.privacyDialogPurpose}
              </p>

              <p className="text-[16px] leading-relaxed whitespace-pre-line text-[#6e6e73]">
                {t.privacyDialogNoSharing}
              </p>

              <p className="text-[16px] leading-relaxed text-[#6e6e73]">
                {t.privacyDialogRights}
              </p>

              <p className="text-[16px] leading-relaxed text-[#6e6e73]">
                {t.privacyDialogSecurity}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="bg-black text-white hover:bg-black/80 px-10 py-4 rounded-full transition-colors w-full mt-8"
          >
            {t.closeButton}
          </button>
        </div>
      </div>
    </div>
  );
}
