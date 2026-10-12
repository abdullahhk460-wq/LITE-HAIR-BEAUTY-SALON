import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import { SEOHead } from '../components/SEOHead';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <>
      <SEOHead
        title={t('privacyTitle')}
        description="Privacy policy and data handling guidelines for LITE Hair & Beauty."
      />

      <div className="py-12 bg-[#FAF7F2] min-h-[75vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#22201F]">
              {t('privacyTitle')}
            </h1>
            <p className="text-xs text-[#8D7B6A] uppercase tracking-wider mt-2">
              {isAr ? siteConfig.business.nameAr : siteConfig.business.name} · {siteConfig.business.cityEn}
            </p>
          </div>

          {/* Draft Notice Banner */}
          <div className="mb-8 p-4 bg-[#F5F0E9] border-2 border-[#BDA078] rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#BDA078] shrink-0 mt-0.5" />
            <div className="text-xs text-[#22201F] leading-relaxed">
              <span className="font-bold block mb-0.5">
                {t('policyDraftNotice')}
              </span>
              <span>
                {isAr
                  ? 'هذه المسودة نموذج استرشادي تجريبي مخصص للعرض الرقمي، وتخضع للمراجعة القانونية والاعتماد من إدارة صالون ايوليت.'
                  : 'This policy is an illustrative template for sales demonstration and is subject to official review by salon management.'}
              </span>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-8 sm:p-10 shadow-sm space-y-6 text-sm text-[#22201F] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#22201F]">
                {isAr ? '1. جمع البيانات واستخدامها' : '1. Information Collection & Usage'}
              </h2>
              <p className="text-[#8D7B6A]">{t('privacyP1')}</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#22201F]">
                {isAr ? '2. حماية الخصوصية والأطراف الثالثة' : '2. Data Protection & Third Parties'}
              </h2>
              <p className="text-[#8D7B6A]">{t('privacyP2')}</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#22201F]">
                {isAr ? '3. التواصل عبر واتساب' : '3. WhatsApp Communications'}
              </h2>
              <p className="text-[#8D7B6A]">
                {isAr
                  ? 'عند إرسال طلب حجز، تنتقل البيانات مباشرة عبر تشفير تطبيق واتساب الرسمي للتنسيق مع ممثلي الصالون ولا يتم تخزينها في خوادم طرف ثالث.'
                  : 'Booking requests are directly transferred to the official WhatsApp messaging platform for direct salon communication.'}
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-[#8D7B6A]/15 text-xs text-[#8D7B6A]">
              <p>
                {isAr ? 'العنوان المعتمد:' : 'Physical Location:'}{' '}
                {isAr ? siteConfig.business.addressAr : siteConfig.business.addressEn}
              </p>
              <p>
                {isAr ? 'الهاتف:' : 'Phone:'}{' '}
                <a href={siteConfig.business.phoneTel} className="underline font-mono">
                  {siteConfig.business.phone}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
