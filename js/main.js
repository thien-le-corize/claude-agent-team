/**
 * Landing Page Interactive Features
 */

const App = {
  /**
   * Initialize all interactive features
   */
  init() {
    this.initNav();
    this.initSmoothScroll();
    this.initPricingToggle();
    this.initScrollEffects();
  },

  /**
   * Navigation: Mobile menu toggle and scroll effects
   */
  initNav() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';

      toggle.setAttribute('aria-expanded', !isOpen);
      menu.classList.toggle('open');

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu when clicking nav links
    const navLinks = menu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('open') &&
          !menu.contains(e.target) &&
          !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  },

  /**
   * Smooth scroll to anchor links
   */
  initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  },

  /**
   * Pricing toggle: Monthly vs Annual
   */
  initPricingToggle() {
    const toggleButtons = document.querySelectorAll('.pricing-toggle button');

    if (toggleButtons.length === 0) return;

    // Pricing data
    const pricing = {
      monthly: [
        { title: 'Basic', price: '$29', period: 'per month' },
        { title: 'Standard', price: '$49', period: 'per month' },
        { title: 'Premium', price: '$79', period: 'per month' }
      ],
      annual: [
        { title: 'Basic', price: '$290', period: 'per year' },
        { title: 'Standard', price: '$490', period: 'per year' },
        { title: 'Premium', price: '$790', period: 'per year' }
      ]
    };

    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const plan = button.getAttribute('data-plan');

        // Update active state
        toggleButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        // Update pricing cards
        this.updatePricing(pricing[plan]);
      });
    });
  },

  /**
   * Update pricing card values
   */
  updatePricing(plans) {
    const cards = document.querySelectorAll('.pricing-card');

    cards.forEach((card, index) => {
      if (plans[index]) {
        const priceEl = card.querySelector('.pricing-card__price');
        const periodEl = card.querySelector('.pricing-card__period');

        if (priceEl && periodEl) {
          // Fade out
          priceEl.style.opacity = '0';
          periodEl.style.opacity = '0';

          setTimeout(() => {
            priceEl.textContent = plans[index].price;
            periodEl.textContent = plans[index].period;

            // Fade in
            priceEl.style.opacity = '1';
            periodEl.style.opacity = '1';
          }, 150);
        }
      }
    });
  },

  /**
   * Scroll effects: Add backdrop to nav when scrolled
   */
  initScrollEffects() {
    const header = document.querySelector('.header');

    if (!header) return;

    let lastScrollTop = 0;
    let ticking = false;

    const updateHeader = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScrollTop = scrollTop;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    // Initial check
    updateHeader();
  }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
