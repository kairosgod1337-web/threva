import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-[#414549]">{t.howItWorksTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pb-6">
          {/* Step 1 */}
          <div className="space-y-2 p-5 rounded-xl bg-[#F5F5F7] border border-[#414549]/5">
            <h3 className="text-[#1d1d1f]">{t.howItWorksStep1Title}</h3>
            <p className="text-[#414549]/80 text-[14px] leading-relaxed">
              {t.howItWorksStep1Text1}
            </p>
            <p className="text-[#414549]/80 text-[14px] italic leading-relaxed">
              {t.howItWorksStep1Text2}
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-2 p-5 rounded-xl bg-[#FFBDD6]/10 border border-[#FFBDD6]/20">
            <h3 className="text-[#1d1d1f]">{t.howItWorksStep2Title}</h3>
            <p className="text-[#414549]/80 text-[14px] leading-relaxed">
              {t.howItWorksStep2Text1}
            </p>
            <p className="text-[#414549]/80 text-[14px] italic leading-relaxed">
              {t.howItWorksStep2Text2}
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-2 p-5 rounded-xl bg-[#F5F5F7] border border-[#414549]/5">
            <h3 className="text-[#1d1d1f]">{t.howItWorksStep3Title}</h3>
            <p className="text-[#414549]/80 text-[14px] leading-relaxed">
              {t.howItWorksStep3Text1}
            </p>
            <p className="text-[#414549]/80 text-[14px] leading-relaxed">
              {t.howItWorksStep3Text2}
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-2 p-5 rounded-xl bg-[#FFBDD6]/10 border border-[#FFBDD6]/20">
            <h3 className="text-[#1d1d1f]">{t.howItWorksStep4Title}</h3>
            <p className="text-[#414549]/80 text-[14px] leading-relaxed">
              {t.howItWorksStep4Text1}
            </p>
            <p className="text-[#414549]/80 text-[14px] leading-relaxed">
              {t.howItWorksStep4Text2}
            </p>
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t border-[#414549]/10">
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose()}
            className="border-[#414549] text-[#414549] hover:bg-[#414549]/5"
          >
            {t.closeButton}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}