# Scale Engineers — Angular Website

Premium water treatment plant consultancy website built with **Angular 17** (standalone components, app router).

🌐 Production URL: https://www.scaleengineers.in

---

## 📁 Project Structure

```
scale-engineers-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── navbar/              ← Shared navigation bar
│   │   ├── pages/
│   │   │   ├── home/                ← Home page (/)
│   │   │   └── projects/            ← Projects page (/projects)
│   │   ├── app.component.ts         ← Root component
│   │   ├── app.config.ts            ← App configuration & router
│   │   └── app.routes.ts            ← Route definitions
│   ├── assets/
│   │   ├── logo.png                 ← ⚠ ADD YOUR LOGO HERE
│   │   └── img/                     ← ⚠ ADD PROJECT PHOTOS HERE
│   ├── index.html                   ← Root HTML + SEO meta tags
│   ├── main.ts                      ← App entry point
│   └── styles.css                   ← Global stylesheet
├── public/
│   ├── robots.txt                   ← SEO: search engine instructions
│   └── sitemap.xml                  ← SEO: URL list for Google
├── angular.json                     ← Angular CLI config
├── package.json                     ← Dependencies
├── tsconfig.json                    ← TypeScript config
├── vercel.json                      ← Vercel SPA routing
└── README.md                        ← This file
```

---

## 🚀 Run Locally

```bash
npm install
npm start
```
Opens at http://localhost:4200

## 📦 Build for Production

```bash
npm run build
```
Output goes to `dist/scale-engineers/`

---

## 🖼️ Adding Images

1. Put `logo.png` in `src/assets/`
2. Put project photos in `src/assets/img/` (see `src/assets/img/README.txt` for exact file names)

---

## 🌐 Deployment (Vercel + GoDaddy)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/scale-engineers.git
git push -u origin main
```

### Step 2 — Connect to Vercel
1. Go to https://vercel.com → "Import Project"
2. Select your GitHub repo
3. **Framework Preset:** Angular
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist/scale-engineers/browser`
6. Click Deploy

### Step 3 — Connect GoDaddy Domain
1. In Vercel → Settings → Domains → Add `scaleengineers.in`
2. In GoDaddy → DNS Management:
   - Add **A record:** `@` → `76.76.21.21`
   - Add **CNAME:** `www` → `cname.vercel-dns.com`
3. Wait 5–60 minutes for DNS to propagate

### Step 4 — Contact Form (Optional)
The contact form currently shows a success message but does NOT send emails yet.
To enable email sending:
1. Sign up at https://formspree.io (free for 50 messages/month)
2. Create a form, copy your form ID
3. In `home.component.ts`, edit `handleSubmit()` to POST to `https://formspree.io/f/YOUR_ID`

---

## 🔍 SEO Checklist

✅ Meta tags (title, description, keywords)  
✅ Open Graph (WhatsApp/LinkedIn previews)  
✅ Schema.org JSON-LD (ProfessionalService, BreadcrumbList)  
✅ Geo tags (Ahmedabad, Gujarat)  
✅ robots.txt & sitemap.xml  
✅ Semantic HTML (header, main, article, address, footer)  
✅ ARIA labels for accessibility  
✅ Lazy-loaded images  
✅ Mobile responsive  

### After Deploy:
1. **Google Search Console** (https://search.google.com/search-console) — Add property, submit sitemap
2. **Google Business Profile** — Critical for local SEO
3. **List on:** IndiaMART, Justdial, Sulekha (free backlinks)
4. **Get reviews** — Ask clients to leave Google reviews

---

## 🛠️ Tech Stack

- Angular 17 (standalone components)
- TypeScript 5.4
- Pure CSS (no Tailwind/SASS — easy to maintain)
- Cormorant Garamond + DM Sans (Google Fonts)
- No backend — static SPA

---

## 📞 Company Info

**Scale Engineers**  
303, SPG Echelone, Near Torrent Power Station,  
Makarba, Ahmedabad – 380051, Gujarat, India  
Phone / WhatsApp: +91 89800 08332  
Email: scaleengineerspvtltd@gmail.com
