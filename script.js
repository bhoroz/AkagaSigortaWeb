const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const yearSpan = document.getElementById("year");
const navbar = document.getElementById("navbar");
const revealElements = document.querySelectorAll(".reveal");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

function updateScrollUI() {
  if (navbar) {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
}

window.addEventListener("scroll", updateScrollUI);
window.addEventListener("load", updateScrollUI);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* Hero Slider */
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");

let currentHeroSlide = 0;
let heroInterval;

function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  heroDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentHeroSlide = index;
}

function nextHeroSlide() {
  const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
  showHeroSlide(nextIndex);
}

function prevHeroSlide() {
  const prevIndex = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
  showHeroSlide(prevIndex);
}

function startHeroSlider() {
  stopHeroSlider();
  heroInterval = setInterval(nextHeroSlide, 5500);
}

function stopHeroSlider() {
  if (heroInterval) {
    clearInterval(heroInterval);
  }
}

if (heroSlides.length) {
  showHeroSlide(0);
  startHeroSlider();

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showHeroSlide(index);
      startHeroSlider();
    });
  });

  if (heroNext) {
    heroNext.addEventListener("click", () => {
      nextHeroSlide();
      startHeroSlider();
    });
  }

  if (heroPrev) {
    heroPrev.addEventListener("click", () => {
      prevHeroSlide();
      startHeroSlider();
    });
  }
}