# Architect Output: Landing Page Architecture

**Date:** 2026-06-22  
**Task:** TASK-001  
**Based on:** `.aios/memory/pm-output.md`

---

## 1. Architecture Overview

### 1.1 Architecture Pattern
**Static Multi-Page Application (MPA)** với:
- Pure HTML/CSS/JS (no framework)
- Component-based CSS structure
- Progressive enhancement
- Mobile-first responsive design

### 1.2 Core Principles
1. **Separation of Concerns:** HTML (structure), CSS (presentation), JS (behavior)
2. **Modularity:** CSS split by concern (variables, reset, typography, components, sections, utilities)
3. **Performance:** Minimal dependencies, optimized assets
4. **Accessibility:** Semantic HTML + ARIA
5. **Maintainability:** Clear file structure, consistent naming

---

## 2. File Structure

```
edenred-hp/
├── index.html                  # Main landing page
├── css/
│   ├── variables.css           # Design tokens (colors, spacing, fonts)
│   ├── reset.css               # Browser normalization
│   ├── typography.css          # Font styles & hierarchy
│   ├── components.css          # Reusable UI (buttons, cards, nav)
│   ├── sections.css            # Page sections (hero, features, pricing)
│   └── utilities.css           # Helper classes (container, spacing)
├── js/
│   └── main.js                 # Interactions (scroll, menu, form)
└── assets/
    ├── images/                 # Hero image, placeholders
    └── icons/                  # SVG icons (optional)
```

---

## 3. CSS Architecture

### 3.1 Load Order (Critical)
```html
<link rel="stylesheet" href="css/variables.css">   <!-- 1. Tokens first -->
<link rel="stylesheet" href="css/reset.css">       <!-- 2. Normalize -->
<link rel="stylesheet" href="css/typography.css">  <!-- 3. Fonts -->
<link rel="stylesheet" href="css/components.css">  <!-- 4. Components -->
<link rel="stylesheet" href="css/sections.css">    <!-- 5. Sections -->
<link rel="stylesheet" href="css/utilities.css">   <!-- 6. Utilities -->
```

### 3.2 Naming Convention
**BEM-inspired** (Block Element Modifier):
```css
/* Block */
.nav { }
.hero { }
.feature-card { }

/* Element */
.nav__logo { }
.hero__title { }
.feature-card__icon { }

/* Modifier */
.btn--primary { }
.btn--secondary { }
.nav--scrolled { }
```

### 3.3 CSS Variables Structure
```css
:root {
  /* Colors */
  --color-bg: #F7F5F1;
  --color-surface: #FFFFFF;
  --color-border: #E7E3DA;
  --color-text: #1E2227;
  --color-text-muted: #6B7077;
  --color-accent: #3C5A78;
  --color-accent-hover: #2E4760;

  /* Typography */
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Inter', sans-serif;
  --font-size-base: 16px;
  --font-size-hero: clamp(32px, 5vw, 64px);
  --font-size-h2: clamp(28px, 4vw, 42px);
  --font-size-h3: 24px;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;
  --spacing-2xl: 64px;
  --spacing-3xl: 80px;

  /* Layout */
  --container-max: 1280px;
  --nav-height: 64px;
  --border-radius: 8px;
  --border-radius-lg: 12px;

  /* Effects */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --blur-backdrop: blur(8px);
}
```

---

## 4. Component Specifications

### 4.1 Navigation Component
```
.nav
├── .nav__container (max-width wrapper)
├── .nav__logo (brand link)
├── .nav__toggle (mobile hamburger)
└── .nav__menu (links list)
    └── .nav__link (individual link)

States:
- .nav--scrolled (backdrop-blur + shadow)
- .nav__menu--open (mobile menu visible)
```

**Behavior:**
- Sticky position
- Backdrop blur when scrolled (JS adds `.nav--scrolled`)
- Smooth scroll to anchors
- Mobile: hamburger menu (JS toggles `.nav__menu--open`)

### 4.2 Button Component
```css
.btn
├── .btn--primary (slate-blue bg, white text)
├── .btn--secondary (outline, slate-blue border)
└── .btn--large (bigger padding/font)

Specs:
- border-radius: 8px (NOT pill)
- padding: 12px 24px (default), 16px 32px (large)
- font-weight: 500
- transition: all 0.2s ease
```

### 4.3 Card Component
```
.card
├── .feature-card (features section)
│   ├── .feature-card__icon
│   ├── .feature-card__title
│   └── .feature-card__description
└── .pricing-card (pricing section)
    ├── .pricing-card__badge ("Most popular")
    ├── .pricing-card__title
    ├── .pricing-card__price
    ├── .pricing-card__features (list)
    └── .pricing-card__cta (button)

Specs:
- background: var(--color-surface)
- border: 1px solid var(--color-border)
- border-radius: var(--border-radius-lg)
- box-shadow: var(--shadow-sm)
- padding: var(--spacing-lg)
```

### 4.4 Pricing Card Modifier
```css
.pricing-card--featured {
  border-color: var(--color-accent);
  border-width: 2px;
  position: relative; /* for badge positioning */
}
```

---

## 5. Page Sections Architecture

### 5.1 Hero Section
```html
<section class="hero">
  <div class="container">
    <div class="hero__content">
      <span class="eyebrow">Online English Learning</span>
      <h1 class="hero__title">Master English with Confidence</h1>
      <p class="hero__subtitle">...</p>
      <a href="#pricing" class="btn btn--primary btn--large">Start Learning Today</a>
    </div>
    <div class="hero__image">
      <!-- SVG or img placeholder -->
    </div>
  </div>
</section>
```

**Layout:**
- Desktop: 2-column grid (60/40 split)
- Mobile: stack (content → image)
- Min-height: 80vh
- Vertical center alignment

### 5.2 Features Section
```html
<section class="features">
  <div class="container">
    <h2 class="section-title">Why Choose Our Courses</h2>
    <div class="features-grid">
      <article class="feature-card">...</article>
      <article class="feature-card">...</article>
      <article class="feature-card">...</article>
    </div>
  </div>
</section>
```

**Layout:**
- Desktop: 3-column grid (gap: 32px)
- Tablet: 2-column grid
- Mobile: 1-column stack

### 5.3 Pricing Section
```html
<section class="pricing">
  <div class="container">
    <h2 class="section-title">Choose Your Plan</h2>
    <div class="pricing-toggle">
      <button data-plan="monthly">Monthly</button>
      <button data-plan="annual" class="active">Annual (Save 20%)</button>
    </div>
    <div class="pricing-grid">
      <div class="pricing-card">...</div>
      <div class="pricing-card pricing-card--featured">...</div>
      <div class="pricing-card">...</div>
    </div>
  </div>
</section>
```

**Layout:**
- Desktop: 3-column grid (equal width)
- Mobile: stack (featured first on mobile)

---

## 6. JavaScript Architecture

### 6.1 Module Structure
```javascript
// main.js
const App = {
  init() {
    this.initNav();
    this.initSmoothScroll();
    this.initPricingToggle();
    this.initScrollEffects();
  },

  initNav() {
    // Mobile menu toggle
    // Scroll detection for backdrop
  },

  initSmoothScroll() {
    // Smooth scroll to anchors
  },

  initPricingToggle() {
    // Switch monthly/annual pricing
  },

  initScrollEffects() {
    // Add .nav--scrolled on scroll
  }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
```

### 6.2 Event Handlers
- **Nav scroll:** `window.addEventListener('scroll', throttle(handleScroll, 100))`
- **Mobile menu:** `toggle.addEventListener('click', toggleMobileMenu)`
- **Smooth scroll:** `navLink.addEventListener('click', smoothScrollTo)`
- **Pricing toggle:** `toggleBtn.addEventListener('click', switchPricing)`

### 6.3 Performance Considerations
- Throttle scroll events (100ms)
- Use `requestAnimationFrame` for smooth animations
- Passive event listeners where applicable
- Minimize DOM queries (cache selectors)

---

## 7. Responsive Breakpoints

```css
/* Mobile-first approach */

/* Base: 0-639px (mobile) */
/* No media query needed */

/* Small tablet: 640px+ */
@media (min-width: 640px) {
  /* 2-col feature grid */
}

/* Tablet/Desktop: 1024px+ */
@media (min-width: 1024px) {
  /* 3-col grids, side-by-side hero */
}

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) {
  /* Max container width, larger spacing */
}
```

---

## 8. API Contracts

### 8.1 External Dependencies
```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

**Fallback fonts:**
```css
--font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### 8.2 Data Structures (JS)

**Pricing plans:**
```javascript
const pricingPlans = {
  monthly: [
    { name: 'Basic', price: 29, features: [...] },
    { name: 'Standard', price: 49, features: [...], featured: true },
    { name: 'Premium', price: 79, features: [...] }
  ],
  annual: [
    { name: 'Basic', price: 290, features: [...] },
    { name: 'Standard', price: 490, features: [...], featured: true },
    { name: 'Premium', price: 790, features: [...] }
  ]
};
```

---

## 9. Security Considerations

### 9.1 Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
           style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
           font-src 'self' https://fonts.gstatic.com; 
           script-src 'self'; 
           img-src 'self' data:;">
```

### 9.2 XSS Prevention
- No inline event handlers (`onclick`, etc.)
- Use `textContent` instead of `innerHTML` for dynamic content
- Sanitize any user input (if form added later)

### 9.3 Other Headers
```html
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
<meta name="referrer" content="no-referrer-when-downgrade">
```

---

## 10. Accessibility Architecture

### 10.1 Semantic HTML
```html
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main role="main">
<section aria-labelledby="hero-heading">
<footer role="contentinfo">
```

### 10.2 ARIA Attributes
- `aria-label` for icon buttons
- `aria-expanded` for mobile menu toggle
- `aria-current="page"` for active nav link
- `role="img"` for decorative SVGs
- `aria-hidden="true"` for decorative icons

### 10.3 Focus Management
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Skip to main content link */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

## 11. Performance Budget

| Metric | Target | Strategy |
|--------|--------|----------|
| HTML | < 20KB | Semantic, minimal markup |
| CSS | < 30KB | Modular, no unused rules |
| JS | < 15KB | Vanilla JS, no libraries |
| Images | < 200KB total | SVG placeholders, compressed JPG |
| Fonts | < 100KB | Preconnect, display=swap |
| **Total** | **< 365KB** | Gzip enabled |
| FCP | < 1.5s | Critical CSS inline (optional) |
| TTI | < 3s | Defer non-critical JS |

---

## 12. Browser Support Matrix

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | Last 2 | Full |
| Firefox | Last 2 | Full |
| Safari | Last 2 | Full |
| Edge | Last 2 | Full |
| iOS Safari | 13+ | Full |
| Chrome Android | Last 2 | Full |

**Polyfills NOT needed** (modern baseline):
- CSS Grid, Flexbox
- CSS Custom Properties
- ES6+ (const/let, arrow functions, template literals)
- Intersection Observer (optional, for future enhancements)

---

## 13. Development Workflow

### 13.1 Local Dev Server
```bash
# Option 1: Python
python3 -m http.server 3000

# Option 2: Node.js
npx http-server -p 3000

# Option 3: VS Code Live Server extension
```

### 13.2 File Watchers (Optional)
- VS Code: Live Server extension (auto-reload)
- Browser DevTools: Local overrides for CSS tweaks

### 13.3 Testing Checklist
- [ ] Responsive (375px, 768px, 1024px, 1440px)
- [ ] Navigation works (smooth scroll)
- [ ] Mobile menu toggles
- [ ] Pricing toggle switches correctly
- [ ] No console errors
- [ ] Lighthouse audit (Performance >90, Accessibility >95)
- [ ] Screen reader test (VoiceOver/NVDA)

---

## 14. Deployment Considerations

### 14.1 Production Checklist
- [ ] Minify CSS/JS (optional for V1)
- [ ] Compress images
- [ ] Enable gzip/brotli on server
- [ ] Add `Cache-Control` headers
- [ ] Test on real devices
- [ ] Validate HTML (W3C validator)
- [ ] Check CSP in production

### 14.2 Hosting Options
- Static hosting: Netlify, Vercel, GitHub Pages, Cloudflare Pages
- Traditional: Apache, Nginx
- CDN: Cloudflare, AWS CloudFront

---

## 15. Future Enhancements (Out of Scope V1)

- Lazy loading images (Intersection Observer)
- Form submission (contact/signup)
- Testimonials carousel
- Video integration
- Analytics (Google Analytics, Plausible)
- A/B testing framework
- Internationalization (i18n)

---

## Sign-off

**Architect:** AI Orchestrator  
**Status:** ARCHITECTURE COMPLETE  
**Next Step:** Request human approval before git branch + frontend implementation  
**Files to create:** 7 files (1 HTML + 6 CSS + 1 JS)
