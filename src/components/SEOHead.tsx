import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const defaultTitle = isAr
    ? `${siteConfig.business.nameAr} | صالون تجميل فاخر بالرياض`
    : `${siteConfig.business.name} | Luxury Salon in Riyadh`;

  const finalTitle = title ? `${title} | ${isAr ? siteConfig.business.nameAr : siteConfig.business.name}` : defaultTitle;

  const defaultDesc = isAr
    ? `${siteConfig.business.nameAr} في حي العقيق بالرياض. خدمات تصفيف الشعر، الصبغات، البديكير والمناكير، والمكياج الراقي.`
    : `${siteConfig.business.name} in Al Aqiq, Riyadh. Hair styling, custom colors, spa manicure & pedicure, and luxury makeup.`;

  const finalDesc = description || defaultDesc;

  useEffect(() => {
    document.title = finalTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', finalDesc);
    }

    // Update og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', finalTitle);
    }

    // Update og:description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', finalDesc);
    }
  }, [finalTitle, finalDesc]);

  return null;
};
