

// Menülogik
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const offcanvas = document.getElementById('offcanvas');
const overlay = document.getElementById('overlay');

document.getElementById("logo").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    location.reload();
  });

document.getElementById("logo-navigation").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    location.reload();
  });

// Menü öffnen
function openMenu() {
  offcanvas.classList.add('open');
  overlay.classList.add('active');
  document.body.classList.add('no-scroll');
  menuToggle.style.display = 'none';
  menuToggle.setAttribute('aria-expanded', 'true');
}

// Menü schließen
function closeOffcanvas() {
  offcanvas.classList.remove('open');
  overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
  menuToggle.style.display = 'block';
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeOffcanvas);
overlay.addEventListener('click', closeOffcanvas);
document.querySelectorAll('.offcanvas-menu a').forEach(link => {
  link.addEventListener('click', closeOffcanvas);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    // Auf größeren Bildschirmen: Icon ausblenden (CSS übernimmt das)
    menuToggle.style.display = '';
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Menü vollständig schließen
    offcanvas.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
});


// Schließe Menü beim Klick auf Link
const menuLinks = document.querySelectorAll('.offcanvas-menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', closeOffcanvas);
});

// Hero-Bilder wechseln
/*const heroImages = document.querySelectorAll('.hero-image');
let currentIndex = 0;

function showNextHeroImage() {
  heroImages[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % heroImages.length;
  heroImages[currentIndex].classList.add('active');
}

if (heroImages.length > 0) {
  heroImages[0].classList.add('active');
  setInterval(showNextHeroImage, 3000);
} */

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".carousel-image");
  const section = document.querySelector(".aesthetik-scroll-section");

  window.addEventListener("scroll", () => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollY = window.scrollY + window.innerHeight / 2;

    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
      const progress = (scrollY - sectionTop) / sectionHeight;
      const index = Math.floor(progress * images.length);

      images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
      });
    }
  });
});

// Scroll-Animation für Überschrift "Il Filo Rosso"
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const title = document.getElementById('hero-title');
  
  if (title) {
    // Geschwindigkeit anpassbar: 1.5 = 150 % schneller
    title.style.transform = `translateY(${-scrollY * 0.5}px)`;
  }
});

const modal = document.getElementById("buyModal");
const openBtn = document.querySelector(".cta-button");
const closeBtn = document.querySelector(".close-btn");
const cancelBtn = document.getElementById("cancelBtn");
const orderForm = document.getElementById("orderForm");
const orderFeedback = document.getElementById("orderFeedback");

let orderCompleted = false; // Status der Bestellung

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  document.body.classList.add('no-scroll');
  
  if (!orderCompleted) {
    orderFeedback.style.display = "none"; // Feedback ausblenden
    orderForm.style.display = "block";    // Formular anzeigen
    orderForm.reset();                     // Formular zurücksetzen
  } else {
    // Bestellung abgeschlossen: Feedback anzeigen, Formular ausblenden
    orderFeedback.style.display = "block";
    orderForm.style.display = "none";
  }
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove('no-scroll');
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove('no-scroll');
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove('no-scroll');
  }
});

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  orderForm.style.display = "none";
  orderFeedback.style.display = "block";
  orderCompleted = true; // Status auf abgeschlossen setzen
});


document.querySelectorAll('.usp-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flip');
    });
  });


  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox-overlay';
  document.body.appendChild(lightbox);

  const img = document.createElement('img');
  lightbox.appendChild(img);

  // Öffnen der Lightbox
  function openLightbox(src) {
    img.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // 🔒 Scroll sperren
  }

  // Schließen der Lightbox
  function closeLightbox() {
    lightbox.classList.remove('active', 'zoomed');
  img.style.transform = 'scale(1)';
  document.body.style.overflow = ''; // 🔓 Scroll wieder erlauben
    setTimeout(() => {
      img.src = '';
    }, 300); // nach CSS transition
  }

  // Klickbare Bilder
  document.querySelectorAll('.enlargeable').forEach((image) => {
    image.addEventListener('click', () => {
      const fullSrc = image.getAttribute('data-full');
      openLightbox(fullSrc);
    });
  });

  // Klick auf Overlay
  lightbox.addEventListener('click', closeLightbox);

  // ESC zum Schließen
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

const heroContent = document.querySelector('.hero-content');

const heroObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      heroContent.classList.add('visible');
    }
  },
  {
    threshold: 0.3,
  }
);

if (heroContent) {
  heroObserver.observe(heroContent);
}

const sectionInners = document.querySelectorAll('.section-inner');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target); // nur einmal animieren
      }
    });
  },
  {
    threshold: 0.3,
  }
);

sectionInners.forEach((el) => sectionObserver.observe(el));

let lastScrollTop = 0;
  const nav = document.querySelector('.scroll-nav');

  window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop < 100) {
      nav.classList.remove('show', 'hide');
      return;
    }

    if (scrollTop > lastScrollTop) {
      // runter scrollen → verstecken
      nav.classList.remove('show');
      nav.classList.add('hide');
    } else {
      // hoch scrollen → anzeigen
      nav.classList.remove('hide');
      nav.classList.add('show');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });