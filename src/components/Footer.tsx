import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import { useInstagram } from '../context/InstagramContext';
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  Star,
  ShieldAlert,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const { handleInstagramClick } = useInstagram();

  const isAr = language === 'ar';
  const whatsappUrl = siteConfig.getWhatsAppUrl(
    isAr
      ? 'السلام عليكم، أود الاستفسار عن خدمات صالون ايوليت بالرياض.'
      : 'Hello! I would like to inquire about services at LITE Hair & Beauty.'
  );

  return (
    <footer className="bg-[#22201F] text-[#FAF7F2] border-t border-[#BDA078]/25 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-[#FAF7F2]/10">
          {/* Col 1: Business Identity */}
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
                {isAr ? siteConfig.business.nameAr : siteConfig.business.name}
              </h3>
              <p className="text-xs text-[#BDA078] tracking-widest uppercase mt-1">
                {isAr ? siteConfig.business.name : siteConfig.business.nameAr} · {siteConfig.business.cityEn}
              </p>
            </div>
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
              {isAr ? siteConfig.business.subtextAr : siteConfig.business.subtextEn}
            </p>

            {/* Google Rating strip */}
            <div className="pt-2">
              <a
                href={siteConfig.getGoogleReviewsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#FAF7F2]/80 hover:text-[#BDA078] transition-colors group"
              >
                <div className="flex items-center text-[#BDA078]">
                  <Star className="w-3.5 h-3.5 fill-[#BDA078]" />
                  <span className="font-bold ms-1">4.3</span>
                </div>
                <span>·</span>
                <span className="underline decoration-[#BDA078]/40 group-hover:decoration-[#BDA078]">
                  {isAr ? '451 تقييماً على Google' : '451 reviews on Google'}
                </span>
                <ArrowUpRight className="w-3 h-3 text-[#BDA078]" />
              </a>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleInstagramClick()}
                className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 hover:bg-[#BDA078] hover:text-[#22201F] text-[#FAF7F2] flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-[#BDA078]"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 hover:bg-[#25D366] hover:text-white text-[#FAF7F2] flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-[#BDA078]"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#BDA078] mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/75">
              <li>
                <Link to="/" className="hover:text-[#BDA078] transition-colors">
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#BDA078] transition-colors">
                  {t('navServices')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#BDA078] transition-colors">
                  {t('navGallery')}
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-[#BDA078] transition-colors">
                  {t('navReviews')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#BDA078] transition-colors">
                  {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#BDA078] transition-colors">
                  {t('navContact')}
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-[#BDA078] transition-colors font-semibold text-[#BDA078]">
                  {t('navBookNow')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Location & Phone */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#BDA078] mb-4">
              {t('addressHeading')}
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-[#FAF7F2]/80 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#BDA078] shrink-0 mt-0.5" />
              <div>
                <p>{isAr ? siteConfig.business.addressAr : siteConfig.business.addressEn}</p>
                <a
                  href={siteConfig.getGoogleMapsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#BDA078] hover:underline mt-1 text-[11px]"
                >
                  <span>{t('getDirectionsBtn')}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#FAF7F2]/80 pt-2">
              <Phone className="w-4 h-4 text-[#BDA078] shrink-0" />
              <a
                href={siteConfig.business.phoneTel}
                className="hover:text-[#BDA078] transition-colors font-mono dir-ltr"
              >
                {siteConfig.business.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#FAF7F2]/80">
              <MessageCircle className="w-4 h-4 text-[#BDA078] shrink-0" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#BDA078] transition-colors"
              >
                {isAr ? 'محادثة فورية على واتساب' : 'Chat on WhatsApp'}
              </a>
            </div>
          </div>

          {/* Col 4: Schedule / Hours notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#BDA078] mb-4">
              {t('hoursHeading')}
            </h4>
            <div className="bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 rounded-lg p-3 text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#BDA078] font-medium">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{isAr ? siteConfig.business.reportedClosingTimeAr : siteConfig.business.reportedClosingTime}</span>
              </div>
              <p className="text-[11px] text-[#FAF7F2]/70 leading-relaxed">
                {isAr ? siteConfig.business.closingNoteAr : siteConfig.business.closingNoteEn}
              </p>
            </div>

            <div className="pt-2 space-y-1.5 text-[11px] text-[#FAF7F2]/60">
              <Link to="/privacy-policy" className="block hover:text-[#FAF7F2] transition-colors">
                {t('privacyTitle')} (Draft)
              </Link>
              <Link to="/cancellation-policy" className="block hover:text-[#FAF7F2] transition-colors">
                {t('cancellationTitle')} (Draft)
              </Link>
              <Link to="/admin" className="block text-[#BDA078]/80 hover:text-[#BDA078] transition-colors">
                {t('navAdminDemo')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Banner & Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF7F2]/50">
          <div className="flex items-center gap-2 text-center sm:text-start">
            <ShieldAlert className="w-4 h-4 text-[#BDA078] shrink-0" />
            <span>{t('salesDemoDisclaimer')}</span>
          </div>
          <div className="text-center sm:text-end shrink-0">
            © {new Date().getFullYear()} {isAr ? siteConfig.business.nameAr : siteConfig.business.name}. {t('rightsReserved')}
          </div>
        </div>
      </div>
    </footer>
  );
};
