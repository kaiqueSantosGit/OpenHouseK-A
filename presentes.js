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

function initPixBox() {
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
}

function initGiftModal() {
  const modal = document.getElementById("gift-modal");
  const openButton = document.getElementById("open-gift-modal");
  const closeButton = document.getElementById("close-gift-modal");
  const form = document.getElementById("gift-form");
  const status = document.getElementById("gift-status");
  const select = document.getElementById("gift-item");

  if (!modal || !openButton || !closeButton || !form || !status || !select) {
    return;
  }

  const endpointRaw = form.getAttribute("data-endpoint") || "";
  const endpoint = endpointRaw.trim();

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  function fillSelectOptions(items) {
    select.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Selecione um presente";
    select.appendChild(placeholder);

    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = String(item.id);
      option.textContent = item.nome;
      select.appendChild(option);
    });
  }

  async function loadAvailableGifts() {
    if (!endpoint) {
      status.textContent = "Falta configurar o endpoint da lista de presentes.";
      select.innerHTML = "<option value=''>Configuração pendente</option>";
      return;
    }

    status.textContent = "Carregando presentes disponíveis...";
    select.innerHTML = "<option value=''>Carregando...</option>";

    try {
      const response = await fetch(endpoint + "?action=list", { method: "GET" });
      const raw = await response.text();
      let data = null;
      try {
        data = JSON.parse(raw);
      } catch (parseError) {
        throw new Error(raw || "Resposta inválida do servidor");
      }

      if (!data || !Array.isArray(data.items)) {
        throw new Error("Formato de resposta inválido");
      }

      if (data.items.length === 0) {
        select.innerHTML = "<option value=''>Todos os presentes já foram confirmados</option>";
        status.textContent = "Não há presentes pendentes no momento.";
        return;
      }

      fillSelectOptions(data.items);
      status.textContent = "Selecione o item e confirme.";
    } catch (error) {
      select.innerHTML = "<option value=''>Não foi possível carregar</option>";
      const msg = String(error.message || "");
      if (msg.toLowerCase().includes("referência de objeto")) {
        status.textContent = "Erro no Apps Script: verifique se as abas 'Presentes' e 'Confirmacoes' existem na planilha.";
      } else {
        status.textContent = "Erro ao carregar presentes. Tente novamente.";
      }
    }
  }

  openButton.addEventListener("click", async () => {
    openModal();
    await loadAvailableGifts();
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.closeGift === "true") {
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

    const nameInput = document.getElementById("gift-name");
    const name = nameInput ? nameInput.value.trim() : "";
    const giftId = select.value;

    if (!name || !giftId) {
      status.textContent = "Preencha seu nome e selecione um presente.";
      return;
    }

    if (!endpoint) {
      status.textContent = "Falta configurar o endpoint da lista de presentes.";
      return;
    }

    const payload = new URLSearchParams({
      action: "confirm",
      nome: name,
      presente_id: giftId,
      data: new Date().toISOString(),
    });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload,
      });

      const raw = await response.text();
      let data = null;
      try {
        data = JSON.parse(raw);
      } catch (parseError) {
        throw new Error(raw || "Resposta inválida do servidor");
      }

      if (!data || data.ok !== true) {
        if (data && data.error === "already_confirmed") {
          status.textContent = "Esse presente já foi confirmado por outra pessoa.";
          await loadAvailableGifts();
          return;
        }
        throw new Error("Confirmação não concluída");
      }

      status.textContent = "Presente confirmado com sucesso. Obrigado pelo carinho.";
      form.reset();
      await loadAvailableGifts();
      setTimeout(closeModal, 1000);
    } catch (error) {
      const msg = String(error.message || "");
      if (msg.toLowerCase().includes("referência de objeto")) {
        status.textContent = "Erro no Apps Script: confira as abas e os nomes das colunas da planilha.";
      } else {
        status.textContent = "Não foi possível confirmar agora. Atualize e tente novamente.";
      }
    }
  });
}

initMobileMenu();
initPixBox();
initGiftModal();
