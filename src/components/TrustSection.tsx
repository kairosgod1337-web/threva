import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function TrustSection() {
  const { t } = useLanguage();
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d1b28cd2/signup-count`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching signup count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  const getMessage = () => {
    if (isLoading) {
      return t.trustMessageLoading;
    }
    if (count !== null && count > 0) {
      return t.trustMessageTemplate.replace('{count}', count.toString());
    }
    return t.trustMessage;
  };

  return (
    <section className="py-16 px-4 border-y border-black/10">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-center gap-3">
          <CheckCircle className="w-6 h-6 text-[#1d1d1f]" />
          <p className="text-[18px] text-[#1d1d1f]">
            {getMessage()}
          </p>
        </div>
      </div>
    </section>
  );
}