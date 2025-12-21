import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PrivacyDialog } from './PrivacyDialog';

interface FooterProps {
  onPartnerClick: () => void;
  onContactClick: () => void;
}

export function Footer({ onPartnerClick, onContactClick }: FooterProps) {
  const { t } = useLanguage();
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

  return (
    <>
      <footer className="py-16 px-4 bg-[#1d1d1f] text-white border-t border-white/10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button
              onClick={onPartnerClick}
              className="text-white/60 hover:text-white transition-colors text-[14px]"
            >
              {t.forPartners}
            </button>
            <button
              onClick={() => setShowPrivacyDialog(true)}
              className="text-white/60 hover:text-white transition-colors text-[14px]"
            >
              {t.footerPrivacy}
            </button>
            <button
              onClick={onContactClick}
              className="text-white/60 hover:text-white transition-colors text-[14px]"
            >
              {t.footerContact}
            </button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-[12px]">
            © 2025 TREHVÁ. All rights reserved.
          </div>
        </div>
      </footer>
      
      <PrivacyDialog 
        isOpen={showPrivacyDialog} 
        onClose={() => setShowPrivacyDialog(false)} 
      />
    </>
  );
}