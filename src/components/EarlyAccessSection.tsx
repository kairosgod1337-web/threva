import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ConfirmationDialog } from './ConfirmationDialog';

interface EarlyAccessSectionProps {
  onSubmit: () => void;
}

export function EarlyAccessSection({ onSubmit }: EarlyAccessSectionProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [benefit, setBenefit] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d1b28cd2/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            benefits: [benefit],
            comments,
            privacyAgreement: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitStatus('success');
      setEmail('');
      setBenefit('');
      setComments('');
      
      // Show confirmation dialog
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-[48px] mb-6 text-[#1d1d1f] text-center">
          {t.earlyAccessHeadline}
        </h2>
        
        <p className="text-[20px] mb-12 text-[#6e6e73] text-center">
          {t.earlyAccessDescription}
        </p>
        
        <div className="bg-white border border-black/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <Input
                type="email"
                placeholder={t.emailLabel}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-black/20 text-[#1d1d1f] placeholder:text-[#6e6e73]"
              />
              <p className="text-sm text-[#6e6e73] mt-2">
                {t.emailExplanation}
              </p>
            </div>
            
            <div>
              <Select value={benefit} onValueChange={setBenefit} required>
                <SelectTrigger className="bg-white border-black/20 text-[#1d1d1f]">
                  <SelectValue placeholder={t.benefitsLabel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cafe">{t.benefitCafe}</SelectItem>
                  <SelectItem value="family">{t.benefitFamily}</SelectItem>
                  <SelectItem value="wellness">{t.benefitWellness}</SelectItem>
                  <SelectItem value="learning">{t.benefitLearning}</SelectItem>
                  <SelectItem value="nature">{t.benefitNature}</SelectItem>
                  <SelectItem value="entertainment">{t.benefitEntertainment}</SelectItem>
                  <SelectItem value="other">{t.benefitOther}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Textarea
                placeholder={t.commentsPlaceholder}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="bg-white border-black/20 text-[#1d1d1f] placeholder:text-[#6e6e73] min-h-[120px]"
              />
            </div>
            
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center">
                ✓ {t.language === 'et' ? 'Saadetud! Täname registreerumast.' : 'Submitted! Thank you for registering.'}
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-center">
                ✗ {t.language === 'et' ? 'Viga! Palun proovige uuesti.' : 'Error! Please try again.'}
              </div>
            )}
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white hover:bg-black/80 px-10 py-6 rounded-full w-full disabled:opacity-50"
            >
              {isSubmitting ? (t.language === 'et' ? 'Saadan...' : 'Submitting...') : t.submitButton}
            </Button>
            
            <p className="text-sm text-[#6e6e73] text-center mt-2">
              {t.heroCtaDisclaimer}
            </p>
          </form>
        </div>
      </div>
      
      <ConfirmationDialog 
        isOpen={showConfirmation} 
        onClose={() => setShowConfirmation(false)} 
      />
    </section>
  );
}