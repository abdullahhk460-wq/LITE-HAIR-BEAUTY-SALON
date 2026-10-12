import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import { getStoredBookings, BookingRecord } from '../types/booking';
import { SEOHead } from '../components/SEOHead';
import {
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  Phone,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const BookingConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { t, language, formatPrice, formatDate, isRTL } = useLanguage();

  const isAr = language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const bookingId = searchParams.get('id');
  const storedList = getStoredBookings();
  const booking: BookingRecord | undefined = bookingId
    ? storedList.find((b) => b.id === bookingId)
    : storedList[0];

  // Prepare fallback WhatsApp URL
  const whatsappUrl = booking
    ? siteConfig.getWhatsAppUrl(
        [
          isAr
            ? '🌸 تأكيد إرسال طلب حجز - صالون ايوليت'
            : '🌸 Appointment Request - LITE Hair & Beauty',
          isAr ? `• الخدمة: ${booking.serviceNameAr}` : `• Service: ${booking.serviceNameEn}`,
          isAr ? `• التاريخ: ${formatDate(booking.dateStr)}` : `• Date: ${formatDate(booking.dateStr)}`,
          isAr ? `• الوقت: ${booking.timeSlot}` : `• Time: ${booking.timeSlot}`,
          isAr ? `• الاسم: ${booking.customerName}` : `• Name: ${booking.customerName}`,
          isAr ? `• رقم المرجع: ${booking.id}` : `• Ref ID: ${booking.id}`,
        ].join('\n')
      )
    : siteConfig.getWhatsAppUrl(
        isAr
          ? 'السلام عليكم، أود تأكيد موعدي في صالون ايوليت.'
          : 'Hello, I would like to confirm my appointment at LITE Hair & Beauty.'
      );

  return (
    <>
      <SEOHead
        title={t('bookingPreparedHeader')}
        description={t('bookingPreparedHonestStatus')}
      />

      <div className="py-16 bg-[#FAF7F2] min-h-[80vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Card */}
          <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-8 sm:p-10 shadow-md text-center space-y-6">
            {/* Status Icon */}
            <div className="w-16 h-16 rounded-full bg-[#BDA078]/20 text-[#BDA078] flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#22201F]">
              {t('bookingPreparedHeader')}
            </h1>

            {/* Crucial Honest Status Banner */}
            <div className="p-4 bg-[#FAF7F2] border-2 border-[#BDA078] rounded-xl text-start space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#22201F]">
                <AlertTriangle className="w-4 h-4 text-[#BDA078] shrink-0" />
                <span className="uppercase tracking-wider">
                  {isAr ? 'حالة الطلب المهمة' : 'Important Status'}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#22201F] leading-relaxed">
                {t('bookingPreparedHonestStatus')}
              </p>
              <p className="text-xs text-[#8D7B6A] leading-relaxed">
                {isAr
                  ? 'يرجى التأكد من إرسال الرسالة النصية الجاهزة في تطبيق واتساب. سيقوم فريق صالون ايوليت بالرد عليك فوراً لتأكيد توفر الوقت واعتماد الموعد.'
                  : 'Please ensure you press "Send" in WhatsApp. Our salon staff will reply directly to confirm availability and lock in your slot.'}
              </p>
            </div>

            {/* Booking Details if found */}
            {booking && (
              <div className="bg-[#FAF7F2] border border-[#8D7B6A]/15 rounded-xl p-5 text-start space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8D7B6A] border-b border-[#8D7B6A]/15 pb-2">
                  <span>{isAr ? 'رقم الطلب المرجعي:' : 'Reference ID:'}</span>
                  <span className="font-mono font-bold text-[#22201F]">{booking.id}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8D7B6A]">{t('selectedService')}</span>
                  <span className="font-serif font-bold text-[#22201F]">
                    {isAr ? booking.serviceNameAr : booking.serviceNameEn}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8D7B6A]">{t('dateLabel')}</span>
                  <span className="font-medium text-[#22201F]">{formatDate(booking.dateStr)}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8D7B6A]">{t('timeLabel')}</span>
                  <span className="font-medium text-[#22201F]">{booking.timeSlot}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8D7B6A]">{t('clientLabel')}</span>
                  <span className="font-medium text-[#22201F]">{booking.customerName}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#8D7B6A]/15">
                  <span className="text-[#8D7B6A]">{isAr ? 'السعر التجريبي' : 'Demo Pricing'}</span>
                  <span className="font-bold font-serif text-[#22201F]">
                    {formatPrice(booking.servicePriceSAR)}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('openWhatsAppAgain')}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={siteConfig.business.phoneTel}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FAF7F2] hover:bg-[#EBE4D8] text-[#22201F] border border-[#8D7B6A]/30 font-medium text-xs rounded-lg transition-colors font-mono"
              >
                <Phone className="w-4 h-4 text-[#BDA078]" />
                <span>{t('callSalonDirectly')} ({siteConfig.business.phone})</span>
              </a>
            </div>

            {/* Bottom Links */}
            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-[#8D7B6A]">
              <Link to="/" className="hover:text-[#22201F] transition-colors">
                {t('navHome')}
              </Link>
              <span>·</span>
              <Link to="/services" className="hover:text-[#22201F] transition-colors">
                {t('navServices')}
              </Link>
              <span>·</span>
              <Link to="/admin" className="text-[#BDA078] hover:underline">
                {t('navAdminDemo')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
