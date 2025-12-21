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
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { Mail, Phone } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d1b28cd2/contact`,
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
        throw new Error('Failed to submit contact form');
      }

      toast.success(t.successContact);
      onClose();
      
      // Reset form
      setFormData({
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-[#414549]">{t.contactModalTitle}</DialogTitle>
        </DialogHeader>
        
        {/* Contact Info */}
        <div className="space-y-3 pb-4 border-b border-[#414549]/10">
          <div className="flex items-center gap-3 text-[#414549]">
            <Mail className="w-5 h-5 text-[#1d1d1f]" />
            <a href="mailto:trehva.app@gmail.com" className="hover:underline">
              trehva.app@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-[#414549]">
            <Phone className="w-5 h-5 text-[#1d1d1f]" />
            <a href="tel:+37253816519" className="hover:underline">
              +372 53816519
            </a>
          </div>
          <p className="text-[#414549]/70 text-sm pl-8">
            {t.contactTeamName}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <Label htmlFor="contactEmail" className="text-[#414549] mb-2 block">{t.contactEmailLabel}</Label>
            <Input
              id="contactEmail"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-[#414549]/20 text-[#414549]"
              disabled={isSubmitting}
              placeholder={t.contactEmailPlaceholder}
            />
          </div>
          
          <div>
            <Label htmlFor="contactMessage" className="text-[#414549] mb-2 block">{t.contactMessageLabel}</Label>
            <Textarea
              id="contactMessage"
              placeholder={t.contactMessagePlaceholder}
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border-[#414549]/20 text-[#414549] resize-none"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose()}
              className="flex-1 border-[#414549] text-[#414549]"
              disabled={isSubmitting}
            >
              {t.closeButton}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black text-white hover:bg-black/90 flex items-center gap-2"
              disabled={isSubmitting}
            >
              <Mail className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : t.submitContactButton}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
