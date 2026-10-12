import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig, ServiceItem } from '../config/site';
import { SEOHead } from '../components/SEOHead';
import { BookingRecord, saveBooking } from '../types/booking';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  FileText,
  Check,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

const DRAFT_BOOKING_KEY = 'lite_salon_booking_draft';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, language, formatPrice, formatDate, isRTL } = useLanguage();

  const isAr = language === 'ar';
  const ArrowNext = isRTL ? ArrowLeft : ArrowRight;
  const ArrowPrev = isRTL ? ArrowRight : ArrowLeft;

  // Retrieve initial service from query or draft
  const initialServiceId = searchParams.get('service');

  // Multi-step wizard state (1 to 6)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(() => {
    if (initialServiceId) return initialServiceId;
    try {
      const draft = localStorage.getItem(DRAFT_BOOKING_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.selectedServiceId) return parsed.selectedServiceId;
      }
    } catch {
      // ignore
    }
    return siteConfig.services[0].id;
  });

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    try {
      const draft = localStorage.getItem(DRAFT_BOOKING_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.selectedDate) return parsed.selectedDate;
      }
    } catch {
      // ignore
    }
    // Default to tomorrow
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(() => {
    try {
      const draft = localStorage.getItem(DRAFT_BOOKING_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.selectedTimeSlot) return parsed.selectedTimeSlot;
      }
    } catch {
      // ignore
    }
    return siteConfig.timeSlots[0];
  });

  const [customerName, setCustomerName] = useState<string>(() => {
    try {
      const draft = localStorage.getItem(DRAFT_BOOKING_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.customerName) return parsed.customerName;
      }
    } catch {
      // ignore
    }
    return '';
  });

  const [customerPhone, setCustomerPhone] = useState<string>(() => {
    try {
      const draft = localStorage.getItem(DRAFT_BOOKING_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.customerPhone) return parsed.customerPhone;
      }
    } catch {
      // ignore
    }
    return '';
  });

  const [customerNotes, setCustomerNotes] = useState<string>(() => {
    try {
      const draft = localStorage.getItem(DRAFT_BOOKING_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.customerNotes) return parsed.customerNotes;
      }
    } catch {
      // ignore
    }
    return '';
  });

  const [policyAgreed, setPolicyAgreed] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync state to draft in localStorage so language changes don't lose progress
  useEffect(() => {
    try {
      localStorage.setItem(
        DRAFT_BOOKING_KEY,
        JSON.stringify({
          selectedServiceId,
          selectedDate,
          selectedTimeSlot,
          customerName,
          customerPhone,
          customerNotes,
        })
      );
    } catch {
      // ignore
    }
  }, [
    selectedServiceId,
    selectedDate,
    selectedTimeSlot,
    customerName,
    customerPhone,
    customerNotes,
  ]);

  // Selected service object
  const currentService = useMemo(() => {
    return (
      siteConfig.services.find((s) => s.id === selectedServiceId) ||
      siteConfig.services[0]
    );
  }, [selectedServiceId]);

  // Generate next 30 days for date picker (strictly past dates disabled)
  const availableDates = useMemo(() => {
    const list: { iso: string; dateObj: Date; dayName: string; dayNum: number; monthName: string }[] = [];
    const today = new Date();
    // Starting from tomorrow up to 30 days ahead
    for (let i = 1; i <= 30; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = new Intl.DateTimeFormat(isAr ? 'ar-SA' : 'en-US', {
        weekday: 'short',
      }).format(d);
      const monthName = new Intl.DateTimeFormat(isAr ? 'ar-SA' : 'en-US', {
        month: 'short',
      }).format(d);
      list.push({
        iso,
        dateObj: d,
        dayName,
        dayNum: d.getDate(),
        monthName,
      });
    }
    return list;
  }, [isAr]);

  // Step validation
  const validateCurrentStep = (): boolean => {
    setValidationError('');
    if (currentStep === 1) {
      if (!selectedServiceId) {
        setValidationError(isAr ? 'يرجى اختيار الخدمة' : 'Please select a service');
        return false;
      }
    } else if (currentStep === 2) {
      if (!selectedDate) {
        setValidationError(isAr ? 'يرجى اختيار التاريخ' : 'Please select a date');
        return false;
      }
    } else if (currentStep === 3) {
      if (!selectedTimeSlot) {
        setValidationError(isAr ? 'يرجى اختيار الوقت' : 'Please select a time slot');
        return false;
      }
    } else if (currentStep === 4) {
      if (!customerName.trim() || customerName.trim().length < 2) {
        setValidationError(
          isAr
            ? 'يرجى كتابة الاسم الكريم (حرفين على الأقل)'
            : 'Please enter your full name (at least 2 characters)'
        );
        return false;
      }
      const digitsOnly = customerPhone.replace(/\D/g, '');
      if (!digitsOnly || digitsOnly.length < 8) {
        setValidationError(
          isAr
            ? 'يرجى إدخال رقم جوال صالح (8 أرقام على الأقل)'
            : 'Please enter a valid phone number (at least 8 digits)'
        );
        return false;
      }
    } else if (currentStep === 5) {
      if (!policyAgreed) {
        setValidationError(
          isAr
            ? 'يرجى الموافقة على شروط الحجز التجريبي للمتابعة'
            : 'Please agree to the demo booking terms to continue'
        );
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handleBack = () => {
    setValidationError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Step 6 / Final submission
  const handleSubmitBooking = () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    const bookingId = `LITE-${Date.now().toString(36).toUpperCase()}`;
    const newRecord: BookingRecord = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      serviceId: currentService.id,
      serviceNameEn: currentService.nameEn,
      serviceNameAr: currentService.nameAr,
      servicePriceSAR: currentService.priceSAR,
      serviceDurationMins: currentService.durationMinutes,
      dateStr: selectedDate,
      timeSlot: selectedTimeSlot,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      notes: customerNotes.trim() || undefined,
      status: 'pending',
    };

    // Save to local storage for persistence & Admin view
    saveBooking(newRecord);

    // Format WhatsApp message prefilled URL
    const messageLines = [
      isAr
        ? '🌸 طلب حجز موعد جديد - صالون ايوليت (LITE Hair & Beauty)'
        : '🌸 New Appointment Request - LITE Hair & Beauty (Riyadh)',
      '--------------------------',
      isAr ? `• الخدمة: ${currentService.nameAr}` : `• Service: ${currentService.nameEn}`,
      isAr ? `• التاريخ: ${formatDate(selectedDate)}` : `• Date: ${formatDate(selectedDate)}`,
      isAr ? `• الوقت: ${selectedTimeSlot}` : `• Time: ${selectedTimeSlot}`,
      isAr ? `• الاسم: ${customerName}` : `• Name: ${customerName}`,
      isAr ? `• رقم الجوال: ${customerPhone}` : `• Phone: ${customerPhone}`,
      customerNotes.trim()
        ? isAr
          ? `• ملاحظات: ${customerNotes.trim()}`
          : `• Notes: ${customerNotes.trim()}`
        : '',
      '--------------------------',
      isAr
        ? 'ملاحظة: هذا طلب حجز موعد تجريبي بانتظار تأكيد الصالون.'
        : 'Note: Demo appointment request pending salon reply & confirmation.',
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = siteConfig.getWhatsAppUrl(messageLines);

    // Short timeout to simulate preparation and prevent dead clicks
    setTimeout(() => {
      // Clear draft
      try {
        localStorage.removeItem(DRAFT_BOOKING_KEY);
      } catch {
        // ignore
      }
      setIsSubmitting(false);

      // Open WhatsApp in new window/tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Navigate to booking confirmation page with booking ID
      navigate(`/booking-confirmation?id=${bookingId}`);
    }, 400);
  };

  const stepsList = [
    { num: 1, title: t('step1Title') },
    { num: 2, title: t('step2Title') },
    { num: 3, title: t('step3Title') },
    { num: 4, title: t('step4Title') },
    { num: 5, title: t('step5Title') },
    { num: 6, title: t('step6Title') },
  ];

  return (
    <>
      <SEOHead
        title={t('bookingTitle')}
        description={
          isAr
            ? 'احجزي موعدك في صالون ايوليت بالرياض. اختاري الخدمة والوقت المناسب وسيتم تنسيق طلبك فوراً عبر واتساب.'
            : 'Book your luxury appointment at LITE Hair & Beauty in Riyadh. 6-step request flow finalized via WhatsApp.'
        }
      />

      <div className="py-12 bg-[#FAF7F2] min-h-[80vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#BDA078] mb-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{isAr ? siteConfig.business.nameAr : siteConfig.business.name}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#22201F]">
              {t('bookingTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[#8D7B6A] mt-2 max-w-xl mx-auto leading-relaxed">
              {t('bookingSubtitle')}
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="mb-10 bg-white border border-[#8D7B6A]/15 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-[#EBE4D8] z-0" />

              {stepsList.map((st) => {
                const isCompleted = currentStep > st.num;
                const isCurrent = currentStep === st.num;
                return (
                  <div
                    key={st.num}
                    className="relative z-10 flex flex-col items-center"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                        isCompleted
                          ? 'bg-[#22201F] text-[#FAF7F2]'
                          : isCurrent
                          ? 'bg-[#BDA078] text-white ring-4 ring-[#BDA078]/20'
                          : 'bg-[#F5F0E9] text-[#8D7B6A] border border-[#8D7B6A]/30'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : st.num}
                    </div>
                    <span className="hidden sm:block text-[10px] font-medium text-[#8D7B6A] mt-1 text-center">
                      {st.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Validation error display */}
          {validationError && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2.5 text-xs text-red-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Form Container */}
          <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-6 sm:p-10 shadow-sm mb-8">
            {/* STEP 1: Select Service */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="border-b border-[#8D7B6A]/15 pb-4">
                  <h2 className="font-serif text-xl font-bold text-[#22201F]">
                    {t('step1Title')}
                  </h2>
                  <p className="text-xs text-[#8D7B6A] mt-1">
                    {isAr
                      ? 'اختاري الخدمة المرغوبة من قائمة خدمات الصالون'
                      : 'Choose your desired service from our bespoke salon menu.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-1">
                  {siteConfig.services.map((svc) => {
                    const isSelected = selectedServiceId === svc.id;
                    const name = isAr ? svc.nameAr : svc.nameEn;
                    const category = isAr ? svc.categoryNameAr : svc.categoryNameEn;
                    return (
                      <div
                        key={svc.id}
                        onClick={() => setSelectedServiceId(svc.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-[#FAF7F2] border-[#BDA078] ring-1 ring-[#BDA078] shadow-sm'
                            : 'bg-white border-[#8D7B6A]/20 hover:border-[#8D7B6A]/50'
                        }`}
                      >
                        <img
                          src={svc.image}
                          alt={name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-[#BDA078] font-semibold block">
                            {category}
                          </span>
                          <h3 className="font-serif text-sm font-bold text-[#22201F] truncate">
                            {name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-[#8D7B6A] mt-1">
                            <span>{svc.durationMinutes} {t('minutes')}</span>
                            <span>·</span>
                            <span className="font-semibold text-[#22201F]">
                              {formatPrice(svc.priceSAR)}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                            isSelected
                              ? 'bg-[#BDA078] border-[#BDA078] text-white'
                              : 'border-[#8D7B6A]/40'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Choose Date */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="border-b border-[#8D7B6A]/15 pb-4">
                  <h2 className="font-serif text-xl font-bold text-[#22201F]">
                    {t('step2Title')}
                  </h2>
                  <p className="text-xs text-[#8D7B6A] mt-1">
                    {t('selectDateLabel')} · {t('pastDatesDisabled')}
                  </p>
                </div>

                {/* Horizontal Date Picker Cards */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-80 overflow-y-auto p-1">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.iso;
                    return (
                      <button
                        key={item.iso}
                        type="button"
                        onClick={() => setSelectedDate(item.iso)}
                        className={`p-3 rounded-xl border text-center transition-all focus-visible:outline-2 focus-visible:outline-[#BDA078] ${
                          isSelected
                            ? 'bg-[#22201F] border-[#22201F] text-white shadow'
                            : 'bg-[#FAF7F2] border-[#8D7B6A]/20 hover:border-[#BDA078] text-[#22201F]'
                        }`}
                      >
                        <span className="text-[11px] block font-medium opacity-80">
                          {item.dayName}
                        </span>
                        <span className="text-xl font-bold font-serif block my-0.5">
                          {item.dayNum}
                        </span>
                        <span className="text-[10px] block opacity-80">
                          {item.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3 bg-[#F5F0E9] rounded-lg text-xs text-[#8D7B6A] flex items-center justify-between">
                  <span>{isAr ? 'التاريخ المحدد:' : 'Selected Date:'}</span>
                  <span className="font-bold text-[#22201F]">
                    {formatDate(selectedDate)}
                  </span>
                </div>
              </div>
            )}

            {/* STEP 3: Choose Time Slot */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="border-b border-[#8D7B6A]/15 pb-4">
                  <h2 className="font-serif text-xl font-bold text-[#22201F]">
                    {t('step3Title')}
                  </h2>
                  <p className="text-xs text-[#8D7B6A] mt-1">
                    {t('selectTimeSlot')} · {isAr ? 'المواعيد المتاحة حسب جدول الصالون' : 'Available based on salon operating window'}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {siteConfig.timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-4 rounded-xl border text-center font-medium text-sm transition-all flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-[#BDA078] ${
                          isSelected
                            ? 'bg-[#22201F] border-[#22201F] text-white shadow'
                            : 'bg-[#FAF7F2] border-[#8D7B6A]/20 hover:border-[#BDA078] text-[#22201F]'
                        }`}
                      >
                        <Clock className={`w-4 h-4 ${isSelected ? 'text-[#BDA078]' : 'text-[#8D7B6A]'}`} />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3 bg-[#F5F0E9] rounded-lg text-xs text-[#8D7B6A] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#BDA078] shrink-0" />
                  <span>
                    {isAr ? siteConfig.business.closingNoteAr : siteConfig.business.closingNoteEn}
                  </span>
                </div>
              </div>
            )}

            {/* STEP 4: Customer Details */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="border-b border-[#8D7B6A]/15 pb-4">
                  <h2 className="font-serif text-xl font-bold text-[#22201F]">
                    {t('step4Title')}
                  </h2>
                  <p className="text-xs text-[#8D7B6A] mt-1">
                    {isAr
                      ? 'يرجى تزويدنا ببيانات التواصل لتأكيد الموعد معك'
                      : 'Provide contact details so salon management can reach out.'}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#22201F] uppercase tracking-wider mb-1.5">
                      {t('fullNameLabel')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute top-1/2 -translate-y-1/2 ltr:left-3.5 rtl:right-3.5 w-4 h-4 text-[#8D7B6A]" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={t('fullNamePlaceholder')}
                        className="w-full ltr:pl-10 rtl:pr-10 py-3 bg-[#FAF7F2] border border-[#8D7B6A]/25 rounded-lg text-sm text-[#22201F] focus:outline-none focus:border-[#BDA078] focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold text-[#22201F] uppercase tracking-wider mb-1.5">
                      {t('phoneLabel')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute top-1/2 -translate-y-1/2 ltr:left-3.5 rtl:right-3.5 w-4 h-4 text-[#8D7B6A]" />
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder={t('phonePlaceholder')}
                        className="w-full ltr:pl-10 rtl:pr-10 py-3 bg-[#FAF7F2] border border-[#8D7B6A]/25 rounded-lg text-sm text-[#22201F] focus:outline-none focus:border-[#BDA078] focus:bg-white dir-ltr text-start"
                        required
                      />
                    </div>
                    <span className="text-[11px] text-[#8D7B6A] mt-1 block">
                      {isAr
                        ? 'رقم هاتف يعمل على تطبيق واتساب لاستلام التأكيد'
                        : 'A WhatsApp-enabled number for direct confirmation.'}
                    </span>
                  </div>

                  {/* Special Requests / Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-[#22201F] uppercase tracking-wider mb-1.5">
                      {t('notesLabel')}
                    </label>
                    <div className="relative">
                      <FileText className="absolute top-3 ltr:left-3.5 rtl:right-3.5 w-4 h-4 text-[#8D7B6A]" />
                      <textarea
                        rows={3}
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        placeholder={t('notesPlaceholder')}
                        className="w-full ltr:pl-10 rtl:pr-10 py-3 bg-[#FAF7F2] border border-[#8D7B6A]/25 rounded-lg text-sm text-[#22201F] focus:outline-none focus:border-[#BDA078] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Review & Consent */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="border-b border-[#8D7B6A]/15 pb-4">
                  <h2 className="font-serif text-xl font-bold text-[#22201F]">
                    {t('step5Title')}
                  </h2>
                  <p className="text-xs text-[#8D7B6A] mt-1">
                    {isAr
                      ? 'راجعي تفاصيل الموعد قبل المتابعة لإرسال الطلب'
                      : 'Review your appointment summary and accept the booking terms.'}
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-[#FAF7F2] border border-[#BDA078]/30 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#8D7B6A]/15 pb-3">
                    <span className="text-xs text-[#8D7B6A]">{t('selectedService')}</span>
                    <span className="font-serif font-bold text-sm text-[#22201F]">
                      {isAr ? currentService.nameAr : currentService.nameEn}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#8D7B6A]/15 pb-3">
                    <span className="text-xs text-[#8D7B6A]">{t('dateLabel')}</span>
                    <span className="text-xs font-semibold text-[#22201F]">
                      {formatDate(selectedDate)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#8D7B6A]/15 pb-3">
                    <span className="text-xs text-[#8D7B6A]">{t('timeLabel')}</span>
                    <span className="text-xs font-semibold text-[#22201F]">
                      {selectedTimeSlot}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#8D7B6A]/15 pb-3">
                    <span className="text-xs text-[#8D7B6A]">{t('clientLabel')}</span>
                    <span className="text-xs font-semibold text-[#22201F]">
                      {customerName} ({customerPhone})
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[#8D7B6A]">{isAr ? 'السعر التقديري' : 'Estimated Demo Price'}</span>
                    <span className="text-base font-bold font-serif text-[#22201F]">
                      {formatPrice(currentService.priceSAR)}
                    </span>
                  </div>
                </div>

                {/* Demo Pricing Badge */}
                <div className="bg-[#F5F0E9] border border-[#BDA078]/30 rounded p-3 text-xs text-[#8D7B6A]">
                  <span className="font-semibold text-[#22201F] block mb-0.5">
                    {isAr ? siteConfig.business.demoBadgeAr : siteConfig.business.demoBadgeEn}
                  </span>
                  <span>
                    {isAr
                      ? 'الأسعار والخدمات قابلة للتأكيد والاعتماد النهائي من إدارة الصالون.'
                      : 'Demo pricing and schedules to be confirmed by salon management.'}
                  </span>
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={policyAgreed}
                      onChange={(e) => setPolicyAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#BDA078] rounded border-[#8D7B6A]/30 focus:ring-[#BDA078]"
                    />
                    <span className="text-xs text-[#22201F] leading-relaxed">
                      {t('policyAgreementLabel')}
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 6: Submission State & WhatsApp action */}
            {currentStep === 6 && (
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="w-8 h-8" />
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#22201F]">
                  {t('step6Title')}
                </h2>

                <p className="text-sm text-[#8D7B6A] max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? 'عند الضغط على الزر، سيتم فتح تطبيق واتساب مع رسالة جاهزة تتضمن تفاصيل موعدك لإرسالها مباشرة لفريق الصالون.'
                    : 'Clicking below will format your booking request directly into WhatsApp for direct transmission to the salon.'}
                </p>

                {/* Honest Status Callout */}
                <div className="p-4 bg-[#FAF7F2] border border-[#BDA078]/40 rounded-xl max-w-lg mx-auto text-start">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#22201F] mb-1">
                    <Sparkles className="w-4 h-4 text-[#BDA078]" />
                    <span>{t('bookingPreparedHeader')}</span>
                  </div>
                  <p className="text-xs text-[#8D7B6A] leading-relaxed">
                    {t('bookingPreparedHonestStatus')}
                  </p>
                </div>

                <div className="pt-4 max-w-md mx-auto">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmitBooking}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] disabled:bg-[#8D7B6A]/50 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[#25D366]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isSubmitting ? t('submitting') : t('submitBooking')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons (Steps 1 to 5) */}
            {currentStep < 6 && (
              <div className="mt-8 pt-6 border-t border-[#8D7B6A]/15 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#8D7B6A] hover:text-[#22201F] transition-colors"
                  >
                    <ArrowPrev className="w-4 h-4" />
                    <span>{t('prevStep')}</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#22201F] hover:bg-[#34312F] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow transition-colors"
                >
                  <span>{t('nextStep')}</span>
                  <ArrowNext className="w-4 h-4 text-[#BDA078]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
