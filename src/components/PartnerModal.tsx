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
import { Handshake, Users, TrendingUp, Sparkles } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerModal({ isOpen, onClose }: PartnerModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    businessType: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d1b28cd2/partner`,
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
        throw new Error('Failed to submit partner inquiry');
      }

      toast.success(t.successPartner);
      onClose();
      
      // Reset form
      setFormData({
        businessName: '',
        contactPerson: '',
        businessType: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting partner inquiry:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-[#414549]">{t.partnerModalTitle}</DialogTitle>
        </DialogHeader>
        
        {/* Introduction with icon */}
        <div className="space-y-4 pb-4 border-b border-[#414549]/10">
          <div className="p-5 rounded-xl bg-[#FFBDD6]/10 border border-[#FFBDD6]/20">
            <p className="text-[#414549]">
              {t.partnerModalPitch}
            </p>
          </div>
        </div>
        
        {/* Benefits section with background */}
        <div className="p-5 rounded-xl bg-[#FFBDD6]/10 border border-[#FFBDD6]/20 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#1d1d1f]" />
            <h4 className="text-[#414549]">{t.partnerModalBenefitsTitle}</h4>
          </div>
          <p className="text-[#1d1d1f] whitespace-pre-line pl-7 leading-relaxed">
            {t.partnerModalBenefitsPoints}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-[#414549]/10">
          <div>
            <Label htmlFor="businessName" className="text-[#414549] mb-2 block">{t.businessNameLabel}</Label>
            <Input
              id="businessName"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="border-[#414549]/20 text-[#414549]"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label htmlFor="contactPerson" className="text-[#414549] mb-2 block">{t.contactPersonLabel}</Label>
            <Input
              id="contactPerson"
              required
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              className="border-[#414549]/20 text-[#414549]"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label htmlFor="businessType" className="text-[#414549] mb-2 block">{t.businessTypeLabel}</Label>
            <Select
              value={formData.businessType}
              onValueChange={(value) => setFormData({ ...formData, businessType: value })}
              required
              disabled={isSubmitting}
            >
              <SelectTrigger className="border-[#414549]/20 text-[#414549]">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cafe">{t.businessTypeCafe}</SelectItem>
                <SelectItem value="library">{t.businessTypeLibrary}</SelectItem>
                <SelectItem value="family">{t.businessTypeFamily}</SelectItem>
                <SelectItem value="wellness">{t.businessTypeWellness}</SelectItem>
                <SelectItem value="nature">{t.businessTypeNature}</SelectItem>
                <SelectItem value="other">{t.businessTypeOther}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="partnerEmail" className="text-[#414549] mb-2 block">{t.emailLabel}</Label>
            <Input
              id="partnerEmail"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-[#414549]/20 text-[#414549]"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label htmlFor="message" className="text-[#414549] mb-2 block">{t.messageLabel}</Label>
            <Textarea
              id="message"
              placeholder={t.messagePlaceholder}
              rows={4}
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
              <Handshake className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : t.submitPartnerButton}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}