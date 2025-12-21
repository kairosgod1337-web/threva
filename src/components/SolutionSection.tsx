import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Coins, Gift } from 'lucide-react';

export function SolutionSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-[48px] mb-6 text-[#1d1d1f] text-center">
          {t.solutionHeadline}
        </h2>
        
        <p className="text-[20px] mb-20 text-[#6e6e73] text-center max-w-3xl mx-auto">
          {t.solutionSubheadline}
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-black/10 hover:border-black/20 transition-colors">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black/5 mb-6">
              <Coins className="w-7 h-7 text-[#1d1d1f]" />
            </div>
            <h3 className="mb-4 text-[#1d1d1f] text-[20px]">
              {t.featureCard1Title}
            </h3>
            <p className="text-[#6e6e73] text-[16px] leading-relaxed">
              {t.featureCard1Description}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-black/10 hover:border-black/20 transition-colors">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black/5 mb-6">
              <Gift className="w-7 h-7 text-[#1d1d1f]" />
            </div>
            <h3 className="mb-4 text-[#1d1d1f] text-[20px]">
              {t.featureCard3Title}
            </h3>
            <p className="text-[#6e6e73] text-[16px] leading-relaxed">
              {t.featureCard3Description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}