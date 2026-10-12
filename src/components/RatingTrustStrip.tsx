import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import { Star, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export const RatingTrustStrip: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="bg-[#FAF7F2] border-y border-[#8D7B6A]/15 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Trust 1: Google Rating */}
          <a
            href={siteConfig.getGoogleReviewsLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 p-2 rounded-lg hover:bg-[#F5F0E9] transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-[#BDA078]/15 flex items-center justify-center shrink-0 group-hover:bg-[#BDA078]/25 transition-colors">
              <Star className="w-5 h-5 fill-[#BDA078] text-[#BDA078]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-bold text-[#22201F]">
                  {siteConfig.business.googleRating.score} / 5
                </span>
                <span className="text-xs text-[#8D7B6A]">
                  ({siteConfig.business.googleRating.reviewCount} {isAr ? 'تقييم' : 'reviews'})
                </span>
              </div>
              <p className="text-xs text-[#8D7B6A] group-hover:text-[#22201F] transition-colors">
                {isAr
                  ? siteConfig.business.googleRating.sourceAr
                  : siteConfig.business.googleRating.sourceEn}
              </p>
            </div>
          </a>

          {/* Trust 2: Reported Closing Time */}
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-full bg-[#BDA078]/15 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#BDA078]" />
            </div>
            <div>
              <div className="font-serif text-base font-bold text-[#22201F]">
                {t('trustClosingTime')}
              </div>
              <p className="text-xs text-[#8D7B6A]">
                {isAr ? 'الجدول الكامل بانتظار التأكيد' : 'Full schedule to be confirmed'}
              </p>
            </div>
          </div>

          {/* Trust 3: Riyadh Location */}
          <a
            href={siteConfig.getGoogleMapsLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 p-2 rounded-lg hover:bg-[#F5F0E9] transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-[#BDA078]/15 flex items-center justify-center shrink-0 group-hover:bg-[#BDA078]/25 transition-colors">
              <MapPin className="w-5 h-5 text-[#BDA078]" />
            </div>
            <div>
              <div className="font-serif text-base font-bold text-[#22201F] group-hover:text-[#BDA078] transition-colors">
                {isAr ? siteConfig.business.cityAr : siteConfig.business.cityEn} · {isAr ? siteConfig.business.districtAr : siteConfig.business.districtEn}
              </div>
              <p className="text-xs text-[#8D7B6A] line-clamp-1">
                {isAr ? 'طريق الأمير محمد بن سعد' : 'Prince Muhammad Ibn Saad Rd'}
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
