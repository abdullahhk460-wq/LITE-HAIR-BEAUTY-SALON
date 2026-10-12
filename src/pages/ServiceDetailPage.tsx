import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import { ServiceCard } from '../components/ServiceCard';
import { SEOHead } from '../components/SEOHead';
import {
  Clock,
  Calendar,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Info,
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language, formatPrice, isRTL } = useLanguage();

  const isAr = language === 'ar';
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  const service = siteConfig.services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="py-24 text-center px-4 max-w-md mx-auto">
        <h2 className="font-serif text-2xl font-bold text-[#22201F] mb-3">
          {isAr ? 'الخدمة غير موجودة' : 'Service Not Found'}
        </h2>
        <p className="text-sm text-[#8D7B6A] mb-6">
          {isAr
            ? 'عذراً، لم نتمكن من العثور على الخدمة المطلوبة.'
            : 'Sorry, the requested salon service could not be found.'}
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22201F] text-white text-xs uppercase tracking-wider rounded-md"
        >
          <ArrowIcon className="w-4 h-4" />
          <span>{t('backToServices')}</span>
        </Link>
      </div>
    );
  }

  const serviceName = isAr ? service.nameAr : service.nameEn;
  const categoryName = isAr ? service.categoryNameAr : service.categoryNameEn;
  const description = isAr ? service.descriptionAr : service.descriptionEn;
  const details = isAr ? service.detailsAr : service.detailsEn;
  const benefits = isAr ? service.benefitsAr : service.benefitsEn;

  // Related services (exclude current, prefer same category)
  const relatedServices = siteConfig.services
    .filter((s) => s.id !== service.id)
    .sort((a, b) => (a.category === service.category ? -1 : 1))
    .slice(0, 3);

  // WhatsApp prefilled message
  const whatsappInquiryUrl = siteConfig.getWhatsAppUrl(
    isAr
      ? `مرحباً صالون ايوليت، أود الاستفسار عن خدمة (${service.nameAr}) وتأكيد التوفر والتسعيرة.`
      : `Hello LITE Hair & Beauty, I would like to inquire about "${service.nameEn}" and check availability and pricing.`
  );

  return (
    <>
      <SEOHead
        title={serviceName}
        description={`${serviceName} - ${description}`}
      />

      <div className="py-10 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-[#8D7B6A] mb-8"
          >
            <Link to="/" className="hover:text-[#22201F]">
              {t('navHome')}
            </Link>
            <ChevronIcon className="w-3.5 h-3.5 text-[#8D7B6A]/60" />
            <Link to="/services" className="hover:text-[#22201F]">
              {t('navServices')}
            </Link>
            <ChevronIcon className="w-3.5 h-3.5 text-[#8D7B6A]/60" />
            <span className="text-[#22201F] font-semibold truncate max-w-xs">
              {serviceName}
            </span>
          </nav>

          {/* Main Service Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            {/* Visual Column */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-[#8D7B6A]/20 bg-white">
                <img
                  src={service.image}
                  alt={serviceName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 ltr:left-4 rtl:right-4 bg-[#22201F]/80 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
                  {categoryName}
                </div>
              </div>
              <p className="text-[11px] text-[#8D7B6A] text-center">
                {isAr
                  ? siteConfig.business.illustrativeImagesNoteAr
                  : siteConfig.business.illustrativeImagesNoteEn}
              </p>
            </div>

            {/* Info & Booking Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#BDA078] mb-1">
                  <span>{categoryName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{isAr ? siteConfig.business.cityAr : siteConfig.business.cityEn}</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#22201F] leading-tight">
                  {serviceName}
                </h1>
              </div>

              {/* Price & Duration Strip */}
              <div className="p-4 bg-white border border-[#8D7B6A]/20 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#8D7B6A] uppercase tracking-wider block">
                    {t('startingFrom')}
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#22201F]">
                    {formatPrice(service.priceSAR)}
                  </span>
                </div>
                <div className="text-end">
                  <span className="text-[11px] text-[#8D7B6A] uppercase tracking-wider block">
                    {t('durationLabel')}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#22201F]">
                    <Clock className="w-4 h-4 text-[#BDA078]" />
                    <span>
                      {service.durationMinutes} {t('minutes')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Demo Badge */}
              <div className="flex items-start gap-2 bg-[#F5F0E9] border border-[#BDA078]/30 rounded-lg p-3 text-xs text-[#8D7B6A]">
                <Info className="w-4 h-4 text-[#BDA078] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#22201F] block">
                    {isAr ? siteConfig.business.demoBadgeAr : siteConfig.business.demoBadgeEn}
                  </span>
                  <span className="text-[11px] text-[#8D7B6A] mt-0.5 block">
                    {isAr
                      ? 'الأسعار والمدد المعروضة هي نماذج تجريبية، وسيتم تأكيدها بدقة عند التنسيق مع الصالون.'
                      : 'Pricing and durations shown are demo estimates, to be officially confirmed upon appointment scheduling.'}
                  </span>
                </div>
              </div>

              {/* Primary Descriptions */}
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-[#22201F] leading-relaxed font-medium">
                  {description}
                </p>
                <p className="text-xs sm:text-sm text-[#8D7B6A] leading-relaxed">
                  {details}
                </p>
              </div>

              {/* Benefits (No false guarantees) */}
              <div className="pt-2 border-t border-[#8D7B6A]/20">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#BDA078] mb-3">
                  {t('benefitsTitle')}
                </h3>
                <ul className="space-y-2.5">
                  {benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-[#22201F]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#BDA078] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-[#8D7B6A]/80 mt-3 italic">
                  {t('benefitsDisclaimer')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/book?service=${service.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#22201F] hover:bg-[#34312F] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#BDA078]" />
                  <span>{t('bookThisService')}</span>
                </Link>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('inquireWhatsApp')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Related Services */}
          <div className="border-t border-[#8D7B6A]/20 pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-[#22201F]">
                {t('relatedServices')}
              </h2>
              <Link
                to="/services"
                className="text-xs font-semibold uppercase tracking-wider text-[#BDA078] hover:underline"
              >
                {t('filterAll')}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((rel) => (
                <ServiceCard key={rel.id} service={rel} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
