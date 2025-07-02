// SMOOTH SCROLL
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
    document.body.classList.add('dark-mode');
  }
  themeToggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  };
}

// PROGRESS BARS
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.progress').forEach(bar => {
      const width = bar.dataset.progress;
      bar.style.width = width + '%';
    });
  }, 500);

  // SECTION FADE-IN
  fadeInOnScroll();
});

// FADE-IN ON SCROLL
function fadeInOnScroll() {
  document.querySelectorAll('.fade-in').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);

// CARD TOUCH SUPPORT
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('touchstart', () => {
    card.classList.toggle('hovered');
  });
});

// TESTIMONIALS CAROUSEL
const carousel = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
let current = 0;
function setCarousel(idx) {
  items.forEach((item, i) => item.classList.toggle('active', i === idx));
}
const leftBtn = document.querySelector('.carousel-btn.left');
const rightBtn = document.querySelector('.carousel-btn.right');
if (leftBtn && rightBtn && items.length) {
  leftBtn.onclick = () => {
    current = (current - 1 + items.length) % items.length;
    setCarousel(current);
  };
  rightBtn.onclick = () => {
    current = (current + 1) % items.length;
    setCarousel(current);
  };
  setInterval(() => {
    current = (current + 1) % items.length;
    setCarousel(current);
  }, 6000);
}

// CONTACT FORM
const contactForm = document.getElementById('contact-form');
const formMsg = document.getElementById('form-message');
if (contactForm && formMsg) {
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
    formMsg.textContent = "Message sent! I'll get back to you soon.";
    formMsg.style.color = "#388e3c";
    contactForm.reset();
    setTimeout(() => formMsg.textContent = '', 5000);
  });
}
