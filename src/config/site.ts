/**
 * Single source of truth for LITE Hair & Beauty (صالون ايوليت)
 * Riyadh, Saudi Arabia
 */

export interface ServiceItem {
  id: string;
  category: 'hair' | 'color' | 'nails' | 'makeup' | 'other';
  categoryNameEn: string;
  categoryNameAr: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  detailsEn: string;
  detailsAr: string;
  durationMinutes: number;
  priceSAR: number;
  benefitsEn: string[];
  benefitsAr: string[];
  image: string;
}

export interface GalleryItem {
  id: string;
  category: 'hair' | 'nails' | 'makeup' | 'salon';
  titleEn: string;
  titleAr: string;
  altEn: string;
  altAr: string;
  image: string;
  instagramPostUrl?: string; // Optional specific post, falls back to INSTAGRAM_PROFILE_URL
}

export interface OpeningHourDay {
  dayEn: string;
  dayAr: string;
  hoursEn: string;
  hoursAr: string;
  isReportedClosing: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  commentEn: string;
  commentAr: string;
}

export const siteConfig = {
  business: {
    name: 'LITE Hair & Beauty',
    nameAr: 'صالون ايوليت',
    tagline: 'Look Good. Feel Amazing.',
    taglineAr: 'إطلالة ساحرة. شعور بالثقة.',
    subtextEn:
      'Your beauty journey starts here. Discover hair, nails and beauty services at LITE Hair & Beauty in Riyadh.',
    subtextAr:
      'رحلتك نحو الجمال تبدأ من هنا. اكتشفي خدمات الشعر، الأظافر والعناية بالجمال في صالون ايوليت بالرياض.',
    cityEn: 'Riyadh',
    cityAr: 'الرياض',
    districtEn: 'Al Aqiq District',
    districtAr: 'حي العقيق',
    addressEn:
      'Prince Muhammad Ibn Saad Ibn Abdulaziz Road, Al Aqiq District, Imam Saud Bin Faisal Road, Riyadh',
    addressAr:
      'طريق الأمير محمد بن سعد بن عبدالعزيز، حي العقيق، طريق الإمام سعود بن فيصل، الرياض',
    phone: '+966 50 009 2046',
    phoneTel: 'tel:+966500092046',
    phoneRaw: '+966500092046',
    whatsappNumber: '966500092046',
    reportedClosingTime: '10:00 PM',
    reportedClosingTimeAr: '10:00 مساءً',
    closingNoteEn:
      'Reported closing time: 10:00 PM. Full weekly schedule to be confirmed by salon.',
    closingNoteAr:
      'وقت الإغلاق المسجل: 10:00 مساءً. الجدول الأسبوعي الكامل بانتظار تأكيد الصالون.',
    currency: 'SAR',
    currencyAr: 'ر.س',
    timezone: 'Asia/Riyadh',
    googleRating: {
      score: 4.3,
      reviewCount: 451,
      sourceEn: 'reported on Google',
      sourceAr: 'وفق تقييمات Google',
    },
    demoBadgeEn: 'Demo pricing, to be confirmed by salon',
    demoBadgeAr: 'سعر تجريبي، بانتظار تأكيد الصالون',
    illustrativeImagesNoteEn: 'Illustrative stock placeholder images',
    illustrativeImagesNoteAr: 'صور توضيحية لغرض العرض التجريبي',
  },

  /**
   * Social Links & External URLs
   * STRICT: Never invent URLs. Leave empty by default.
   */
  INSTAGRAM_PROFILE_URL: '', // Set by salon owner e.g. "https://instagram.com/lite_salon"
  GOOGLE_REVIEWS_URL: '', // Set by salon owner e.g. "https://g.page/r/..."
  GOOGLE_MAPS_URL: '', // Set by salon owner e.g. official Google Maps pin

  /**
   * Helper to resolve Google Maps directions/location link safely
   */
  getGoogleMapsLink: (): string => {
    if (siteConfig.GOOGLE_MAPS_URL && siteConfig.GOOGLE_MAPS_URL.trim() !== '') {
      return siteConfig.GOOGLE_MAPS_URL;
    }
    const query = encodeURIComponent(
      'LITE Hair & Beauty, Prince Muhammad Ibn Saad Ibn Abdulaziz Road, Al Aqiq District, Imam Saud Bin Faisal Road, Riyadh'
    );
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  },

  /**
   * Helper to resolve Google Reviews URL
   */
  getGoogleReviewsLink: (): string => {
    if (siteConfig.GOOGLE_REVIEWS_URL && siteConfig.GOOGLE_REVIEWS_URL.trim() !== '') {
      return siteConfig.GOOGLE_REVIEWS_URL;
    }
    const query = encodeURIComponent('LITE Hair & Beauty, Al Aqiq, Riyadh');
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  },

  /**
   * Generates WhatsApp message URL
   */
  getWhatsAppUrl: (message: string): string => {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${siteConfig.business.whatsappNumber}?text=${encoded}`;
  },

  /**
   * Operating Hours (Weekly demo schedule noting the reported 10:00 PM closing)
   */
  openingHours: [
    {
      dayEn: 'Saturday',
      dayAr: 'السبت',
      hoursEn: '1:00 PM – 10:00 PM',
      hoursAr: '1:00 مساءً – 10:00 مساءً',
      isReportedClosing: true,
    },
    {
      dayEn: 'Sunday',
      dayAr: 'الأحد',
      hoursEn: '1:00 PM – 10:00 PM',
      hoursAr: '1:00 مساءً – 10:00 مساءً',
      isReportedClosing: true,
    },
    {
      dayEn: 'Monday',
      dayAr: 'الاثنين',
      hoursEn: '1:00 PM – 10:00 PM',
      hoursAr: '1:00 مساءً – 10:00 مساءً',
      isReportedClosing: true,
    },
    {
      dayEn: 'Tuesday',
      dayAr: 'الثلاثاء',
      hoursEn: '1:00 PM – 10:00 PM',
      hoursAr: '1:00 مساءً – 10:00 مساءً',
      isReportedClosing: true,
    },
    {
      dayEn: 'Wednesday',
      dayAr: 'الأربعاء',
      hoursEn: '1:00 PM – 10:00 PM',
      hoursAr: '1:00 مساءً – 10:00 مساءً',
      isReportedClosing: true,
    },
    {
      dayEn: 'Thursday',
      dayAr: 'الخميس',
      hoursEn: '1:00 PM – 10:00 PM',
      hoursAr: '1:00 مساءً – 10:00 مساءً',
      isReportedClosing: true,
    },
    {
      dayEn: 'Friday',
      dayAr: 'الجمعة',
      hoursEn: '2:00 PM – 10:00 PM',
      hoursAr: '2:00 مساءً – 10:00 مساءً',
      isReportedClosing: true,
    },
  ] as OpeningHourDay[],

  /**
   * Available booking time slots
   */
  timeSlots: [
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
  ],

  /**
   * Services list across 5 requested categories:
   * 1. Hair & Styling
   * 2. Hair Color
   * 3. Nails & Manicure
   * 4. Makeup
   * 5. Other Beauty
   */
  services: [
    // 1. Hair & Styling
    {
      id: 'hair-styling-blowdry',
      category: 'hair',
      categoryNameEn: 'Hair & Styling',
      categoryNameAr: 'الشعر والتسريحات',
      nameEn: 'Signature Blowdry & Styling',
      nameAr: 'استشوار وتسريح الشعر الفاخر',
      descriptionEn:
        'Customized blowdry tailored to your hair texture, delivering natural volume and a silky finish.',
      descriptionAr:
        'استشوار متقن ومخصص لنوع شعرك، يمنحك كثافة طبيعية وملمساً حريرياً ناعماً.',
      detailsEn:
        'Includes relaxing hair wash with luxury salon care products, heat protection application, and styling finished with professional shine mist.',
      detailsAr:
        'يشمل غسيل الشعر المريح بمستحضرات عناية فاخرة، وتطبيق حماية من الحرارة، مع تسريح متقن ولمسة لمعان احترافية.',
      durationMinutes: 45,
      priceSAR: 180,
      benefitsEn: [
        'Tailored styling according to face shape and occasion',
        'Professional heat protection and lightweight finishing products',
        'Long-lasting hold without stiffness or heavy buildup',
      ],
      benefitsAr: [
        'تسريح مخصص بما يناسب ملامح الوجه والمناسبة',
        'مستحضرات احترافية للحماية من الحرارة بدون إثقال الشعر',
        'ثبات يدوم مع المحافظة على انسيابية وحركة الشعر الطبيعية',
      ],
      image:
        'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'hair-cut-precision',
      category: 'hair',
      categoryNameEn: 'Hair & Styling',
      categoryNameAr: 'الشعر والتسريحات',
      nameEn: 'Precision Cut & Shaping',
      nameAr: 'قص وتحديد الشعر الاحترافي',
      descriptionEn:
        'Bespoke haircut technique designed to enhance your features and maintain healthy ends.',
      descriptionAr:
        'تقنية قص مدروسة بعناية لإبراز ملامحك والتخلص من الأطراف المتقصفة بلمسة عصرية.',
      detailsEn:
        'Detailed personal consultation, scalp cleansing, precision wet and dry cutting, followed by a light blowout.',
      detailsAr:
        'استشارة فردية لاختيار القصة المناسبة، غسيل مع تدليك خفيف لفروة الرأس، قص دقيق وتجفيف أنيق.',
      durationMinutes: 60,
      priceSAR: 220,
      benefitsEn: [
        'Individual face-contour and hair-type assessment',
        'Careful sectioning for clean lines and natural fall',
        'Removal of split ends to support hair vitality',
      ],
      benefitsAr: [
        'تقييم انسيابية القصة حسب شكل الوجه ونوع الشعر',
        'تقسيم دقيق لخطوط نظيفة وسقوط طبيعي للشعر',
        'عناية بالأطراف لدعم المظهر الصحي والأنيق',
      ],
      image:
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'hair-updo-evening',
      category: 'hair',
      categoryNameEn: 'Hair & Styling',
      categoryNameAr: 'الشعر والتسريحات',
      nameEn: 'Event & Evening Hair Updo',
      nameAr: 'تسريحة سهرة ومناسبات راقية',
      descriptionEn:
        'Elegant chignon, soft romantic waves, or modern pinned updo for weddings and special occasions in Riyadh.',
      descriptionAr:
        'تسريحة شينيون أنيقة، تموجات كلاسيكية ناعمة، أو رفعة عصرية للمناسبات الخاصة والاحتفالات.',
      detailsEn:
        'Preparation with texture builders, precision pin placement, decorative accessory positioning, and evening-strength setting spray.',
      detailsAr:
        'تهيئة خصلات الشعر بمكثفات الملمس، تثبيت دقيق للخصل والإكسسوارات، ورذاذ تثبيت يحافظ على الإطلالة طوال السهرة.',
      durationMinutes: 75,
      priceSAR: 350,
      benefitsEn: [
        'Adaptable for contemporary and classic gala looks',
        'Secure pin work engineered for hours of celebration',
        'Photo-ready finish from all angles',
      ],
      benefitsAr: [
        'ملائمة للإطلالات العصرية أو الكلاسيكية الفاخرة',
        'تثبيت احترافي مريح يدوم لساعات الاحتفال',
        'جاهزية مثالية للتصوير من مختلف الزوايا',
      ],
      image:
        'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    },

    // 2. Hair Color
    {
      id: 'hair-color-full-gloss',
      category: 'color',
      categoryNameEn: 'Hair Color',
      categoryNameAr: 'صبغات الشعر',
      nameEn: 'Full Gloss & Permanent Color',
      nameAr: 'صبغة كاملة ولمعان غني',
      descriptionEn:
        'Complete root-to-tip color or seamless grey coverage using gentle formulas enriched with conditioning agents.',
      descriptionAr:
        'تغطية متكاملة من الجذور حتى الأطراف مع لمعان فائق وتركيبات غنية بالمرطبات المغذية.',
      detailsEn:
        'Color shade matching, protective barrier for scalp, uniform color saturation, conditioning mask treatment, and color-lock wash.',
      detailsAr:
        'مطابقة درجات الألوان بدقة، تطبيق حاجز حماية لفروة الرأس، توزيع متجانس، ثم حمام عناية خاص لتثبيت اللون.',
      durationMinutes: 90,
      priceSAR: 450,
      benefitsEn: [
        'Rich pigment depth and luminous shine',
        'Comprehensive root coverage',
        'Conditioning post-color treatment included',
      ],
      benefitsAr: [
        'عمق لوني غني وانعكاسات ضوئية مشرقة',
        'تغطية دقيقة للجذور والشيب',
        'علاج مرطب ملطف بعد الصبغة للحفاظ على حيوية الخصلات',
      ],
      image:
        'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'hair-color-balayage-highlights',
      category: 'color',
      categoryNameEn: 'Hair Color',
      categoryNameAr: 'صبغات الشعر',
      nameEn: 'Balayage & Dimensional Highlights',
      nameAr: 'بالياج وهايلايت متعدد الأبعاد',
      descriptionEn:
        'Hand-painted dimensional color blending warm caramels, rich mochas, or cool blonde tones.',
      descriptionAr:
        'تقنية البالياج اليدوية لدمج ناعم بين خصلات الكراميل الدافئة، الموكا، أو درجات الأشقر العصري.',
      detailsEn:
        'Artistic freehand painting or foil placement, customized toner formulation, bond-support step, and gloss blowout.',
      detailsAr:
        'رسم الخصل بحرفية عالية أو تقنية الفويل، رنساج مخصص لضبط الدرجة، خطوة لدعم ألياف الشعر، وتسريح نهائي.',
      durationMinutes: 150,
      priceSAR: 680,
      benefitsEn: [
        'Seamless grow-out with minimal harsh root lines',
        'Multidimensional depth that catches ambient light',
        'Customized toner matched to your skin undertone',
      ],
      benefitsAr: [
        'تدرج طبيعي يقلل من ظهور خط الجذور مع نمو الشعر',
        'عمق ثلاثي الأبعاد يبرز حركة الشعر في الإضاءة',
        'رنساج مدروس ليتناغم مع نغمة بشرتك الطبيعية',
      ],
      image:
        'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    },

    // 3. Nails & Manicure
    {
      id: 'nails-signature-manicure',
      category: 'nails',
      categoryNameEn: 'Nails & Manicure',
      categoryNameAr: 'الأظافر والبديكير',
      nameEn: 'Signature Spa Manicure',
      nameAr: 'مانيكير سبا الفاخر لليدين',
      descriptionEn:
        'Exfoliation, meticulous cuticle detailing, hydrating hand massage, and long-wear nail polish.',
      descriptionAr:
        'تقشير لطيف، عناية دقيقة بزوائد الأظافر، تدليك مهدئ لليدين، وطلاء أظافر فاخر يدوم طويلاً.',
      detailsEn:
        'Aromatic hand soak, gentle scrub, nail shaping and buffing, nourishing cuticle oil, relaxing hand massage, and polish application.',
      detailsAr:
        'نقع عطري دافئ لليدين، تقشير ناعم، تشكيل وتلميع الأظافر، زيت مغذٍ للبشرة المحيطة، تدليك مريح، وطلاء باللون المفضل.',
      durationMinutes: 45,
      priceSAR: 130,
      benefitsEn: [
        'Hygienic sterilized salon tools and single-use buffers',
        'Deep moisturization for dry hands',
        'Wide curated palette of classic and seasonal nail shades',
      ],
      benefitsAr: [
        'أدوات معقمة ومبارد للاستخدام الفردي بأعلى معايير النظافة',
        'ترطيب عميق لمكافحة جفاف اليدين',
        'مجموعة واسعة من درجات الألوان الكلاسيكية والموسمية',
      ],
      image:
        'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'nails-deluxe-pedicure',
      category: 'nails',
      categoryNameEn: 'Nails & Manicure',
      categoryNameAr: 'الأظافر والبديكير',
      nameEn: 'Deluxe Foot Spa & Pedicure',
      nameAr: 'بديكير سبا متكامل للقدمين',
      descriptionEn:
        'Revitalizing foot treatment with mineral foot bath, heel smoothing, restorative mask, and nail polish.',
      descriptionAr:
        'عناية مجددة بالحمام المعدني، تنعيم الكعبين، قناع مرمم، وتنسيق الأظافر مع لون أنيق.',
      detailsEn:
        'Warm salt soak, callus softening care, exfoliating scrub, cooling mask wrap, foot massage, and flawless polish.',
      detailsAr:
        'نقع بالأملاح المهدئة، إزالة الخشونة وتنعيم الكعب، تقشير، قناع منعش، تدليك مريح، وطلاء أظافر متقن.',
      durationMinutes: 60,
      priceSAR: 170,
      benefitsEn: [
        'Relief for tired feet with targeted pressure massage',
        'Silky heel softening and smoothing',
        'Sanitized basins and individual hygiene liners',
      ],
      benefitsAr: [
        'إراحة القدمين المتعبة بتدليك يبعث على الاسترخاء',
        'تنعيم وتلطيف ملمس الكعبين',
        'أحواض معقمة وأغطية نظافة أحادية الاستخدام',
      ],
      image:
        'https://images.unsplash.com/photo-1519014816548-bf785179c9e4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'nails-gel-overlay',
      category: 'nails',
      categoryNameEn: 'Nails & Manicure',
      categoryNameAr: 'الأظافر والبديكير',
      nameEn: 'Gel Overlay & French Polish',
      nameAr: 'تركيب جل وطلاء فرنش أنيق',
      descriptionEn:
        'Chip-resistant gel color or classic French tips cured under LED light for enduring high-gloss brilliance.',
      descriptionAr:
        'طلاء جل مقاوم للخدش أو فرنش كلاسيكي يجف بإضاءة LED ليمنحك لمعاناً يدوم لأسابيع.',
      detailsEn:
        'Nail prep, base coat, dual color layers, precision French line work, high-shine top coat, and solar oil nourishment.',
      detailsAr:
        'تجهيز سطح الظفر، طبقة أساس، طبقتان من الجل، رسم فرنش دقيق، طبقة حماية عالية اللمعان، وزيت ترطيب.',
      durationMinutes: 60,
      priceSAR: 210,
      benefitsEn: [
        'Long-lasting wear for 2-3 weeks',
        'Instant dry under safe LED lamp with zero smudge risk',
        'Reinforces natural nails against chipping',
      ],
      benefitsAr: [
        'ثبات يدوم من أسبوعين إلى 3 أسابيع',
        'جفاف فوري بإضاءة LED دون خوف من التلطخ',
        'دعم الأظافر الطبيعية وحمايتها من التكسر السريع',
      ],
      image:
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    },

    // 4. Makeup
    {
      id: 'makeup-evening-glam',
      category: 'makeup',
      categoryNameEn: 'Makeup',
      categoryNameAr: 'المكياج',
      nameEn: 'Evening & Gala Glam Makeup',
      nameAr: 'مكياج سهرة ومناسبات فخم',
      descriptionEn:
        'Flawless complexion work, sculpting contours, striking eye artistry, and customized false lash application.',
      descriptionAr:
        'بشرة موحدة مخملية، نحت ملامح أنيق، مكياج عيون متقن، مع تركيب رموش متناسقة لحضور مبهر.',
      detailsEn:
        'Skin priming, high-definition foundation, shade blending, brow framing, customized cluster or strip lashes, and setting mist.',
      detailsAr:
        'تهيئة البشرة بالبرايمر، كريم أساس عالي الدقة، دمج احترافي للظلال، تحديد الحواجب، رموش متناسقة، ورذاذ تثبيت.',
      durationMinutes: 75,
      priceSAR: 420,
      benefitsEn: [
        'High-definition products formulated for Riyadh lighting & photography',
        'Customized lash selection to accentuate your eye shape',
        'Transfer-resistant and heat-tested formula choices',
      ],
      benefitsAr: [
        'مستحضرات عالية الدقة مناسبة لإضاءة الحفلات والتصوير',
        'اختيار رموش ملائمة لشكل العين لإبراز جمالها الطبيعي',
        'تركيبات مقاومة للحرارة تضمن ثبات المكياج لساعات طويلة',
      ],
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'makeup-soft-daytime',
      category: 'makeup',
      categoryNameEn: 'Makeup',
      categoryNameAr: 'المكياج',
      nameEn: 'Soft Glow & Daytime Elegance',
      nameAr: 'مكياج نهاري ناعم ومشرق',
      descriptionEn:
        'Fresh, dewy complexion with delicate neutral tones designed for private gatherings and daytime events.',
      descriptionAr:
        'إطلالة ندية مشرقة بألوان ترابية ناعمة تناسب اللقاءات الصباحية والمناسبات النهارية الخاصة.',
      detailsEn:
        'Hydrating skin preparation, sheer tint or radiant foundation, soft flushed cheek tint, natural brows, and satin lip touch.',
      detailsAr:
        'ترطيب مكثف للبشرة، تغطية خفيفة متألقة، توريد وجنتين ناعم، ترتيب الحواجب، ولمسة شفاه مخملية.',
      durationMinutes: 50,
      priceSAR: 280,
      benefitsEn: [
        'Enhances natural features with subtle, luminous touches',
        'Breathable finish that feels lightweight on the skin',
        'Subtle, understated elegance',
      ],
      benefitsAr: [
        'إبراز الجمال الطبيعي بلمسات ضوئية ناعمة',
        'ملمس خفيف ومنعش يسمح للبشرة بالتنفس',
        'أناقة هادئة ومظهر طبيعي مفعم بالحيوية',
      ],
      image:
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    },

    // 5. Other Beauty
    {
      id: 'beauty-facial-radiance',
      category: 'other',
      categoryNameEn: 'Other Beauty',
      categoryNameAr: 'عناية وجمال إضافي',
      nameEn: 'Hydrating Express Radiance Facial',
      nameAr: 'جلسة نضارة وترطيب سريع للبشرة',
      descriptionEn:
        'Deep botanical cleanse, gentle enzyme exfoliation, and intense moisture infusion for glowing skin.',
      descriptionAr:
        'تنظيف عميق، تقشير إنزيمي لطيف، وجرعة ترطيب مكثفة تمنح البشرة انتعاشاً وإشراقة فورية.',
      detailsEn:
        'Double cleanse, enzyme steam, soothing lymphatic face massage, hyaluronic moisture mask, and SPF barrier.',
      detailsAr:
        'تنظيف مزدوج، تقشير لطيف بالبخار، تدليك مهدئ للوجه، قناع الهيالورونيك المرطب، وواقي شمس مغذٍ.',
      durationMinutes: 50,
      priceSAR: 260,
      benefitsEn: [
        'Restores moisture balance to dehydrated skin',
        'Smooth canvas for subsequent makeup application',
        'Gentle and non-invasive relaxation ritual',
      ],
      benefitsAr: [
        'استعادة توازن الرطوبة للبشرة المرهقة',
        'تهيئة ممتازة للبشرة قبل تطبيق المكياج للمناسبات',
        'جلسة استرخاء لطيفة بدون احمرار أو تقشير قاسٍ',
      ],
      image:
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'beauty-lash-lift-tint',
      category: 'other',
      categoryNameEn: 'Other Beauty',
      categoryNameAr: 'عناية وجمال إضافي',
      nameEn: 'Lash Lift & Keratin Tint',
      nameAr: 'رفع الرموش مع صبغة الكيراتين',
      descriptionEn:
        'Lifts and curls your natural lashes upward combined with rich pigment tint for defined, mascara-free eyes.',
      descriptionAr:
        'رفع وتقويس الرموش الطبيعية للأعلى مع صبغة كيراتين داكنة تبرز جمال العينين دون الحاجة لماسكارا.',
      detailsEn:
        'Lash cleansing, custom silicon shield sizing, gentle lifting balm, deep pigment tint, and nourishing keratin sealer.',
      detailsAr:
        'تنظيف الرموش، تثبيت قالب السيليكون المناسب، بلسم رفع لطيف، صبغة داكنة غنية، وتغذية ختامية بالكيراتين.',
      durationMinutes: 50,
      priceSAR: 240,
      benefitsEn: [
        'Opens up the eye area with upward curl lasting 4-6 weeks',
        'No false lashes or extensions required',
        'Water-friendly after initial 24-hour setting window',
      ],
      benefitsAr: [
        'إبراز فتحة العين بتقويس يدوم من 4 إلى 6 أسابيع',
        'يعتمد على رموشك الطبيعية دون الحاجة لتركيب',
        'سهولة التعامل بعد انقضاء الساعات الأولى من الجلسة',
      ],
      image:
        'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80',
    },
  ] as ServiceItem[],

  /**
   * Gallery items with categories ('hair', 'nails', 'makeup', 'salon')
   * All labeled with Illustrative Stock placeholder note.
   */
  galleryItems: [
    {
      id: 'gal-1',
      category: 'hair',
      titleEn: 'Glossy Brunette Blowout',
      titleAr: 'استشوار انسيابي ولامع',
      altEn: 'Brunette styled blowout with voluminous waves',
      altAr: 'تسريحة شعر انسيابية مع تموجات ناعمة',
      image:
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
      instagramPostUrl: '',
    },
    {
      id: 'gal-2',
      category: 'nails',
      titleEn: 'Neutral Almond Manicure',
      titleAr: 'مناكير نيود كلاسيكي',
      altEn: 'Almond-shaped manicured nails with glossy beige polish',
      altAr: 'أظافر لوزية مرتبة مع طلاء بيج لامع',
      image:
        'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=80',
      instagramPostUrl: '',
    },
    {
      id: 'gal-3',
      category: 'makeup',
      titleEn: 'Evening Glam & Highlight',
      titleAr: 'مكياج سهرة مع إضاءة ساحرة',
      altEn: 'Glamorous evening makeup with defined eyes and soft lips',
      altAr: 'مكياج سهرة فاخر مع تحديد للعينين وشفايف ناعمة',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
      instagramPostUrl: '',
    },
    {
      id: 'gal-4',
      category: 'hair',
      titleEn: 'Warm Honey Balayage',
      titleAr: 'بالياج درجات العسل الدافئ',
      altEn: 'Dimensional balayage highlights on dark hair',
      altAr: 'خصلات بالياج دافئة متدرجة على شعر داكن',
      image:
        'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80',
      instagramPostUrl: '',
    },
    {
      id: 'gal-5',
      category: 'salon',
      titleEn: 'Luxe Salon Interior & Styling Stations',
      titleAr: 'التصميم الداخلي ومحطات التصفيف الفاخرة',
      altEn: 'Elegant beauty salon interior styling mirrors and seating',
      altAr: 'ديكور صالون نسائي راقٍ مع مرايا وإضاءة مريحة',
      image:
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
      instagramPostUrl: '',
    },
    {
      id: 'gal-6',
      category: 'nails',
      titleEn: 'Minimalist French Tips',
      titleAr: 'فرنش ناعم بلمسة عصرية',
      altEn: 'Delicate modern French tip manicure',
      altAr: 'مناكير فرنش دقيق وعصري',
      image:
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80',
      instagramPostUrl: '',
    },
    {
      id: 'gal-7',
      category: 'makeup',
      titleEn: 'Dewy Natural Radiance',
      titleAr: 'إشراقة طبيعية وبشرة ندية',
      altEn: 'Fresh dewy makeup look with soft brows and glowing cheekbones',
      altAr: 'إطلالة مكياج خفيفة وطبيعية مع بشرة نضرة',
      image:
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
      instagramPostUrl: '',
    },
    {
      id: 'gal-8',
      category: 'salon',
      titleEn: 'Spa & Relaxation Lounge',
      titleAr: 'ركن الاسترخاء والعناية الهادئة',
      altEn: 'Relaxing salon spa zone with warm neutral lighting',
      altAr: 'منطقة استرخاء هادئة بإضاءة دافئة مريحة',
      image:
        'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80',
      instagramPostUrl: '',
    },
  ] as GalleryItem[],

  /**
   * Approved customer reviews
   * STRICT: Never invent reviews! Keep empty array by default.
   */
  approvedReviews: [] as ReviewItem[],
};
