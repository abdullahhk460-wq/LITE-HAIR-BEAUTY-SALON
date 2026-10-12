import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import { Menu, X, Globe, Calendar, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('navHome') },
    { to: '/services', label: t('navServices') },
    { to: '/gallery', label: t('navGallery') },
    { to: '/reviews', label: t('navReviews') },
    { to: '/about', label: t('navAbout') },
    { to: '/contact', label: t('navContact') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Demo Notification Strip */}
      <div className="bg-[#22201F] text-[#F5F0E9] text-[11px] font-medium py-1.5 px-4 text-center border-b border-[#BDA078]/20 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#BDA078] animate-pulse"></span>
        <span>
          {language === 'ar'
            ? 'نسخة عرض تجريبية لصالون ايوليت بالرياض · الأسعار والمواعيد بانتظار التأكيد'
            : 'Sales Demo for LITE Hair & Beauty Riyadh · Demo pricing & schedule'}
        </span>
        <span className="text-[#8D7B6A] hidden sm:inline">|</span>
        <span className="text-[#BDA078] hidden sm:inline">
          {siteConfig.business.phone}
        </span>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#8D7B6A]/15 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <Link
              to="/"
              className="group flex flex-col focus-visible:outline-2 focus-visible:outline-[#BDA078] rounded-sm py-1"
            >
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#22201F] group-hover:text-[#BDA078] transition-colors">
                  {language === 'ar' ? siteConfig.business.nameAr : siteConfig.business.name}
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#BDA078] border border-[#BDA078]/30 px-1.5 py-0.5 rounded">
                  {language === 'ar' ? 'الرياض' : 'Riyadh'}
                </span>
              </div>
              <span className="text-[11px] text-[#8D7B6A] tracking-wider font-light">
                {language === 'ar' ? siteConfig.business.name : siteConfig.business.nameAr} · Al Aqiq
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative text-xs uppercase tracking-widest font-medium transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#BDA078] ${
                      active
                        ? 'text-[#22201F] font-bold'
                        : 'text-[#8D7B6A] hover:text-[#22201F]'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#BDA078] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Items */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#22201F] bg-[#EBE4D8]/60 hover:bg-[#EBE4D8] border border-[#8D7B6A]/20 rounded-md transition-all focus-visible:outline-2 focus-visible:outline-[#BDA078]"
                title={language === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
              >
                <Globe className="w-3.5 h-3.5 text-[#BDA078]" />
                <span className="font-semibold">{language === 'en' ? 'العربية' : 'English'}</span>
              </button>

              {/* Book Appointment CTA */}
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#22201F] hover:bg-[#34312F] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm hover:shadow transition-all focus-visible:outline-2 focus-visible:outline-[#BDA078]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#BDA078]" />
                <span>{t('navBookNow')}</span>
              </Link>
            </div>

            {/* Mobile Actions: Language + Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={toggleLanguage}
                className="px-2.5 py-1 text-xs font-medium text-[#22201F] bg-[#EBE4D8]/60 hover:bg-[#EBE4D8] rounded-md border border-[#8D7B6A]/20"
                aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                {language === 'en' ? 'AR' : 'EN'}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#22201F] hover:text-[#BDA078] rounded-md focus-visible:outline-2 focus-visible:outline-[#BDA078]"
                aria-label={t('menuOpen')}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#22201F]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out panel */}
          <div
            className={`fixed inset-y-0 w-full max-w-xs bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between z-10 transition-transform ${
              isRTL ? 'left-0' : 'right-0'
            }`}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#8D7B6A]/20">
                <div>
                  <span className="font-serif text-lg font-bold text-[#22201F] block">
                    {language === 'ar' ? siteConfig.business.nameAr : siteConfig.business.name}
                  </span>
                  <span className="text-[11px] text-[#8D7B6A]">
                    {language === 'ar' ? siteConfig.business.name : siteConfig.business.nameAr} · Riyadh
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#8D7B6A] hover:text-[#22201F] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#BDA078]"
                  aria-label={t('menuClose')}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2.5 text-sm rounded-lg transition-colors font-medium flex items-center justify-between ${
                        active
                          ? 'bg-[#22201F] text-[#FAF7F2]'
                          : 'text-[#22201F] hover:bg-[#EBE4D8]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {active && <Sparkles className="w-3.5 h-3.5 text-[#BDA078]" />}
                    </Link>
                  );
                })}

                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-xs text-[#8D7B6A] hover:text-[#22201F] hover:bg-[#EBE4D8] rounded-lg mt-2"
                >
                  {t('navAdminDemo')}
                </Link>
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#8D7B6A]/20 space-y-3">
              <Link
                to="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#BDA078] hover:bg-[#A58963] text-white font-semibold text-xs uppercase tracking-wider rounded-md shadow transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('navBookNow')}</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#EBE4D8] hover:bg-[#DFD6C7] text-[#22201F] text-xs font-medium rounded-md transition-colors"
              >
                <Globe className="w-4 h-4 text-[#BDA078]" />
                <span>{language === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}</span>
              </button>

              <div className="text-center text-[11px] text-[#8D7B6A] pt-2">
                <a
                  href={siteConfig.business.phoneTel}
                  className="hover:underline font-mono"
                >
                  {siteConfig.business.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
