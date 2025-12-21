import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

interface HeaderProps {
  onSupportClick: () => void;
  onPartnerClick: () => void;
}

export function Header({ onSupportClick, onPartnerClick }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="border-b border-black/10">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-[24px] font-medium text-[#1d1d1f]" style={{ fontFamily: 'DM Sans' }}>
          TREHVÁ
        </div>
        
        <div className="flex items-center gap-6">
          <button
            onClick={onPartnerClick}
            className="text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors text-[14px] relative group"
          >
            {t.forPartners}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1d1d1f] transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <div className="flex items-center gap-1 bg-black/5 rounded-full p-1">
            <button
              onClick={() => setLanguage('et')}
              className={`px-3 py-1 rounded-full transition-colors text-[14px] flex items-center gap-1.5 ${
                language === 'et'
                  ? 'bg-black text-white'
                  : 'text-[#1d1d1f]/70 hover:text-[#1d1d1f]'
              }`}
            >
              <span className="text-[16px]">🇪🇪</span>
              <span>ET</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full transition-colors text-[14px] flex items-center gap-1.5 ${
                language === 'en'
                  ? 'bg-black text-white'
                  : 'text-[#1d1d1f]/70 hover:text-[#1d1d1f]'
              }`}
            >
              <span className="text-[16px]">🇬🇧</span>
              <span>EN</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}