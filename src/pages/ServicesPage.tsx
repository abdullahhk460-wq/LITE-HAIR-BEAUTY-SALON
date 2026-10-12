import React, { useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig, ServiceItem } from '../config/site';
import { ServiceCard } from '../components/ServiceCard';
import { SEOHead } from '../components/SEOHead';
import { Search, Sparkles, Filter, X } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: t('filterAll') },
    { id: 'hair', label: t('filterHair') },
    { id: 'color', label: t('filterColor') },
    { id: 'nails', label: t('filterNails') },
    { id: 'makeup', label: t('filterMakeup') },
    { id: 'other', label: t('filterOther') },
  ];

  const filteredServices = useMemo(() => {
    return siteConfig.services.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Search query
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.nameEn.toLowerCase().includes(q) ||
        item.nameAr.toLowerCase().includes(q) ||
        item.descriptionEn.toLowerCase().includes(q) ||
        item.descriptionAr.toLowerCase().includes(q) ||
        item.categoryNameEn.toLowerCase().includes(q) ||
        item.categoryNameAr.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <SEOHead
        title={isAr ? 'قائمة الخدمات الفاخرة' : 'Salon Services & Rituals'}
        description={
          isAr
            ? 'خدمات تصفيف وقص الشعر، صبغات البالياج، مناكير وبديكير سبا، مكياج سهرة وعناية بالبشرة في صالون ايوليت بالرياض.'
            : 'Explore haircutting, balayage hair color, manicure & pedicure spa, gala makeup, and skin care services at LITE Hair & Beauty Riyadh.'
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
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#22201F] tracking-tight">
              {t('servicesSectionTitle')}
            </h1>
            <p className="text-sm sm:text-base text-[#8D7B6A] mt-3 leading-relaxed">
              {t('servicesSectionSubtitle')}
            </p>

            <div className="mt-4 inline-block bg-[#F5F0E9] border border-[#BDA078]/30 rounded px-3 py-1 text-xs text-[#8D7B6A]">
              <span className="font-medium text-[#22201F]">
                {isAr ? siteConfig.business.demoBadgeAr : siteConfig.business.demoBadgeEn}
              </span>
            </div>
          </div>

          {/* Search Bar & Filter Controls */}
          <div className="mb-10 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute top-1/2 -translate-y-1/2 ltr:left-3.5 rtl:right-3.5 w-4 h-4 text-[#8D7B6A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full ltr:pl-10 rtl:pr-10 ltr:pr-10 rtl:pl-10 py-3 bg-white border border-[#8D7B6A]/25 rounded-lg text-sm text-[#22201F] placeholder-[#8D7B6A]/70 focus:outline-none focus:border-[#BDA078] focus:ring-1 focus:ring-[#BDA078] transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 -translate-y-1/2 ltr:right-3 rtl:left-3 p-1 text-[#8D7B6A] hover:text-[#22201F]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Segmented Tabs (Interactive Filter Controls) */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#EBE4D8]/50 max-w-2xl mx-auto rounded-xl border border-[#8D7B6A]/15">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-[#BDA078] ${
                      isSelected
                        ? 'bg-[#22201F] text-[#FAF7F2] shadow-sm font-semibold'
                        : 'text-[#8D7B6A] hover:text-[#22201F] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-[#8D7B6A] mb-6 border-b border-[#8D7B6A]/15 pb-3">
            <span>
              {isAr
                ? `عرض ${filteredServices.length} من أصل ${siteConfig.services.length} خدمة`
                : `Showing ${filteredServices.length} of ${siteConfig.services.length} services`}
            </span>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-[#BDA078] hover:underline"
              >
                {isAr ? 'إعادة ضبط التصفية' : 'Reset category filter'}
              </button>
            )}
          </div>

          {/* Services Cards Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-[#8D7B6A]/15 p-8 max-w-md mx-auto">
              <Filter className="w-8 h-8 text-[#8D7B6A]/50 mx-auto mb-3" />
              <p className="font-serif text-lg text-[#22201F] font-bold">
                {t('noServicesFound')}
              </p>
              <p className="text-xs text-[#8D7B6A] mt-1">
                {isAr
                  ? 'جربي البحث بكلمات أخرى أو اختاري تصنيفاً مختلفاً'
                  : 'Try adjusting your search terms or select another category.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 bg-[#22201F] text-white text-xs rounded-md"
              >
                {isAr ? 'عرض جميع الخدمات' : 'View All Services'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
