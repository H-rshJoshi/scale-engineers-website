# 🚀 Complete Deployment Guide — Scale Engineers

Step-by-step guide to take this Angular project from your computer to live at scaleengineers.in.

---

## 🧰 Prerequisites (one-time setup)

1. **Install Node.js** — Download from https://nodejs.org (LTS version, 20+)
2. **Install Git** — Download from https://git-scm.com
3. **Create accounts (all free):**
   - GitHub: https://github.com/signup
   - Vercel: https://vercel.com/signup (sign in with GitHub)

---

## 📁 PART 1 — Add Your Logo and Photos

1. Copy `logo.png` to `src/assets/logo.png`
2. Copy your project photos into `src/assets/img/` using the exact names listed in `src/assets/img/README.txt`

If you don't have all the photos yet — no problem. The website shows nice placeholders automatically for any missing image.

---

## 💻 PART 2 — Test Locally

Open Terminal (Mac) or PowerShell (Windows) in the project folder:

```bash
npm install
npm start
```

Wait 30 seconds, then open http://localhost:4200 in your browser. You should see your full website.

Press `Ctrl+C` to stop the local server.

---

## 📤 PART 3 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Scale Engineers website"
git branch -M main
```

Now go to https://github.com/new and create a new repository called `scale-engineers`. Then back in terminal:

```bash
git remote add origin https://github.com/YOUR-USERNAME/scale-engineers.git
git push -u origin main
```

(Replace YOUR-USERNAME with your GitHub username.)

---

## ☁️ PART 4 — Deploy on Vercel

1. Go to https://vercel.com/new
2. Click "Import" next to your `scale-engineers` repo
3. **Framework Preset:** Angular (auto-detected)
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist/scale-engineers/browser`
6. Click **Deploy**

After 2 minutes you get a live URL like `scale-engineers-xyz.vercel.app`. Open it — your website is live!

---

## 🌍 PART 5 — Connect scaleengineers.in (GoDaddy domain)

### In Vercel:
1. Open your project → **Settings** → **Domains**
2. Type `scaleengineers.in` → click **Add**
3. Vercel will show you DNS records — keep this tab open

### In GoDaddy:
1. Log in → **My Products** → click **DNS** next to `scaleengineers.in`
2. Add these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `76.76.21.21` | 600 |
| CNAME | www | `cname.vercel-dns.com` | 600 |

3. **Delete** any existing A record on @ that points elsewhere
4. Save changes

### Wait
DNS propagation takes 5 minutes to 24 hours. Once done, your site is live at https://www.scaleengineers.in 🎉

---

## ✉️ PART 6 — Make Contact Form Send Emails

Right now the form shows a success message but doesn't actually email you. To fix:

1. Sign up at https://formspree.io (free, 50 emails/month)
2. Create a new form — choose your Gmail address as the recipient
3. Copy the form endpoint (looks like `https://formspree.io/f/xyzabc123`)
4. Open `src/app/pages/home/home.component.ts`
5. Find the `handleSubmit` function and replace it with:

```typescript
handleSubmit(event: Event): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const data = new FormData(form);

  fetch('https://formspree.io/f/xyzabc123', {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  .then(() => {
    this.formMsg = '✓ Message sent! We will respond within 24 hours.';
    this.formMsgVisible = true;
    form.reset();
    this.msgTimer = setTimeout(() => { this.formMsgVisible = false; }, 7000);
  })
  .catch(() => {
    this.formMsg = '✗ Error sending. Please WhatsApp us at +91 89800 08332.';
    this.formMsgVisible = true;
  });
}
```

6. Commit & push:
```bash
git add .
git commit -m "Enable email contact form"
git push
```

Vercel auto-deploys on every push — your form is now live with email!

---

## 🔍 PART 7 — SEO Setup (Important!)

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add `scaleengineers.in` as a property
3. Verify ownership (Vercel makes this automatic with a DNS TXT record)
4. Submit your sitemap: `https://www.scaleengineers.in/sitemap.xml`

### Google Business Profile (BIGGEST SEO boost for Ahmedabad)
1. Go to https://business.google.com
2. Create a free profile with:
   - Business name: **Scale Engineers**
   - Category: **Engineering consultant**
   - Address: 303, SPG Echelone, Makarba, Ahmedabad
   - Phone: +91 89800 08332
   - Website: https://www.scaleengineers.in
3. Verify by postcard (Google sends a code to your address)
4. Upload 5–10 project photos
5. Ask 5 satisfied clients to leave a Google review

### Free business listings (more backlinks = better ranking)
- https://www.indiamart.com — list as "WTP Consultancy"
- https://www.justdial.com
- https://www.sulekha.com
- https://www.tradeindia.com

---

## 🔄 PART 8 — How to Update Content Later

### Adding/Editing a Project
1. Open `src/app/pages/projects/projects.component.ts`
2. Find the `wtpList`, `stpList`, or `photoProjects` array
3. Add/edit entries
4. `git add . && git commit -m "Add new project" && git push`
5. Vercel auto-deploys in 2 minutes

### Adding a New Photo to an Existing Project
1. Put the photo in `src/assets/img/` with the exact name from the README
2. Push to GitHub — that's it!

### Editing Text Content
- Home page text: `src/app/pages/home/home.component.html`
- Services info: same file (search for "service-card")
- Contact info: same file (search for "ci-item")

---

## 🎉 You're done!

Your website is now:
- ✅ Live on https://www.scaleengineers.in
- ✅ Fast & responsive
- ✅ SEO-optimized for "water treatment plant consultancy Ahmedabad"
- ✅ Auto-deploys on every Git push
- ✅ Free hosting (Vercel free tier handles up to 100GB bandwidth/month)

Questions? Refer to the README.md or check the Angular docs at https://angular.dev
