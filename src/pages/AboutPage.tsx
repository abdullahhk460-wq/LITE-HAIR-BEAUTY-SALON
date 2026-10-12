import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import { SEOHead } from '../components/SEOHead';
import { RatingTrustStrip } from '../components/RatingTrustStrip';
import {
  Sparkles,
  MapPin,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Calendar,
  Users,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <>
      <SEOHead
        title={t('aboutTitle')}
        description={
          isAr
            ? 'تعرفي على صالون ايوليت (LITE Hair & Beauty) بالرياض. فلسفتنا في تقديم خدمات تجميل راقية بأجواء مفعمة بالهدوء والضيافة.'
            : 'Learn about LITE Hair & Beauty in Riyadh. Our philosophy of modern elegance, bespoke styling, and luxury hospitality.'
        }
      />

      <div className="py-12 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#BDA078] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'عن الصالون' : 'Our Story'}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#22201F]">
              {t('aboutTitle')}
            </h1>
            <p className="text-sm sm:text-base text-[#8D7B6A] mt-3 leading-relaxed">
              {t('aboutSubtitle')}
            </p>
          </div>

          {/* Editorial Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#BDA078]">
                {t('aboutStoryTitle')}
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#22201F] leading-snug">
                {isAr
                  ? 'وجهة الجمال والراحة في قلب العاصمة'
                  : 'A Refined Haven for Modern Beauty & Wellness'}
              </h2>
              <p className="text-sm text-[#8D7B6A] leading-relaxed">
                {t('aboutStoryP1')}
              </p>
              <p className="text-sm text-[#8D7B6A] leading-relaxed">
                {t('aboutStoryP2')}
              </p>

              <div className="pt-2">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#22201F] hover:bg-[#34312F] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#BDA078]" />
                  <span>{t('btnBookAppointment')}</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden border border-[#8D7B6A]/20 shadow-xl bg-white">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                  alt="LITE Hair & Beauty Riyadh Lounge"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] text-[#8D7B6A] text-center mt-2">
                {isAr ? siteConfig.business.illustrativeImagesNoteAr : siteConfig.business.illustrativeImagesNoteEn}
              </p>
            </div>
          </div>

          {/* Pillars of Care */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white border border-[#8D7B6A]/20 rounded-xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#BDA078]/15 flex items-center justify-center text-[#BDA078]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#22201F]">
                {isAr ? 'ضيافة سعودية راقية' : 'Warm Luxury Hospitality'}
              </h3>
              <p className="text-xs text-[#8D7B6A] leading-relaxed">
                {isAr
                  ? 'نحرص على خلق أجواء من الراحة والترحيب، تتيح لك الاسترخاء التام طوال فترة إقامتك معنا.'
                  : 'We prioritize a calm, welcoming environment designed to let you unwind while our specialists care for you.'}
              </p>
            </div>

            <div className="bg-white border border-[#8D7B6A]/20 rounded-xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#BDA078]/15 flex items-center justify-center text-[#BDA078]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#22201F]">
                {isAr ? 'معايير نظافة وتعقيم صارمة' : 'Hygiene & Product Excellence'}
              </h3>
              <p className="text-xs text-[#8D7B6A] leading-relaxed">
                {isAr
                  ? 'أدوات عناية معقمة ومستحضرات عالمية مختارة بعناية للحفاظ على صحة وجمال شعرك وأظافرك.'
                  : 'Hospital-grade tool sterilization, single-use buffers, and premium salon formulas suited for Riyadh hair care.'}
              </p>
            </div>

            <div className="bg-white border border-[#8D7B6A]/20 rounded-xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#BDA078]/15 flex items-center justify-center text-[#BDA078]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#22201F]">
                {isAr ? 'تقنيات متطورة ومخصصة' : 'Tailored Consultations'}
              </h3>
              <p className="text-xs text-[#8D7B6A] leading-relaxed">
                {isAr
                  ? 'استشارة مخصصة تسبق كل جلسة لضمان الحصول على نتيجة تتناغم مع ملامحك وتفضيلاتك الخاصة.'
                  : 'Every haircut, coloring service, or makeup look begins with an individual consultation tailored to your goals.'}
              </p>
            </div>
          </div>

          {/* Team Notice (Strict anti-fabrication placeholder) */}
          <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-8 sm:p-10 text-center max-w-2xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#8D7B6A]/20 flex items-center justify-center mx-auto text-[#BDA078]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#22201F]">
              {t('teamNoteTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#8D7B6A] leading-relaxed">
              {t('teamNoteDesc')}
            </p>
          </div>
        </div>
      </div>

      <RatingTrustStrip />
    </>
  );
};
