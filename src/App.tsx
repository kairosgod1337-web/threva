import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { EarlyAccessSection } from './components/EarlyAccessSection';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { SignupModal } from './components/SignupModal';
import { PartnerModal } from './components/PartnerModal';
import { ContactModal } from './components/ContactModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isHowItWorksModalOpen, setIsHowItWorksModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header
          onSupportClick={() => setIsSignupModalOpen(true)}
          onPartnerClick={() => setIsPartnerModalOpen(true)}
        />
        <div className="bg-white">
          <HeroSection 
            onJoinClick={() => setIsSignupModalOpen(true)}
            onHowItWorksClick={() => setIsHowItWorksModalOpen(true)}
          />
        </div>
        <div className="bg-gradient-to-b from-[#FFBDD6] to-[#FEFEFE]">
          <SolutionSection />
          <ProblemSection />
          <EarlyAccessSection onSubmit={() => setIsSignupModalOpen(true)} />
          <TrustSection />
          <Footer 
            onPartnerClick={() => setIsPartnerModalOpen(true)}
            onContactClick={() => setIsContactModalOpen(true)}
          />
        </div>
        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={() => setIsSignupModalOpen(false)}
        />
        <PartnerModal
          isOpen={isPartnerModalOpen}
          onClose={() => setIsPartnerModalOpen(false)}
        />
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
        <HowItWorksModal
          isOpen={isHowItWorksModalOpen}
          onClose={() => setIsHowItWorksModalOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}