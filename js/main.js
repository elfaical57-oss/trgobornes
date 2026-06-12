/* ===========================
   TrGoBornes – Main JavaScript
   =========================== */

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on outside tap
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.width = p.style.height = (Math.random() * 3 + 2) + 'px';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
}
createParticles();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('counter')) {
        animateCounter(entry.target);
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.segment-card, .product-card, .blog-card, .testimonial-card, .why-point, .process-step').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

document.querySelectorAll('.counter').forEach(el => observer.observe(el));

// ===== PRODUCTS FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== LEAFLET MAP =====
const isMobile = window.innerWidth <= 768;
const map = L.map('map', {
  center: [31.5, -7.5],
  zoom: isMobile ? 5 : 6,
  zoomControl: true,
  tap: true,
});

window.addEventListener('resize', () => {
  map.invalidateSize();
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  maxZoom: 18,
}).addTo(map);

function makeIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:32px;height:32px;
      background:${color};
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
    "></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
}

const bornes = [
  { lat: 33.589886, lng: -7.603869, city: 'Casablanca', name: 'Centre Commercial Anfa Place', power: '22 kW AC', status: 'green' },
  { lat: 33.573110, lng: -7.589843, city: 'Casablanca', name: 'Hôtel Hyatt Regency', power: '50 kW DC', status: 'green' },
  { lat: 34.020882, lng: -6.841650, city: 'Rabat', name: 'Agdal Business Center', power: '22 kW AC', status: 'orange' },
  { lat: 34.013130, lng: -6.832580, city: 'Rabat', name: 'Hôtel Sofitel Rabat', power: '7.4 kW AC', status: 'green' },
  { lat: 31.629472, lng: -7.981084, city: 'Marrakech', name: 'Palmeraie Mall', power: '50 kW DC', status: 'green' },
  { lat: 31.634723, lng: -8.015048, city: 'Marrakech', name: 'Station Total Targa', power: '120 kW DC', status: 'orange' },
  { lat: 35.769637, lng: -5.833954, city: 'Tanger', name: 'Tanger City Center', power: '22 kW AC', status: 'green' },
  { lat: 30.422000, lng: -9.598000, city: 'Agadir', name: 'Agadir Marina', power: '22 kW AC', status: 'green' },
  { lat: 34.037714, lng: -5.002313, city: 'Fès', name: 'Parking Atlas Fès', power: '7.4 kW AC', status: 'red' },
  { lat: 33.895415, lng: -5.547979, city: 'Meknès', name: 'Gare Meknès', power: '22 kW AC', status: 'blue' },
  { lat: 32.298080, lng: -9.228360, city: 'El Jadida', name: 'Centre El Jadida', power: '7.4 kW AC', status: 'blue' },
  { lat: 33.000000, lng: -8.500000, city: 'Settat', name: 'Autoroute A7 Settat', power: '50 kW DC', status: 'blue' },
];

const statusLabels = {
  green: 'Disponible',
  orange: 'En cours d\'utilisation',
  red: 'Hors service',
  blue: 'À venir',
};
const statusColors = { green: '#2ECC71', orange: '#F39C12', red: '#E74C3C', blue: '#3498DB' };

bornes.forEach(b => {
  const marker = L.marker([b.lat, b.lng], { icon: makeIcon(statusColors[b.status]) }).addTo(map);
  marker.bindPopup(`
    <div style="font-family:'Poppins',sans-serif;min-width:200px;padding:4px 0">
      <strong style="font-size:1rem;color:#0D1B2A">${b.name}</strong><br/>
      <span style="color:#8A9BB0;font-size:0.85rem">${b.city}</span>
      <hr style="margin:10px 0;border-color:#eee"/>
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
        <span style="font-size:0.85rem">⚡</span>
        <span style="font-size:0.85rem;color:#2C3E50">${b.power}</span>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <span style="width:10px;height:10px;background:${statusColors[b.status]};border-radius:50%;display:inline-block"></span>
        <span style="font-size:0.82rem;color:${statusColors[b.status]};font-weight:600">${statusLabels[b.status]}</span>
      </div>
    </div>
  `);
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.classList.add('show');
  this.reset();
  setTimeout(() => success.classList.remove('show'), 5000);
});

// ===== NEWSLETTER FORM =====
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  this.innerHTML = '<span style="color:#2ECC71;font-size:0.9rem;font-weight:600">✓ Merci pour votre inscription !</span>';
});
