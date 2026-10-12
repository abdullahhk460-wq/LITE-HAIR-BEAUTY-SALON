import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { siteConfig } from '../config/site';
import { SEOHead } from '../components/SEOHead';
import {
  Star,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  const reviewsUrl = siteConfig.getGoogleReviewsLink();
  const hasApprovedReviews = siteConfig.approvedReviews.length > 0;

  return (
    <>
      <SEOHead
        title={t('reviewsTitle')}
        description={
          isAr
            ? 'تقييمات صالون ايوليت المعتمدة على Google: 4.3 من 5 استناداً إلى 451 تقييماً حقيقياً بالرياض.'
            : 'LITE Hair & Beauty client ratings in Riyadh: 4.3 out of 5 based on 451 reported Google reviews.'
        }
      />

      <div className="py-12 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#BDA078] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'صالون ايوليت · الرياض' : 'LITE Hair & Beauty · Riyadh'}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#22201F]">
              {t('reviewsTitle')}
            </h1>
            <p className="text-sm text-[#8D7B6A] mt-3 leading-relaxed">
              {t('reviewsSubtitle')}
            </p>
          </div>

          {/* Aggregate Rating Hero Card */}
          <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-8 sm:p-10 shadow-sm mb-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Score visual */}
              <div className="md:col-span-5 text-center md:ltr:border-r md:rtl:border-l md:border-[#8D7B6A]/15 md:pe-8">
                <span className="text-5xl sm:text-6xl font-serif font-extrabold text-[#22201F] tracking-tight">
                  {siteConfig.business.googleRating.score}
                </span>
                <div className="flex items-center justify-center gap-1 my-3 text-[#BDA078]">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-[#BDA078]" />
                  ))}
                  <Star className="w-5 h-5 fill-[#BDA078]/40 text-[#BDA078]" />
                </div>
                <p className="text-xs font-semibold text-[#22201F]">
                  {isAr ? 'تقييم رسمي موثق' : 'Official Google Rating'}
                </p>
                <p className="text-[11px] text-[#8D7B6A] mt-0.5">
                  {isAr
                    ? `${siteConfig.business.googleRating.reviewCount} تقييم مسجل على Google`
                    : `Based on ${siteConfig.business.googleRating.reviewCount} Google reviews`}
                </p>
              </div>

              {/* Context details & External link */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#BDA078]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('googleRatingCardTitle')}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#22201F] leading-relaxed">
                  {t('googleRatingContext')}
                </p>

                <p className="text-xs text-[#8D7B6A] leading-relaxed">
                  {isAr
                    ? 'نحرص في صالون ايوليت على النزاهة والشفافية التامة، ونستقبل آراء عملائنا الكرام باستمرار للارتقاء بجودة الخدمات في الرياض.'
                    : 'We value transparency and authenticity. Our Google profile showcases public feedback from guests visiting our Riyadh salon.'}
                </p>

                <div className="pt-2">
                  <a
                    href={reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22201F] hover:bg-[#34312F] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                  >
                    <span>{t('viewGoogleReviewsLink')}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#BDA078]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Approved Reviews Section (STRICT: Empty state if no reviews approved) */}
          <div className="space-y-6">
            <div className="border-b border-[#8D7B6A]/15 pb-3 flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-[#22201F]">
                {t('approvedReviewsSection')}
              </h2>
              <span className="text-[11px] text-[#8D7B6A]">
                {hasApprovedReviews ? `${siteConfig.approvedReviews.length} reviews` : '0 verified'}
              </span>
            </div>

            {hasApprovedReviews ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siteConfig.approvedReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 bg-white border border-[#8D7B6A]/15 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#22201F]">{rev.author}</span>
                      <div className="flex text-[#BDA078]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#BDA078]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#8D7B6A] leading-relaxed">
                      {isAr ? rev.commentAr : rev.commentEn}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* REQUIRED HONEST EMPTY STATE */
              <div className="bg-white border border-[#8D7B6A]/20 rounded-2xl p-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#8D7B6A]/20 flex items-center justify-center mx-auto text-[#BDA078]">
                  <MessageSquare className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-xl font-bold text-[#22201F]">
                  {t('emptyReviewsTitle')}
                </h3>

                <p className="text-xs sm:text-sm text-[#8D7B6A] max-w-md mx-auto leading-relaxed">
                  {t('emptyReviewsDesc')}
                </p>

                <div className="pt-2">
                  <a
                    href={siteConfig.getWhatsAppUrl(
                      isAr
                        ? 'السلام عليكم، زرت صالون ايوليت وأود مشاركة رأيي وملاحظاتي.'
                        : 'Hello, I visited LITE Hair & Beauty and would like to share my feedback.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#EBE4D8] border border-[#8D7B6A]/30 text-[#22201F] text-xs font-semibold rounded-md transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>{t('leaveFeedbackPrompt')}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
