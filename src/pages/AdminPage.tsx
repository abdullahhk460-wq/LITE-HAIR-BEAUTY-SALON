import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import {
  getStoredBookings,
  updateBookingStatus,
  saveBooking,
  BookingRecord,
  BookingStatus,
  BOOKINGS_STORAGE_KEY,
} from '../types/booking';
import { SEOHead } from '../components/SEOHead';
import {
  ShieldAlert,
  Lock,
  LogOut,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  FileCode,
  CheckCircle,
  Trash2,
  RefreshCw,
  Eye,
  AlertTriangle,
} from 'lucide-react';

const ADMIN_AUTH_KEY = 'lite_salon_admin_auth';

export const AdminPage: React.FC = () => {
  const { t, language, formatDate, formatPrice, isRTL } = useLanguage();
  const isAr = language === 'ar';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'config'>('bookings');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  // Refresh bookings list
  const refreshBookings = () => {
    setBookings(getStoredBookings());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshBookings();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    // Demo password check - simple demo access
    if (passwordInput.trim() === 'demo' || passwordInput.trim() === 'admin') {
      try {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      setIsAuthenticated(true);
    } else {
      setAuthError(
        isAr
          ? 'كلمة المرور غير صحيحة. استخدمي "demo" للدخول التجريبي.'
          : 'Incorrect password. Use "demo" to access the demo panel.'
      );
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const autofillDemo = () => {
    setPasswordInput('demo');
  };

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    updateBookingStatus(id, newStatus);
    refreshBookings();
  };

  const handleClearData = () => {
    if (
      window.confirm(
        isAr
          ? 'هل أنتِ متأكدة من مسح بيانات الحجوزات من المتصفح؟'
          : 'Are you sure you want to clear booking requests from browser storage?'
      )
    ) {
      localStorage.removeItem(BOOKINGS_STORAGE_KEY);
      refreshBookings();
    }
  };

  const handleLoadSamples = () => {
    const sample1: BookingRecord = {
      id: `DEMO-SAMPLE-1`,
      createdAt: new Date().toISOString(),
      serviceId: 'hair-styling-blowdry',
      serviceNameEn: 'Signature Blowdry & Styling',
      serviceNameAr: 'استشوار وتسريح الشعر الفاخر',
      servicePriceSAR: 180,
      serviceDurationMins: 45,
      dateStr: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      timeSlot: '4:00 PM',
      customerName: 'Noura Al-Dosari',
      customerPhone: '+966 50 123 4567',
      notes: 'Please prepare blowout volume',
      status: 'pending',
    };

    const sample2: BookingRecord = {
      id: `DEMO-SAMPLE-2`,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      serviceId: 'nails-signature-manicure',
      serviceNameEn: 'Signature Spa Manicure',
      serviceNameAr: 'مانيكير سبا الفاخر لليدين',
      servicePriceSAR: 130,
      serviceDurationMins: 45,
      dateStr: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      timeSlot: '6:00 PM',
      customerName: 'Reem Al-Ghamdi',
      customerPhone: '+966 55 987 6543',
      notes: 'Neutral beige polish preferred',
      status: 'confirmed',
    };

    saveBooking(sample1);
    saveBooking(sample2);
    refreshBookings();
  };

  return (
    <>
      <SEOHead
        title={t('adminTitle')}
        description="Demo administration panel for salon booking review and configuration inspection."
      />

      <div className="py-12 bg-[#FAF7F2] min-h-[85vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Prominent Demo Warning Banner (Always visible) */}
          <div className="mb-8 p-4 bg-[#22201F] text-[#FAF7F2] rounded-xl border-2 border-[#BDA078] flex items-start gap-3 shadow-sm">
            <ShieldAlert className="w-5 h-5 text-[#BDA078] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#BDA078] uppercase tracking-wider block">
                {t('adminWarning')}
              </span>
              <p className="text-[#FAF7F2]/80 leading-relaxed">
                {isAr
                  ? 'هذه اللوحة لأغراض العرض التوضيحي فقط، وتعتمد على المتصفح (localStorage) دون حماية سحابية مشفرة. الهدف إيضاح آلية استعراض طلبات الحجز القادمة عبر واتساب.'
                  : 'This administration screen is for sales demonstration purposes only. Data is stored solely in client browser storage and does not claim production database security.'}
              </p>
            </div>
          </div>

          {!isAuthenticated ? (
            /* DEMO LOGIN FORM */
            <div className="max-w-md mx-auto bg-white border border-[#8D7B6A]/20 rounded-2xl p-8 sm:p-10 shadow-md">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#BDA078]/15 text-[#BDA078] flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h1 className="font-serif text-2xl font-bold text-[#22201F]">
                  {t('adminTitle')}
                </h1>
                <p className="text-xs text-[#8D7B6A] mt-1">
                  {t('adminLoginPrompt')}
                </p>
              </div>

              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#22201F] uppercase tracking-wider mb-1.5">
                    {t('adminPasswordPlaceholder')}
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="demo"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#8D7B6A]/25 rounded-lg text-sm text-[#22201F] focus:outline-none focus:border-[#BDA078]"
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={autofillDemo}
                    className="text-[#BDA078] hover:underline font-medium"
                  >
                    {isAr ? 'تعبئة كلمة المرور تلقائياً (demo)' : 'Autofill Demo Password (demo)'}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#22201F] hover:bg-[#34312F] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors shadow"
                >
                  {t('adminLoginBtn')}
                </button>
              </form>
            </div>
          ) : (
            /* LOGGED IN DASHBOARD */
            <div className="space-y-6">
              {/* Dashboard Header Bar */}
              <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#22201F]">
                    {t('adminTitle')}
                  </h1>
                  <p className="text-xs text-[#8D7B6A]">
                    {t('adminSubtitle')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Tab Selector */}
                  <div className="flex items-center gap-1 p-1 bg-[#EBE4D8]/60 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setActiveTab('bookings')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                        activeTab === 'bookings'
                          ? 'bg-[#22201F] text-white'
                          : 'text-[#8D7B6A] hover:text-[#22201F]'
                      }`}
                    >
                      {t('adminBookingsTab')} ({bookings.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('config')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                        activeTab === 'config'
                          ? 'bg-[#22201F] text-white'
                          : 'text-[#8D7B6A] hover:text-[#22201F]'
                      }`}
                    >
                      {t('adminConfigTab')}
                    </button>
                  </div>

                  {/* Logout Button */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-2 text-[#8D7B6A] hover:text-red-600 rounded-lg border border-[#8D7B6A]/20 hover:border-red-300 transition-colors"
                    title={t('adminLogoutBtn')}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* TAB 1: BOOKING REQUESTS */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#8D7B6A]/15 text-xs">
                    <span className="text-[#8D7B6A]">
                      {isAr
                        ? `إجمالي الطلبات في المتصفح: ${bookings.length}`
                        : `Total Requests in Browser Storage: ${bookings.length}`}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleLoadSamples}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#EBE4D8] text-[#22201F] border border-[#8D7B6A]/20 rounded-md font-medium transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#BDA078]" />
                        <span>{t('adminResetData')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleClearData}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-md font-medium transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t('adminClearData')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Bookings Table / Cards */}
                  {bookings.length > 0 ? (
                    <div className="space-y-3">
                      {bookings.map((booking) => {
                        const statusColors: Record<BookingStatus, string> = {
                          pending: 'text-amber-800 bg-amber-50 border-amber-300',
                          confirmed: 'text-emerald-800 bg-emerald-50 border-emerald-300',
                          completed: 'text-blue-800 bg-blue-50 border-blue-300',
                          cancelled: 'text-zinc-600 bg-zinc-100 border-zinc-300',
                        };

                        const customerWhatsAppUrl = siteConfig.getWhatsAppUrl(
                          isAr
                            ? `مرحباً ${booking.customerName}، نتواصل معك من صالون ايوليت بخصوص طلب الحجز رقم ${booking.id}.`
                            : `Hello ${booking.customerName}, reaching out from LITE Hair & Beauty regarding booking ref ${booking.id}.`
                        );

                        return (
                          <div
                            key={booking.id}
                            className="bg-white border border-[#8D7B6A]/20 rounded-xl p-5 shadow-sm space-y-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#8D7B6A]/10 pb-3">
                              <div>
                                <span className="font-mono text-xs font-bold text-[#BDA078]">
                                  {booking.id}
                                </span>
                                <h3 className="font-serif text-base font-bold text-[#22201F] mt-0.5">
                                  {isAr ? booking.serviceNameAr : booking.serviceNameEn}
                                </h3>
                              </div>

                              {/* Status Select dropdown */}
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-[#8D7B6A]">
                                  {t('changeStatus')}:
                                </span>
                                <select
                                  value={booking.status}
                                  onChange={(e) =>
                                    handleStatusChange(
                                      booking.id,
                                      e.target.value as BookingStatus
                                    )
                                  }
                                  className="text-xs py-1 px-2.5 bg-[#FAF7F2] border border-[#8D7B6A]/25 rounded-md font-medium text-[#22201F] focus:outline-none focus:border-[#BDA078]"
                                >
                                  <option value="pending">{t('adminStatusPending')}</option>
                                  <option value="confirmed">{t('adminStatusConfirmed')}</option>
                                  <option value="completed">{t('adminStatusCompleted')}</option>
                                  <option value="cancelled">{t('adminStatusCancelled')}</option>
                                </select>
                              </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                              <div>
                                <span className="text-[10px] text-[#8D7B6A] uppercase tracking-wider block">
                                  {t('dateLabel')} & {t('timeLabel')}
                                </span>
                                <div className="font-medium text-[#22201F] flex items-center gap-1.5 mt-0.5">
                                  <Calendar className="w-3.5 h-3.5 text-[#BDA078]" />
                                  <span>{formatDate(booking.dateStr)} · {booking.timeSlot}</span>
                                </div>
                              </div>

                              <div>
                                <span className="text-[10px] text-[#8D7B6A] uppercase tracking-wider block">
                                  {t('clientLabel')}
                                </span>
                                <div className="font-medium text-[#22201F] mt-0.5">
                                  <span>{booking.customerName}</span>
                                  <span className="text-[#8D7B6A] ms-1">({booking.customerPhone})</span>
                                </div>
                              </div>

                              <div>
                                <span className="text-[10px] text-[#8D7B6A] uppercase tracking-wider block">
                                  {isAr ? 'السعر التجريبي' : 'Demo Price'}
                                </span>
                                <span className="font-bold text-[#22201F] mt-0.5 block">
                                  {formatPrice(booking.servicePriceSAR)}
                                </span>
                              </div>
                            </div>

                            {/* Notes if any */}
                            {booking.notes && (
                              <div className="p-2.5 bg-[#FAF7F2] rounded-lg text-xs text-[#8D7B6A]">
                                <span className="font-semibold text-[#22201F]">
                                  {isAr ? 'ملاحظات العميل: ' : 'Client Notes: '}
                                </span>
                                {booking.notes}
                              </div>
                            )}

                            {/* Bottom direct actions */}
                            <div className="flex items-center justify-between pt-2 border-t border-[#8D7B6A]/10 text-xs">
                              <span className="text-[10px] text-[#8D7B6A]">
                                {isAr ? 'سُجل في: ' : 'Recorded: '}
                                {new Date(booking.createdAt).toLocaleTimeString()}
                              </span>

                              <a
                                href={customerWhatsAppUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:underline font-semibold"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>{t('openCustomerWhatsApp')}</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-12 text-center space-y-4">
                      <Calendar className="w-10 h-10 text-[#8D7B6A]/40 mx-auto" />
                      <h3 className="font-serif text-lg font-bold text-[#22201F]">
                        {t('adminNoBookings')}
                      </h3>
                      <p className="text-xs text-[#8D7B6A] max-w-sm mx-auto">
                        {isAr
                          ? 'يمكنك إجراء حجز تجريبي من صفحة الحجز، أو الضغط على زر تحميل عينات نموذجية للتجربة.'
                          : 'Try booking an appointment on the site or load demo sample requests.'}
                      </p>
                      <button
                        type="button"
                        onClick={handleLoadSamples}
                        className="px-4 py-2 bg-[#22201F] text-white text-xs font-semibold rounded-md"
                      >
                        {t('adminResetData')}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CONFIG INSPECTOR */}
              {activeTab === 'config' && (
                <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="border-b border-[#8D7B6A]/15 pb-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#BDA078]">
                      <FileCode className="w-4 h-4" />
                      <span>{isAr ? 'ملف الإعدادات الموحد' : 'Single Source of Truth'}</span>
                    </div>
                    <h2 className="font-serif text-xl font-bold text-[#22201F] mt-1">
                      /src/config/site.ts
                    </h2>
                    <p className="text-xs text-[#8D7B6A] mt-1">
                      {isAr
                        ? 'استعراض قراءة فقط للمعلومات الحالية، مع إرشادات التخصيص لمالك الصالون.'
                        : 'Read-only inspection of configured values and setup checklist for the salon owner.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#8D7B6A]/15 space-y-1">
                      <span className="font-bold text-[#22201F] block">
                        INSTAGRAM_PROFILE_URL
                      </span>
                      <p className="text-[#8D7B6A] font-mono break-all">
                        {siteConfig.INSTAGRAM_PROFILE_URL || '(empty / not configured yet)'}
                      </p>
                      <span className="text-[10px] text-amber-700 block mt-1">
                        {siteConfig.INSTAGRAM_PROFILE_URL
                          ? 'Active link'
                          : 'Triggers notice modal upon click (Strict rule compliant)'}
                      </span>
                    </div>

                    <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#8D7B6A]/15 space-y-1">
                      <span className="font-bold text-[#22201F] block">
                        GOOGLE_REVIEWS_URL
                      </span>
                      <p className="text-[#8D7B6A] font-mono break-all">
                        {siteConfig.GOOGLE_REVIEWS_URL || '(empty / fallback to search query)'}
                      </p>
                    </div>

                    <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#8D7B6A]/15 space-y-1">
                      <span className="font-bold text-[#22201F] block">
                        Phone & WhatsApp
                      </span>
                      <p className="text-[#22201F] font-mono">
                        {siteConfig.business.phone} (wa.me/{siteConfig.business.whatsappNumber})
                      </p>
                    </div>

                    <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#8D7B6A]/15 space-y-1">
                      <span className="font-bold text-[#22201F] block">
                        Reported Closing Time
                      </span>
                      <p className="text-[#22201F]">
                        {siteConfig.business.reportedClosingTime} (Not presented as full weekly schedule)
                      </p>
                    </div>

                    <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#8D7B6A]/15 space-y-1">
                      <span className="font-bold text-[#22201F] block">
                        Services Catalog
                      </span>
                      <p className="text-[#22201F]">
                        {siteConfig.services.length} demo services across 5 categories
                      </p>
                    </div>

                    <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#8D7B6A]/15 space-y-1">
                      <span className="font-bold text-[#22201F] block">
                        Approved Reviews
                      </span>
                      <p className="text-[#22201F]">
                        {siteConfig.approvedReviews.length} approved reviews (Strictly 0 fake reviews)
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F5F0E9] border border-[#BDA078]/30 rounded-xl text-xs text-[#22201F] space-y-2">
                    <span className="font-bold block text-sm">
                      {isAr ? 'قائمة التحقق لاعتماد الصالون الرسمي:' : 'Salon Owner Handover Checklist:'}
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-[#8D7B6A]">
                      <li>Confirm official Instagram handle & update <code>INSTAGRAM_PROFILE_URL</code></li>
                      <li>Confirm actual services, pricing, and treatment durations</li>
                      <li>Confirm full weekly opening schedule & holiday timings</li>
                      <li>Upload high-resolution photography of Riyadh salon interior</li>
                      <li>Add official Google Maps business profile URL & review link</li>
                      <li>Confirm WhatsApp-enabled business reception phone line</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
