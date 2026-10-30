// Set your actual public contact email before publishing.
// Avoid publishing a personal phone number or home address.
const CONTACT_EMAIL = "syamimiadlinaahmadhamidi@gmail.com";


const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-navigation");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
});

navLinks.forEach(link => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}));

if ("IntersectionObserver" in window) {
  const sections = document.querySelectorAll("main section[id]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -60% 0px", threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contact-email-label").textContent = CONTACT_EMAIL;


/* ==================================
   CONTACT FORM - BACKEND API
================================== */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

const submitButton = contactForm.querySelector(
  'button[type="submit"]'
);

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const name = document
    .getElementById("contact-name").value.trim();

  const email = document
    .getElementById("contact-email").value.trim();

  const message = document
    .getElementById("contact-message").value.trim();

  if (name.length < 2 || message.length < 3) {
    formStatus.textContent =
      "Please enter a valid name and message.";
    return;
  }

  
  // Public website: open visitor's email app
  const isLocalDevelopment = [
    "localhost",
    "127.0.0.1"
  ].includes(window.location.hostname);

  
if (!isLocalDevelopment) {
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  formStatus.textContent = "Sending your message...";

  try {
    
const response = await fetch(
  `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
  {
    method: "POST",
    headers: {
      "Accept": "application/json"
    },
    body: new URLSearchParams({
      name: name,
      email: email,
      message: message,
      _subject: `Portfolio Message from ${name}`
    })
  }
);


    const result = await response.json();

    const success =
      result.success === true ||
      result.success === "true";

    if (!response.ok || !success) {
      throw new Error(
        result.message || "Unable to send message."
      );
    }

    formStatus.textContent =
      "Message sent successfully!";

    contactForm.reset();
    showContactSuccessToast();

  } catch (error) {
    console.error("Contact form error:", error);

    formStatus.textContent =
      error.message || "Unable to send message.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message ↗";
  }

  return;
}



  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  formStatus.textContent = "Sending your message...";

  try {
    const response = await fetch(
      "http://localhost:3000/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Failed to send message."
      );
    }

  
formStatus.textContent =
  "Message sent successfully!";

contactForm.reset();

// Show animated notification
showContactSuccessToast();


  } catch (error) {
    console.error("Contact form error:", error);

    formStatus.textContent =
      "Unable to send message. Please try again.";

  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message ↗";
  }
});


/* ==================================
   SCROLL REVEAL ANIMATION
================================== */

// Elements that will have scroll animations
const revealElements = document.querySelectorAll(
  ".section-heading, " +
  ".about-art, " +
  ".about-copy, " +
  ".service-card, " +
  ".project-card, " +
  ".contact-intro, " +
  ".contact-form"
);

// Add initial animation class
revealElements.forEach((element) => {
  element.classList.add("scroll-reveal");
});

// Detect when elements enter the screen

/* ==================================
   REPEAT SCROLL REVEAL ANIMATION
================================== */

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          // Show element when entering viewport
          entry.target.classList.add("is-visible");

        } else {

          // Reset when element leaves viewport
          entry.target.classList.remove("is-visible");

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });

}


/* ==================================
   HOME - TYPING ANIMATION
================================== */

const typingText = document.getElementById("typing-text");

const typingPhrases = [
  "Information Systems Graduate",
  "Data Analytics Enthusiast",
  "AI & Technology Enthusiast"
];

if (typingText) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    typingText.textContent = typingPhrases[0];
  } else {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentPhrase = typingPhrases[phraseIndex];

      if (!isDeleting) {
        charIndex++;

        typingText.textContent =
          currentPhrase.substring(0, charIndex);

        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(typeEffect, 1800);
          return;
        }
      } else {
        charIndex--;

        typingText.textContent =
          currentPhrase.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;

          phraseIndex =
            (phraseIndex + 1) % typingPhrases.length;
        }
      }

      const typingSpeed = isDeleting ? 45 : 90;

      setTimeout(typeEffect, typingSpeed);
    }

    typingText.textContent = "";
    typeEffect();
  }
}


/* ==================================
   SCROLL PROGRESS BAR
================================== */

const scrollProgress = document.getElementById(
  "scroll-progress"
);

function updateScrollProgress() {
  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const scrollPosition = window.scrollY;

  const progress = documentHeight > 0
    ? Math.min(1, Math.max(
        0,
        scrollPosition / documentHeight
      ))
    : 0;

  if (scrollProgress) {
    scrollProgress.style.transform =
      `scaleX(${progress})`;
  }
}

window.addEventListener(
  "scroll",
  updateScrollProgress,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateScrollProgress
);

updateScrollProgress();


/* ==================================
   LIGHT / DARK MODE TOGGLE
================================== */

const themeToggle = document.getElementById(
  "theme-toggle"
);

const themeIcon = document.getElementById(
  "theme-icon"
);

// Change theme
function applyTheme(theme) {

  const isDark = theme === "dark";

  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );

  themeIcon.textContent = isDark ? "☀" : "☾";

  themeToggle.setAttribute(
    "aria-pressed",
    String(isDark)
  );

  const label = isDark
    ? "Switch to light mode"
    : "Switch to dark mode";

  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
}

// Remember selected theme
let savedTheme = "light";

try {
  savedTheme =
    localStorage.getItem("portfolio-theme") || "light";
} catch (error) {
  savedTheme = "light";
}

applyTheme(savedTheme);

// Toggle on click
themeToggle.addEventListener("click", () => {

  const currentTheme =
    document.documentElement.getAttribute(
      "data-theme"
    );

  const nextTheme =
    currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem(
      "portfolio-theme",
      nextTheme
    );
  } catch (error) {
    // Theme still works without storage
  }

});


/* ==================================
   CONTACT SUCCESS TOAST
================================== */

const contactSuccessToast = document.getElementById(
  "contact-success-toast"
);

let toastTimer;

function showContactSuccessToast() {

  if (!contactSuccessToast) return;

  // Show notification
  contactSuccessToast.classList.add("show");

  // Clear previous timer
  clearTimeout(toastTimer);

  // Hide after 4 seconds
  toastTimer = setTimeout(() => {
    contactSuccessToast.classList.remove("show");
  }, 4000);

}
