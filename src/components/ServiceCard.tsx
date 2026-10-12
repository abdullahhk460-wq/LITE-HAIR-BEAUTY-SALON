import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceItem, siteConfig } from '../config/site';
import { useLanguage } from '../i18n/LanguageContext';
import { Clock, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { t, language, formatPrice, isRTL } = useLanguage();
  const isAr = language === 'ar';

  const categoryName = isAr ? service.categoryNameAr : service.categoryNameEn;
  const serviceName = isAr ? service.nameAr : service.nameEn;
  const description = isAr ? service.descriptionAr : service.descriptionEn;

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <article className="group bg-[#FAF7F2] border border-[#8D7B6A]/20 hover:border-[#BDA078] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      {/* Image container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#22201F]/5">
        <img
          src={service.image}
          alt={serviceName}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Category quiet overlay */}
        <div className="absolute top-3 ltr:left-3 rtl:right-3">
          <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-[#22201F]/80 backdrop-blur-sm text-[#FAF7F2] rounded">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Body content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line (Anti-slop clean text) */}
          <div className="flex items-center gap-2 text-xs text-[#8D7B6A] mb-2">
            <Clock className="w-3.5 h-3.5 text-[#BDA078]" />
            <span>
              {service.durationMinutes} {t('minutes')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-[#22201F]">
              {formatPrice(service.priceSAR)}
            </span>
          </div>

          <h3 className="font-serif text-lg font-bold text-[#22201F] group-hover:text-[#BDA078] transition-colors leading-snug mb-2">
            {serviceName}
          </h3>

          <p className="text-xs text-[#8D7B6A] leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
        </div>

        {/* Demo pricing disclaimer badge */}
        <div>
          <div className="bg-[#F5F0E9] border border-[#BDA078]/30 rounded px-2.5 py-1 text-[10px] text-[#8D7B6A] mb-4">
            <span className="font-medium text-[#22201F]">
              {isAr ? siteConfig.business.demoBadgeAr : siteConfig.business.demoBadgeEn}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#8D7B6A]/15">
            <Link
              to={`/services/${service.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-[#22201F] bg-[#EBE4D8]/60 hover:bg-[#EBE4D8] rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#BDA078]"
            >
              <span>{t('viewDetails')}</span>
              <ArrowIcon className="w-3.5 h-3.5 text-[#BDA078]" />
            </Link>

            <Link
              to={`/book?service=${service.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#22201F] hover:bg-[#34312F] rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#BDA078]"
            >
              <Calendar className="w-3 h-3 text-[#BDA078]" />
              <span>{t('bookThisService')}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
