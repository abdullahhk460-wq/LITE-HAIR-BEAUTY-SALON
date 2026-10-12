# LITE Hair & Beauty (صالون ايوليت) — Bilingual Sales Demo Website

A luxury, fully responsive, bilingual (English / Arabic with native RTL) website and booking inquiry system built for **LITE Hair & Beauty** in Riyadh, Saudi Arabia.

---

## 🌸 Business Information

- **Name (EN):** LITE Hair & Beauty
- **Name (AR):** صالون ايوليت
- **Location:** Al Aqiq District, Riyadh, Saudi Arabia
- **Address:** Prince Muhammad Ibn Saad Ibn Abdulaziz Road, Al Aqiq District, Imam Saud Bin Faisal Road, Riyadh
- **Phone:** `+966 50 009 2046` (`tel:+966500092046`)
- **Reported Google Rating:** 4.3 / 5 from 451 reviews (reported on Google)
- **Reported Closing Time:** 10:00 PM (Daily)
- **Currency:** SAR (ر.س)
- **Timezone:** Asia/Riyadh

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (v4) with bespoke luxury editorial palette (`#F5F0E9`, `#22201F`, `#BDA078`, `#FFFFFF`, `#8D7B6A`)
- **Typography:** Playfair Display (headings), Inter (body), Cairo (Arabic typography)
- **Routing:** React Router (`HashRouter` ensuring seamless refresh and preview handling)
- **Icons:** Lucide React
- **Internationalization:** Custom zero-dependency i18n context with persistent Arabic/English toggle, RTL layout mirroring, and Arabic-formatted dates and SAR currency.

---

## ⚙️ How to Change Configuration

The single source of truth for the entire website is located at:
```bash
/src/config/site.ts
```

In this file, you can modify:
1. `siteConfig.INSTAGRAM_PROFILE_URL`: Set to the salon's official profile (e.g., `https://instagram.com/lite_salon`). When empty, buttons automatically trigger a friendly notice modal rather than navigating to a dead link.
2. `siteConfig.GOOGLE_REVIEWS_URL`: Set to the official Google Business review link. Defaults to a search fallback.
3. `siteConfig.GOOGLE_MAPS_URL`: Set to the direct Google Maps place pin. Defaults to a search query based on the Riyadh address.
4. `siteConfig.business.whatsappNumber`: Number to receive prefilled customer booking messages (e.g. `966500092046`).
5. `siteConfig.services`: The complete service catalog, prices, durations, benefits, and images across the 5 categories (Hair & Styling, Hair Color, Nails & Manicure, Makeup, Other Beauty).
6. `siteConfig.openingHours`: The salon's weekly schedule.
7. `siteConfig.galleryItems`: Gallery photos, categories, and optional per-photo Instagram post links.
8. `siteConfig.approvedReviews`: List of verified, approved customer reviews (left empty by default to prevent fake testimonials).

---

## 📋 Checklist for Salon Owner Handover

Before putting the site into live commercial production, the salon owner must confirm and supply:

1. **Official Instagram URL:** Update `INSTAGRAM_PROFILE_URL` in `/src/config/site.ts`.
2. **Services, Pricing & Durations:** Confirm the service list and pricing. Replace the "Demo pricing, to be confirmed by salon" labels with final confirmed rates.
3. **Weekly Operating Hours:** Confirm exact opening and closing hours for each day of the week, including Friday prayer opening adjustments.
4. **Real Photography:** Replace illustrative stock placeholder images (`https://images.unsplash.com/...`) with genuine high-resolution photographs of the Riyadh salon interior, hair transformations, and nail artistry.
5. **Google Review Page Link:** Provide the direct Google Place ID or short URL (`https://g.page/r/...`) to populate `GOOGLE_REVIEWS_URL`.
6. **WhatsApp Reception Number:** Verify that `+966 50 009 2046` has an active WhatsApp Business account configured to receive customer requests.

---

## 🚀 Running the Project Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🛡️ Administrative Demo Panel

Visit `/#/admin` to access the demonstration control center.
- **Demo Password:** `demo` (a convenient autofill button is provided)
- **Features:** Review booking requests stored in browser `localStorage`, update statuses (`Pending`, `Confirmed`, `Completed`, `Cancelled`), open direct client WhatsApp chats, and inspect configuration fields.
- **Notice:** This panel is clearly labeled as an illustrative browser demo and does not claim production database security.
