    // ── Nav scroll effect
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // ── Hamburger / Mobile menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;
      hamburger.setAttribute('aria-expanded', menuOpen);
      mobileMenu.classList.toggle('open', menuOpen);
    });

    function closeMenu() {
      menuOpen = false;
      hamburger.setAttribute('aria-expanded', false);
      mobileMenu.classList.remove('open');
    }

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (menuOpen && !nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMenu();
      }
    });

    // ── Accordion
    document.querySelectorAll('.accordion-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.accordion-item').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        });

        // Open clicked (toggle)
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // ── Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));

    // Trigger hero items immediately
    document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
 