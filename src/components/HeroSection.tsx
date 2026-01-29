import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import heroBackground from 'figma:asset/f05753469b60fb5c0cdd9d430c02abf2cd522514.png';
import { partners } from '../config/partners';

interface HeroSectionProps {
  onJoinClick: () => void;
  onHowItWorksClick: () => void;
}

export function HeroSection({ onJoinClick, onHowItWorksClick }: HeroSectionProps) {
  const { t } = useLanguage();
  const logos = partners.map(p => p[t.language] ?? p.en);

  return (
    <section className="py-16 px-4 md:py-24 md:pl-12 lg:pl-16">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-[56px] mb-8 text-[#1d1d1f] leading-tight">
              {t.heroHeadline}
            </h1>
            
            <p className="text-[20px] mb-8 text-[#6e6e73] leading-relaxed">
              {t.language === 'et' ? (
                <>
                  <span style={{ fontWeight: 700 }}>Kas haarad liiga tihti ekraani järele?</span> Trehva on rakendus, mis <span style={{ fontWeight: 700 }}>premeerib sind</span> ekraanivabalt veedetud aja eest väljaspool kodu. Preemiapunkte saad vahetada <span style={{ fontWeight: 700 }}>tasuta kohvi, piletite ja soodustuste vastu.</span>
                </>
              ) : (
                t.heroSubheadline
              )}
            </p>
            
            <div className="mb-8">
              <button
                onClick={onHowItWorksClick}
                className="text-[16px] text-[#1d1d1f] hover:text-[#1d1d1f]/70 transition-colors underline underline-offset-2"
              >
                {t.howItWorksLink}
              </button>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
              <Button
                onClick={onJoinClick}
                className="bg-black text-white hover:bg-black/80 px-10 py-7 rounded-full text-[14px]">
                {t.heroCtaPrimary}
              </Button>
            </div>
            <div className="mt-8 flex flex-col items-start md:items-start gap-4">
              <p className="text-[16px] text-[#1d1d1f]">
                {t.partnersText}
              </p>

              <div className="flex items-center gap-8 flex-wrap">
                {logos.map((src, i) => (
                  <div
                    key={i}
                    style={{ height: 100 }}
                    className="h-[100px] shrink-0 flex items-center justify-center"
                  >
                    <img
                      src={src}
                      style={{ height: 100 }}
                      alt=""
                      className="h-full w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-[13px] text-[#1d1d1f] mt-4">
              {t.heroCtaDisclaimer}
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 w-full">
            <img 
              src={heroBackground} 
              alt="Family with parents on phones and children seeking attention" 
              className="w-full h-auto rounded-3xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
