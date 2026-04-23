// NAV SCROLL HIDE
let lastScroll = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const cur = window.scrollY;
  navbar.classList.toggle('hide', cur > lastScroll && cur > 80);
  navbar.classList.toggle('scrolled', cur > 30);
  lastScroll = cur;
});

// SCROLL REVEAL
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initReveal);

// MOBILE MENU
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('active');
}
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('active');
  });
});

// CUSTOM CURSOR (desktop only)
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a,button,.teaser-card,.fleet-card,.why-card')) {
      ring.style.width = '56px'; ring.style.height = '56px';
      ring.style.borderColor = 'rgba(255,255,255,0.8)';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a,button,.teaser-card,.fleet-card,.why-card')) {
      ring.style.width = '36px'; ring.style.height = '36px';
      ring.style.borderColor = 'rgba(245,243,239,0.5)';
    }
  });
}