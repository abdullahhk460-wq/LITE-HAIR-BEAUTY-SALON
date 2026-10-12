import React from 'react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../i18n/LanguageContext';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const { language, isRTL } = useLanguage();

  const isAr = language === 'ar';
  const whatsappUrl = siteConfig.getWhatsAppUrl(
    isAr
      ? 'مرحباً، أود حجز موعد أو الاستفسار عن خدمات صالون ايوليت.'
      : 'Hello! I would like to book an appointment or inquire about services at LITE Hair & Beauty.'
  );

  return (
    <aside
      aria-label={isAr ? 'تواصل عبر واتساب' : 'WhatsApp Contact'}
      className={`fixed bottom-6 z-40 ${isRTL ? 'left-6' : 'right-6'}`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isAr ? 'تواصل مع صالون ايوليت عبر واتساب' : 'Chat with LITE Hair & Beauty on WhatsApp'}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-4"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
        <MessageCircle className="w-7 h-7" />

        {/* Hover Tooltip */}
        <span
          className={`absolute ${
            isRTL ? 'left-16' : 'right-16'
          } whitespace-nowrap bg-[#22201F] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity`}
        >
          {isAr ? 'محادثة فورية على واتساب' : 'Chat on WhatsApp'}
        </span>
      </a>
    </aside>
  );
};
