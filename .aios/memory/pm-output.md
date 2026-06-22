# PM Output: Landing Page Quảng Cáo Khóa Học

**Date:** 2026-06-22  
**Task:** TASK-001  
**Request:** Tái tạo landing page quảng cáo khóa học tiếng Anh (HTML/CSS/JS)

---

## 1. Product Requirements Document (PRD)

### 1.1 Overview
Tái tạo landing page quảng cáo khóa học tiếng Anh trực tuyến với thiết kế hiện đại, conversion-focused. Page phải tối ưu cho SEO, accessibility, và hiệu suất.

### 1.2 Core Objectives
1. **Conversion:** Thu hút người dùng đăng ký khóa học
2. **Trust building:** Thể hiện chuyên môn qua design & content
3. **Mobile-first:** Responsive hoàn toàn trên mọi thiết bị
4. **Performance:** Fast load, optimized assets

### 1.3 Target Audience
- Người học tiếng Anh (18-45 tuổi)
- Muốn học online linh hoạt
- Cần chứng chỉ hoặc nâng cao kỹ năng nghề nghiệp

---

## 2. User Stories

### US-001: Hero Section
**As a** visitor  
**I want to** thấy ngay value proposition rõ ràng  
**So that** tôi hiểu được khóa học có phù hợp với nhu cầu không

**Acceptance Criteria:**
- Headline nổi bật (Playfair Display serif)
- Subhead giải thích benefit
- Primary CTA button ("Start Learning Today")
- Hero image/visual minh họa
- Eyebrow pill ("Online English Learning")

### US-002: Features Section
**As a** potential student  
**I want to** biết điểm mạnh của khóa học  
**So that** tôi có lý do để chọn thay vì đối thủ

**AC:**
- 3 feature cards với icon, title, description
- Grid layout (desktop 3-col, mobile stack)
- Features: Expert Instructors, Flexible Learning, Proven Results

### US-003: Pricing Section
**As a** visitor  
**I want to** xem các gói giá rõ ràng  
**So that** tôi quyết định gói nào phù hợp

**AC:**
- 3 pricing tiers (Basic, Standard, Premium)
- Middle tier highlighted (slate-blue border + "Most popular" badge)
- Mỗi tier: price, features list, CTA button
- Annual billing option (+20% savings)

### US-004: Contact/CTA Section
**As a** interested visitor  
**I want to** dễ dàng liên hệ hoặc đăng ký  
**So that** tôi không bị mất cơ hội conversion

**AC:**
- Contact form hoặc final CTA
- Email/phone visible
- Footer với social links

### US-005: Navigation
**As a** user  
**I want to** scroll đến section mong muốn  
**So that** tôi tiết kiệm thời gian tìm thông tin

**AC:**
- Sticky nav với backdrop blur
- Smooth scroll to anchors
- Mobile hamburger menu
- Logo + 4 nav links (Features, Courses, Pricing, Contact)

---

## 3. Task Breakdown

### Frontend Tasks

#### TASK-001-F1: HTML Structure
- [ ] Semantic HTML5 structure
- [ ] Meta tags (SEO, OG, security headers)
- [ ] Sections: nav, hero, features, pricing, contact, footer
- [ ] Accessibility: ARIA labels, roles, alt text

#### TASK-001-F2: CSS System
- [ ] `css/variables.css` — design tokens (colors, typography, spacing)
- [ ] `css/reset.css` — normalize browser styles
- [ ] `css/typography.css` — font styles (Playfair + Inter)
- [ ] `css/components.css` — buttons, cards, nav
- [ ] `css/sections.css` — hero, features, pricing
- [ ] `css/utilities.css` — helpers (container, spacing)

#### TASK-001-F3: Responsive Design
- [ ] Mobile-first approach
- [ ] Breakpoints: 640px, 1024px, 1280px
- [ ] Hamburger menu cho mobile
- [ ] Grid → stack on mobile

#### TASK-001-F4: JavaScript Interactions
- [ ] `js/main.js`:
  - Smooth scroll
  - Mobile menu toggle
  - Scroll-triggered nav backdrop
  - Form validation (if contact form)
  - Pricing toggle (monthly/annual)

#### TASK-001-F5: Assets
- [ ] `assets/` folder structure
- [ ] Placeholder images (SVG hoặc compressed JPG)
- [ ] Icons (inline SVG hoặc icon font)

---

## 4. Design Specifications

### 4.1 Color Palette (từ design_sense)
```
Background: #F7F5F1 (soft off-white)
Surface: #FFFFFF
Borders: #E7E3DA
Text (ink): #1E2227
Muted text: #6B7077
Accent (slate-blue): #3C5A78 (hover: #2E4760)
```

### 4.2 Typography
```
Headings: Playfair Display (500-700), tight tracking
Body/UI: Inter (400-500)
Hero title: 48-64px (desktop), 32-40px (mobile)
Section title: 36-42px
Body: 16-18px
```

### 4.3 Spacing
```
Container max-width: 1280px
Section padding: 80px 0 (desktop), 48px 0 (mobile)
Grid gap: 32px (desktop), 24px (mobile)
```

### 4.4 Components
- **Buttons:** Rounded (8px), NOT pill. Primary = slate-blue bg. Secondary = outline.
- **Cards:** White bg, subtle shadow, 12px border-radius, hairline border
- **Nav:** Sticky, backdrop-blur, 64px height
- **Pricing cards:** 3-column grid, middle tier has slate-blue border

---

## 5. Technical Constraints

1. **No framework:** Pure HTML/CSS/JS (no React, Vue, etc.)
2. **No build step:** Direct file loading (dev server optional)
3. **Browser support:** Modern browsers (Chrome, Firefox, Safari, Edge last 2 versions)
4. **Performance budget:**
   - First Contentful Paint < 1.5s
   - Total page size < 500KB (uncompressed)
5. **Security:** CSP headers, XSS prevention
6. **Accessibility:** WCAG 2.1 AA compliance

---

## 6. Out of Scope (V1)

- Backend/API integration
- User authentication
- Payment processing
- CMS integration
- Multi-language support (chỉ tiếng Anh)
- Analytics tracking (có thể thêm sau)

---

## 7. Success Metrics (để QA test)

- [ ] Mobile responsive (375px → 1920px)
- [ ] All links functional (smooth scroll)
- [ ] Forms validate correctly
- [ ] No console errors
- [ ] Lighthouse score: Performance >90, Accessibility >95
- [ ] Cross-browser tested

---

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Design không match brand | High | Follow design_sense strictly |
| Performance issues | Medium | Optimize images, minimize CSS/JS |
| Accessibility gaps | High | Use semantic HTML, ARIA, test with screen reader |
| Mobile UX poor | High | Mobile-first development |

---

## 9. Dependencies

- Google Fonts: Playfair Display + Inter
- Modern browser with ES6+ support
- Optional: Local dev server (live-server, http-server)

---

## 10. Deliverables

```
edenred-hp/
├── index.html
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── typography.css
│   ├── components.css
│   ├── sections.css
│   └── utilities.css
├── js/
│   └── main.js
└── assets/
    ├── images/
    └── icons/
```

---

## Sign-off

**PM:** AI Orchestrator  
**Status:** READY FOR ARCHITECT REVIEW  
**Next Step:** Architect defines technical architecture & API contracts (if any)
