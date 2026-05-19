/* ============================================================
   TOP SPA RELAX & BEAUTY — Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ---- Mobile hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  /* ---- Scroll reveal ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- Active nav link ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- WhatsApp link builder ---- */
  const WA_NUMBER = '525500000000'; // Reemplazar con número real
  const WA_DEFAULT = 'Hola, me gustaría información y reservar un servicio en Top Spa Relax & Beauty.';

  document.querySelectorAll('[data-wa]').forEach(el => {
    const customMsg = el.dataset.wa;
    const message = encodeURIComponent(customMsg && customMsg.trim() ? customMsg : WA_DEFAULT);
    const link = `https://wa.me/${WA_NUMBER}?text=${message}`;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(link, '_blank');
    });
    el.href = link;
    el.target = '_blank';
  });

  /* ---- Smooth anchor scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  /* ---- Booking form → WhatsApp ---- */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('booking-name').value.trim();
      const service = document.getElementById('booking-service').value;
      const date    = document.getElementById('booking-date').value;
      const phone   = document.getElementById('booking-phone').value.trim();

      if (!name || !service || !phone) return;

      const dateStr = date ? ` para el ${date}` : '';
      const msg = `Hola, soy ${name} y me gustaría agendar ${service}${dateStr}. Mi número es ${phone}.`;
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

});
