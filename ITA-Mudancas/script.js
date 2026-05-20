const WHATSAPP_NUMBER = "5511967791969";

const form = document.querySelector("#lead-form");

/* =========================================================
   FUNÇÕES DE ERRO E VALIDAÇÃO
========================================================= */

function setFieldError(field, message) {
  const errorEl = field.parentElement.querySelector(".error-message");

  field.classList.add("input-error");
  errorEl.textContent = message;
}

function clearFieldError(field) {
  const errorEl = field.parentElement.querySelector(".error-message");

  field.classList.remove("input-error");
  errorEl.textContent = "";
}

// function validateField(field) {
//   const value = field.value.trim();

//   if (!value) {
//     setFieldError(field, "Este campo é obrigatório.");
//     return false;
//   }

//   clearFieldError(field);
//   return true;
// }

function validateField(field) {
  const value = field.value.trim();

  // campo observações é opcional
  if (field.name === "observacoes") {
    clearFieldError(field);
    return true;
  }

  if (!value) {
    setFieldError(field, "Este campo é obrigatório.");
    return false;
  }

  clearFieldError(field);
  return true;
}

/* =========================================================
   MENSAGEM DO WHATSAPP
========================================================= */

function buildWhatsappMessage(data) {
  return [
    "Olá vim pelo site, gostaria de solicitar um orçamento:",
    "",
    `*Nome*: ${data.nome}\n\n`,
    `*Origem*: ${data.origem}\n\n`,
    `*Destino*: ${data.destino}\n\n`,
    `*Serviço*: ${data.servico}\n\n`,
    `*Observações*: ${data.observacoes}`,
  ].join("\n");
}

/* =========================================================
   EVENTOS DOS CAMPOS
========================================================= */

form.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("blur", () => validateField(field));

  field.addEventListener("input", () => {
    if (field.classList.contains("input-error")) {
      validateField(field);
    }
  });
});

/* =========================================================
   ENVIO DO FORMULÁRIO
========================================================= */

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = Array.from(form.querySelectorAll("input, textarea"));

  const allValid = fields.every((field) => validateField(field));

  if (!allValid) {
    return;
  }

  const formData = new FormData(form);

  const data = {
    nome: formData.get("nome").toString().trim(),
    origem: formData.get("origem").toString().trim(),
    destino: formData.get("destino").toString().trim(),
    servico: formData.get("servico").toString().trim(),
    observacoes: formData.get("observacoes").toString().trim(),
  };

  const message = buildWhatsappMessage(data);

  const encodedMessage = encodeURIComponent(message);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

/* =========================================================
   ANIMAÇÃO REVEAL
========================================================= */

const revealSections = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  },
);

revealSections.forEach((section) => revealObserver.observe(section));

/* =========================================================
   LUCIDE ICONS
========================================================= */

if (window.lucide && typeof window.lucide.createIcons === "function") {
  window.lucide.createIcons();
}
