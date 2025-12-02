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
});
