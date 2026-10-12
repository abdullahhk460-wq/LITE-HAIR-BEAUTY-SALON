import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import { useInstagram } from '../context/InstagramContext';
import { RatingTrustStrip } from '../components/RatingTrustStrip';
import { ServiceCard } from '../components/ServiceCard';
import { SEOHead } from '../components/SEOHead';
import {
  Calendar,
  Sparkles,
  Instagram,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const { handleInstagramClick } = useInstagram();

  const isAr = language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Curate 1 preview service from each of the 5 categories
  const featuredServices = [
    siteConfig.services.find((s) => s.id === 'hair-styling-blowdry')!,
    siteConfig.services.find((s) => s.id === 'hair-color-full-gloss')!,
    siteConfig.services.find((s) => s.id === 'nails-signature-manicure')!,
    siteConfig.services.find((s) => s.id === 'makeup-evening-glam')!,
    siteConfig.services.find((s) => s.id === 'beauty-facial-radiance')!,
  ].filter(Boolean);

  const instagramStripItems = siteConfig.galleryItems.slice(0, 6);

  return (
    <>
      <SEOHead
        title={isAr ? 'الرئيسية' : 'Home'}
        description={
          isAr
            ? 'صالون ايوليت (LITE Hair & Beauty) في حي العقيق، الرياض. خدمات الشعر والصبغات والأظافر والمكياج الفاخر.'
            : 'LITE Hair & Beauty in Al Aqiq, Riyadh. Luxury hair styling, balayage color, spa nails, and evening makeup.'
        }
      />

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#FAF7F2] pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Subtle Luxury Pattern / Glow */}
        <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 rounded-full bg-[#BDA078]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-96 h-96 rounded-full bg-[#8D7B6A]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left/Main Column: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Location quiet text kicker (Zero-pill discipline) */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#BDA078]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{isAr ? siteConfig.business.addressAr : siteConfig.business.addressEn}</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#22201F] tracking-tight leading-[1.15]">
                {isAr ? siteConfig.business.taglineAr : siteConfig.business.tagline}
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-[#8D7B6A] leading-relaxed max-w-2xl font-light">
                {isAr ? siteConfig.business.subtextAr : siteConfig.business.subtextEn}
              </p>

              {/* Demo Badge */}
              <div className="inline-block bg-[#F5F0E9] border border-[#BDA078]/30 rounded px-3 py-1.5 text-xs text-[#8D7B6A]">
                <span className="font-medium text-[#22201F]">
                  {isAr ? siteConfig.business.demoBadgeAr : siteConfig.business.demoBadgeEn}
                </span>
              </div>

              {/* Hero Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#22201F] hover:bg-[#34312F] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-md hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-[#BDA078]"
                >
                  <Calendar className="w-4 h-4 text-[#BDA078]" />
                  <span>{t('btnBookAppointment')}</span>
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FAF7F2] hover:bg-[#EBE4D8] text-[#22201F] border border-[#8D7B6A]/30 text-xs font-medium uppercase tracking-wider rounded-md transition-all focus-visible:outline-2 focus-visible:outline-[#BDA078]"
                >
                  <Sparkles className="w-4 h-4 text-[#BDA078]" />
                  <span>{t('btnExploreServices')}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleInstagramClick()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent hover:bg-[#EBE4D8]/50 text-[#8D7B6A] hover:text-[#22201F] text-xs font-medium rounded-md transition-all focus-visible:outline-2 focus-visible:outline-[#BDA078]"
                >
                  <Instagram className="w-4 h-4 text-[#BDA078]" />
                  <span>{t('btnVisitInstagram')}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Photo */}
                <div className="relative rounded-2xl overflow-hidden border border-[#8D7B6A]/20 shadow-xl bg-white aspect-4/5">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                    alt="LITE Hair & Beauty Salon Interior Riyadh"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle caption */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#22201F]/80 via-[#22201F]/40 to-transparent p-6 text-white">
                    <p className="font-serif text-lg font-bold">
                      {isAr ? siteConfig.business.nameAr : siteConfig.business.name}
                    </p>
                    <p className="text-xs text-[#BDA078]">
                      {isAr ? 'صالون التجميل الفاخر · الرياض' : 'Luxury Beauty & Styling · Riyadh'}
                    </p>
                    <p className="text-[10px] text-white/60 mt-1">
                      {t('illustrativeNote')}
                    </p>
                  </div>
                </div>

                {/* Floating Rating Card */}
                <div className="absolute -bottom-6 ltr:-left-6 rtl:-right-6 bg-white border border-[#BDA078]/40 rounded-xl p-4 shadow-lg hidden sm:flex items-center gap-3 max-w-xs">
                  <div className="w-10 h-10 rounded-full bg-[#BDA078]/20 flex items-center justify-center text-[#BDA078]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm text-[#22201F]">4.3 / 5</span>
                      <span className="text-[10px] text-[#8D7B6A]">
                        ({isAr ? '451 تقييماً على Google' : '451 Google reviews'})
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8D7B6A]">
                      {isAr ? 'تقييم رسمي موثق' : 'Reported on Google'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Rating & Trust Strip */}
      <RatingTrustStrip />

      {/* 3. Services Preview Section */}
      <section className="py-20 bg-[#F5F0E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#BDA078] mb-2">
                <span>{isAr ? 'خدماتنا' : 'Services'}</span>
                <span aria-hidden="true">·</span>
                <span>{isAr ? siteConfig.business.cityAr : siteConfig.business.cityEn}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#22201F]">
                {t('servicesSectionTitle')}
              </h2>
              <p className="text-sm text-[#8D7B6A] mt-2 max-w-xl">
                {t('servicesSectionSubtitle')}
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#22201F] hover:text-[#BDA078] transition-colors group"
            >
              <span>{t('filterAll')}</span>
              <ArrowIcon className="w-4 h-4 text-[#BDA078] group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
            </Link>
          </div>

          {/* Grid of 5 Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#22201F] hover:bg-[#34312F] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow transition-colors"
            >
              <span>{t('btnExploreServices')}</span>
              <ArrowIcon className="w-4 h-4 text-[#BDA078]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. About Story Teaser */}
      <section className="py-20 bg-[#FAF7F2] border-t border-[#8D7B6A]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#8D7B6A]/20 aspect-4/3 shadow-md bg-white">
                <img
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80"
                  alt="LITE Hair & Beauty Lounge Riyadh"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 ltr:right-3 rtl:left-3 bg-[#22201F]/80 text-[#FAF7F2] text-[10px] px-2 py-0.5 rounded">
                  {t('illustrativeNote')}
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#BDA078]">
                {isAr ? 'عن الصالون' : 'About Us'}
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#22201F] leading-tight">
                {t('aboutStoryTitle')}
              </h2>

              <p className="text-sm text-[#8D7B6A] leading-relaxed">
                {t('aboutStoryP1')}
              </p>

              <p className="text-sm text-[#8D7B6A] leading-relaxed">
                {t('aboutStoryP2')}
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#22201F] hover:text-[#BDA078] transition-colors"
                >
                  <span>{isAr ? 'المزيد عن صالون ايوليت' : 'Discover More About Us'}</span>
                  <ArrowIcon className="w-4 h-4 text-[#BDA078]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Instagram Gallery Strip */}
      <section className="py-16 bg-[#F5F0E9] border-t border-[#8D7B6A]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#BDA078]">
                <Instagram className="w-3.5 h-3.5" />
                <span>{isAr ? 'إنستغرام' : 'Instagram'}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[11px] text-[#8D7B6A] lowercase font-normal">
                  ({t('illustrativeNote')})
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#22201F] mt-1">
                {t('galleryTitle')}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/gallery"
                className="text-xs font-semibold uppercase tracking-wider text-[#22201F] hover:text-[#BDA078] transition-colors"
              >
                {isAr ? 'عرض كامل المعرض' : 'View Full Gallery'}
              </Link>
              <button
                type="button"
                onClick={() => handleInstagramClick()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#22201F] hover:bg-[#34312F] text-white text-xs font-medium rounded-md transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#BDA078]" />
                <span>{t('btnVisitInstagram')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 6 Grid items */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {instagramStripItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInstagramClick(item.instagramPostUrl)}
                className="group relative aspect-square rounded-lg overflow-hidden bg-white border border-[#8D7B6A]/15 cursor-pointer shadow-sm"
              >
                <img
                  src={item.image}
                  alt={isAr ? item.altAr : item.altEn}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#22201F]/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center text-white">
                  <Instagram className="w-5 h-5 text-[#BDA078] mb-1" />
                  <span className="text-[10px] font-medium leading-tight line-clamp-2">
                    {isAr ? item.titleAr : item.titleEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-center text-[#8D7B6A] mt-3">
            {isAr ? siteConfig.business.illustrativeImagesNoteAr : siteConfig.business.illustrativeImagesNoteEn}
          </p>
        </div>
      </section>

      {/* 6. Location & Contact Highlight */}
      <section className="py-20 bg-[#FAF7F2] border-t border-[#8D7B6A]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#22201F] text-[#FAF7F2] rounded-2xl overflow-hidden shadow-xl border border-[#BDA078]/30">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#BDA078]">
                    {isAr ? 'الموقع وساعات العمل' : 'Location & Hours'}
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-[#FAF7F2] mt-1">
                    {isAr ? 'زوري صالون ايوليت في الرياض' : 'Visit LITE Hair & Beauty in Riyadh'}
                  </h2>
                </div>

                <div className="space-y-4 text-xs text-[#FAF7F2]/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#BDA078] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#FAF7F2]">
                        {isAr ? siteConfig.business.addressAr : siteConfig.business.addressEn}
                      </p>
                      <a
                        href={siteConfig.getGoogleMapsLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#BDA078] hover:underline mt-1 font-semibold"
                      >
                        <span>{t('getDirectionsBtn')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#BDA078] shrink-0" />
                    <a
                      href={siteConfig.business.phoneTel}
                      className="text-sm hover:text-[#BDA078] font-mono dir-ltr"
                    >
                      {siteConfig.business.phone}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#BDA078] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#BDA078]">
                        {isAr ? siteConfig.business.reportedClosingTimeAr : siteConfig.business.reportedClosingTime}
                      </p>
                      <p className="text-[11px] text-[#FAF7F2]/60 mt-0.5">
                        {isAr ? siteConfig.business.closingNoteAr : siteConfig.business.closingNoteEn}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#BDA078] hover:bg-[#A58963] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t('navBookNow')}</span>
                  </Link>

                  <a
                    href={siteConfig.getWhatsAppUrl(
                      isAr
                        ? 'السلام عليكم، أود الاستفسار عن مواعيد العمل وحجز موعد في صالون ايوليت.'
                        : 'Hello! I would like to inquire about operating hours and book an appointment at LITE Hair & Beauty.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#FAF7F2]/10 hover:bg-[#25D366] text-[#FAF7F2] text-xs font-medium rounded-md transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t('whatsappHeading')}</span>
                  </a>
                </div>
              </div>

              {/* Map embed / preview representation */}
              <div className="lg:col-span-5 bg-[#34312F] p-4 flex flex-col justify-between border-t lg:border-t-0 lg:ltr:border-l lg:rtl:border-r border-[#FAF7F2]/10">
                <div className="rounded-xl overflow-hidden border border-[#FAF7F2]/10 h-64 lg:h-full relative bg-[#22201F]">
                  <iframe
                    title="LITE Hair & Beauty Riyadh Location Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      'LITE Hair & Beauty, Prince Muhammad Ibn Saad Ibn Abdulaziz Road, Al Aqiq, Riyadh'
                    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0 filter grayscale contrast-125 opacity-85"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute bottom-2 ltr:left-2 rtl:right-2 bg-[#22201F]/90 backdrop-blur-sm text-[#FAF7F2] text-[10px] px-2 py-1 rounded border border-[#BDA078]/30">
                    Al Aqiq District · Riyadh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
