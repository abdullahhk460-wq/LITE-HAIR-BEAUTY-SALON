import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import { SEOHead } from '../components/SEOHead';
import { AlertCircle, Clock } from 'lucide-react';

export const CancellationPolicyPage: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <>
      <SEOHead
        title={t('cancellationTitle')}
        description="Booking and cancellation terms for LITE Hair & Beauty."
      />

      <div className="py-12 bg-[#FAF7F2] min-h-[75vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#22201F]">
              {t('cancellationTitle')}
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
                  ? 'هذه المسودة نموذج استرشادي تجريبي مخصص للعرض الرقمي، وتخضع للمراجعة والاعتماد من إدارة صالون ايوليت.'
                  : 'This cancellation policy is an illustrative template for sales demonstration and is subject to official salon review.'}
              </span>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-8 sm:p-10 shadow-sm space-y-6 text-sm text-[#22201F] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#22201F]">
                {isAr ? '1. إشعار الإلغاء وإعادة الجدولة' : '1. Advance Cancellation Notice'}
              </h2>
              <p className="text-[#8D7B6A]">{t('cancellationP1')}</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#22201F]">
                {isAr ? '2. سياسة الوصول والتأخير' : '2. Punctuality & Grace Period'}
              </h2>
              <p className="text-[#8D7B6A]">{t('cancellationP2')}</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#22201F]">
                {isAr ? '3. المواعيد غير المؤكدة' : '3. Unconfirmed Requests'}
              </h2>
              <p className="text-[#8D7B6A]">
                {isAr
                  ? 'أي طلب يتم إرساله عبر الموقع يعتبر طلباً مبدئياً ولا يصبح موعداً مؤكداً إلا بعد استلام رسالة تأكيد رسمية من موظفي استقبال الصالون عبر واتساب.'
                  : 'Requests submitted through this website are tentative and only become confirmed reservations upon direct reply from our reception team on WhatsApp.'}
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-[#8D7B6A]/15 text-xs text-[#8D7B6A]">
              <p>
                {isAr ? 'للتعديل أو الإلغاء، يرجى التواصل عبر واتساب أو الاتصال على:' : 'To reschedule, please message WhatsApp or call:'}{' '}
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
