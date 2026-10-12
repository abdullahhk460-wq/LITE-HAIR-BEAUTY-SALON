import React, { createContext, useContext, useState, useCallback } from 'react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../i18n/LanguageContext';
import { Instagram, AlertCircle, X, ExternalLink } from 'lucide-react';

interface InstagramContextType {
  handleInstagramClick: (specificPostUrl?: string) => void;
  openModal: () => void;
  closeModal: () => void;
}

const InstagramContext = createContext<InstagramContextType | undefined>(undefined);

export const InstagramProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  const handleInstagramClick = useCallback((specificPostUrl?: string) => {
    const targetUrl = specificPostUrl || siteConfig.INSTAGRAM_PROFILE_URL;
    if (targetUrl && targetUrl.trim() !== '') {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      setIsOpen(true);
    }
  }, []);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <InstagramContext.Provider
      value={{
        handleInstagramClick,
        openModal,
        closeModal,
      }}
    >
      {children}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="instagram-notice-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22201F]/60 backdrop-blur-sm transition-opacity"
        >
          <div
            className="relative w-full max-w-md bg-[#FAF7F2] border border-[#BDA078]/40 rounded-xl shadow-2xl p-6 text-[#22201F] animate-in fade-in zoom-in-95 duration-200"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 ltr:right-4 rtl:left-4 p-2 text-[#8D7B6A] hover:text-[#22201F] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#BDA078]"
              aria-label={t('closeBtn')}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#BDA078]/15 flex items-center justify-center text-[#BDA078]">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#BDA078]">
                <AlertCircle className="w-4 h-4" />
                <span>Notice / تنبيه</span>
              </div>
            </div>

            <h3
              id="instagram-notice-title"
              className="text-lg font-serif font-bold text-[#22201F] mb-2"
            >
              {t('instaModalTitle')}
            </h3>

            <p className="text-sm text-[#8D7B6A] leading-relaxed mb-4">
              {t('instaModalDesc')}
            </p>

            <div className="bg-[#F5F0E9] border border-[#BDA078]/30 rounded-lg p-3 text-xs text-[#22201F] mb-5">
              <p className="font-medium mb-1">Configuration Path:</p>
              <code className="text-[#BDA078] bg-[#22201F]/5 px-1.5 py-0.5 rounded text-[11px] font-mono">
                /src/config/site.ts → INSTAGRAM_PROFILE_URL
              </code>
              <p className="mt-2 text-[#8D7B6A]">
                {t('instaModalInstruction')}
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-[#22201F] hover:bg-[#34312F] text-white text-xs font-medium rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#BDA078]"
              >
                {t('closeBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </InstagramContext.Provider>
  );
};

export const useInstagram = (): InstagramContextType => {
  const context = useContext(InstagramContext);
  if (!context) {
    throw new Error('useInstagram must be used within an InstagramProvider');
  }
  return context;
};
