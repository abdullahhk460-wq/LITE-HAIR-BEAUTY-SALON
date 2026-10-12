import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig, GalleryItem } from '../config/site';
import { useInstagram } from '../context/InstagramContext';
import { SEOHead } from '../components/SEOHead';
import {
  Instagram,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  ExternalLink,
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const { handleInstagramClick } = useInstagram();
  const isAr = language === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: t('catAll') },
    { id: 'hair', label: t('catHair') },
    { id: 'nails', label: t('catNails') },
    { id: 'makeup', label: t('catMakeup') },
    { id: 'salon', label: t('catSalon') },
  ];

  const filteredItems = siteConfig.galleryItems.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const activeItem: GalleryItem | null =
    activeLightboxIndex !== null && filteredItems[activeLightboxIndex]
      ? filteredItems[activeLightboxIndex]
      : null;

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredItems.length - 1
    );
  }, [activeLightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev! < filteredItems.length - 1 ? prev! + 1 : 0
    );
  }, [activeLightboxIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  // Keyboard navigation for Lightbox (Esc, Left/Right arrow keys)
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        if (isRTL) {
          handlePrev();
        } else {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (isRTL) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handleClose, handleNext, handlePrev, isRTL]);

  return (
    <>
      <SEOHead
        title={t('galleryTitle')}
        description={
          isAr
            ? 'معرض أعمال وتصاميم صالون ايوليت بالرياض. تسريحات شعر، صبغات، مناكير وأجواء الصالون الراقية.'
            : 'Gallery of hairstyle artistry, color transformations, nails, and salon ambiance at LITE Hair & Beauty Riyadh.'
        }
      />

      <div className="py-12 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#BDA078] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'صالون ايوليت · الرياض' : 'LITE Hair & Beauty · Riyadh'}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#22201F]">
              {t('galleryTitle')}
            </h1>
            <p className="text-sm sm:text-base text-[#8D7B6A] mt-3 leading-relaxed">
              {t('gallerySubtitle')}
            </p>

            {/* Illustrative Images Disclaimer Note */}
            <div className="mt-4 inline-flex items-center gap-1.5 bg-[#F5F0E9] border border-[#BDA078]/30 rounded px-3 py-1 text-xs text-[#8D7B6A]">
              <Info className="w-3.5 h-3.5 text-[#BDA078]" />
              <span>
                {isAr
                  ? siteConfig.business.illustrativeImagesNoteAr
                  : siteConfig.business.illustrativeImagesNoteEn}
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#EBE4D8]/50 max-w-md mx-auto rounded-xl border border-[#8D7B6A]/15 mb-10">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveLightboxIndex(null);
                  }}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-[#BDA078] ${
                    isSelected
                      ? 'bg-[#22201F] text-white shadow-sm font-semibold'
                      : 'text-[#8D7B6A] hover:text-[#22201F] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Responsive Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => {
              const title = isAr ? item.titleAr : item.titleEn;
              const alt = isAr ? item.altAr : item.altEn;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxIndex(index)}
                  className="group relative aspect-4/5 rounded-xl overflow-hidden bg-white border border-[#8D7B6A]/20 cursor-pointer shadow-sm hover:shadow-md transition-all"
                >
                  <img
                    src={item.image}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-[#22201F]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-[#BDA078] font-semibold">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base font-bold leading-snug mt-1">
                      {title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-[#FAF7F2]/80 mt-3 pt-2 border-t border-white/20">
                      <span>{isAr ? 'عرض مكبّر' : 'Expand Image'}</span>
                      <Instagram className="w-4 h-4 text-[#BDA078]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? activeItem.titleAr : activeItem.titleEn}
          className="fixed inset-0 z-50 bg-[#22201F]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 ltr:right-4 rtl:left-4 z-10 p-2.5 text-[#FAF7F2] hover:text-[#BDA078] bg-black/40 hover:bg-black/60 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#BDA078]"
            aria-label={t('lightboxClose')}
            title={t('lightboxClose')}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-[#FAF7F2] hover:text-[#BDA078] bg-black/40 hover:bg-black/60 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#BDA078]"
            aria-label={t('lightboxPrev')}
            title={t('lightboxPrev')}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-[#FAF7F2] hover:text-[#BDA078] bg-black/40 hover:bg-black/60 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#BDA078]"
            aria-label={t('lightboxNext')}
            title={t('lightboxNext')}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Content Container */}
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <div className="relative max-h-[72vh] rounded-lg overflow-hidden border border-[#8D7B6A]/30 bg-black">
              <img
                src={activeItem.image}
                alt={isAr ? activeItem.altAr : activeItem.altEn}
                className="max-h-[72vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Bottom Info Bar */}
            <div className="w-full mt-4 bg-[#FAF7F2] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#22201F]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#BDA078] font-bold">
                  {activeItem.category} · {t('illustrativeNote')}
                </span>
                <h3 className="font-serif text-lg font-bold">
                  {isAr ? activeItem.titleAr : activeItem.titleEn}
                </h3>
              </div>

              {/* Instagram link for this image */}
              <button
                type="button"
                onClick={() => handleInstagramClick(activeItem.instagramPostUrl)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#22201F] hover:bg-[#34312F] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#BDA078]" />
                <span>{t('viewOnInstagram')}</span>
                <ExternalLink className="w-3 h-3 text-[#BDA078]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
