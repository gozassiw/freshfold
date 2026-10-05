// ---------- Menu toggle ----------
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => menu.classList.remove('open'))
);

// ---------- Nav shadow on scroll ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// ---------- Sticky CTA visibility ----------
const sticky = document.getElementById('stickyCta');
const bookSection = document.getElementById('book');
const heroEl = document.querySelector('.hero');

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.target === heroEl) {
      sticky.classList.toggle('visible', !e.isIntersecting);
    }
    if (e.target === bookSection && e.isIntersecting) {
      sticky.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

io.observe(heroEl);
io.observe(bookSection);

// ---------- Booking form → POST /api/book ----------
const form = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  status.className = 'form-status';
  status.textContent = 'Sending...';

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  try {
    const res = await fetch('/api/book', {
      method: 'POST',
      body: new FormData(form),
    });

    const data = await res.json();

    if (data.ok) {
      status.className = 'form-status ok';
      status.textContent = '✓ Booking received! We\'ll WhatsApp you to confirm.';
      form.reset();
    } else {
      status.className = 'form-status err';
      status.textContent = 'Something went wrong. Please try again.';
    }
  } catch (err) {
    status.className = 'form-status err';
    status.textContent = 'Network error. Please try again.';
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
});
