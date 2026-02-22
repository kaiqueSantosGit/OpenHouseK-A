document.documentElement.classList.add("js-ready");

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (!menuToggle || !primaryNav) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const willOpen = !primaryNav.classList.contains("is-open");
    primaryNav.classList.toggle("is-open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initRsvpModal() {
  const modal = document.getElementById("rsvp-modal");
  const openButton = document.getElementById("open-rsvp-modal");
  const closeButton = document.getElementById("close-rsvp-modal");
  const form = document.getElementById("rsvp-form");
  const status = document.getElementById("rsvp-status");

  if (!modal || !openButton || !closeButton || !form || !status) {
    return;
  }

  const endpoint = form.dataset.endpoint?.trim();

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.closeRsvp === "true") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitter = event.submitter;
    const choice = submitter?.dataset.rsvpChoice;
    const nameInput = document.getElementById("rsvp-name");
    const name = nameInput?.value.trim() || "";

    if (!name || !choice) {
      status.textContent = "Preencha o nome e escolha uma opção.";
      return;
    }

    if (!endpoint) {
      status.textContent = "Falta configurar o endpoint da lista de presença.";
      return;
    }

    const payload = new URLSearchParams({
      nome: name,
      resposta: choice,
      data: new Date().toISOString(),
    });

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload,
      });

      status.textContent = "Resposta enviada. Obrigado por confirmar.";
      form.reset();
      setTimeout(closeModal, 1000);
    } catch (error) {
      status.textContent = "Não foi possível enviar agora. Tente novamente.";
    }
  });
}

const targetDate = new Date("2026-03-28T00:00:00");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    return;
  }

  const now = new Date();
  const distance = targetDate.getTime() - now.getTime();

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / 1000);

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const revealElements = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-down");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => observer.observe(element));

const messageForm = document.getElementById("message-form");
const formStatus = document.getElementById("form-status");

if (messageForm && formStatus) {
  const params = new URLSearchParams(window.location.search);
  if (params.get("enviado") === "1") {
    formStatus.textContent = "Mensagem enviada com sucesso. Obrigado pelo carinho.";
  }
}

initMobileMenu();
initRsvpModal();
