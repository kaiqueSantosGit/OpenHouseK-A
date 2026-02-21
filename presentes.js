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

const showPixButton = document.getElementById("show-pix");
const copyPixButton = document.getElementById("copy-pix");
const pixBox = document.getElementById("pix-box");
const pixKey = document.getElementById("pix-key");

if (showPixButton && pixBox) {
  showPixButton.addEventListener("click", () => {
    pixBox.classList.toggle("hidden");
    showPixButton.textContent = pixBox.classList.contains("hidden")
      ? "Ver chave e QR Code"
      : "Ocultar chave e QR Code";
  });
}

if (copyPixButton && pixKey) {
  copyPixButton.addEventListener("click", async () => {
    const value = pixKey.textContent.trim();

    try {
      await navigator.clipboard.writeText(value);
      copyPixButton.textContent = "Chave copiada";
      setTimeout(() => {
        copyPixButton.textContent = "Copiar chave";
      }, 1500);
    } catch (error) {
      copyPixButton.textContent = "Não foi possível copiar";
      setTimeout(() => {
        copyPixButton.textContent = "Copiar chave";
      }, 1800);
    }
  });
}

initMobileMenu();
