document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    formStatus.textContent = "Enviando...";

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        headers: {
          Accept: "application/json",
        },
        body: new FormData(contactForm),
      });

      if (response.ok) {
        formStatus.textContent = "Brief enviado! Retornaremos em breve.";
        contactForm.reset();
      } else {
        formStatus.textContent = "Ocorreu um erro. Tente novamente ou fale no WhatsApp.";
      }
    } catch (error) {
      formStatus.textContent = "Sem conexão no momento. Tente novamente mais tarde.";
    }
  });

  const yearNode = document.getElementById("current-year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  // Scroll reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  const cardClasses = ["about-card", "service-card", "ai-card", "portfolio-card"];

  document
    .querySelectorAll(
      ".section-header, .about-card, .service-card, .ai-card, .portfolio-card, .tech-columns > div, .contact-info, .contact-form"
    )
    .forEach((el) => {
      const isCard = cardClasses.some((cls) => el.classList.contains(cls));
      if (isCard) {
        const siblings = Array.from(el.parentElement.children).filter((c) =>
          cardClasses.some((cls) => c.classList.contains(cls))
        );
        const idx = siblings.indexOf(el);
        if (idx > 0) el.style.transitionDelay = `${idx * 0.08}s`;
      }
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
});
