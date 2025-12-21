import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Smartphone, Clock, Hash } from 'lucide-react';

export function ProblemSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-[48px] mb-6 text-[#1d1d1f] text-center">
          {t.problemHeadline}
        </h2>
        
        <p className="text-[20px] mb-20 text-[#6e6e73] text-center max-w-3xl mx-auto">
          {t.problemDescription}
        </p>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/5 mb-6">
              <Smartphone className="w-8 h-8 text-[#1d1d1f]" />
            </div>
            <div className="text-[48px] text-[#1d1d1f] mb-3">
              {t.problemStat1}
            </div>
            <div className="text-[#6e6e73] text-[16px]">
              {t.problemStat1Label}
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/5 mb-6">
              <Clock className="w-8 h-8 text-[#1d1d1f]" />
            </div>
            <div className="text-[48px] text-[#1d1d1f] mb-3">
              {t.problemStat2}
            </div>
            <div className="text-[#6e6e73] text-[16px]">
              {t.problemStat2Label}
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/5 mb-6">
              <Hash className="w-8 h-8 text-[#1d1d1f]" />
            </div>
            <div className="text-[48px] text-[#1d1d1f] mb-3">
              {t.problemStat3}
            </div>
            <div className="text-[#6e6e73] text-[16px]">
              {t.problemStat3Label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}