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

// ---------- Booking form (visual for now — D1 hookup is Step 2) ----------
const form = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.className = 'form-status';
  status.textContent = 'Sending...';
  await new Promise(r => setTimeout(r, 700));
  status.className = 'form-status ok';
  status.textContent = '✓ Booking received! We\'ll WhatsApp you to confirm.';
  form.reset();
});
