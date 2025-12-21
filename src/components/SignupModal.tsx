import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    benefit: '',
    comments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d1b28cd2/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit signup');
      }

      toast.success(t.successSignup);
      onClose();
      
      // Reset form
      setFormData({
        email: '',
        benefit: '',
        comments: '',
      });
    } catch (error) {
      console.error('Error submitting signup:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#1d1d1f]">{t.signupModalTitle}</DialogTitle>
          <DialogDescription className="text-[#6e6e73]">
            {t.signupModalDescription}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-[#1d1d1f]">{t.emailLabel}</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-black/20 text-[#1d1d1f] mt-1.5"
              disabled={isSubmitting}
            />
            <p className="text-sm text-[#6e6e73] mt-2">
              {t.emailExplanation}
            </p>
          </div>
          
          <div>
            <Label htmlFor="benefit" className="text-[#1d1d1f]">{t.benefitsLabel}</Label>
            <Select
              value={formData.benefit}
              onValueChange={(value) => setFormData({ ...formData, benefit: value })}
              required
              disabled={isSubmitting}
            >
              <SelectTrigger className="border-black/20 text-[#1d1d1f] mt-1.5">
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
            <Label htmlFor="comments" className="text-[#1d1d1f]">{t.commentsLabel}</Label>
            <Textarea
              id="comments"
              placeholder={t.commentsPlaceholder}
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="border-black/20 text-[#1d1d1f] placeholder:text-[#6e6e73] min-h-[120px] mt-1.5"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-black/20 text-[#1d1d1f] hover:bg-black/5"
              disabled={isSubmitting}
            >
              {t.closeButton}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black text-white hover:bg-black/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : t.submitButton}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}