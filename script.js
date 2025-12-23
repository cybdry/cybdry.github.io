// Toggle BibTeX citation
function toggleBib(id) {
  const bibElement = document.getElementById(id + "-bib");
  if (bibElement.style.display === "none" || bibElement.style.display === "") {
    bibElement.style.display = "block";
  } else {
    bibElement.style.display = "none";
  }
}

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('nav a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Use native smooth scroll - CSS scroll-padding-top handles the offset
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add active state to navigation links on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function setActiveLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink(); // Call on load
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".publication, .experience-item, .education-item, .skill-category",
  );

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  // Animate intro paragraphs
  const introParagraphs = document.querySelectorAll(".intro");
  introParagraphs.forEach((p, index) => {
    p.style.opacity = "0";
    p.style.transform = "translateY(10px)";
    p.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;

    setTimeout(() => {
      p.style.opacity = "1";
      p.style.transform = "translateY(0)";
    }, 100);
  });
});

// Copy email to clipboard on click
document.addEventListener("DOMContentLoaded", function () {
  const emailLink = document.querySelector('.contact a[href^="mailto:"]');

  if (emailLink) {
    emailLink.addEventListener("click", function (e) {
      e.preventDefault();
      const email = this.textContent;

      navigator.clipboard
        .writeText(email)
        .then(function () {
          // Create temporary tooltip
          const tooltip = document.createElement("span");
          tooltip.textContent = "Email copied!";
          tooltip.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 0.85em;
                    margin-left: 10px;
                    animation: fadeOut 2s forwards;
                `;

          emailLink.parentNode.style.position = "relative";
          emailLink.parentNode.appendChild(tooltip);

          setTimeout(() => {
            tooltip.remove();
          }, 2000);
        })
        .catch(function (err) {
          console.error("Could not copy email: ", err);
        });
    });
  }
});

// Add CSS animation for tooltip
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; }
        70% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Scroll to top button
document.addEventListener("DOMContentLoaded", function () {
  // Create scroll to top button
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = "↑";
  scrollButton.className = "scroll-to-top";
  scrollButton.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollButton);

  // Add styles for scroll to top button
  const scrollButtonStyle = document.createElement("style");
  scrollButtonStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--accent-color);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
        }

        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .scroll-to-top:hover {
            background-color: var(--hover-color);
            transform: translateY(-3px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .scroll-to-top:active {
            transform: translateY(-1px);
        }

        @media (max-width: 768px) {
            .scroll-to-top {
                width: 45px;
                height: 45px;
                bottom: 20px;
                right: 20px;
                font-size: 20px;
            }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
            background: var(--accent-color);
            border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: var(--hover-color);
        }
    `;
  document.head.appendChild(scrollButtonStyle);

  // Header scroll effect
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    // Scroll to top button
    if (window.pageYOffset > 300) {
      scrollButton.classList.add("visible");
    } else {
      scrollButton.classList.remove("visible");
    }

    // Header shadow on scroll
    if (window.pageYOffset > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scroll to top when button is clicked
  scrollButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
