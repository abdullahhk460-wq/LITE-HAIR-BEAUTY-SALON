import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import { SEOHead } from '../components/SEOHead';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Info,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!senderName.trim() || senderName.trim().length < 2) {
      setErrorMsg(
        isAr
          ? 'يرجى كتابة الاسم الكريم (حرفين على الأقل)'
          : 'Please enter your name (at least 2 characters)'
      );
      return;
    }

    if (!senderMessage.trim()) {
      setErrorMsg(
        isAr ? 'يرجى كتابة نص الرسالة أو الاستفسار' : 'Please enter your message'
      );
      return;
    }

    const lines = [
      isAr
        ? '📩 استفسار جديد عبر الموقع - صالون ايوليت'
        : '📩 Website Inquiry - LITE Hair & Beauty',
      '------------------------',
      isAr ? `• الاسم: ${senderName}` : `• Name: ${senderName}`,
      senderPhone.trim()
        ? isAr
          ? `• رقم الجوال: ${senderPhone}`
          : `• Phone: ${senderPhone}`
        : '',
      isAr ? `• الرسالة: ${senderMessage}` : `• Message: ${senderMessage}`,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = siteConfig.getWhatsAppUrl(lines);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEOHead
        title={t('contactTitle')}
        description={
          isAr
            ? 'تواصلي مع صالون ايوليت في حي العقيق بالرياض. الهاتف، واتساب، العنوان، ومواعيد العمل المعتمدة.'
            : 'Contact LITE Hair & Beauty in Al Aqiq, Riyadh. Phone, WhatsApp, directions, and weekly schedule.'
        }
      />

      <div className="py-12 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#BDA078] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'التواصل والموقع' : 'Location & Connect'}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#22201F]">
              {t('contactTitle')}
            </h1>
            <p className="text-sm sm:text-base text-[#8D7B6A] mt-3 leading-relaxed">
              {t('contactSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            {/* Col 1: Contact Details & Weekly Schedule */}
            <div className="lg:col-span-6 space-y-8">
              {/* Salon Details Card */}
              <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <h2 className="font-serif text-xl font-bold text-[#22201F]">
                  {t('contactInfoHeading')}
                </h2>

                <div className="space-y-5 text-xs text-[#22201F]">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#BDA078]/15 flex items-center justify-center text-[#BDA078] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#8D7B6A] uppercase tracking-wider block text-[10px]">
                        {t('addressHeading')}
                      </span>
                      <p className="text-sm font-medium mt-0.5">
                        {isAr ? siteConfig.business.addressAr : siteConfig.business.addressEn}
                      </p>
                      <a
                        href={siteConfig.getGoogleMapsLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#BDA078] hover:underline font-semibold mt-1"
                      >
                        <span>{t('getDirectionsBtn')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#BDA078]/15 flex items-center justify-center text-[#BDA078] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#8D7B6A] uppercase tracking-wider block text-[10px]">
                        {t('phoneHeading')}
                      </span>
                      <a
                        href={siteConfig.business.phoneTel}
                        className="text-sm font-mono hover:text-[#BDA078] transition-colors block mt-0.5 dir-ltr text-start"
                      >
                        {siteConfig.business.phone}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#8D7B6A] uppercase tracking-wider block text-[10px]">
                        {t('whatsappHeading')}
                      </span>
                      <a
                        href={siteConfig.getWhatsAppUrl(
                          isAr
                            ? 'مرحباً، أود التواصل مع صالون ايوليت.'
                            : 'Hello, I would like to connect with LITE Hair & Beauty.'
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:text-[#25D366] transition-colors block mt-0.5"
                      >
                        {isAr ? 'محادثة فورية مع فريق الاستقبال' : 'Instant chat with salon team'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Hours Card from config */}
              <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#8D7B6A]/15 pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#BDA078]" />
                    <h3 className="font-serif text-lg font-bold text-[#22201F]">
                      {t('hoursHeading')}
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold text-[#BDA078] uppercase">
                    {t('reportedClosingBadge')}
                  </span>
                </div>

                <div className="divide-y divide-[#8D7B6A]/10 text-xs">
                  {siteConfig.openingHours.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-2.5 flex items-center justify-between"
                    >
                      <span className="font-medium text-[#22201F]">
                        {isAr ? item.dayAr : item.dayEn}
                      </span>
                      <span className="text-[#8D7B6A] font-mono">
                        {isAr ? item.hoursAr : item.hoursEn}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-[#F5F0E9] rounded-lg text-xs text-[#8D7B6A] flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#BDA078] shrink-0 mt-0.5" />
                  <span>{t('hoursDisclaimer')}</span>
                </div>
              </div>
            </div>

            {/* Col 2: Validated Contact Form (Strictly Opens WhatsApp, never fake success!) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-serif text-xl font-bold text-[#22201F]">
                    {t('sendMessageTitle')}
                  </h2>
                  <p className="text-xs text-[#8D7B6A] mt-1 leading-relaxed">
                    {t('contactFormNote')}
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#22201F] uppercase tracking-wider mb-1.5">
                      {t('fullNameLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder={t('fullNamePlaceholder')}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#8D7B6A]/25 rounded-lg text-sm text-[#22201F] focus:outline-none focus:border-[#BDA078]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#22201F] uppercase tracking-wider mb-1.5">
                      {t('phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder={t('phonePlaceholder')}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#8D7B6A]/25 rounded-lg text-sm text-[#22201F] focus:outline-none focus:border-[#BDA078] dir-ltr text-start"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#22201F] uppercase tracking-wider mb-1.5">
                      {isAr ? 'نص الاستفسار' : 'Your Message'} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      placeholder={t('yourMessagePlaceholder')}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#8D7B6A]/25 rounded-lg text-sm text-[#22201F] focus:outline-none focus:border-[#BDA078]"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t('sendWhatsAppBtn')}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Map Embed Card */}
              <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl overflow-hidden p-4 shadow-sm">
                <div className="rounded-xl overflow-hidden h-64 border border-[#8D7B6A]/20">
                  <iframe
                    title="LITE Hair & Beauty Google Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      'LITE Hair & Beauty, Prince Muhammad Ibn Saad Ibn Abdulaziz Road, Al Aqiq, Riyadh'
                    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
