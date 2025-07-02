// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Progress bar animations
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.progress').forEach(bar => {
      const width = bar.dataset.progress;
      bar.style.width = width + '%';
    });
  }, 500);
});

// Card overlay interaction (touch support)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('touchstart', () => {
    card.classList.toggle('hovered');
  });
});

// Dark/Light theme toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
  document.body.classList.add('dark-mode');
}
themeToggle.onclick = () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
};

// Testimonials carousel
const carousel = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
let current = 0;
function setCarousel(idx) {
  items.forEach((item, i) => item.classList.toggle('active', i === idx));
}
document.querySelector('.carousel-btn.left').onclick = () => {
  current = (current - 1 + items.length) % items.length;
  setCarousel(current);
};
document.querySelector('.carousel-btn.right').onclick = () => {
  current = (current + 1) % items.length;
  setCarousel(current);
};
// Auto-slide
setInterval(() => {
  current = (current + 1) % items.length;
  setCarousel(current);
}, 6000);

// Contact form validation and fake submit
const contactForm = document.getElementById('contact-form');
const formMsg = document.getElementById('form-message');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  let valid = true;
  if (!name) valid = false;
  if (!email.match(/^[^@]+@[^@]+\.[a-z]{2,}$/i)) valid = false;
  if (!message) valid = false;
  if (!valid) {
    formMsg.textContent = "Please fill all fields correctly.";
    formMsg.style.color = "#d32f2f";
    return;
  }
  // Simulate submit
  formMsg.textContent = "Message sent! I'll get back to you soon.";
  formMsg.style.color = "#388e3c";
  contactForm.reset();
  setTimeout(() => formMsg.textContent = '', 5000);
});

// Section fade-in on scroll
function fadeInOnScroll() {
  document.querySelectorAll('.fade-in').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);
