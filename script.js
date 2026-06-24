/* ---------- 3D tilt effect ---------- */
/* Covers every card-style element across both pages, not just .card */
const tiltSelectors = [
  ".card",
  ".model-card",
  ".wallet-card",
  ".price-card",
  ".security-card"
];

const tiltElements = document.querySelectorAll(tiltSelectors.join(","));

tiltElements.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.transform = `
      perspective(600px)
      rotateX(${-(y - rect.height / 2) / 15}deg)
      rotateY(${(x - rect.width / 2) / 15}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });

});


/* ---------- Loader cleanup ---------- */
/* The loader fades out via CSS, but stays in the DOM forever unless removed.
   Once the animation ends, detach it so it can't block clicks or tab order. */
const loader = document.querySelector(".loader");

if (loader) {
  loader.addEventListener("animationend", () => {
    loader.remove();
  });

  // Fallback in case animationend doesn't fire (e.g. reduced-motion settings)
  setTimeout(() => {
    if (loader.isConnected) loader.remove();
  }, 2500);
}


/* ---------- Dashboard: Connect Wallet ---------- */
const connectWalletBtn = document.getElementById("connect-wallet-btn");

if (connectWalletBtn) {
  connectWalletBtn.addEventListener("click", () => {
    if (typeof window.ethereum === "undefined") {
      alert("No crypto wallet extension detected. Install one (e.g. MetaMask) to connect.");
      return;
    }

    connectWalletBtn.textContent = "Connecting...";
    connectWalletBtn.disabled = true;

    window.ethereum.request({ method: "eth_requestAccounts" })
      .then(accounts => {
        const address = accounts[0];
        const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
        connectWalletBtn.textContent = `Connected: ${short}`;
      })
      .catch(() => {
        connectWalletBtn.textContent = "Connect Wallet";
        connectWalletBtn.disabled = false;
      });
  });
}


/* ---------- Dashboard: AI model "Use" buttons ---------- */
const modelButtons = document.querySelectorAll(".use-model-btn");

modelButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const modelName = btn.dataset.model || "this model";
    const modelLabel = document.querySelector(".model");

    if (modelLabel) {
      modelLabel.textContent = modelName;
    }

    const chat = document.getElementById("chat");
    if (chat) {
      chat.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* ---------- Dashboard: chat send ---------- */
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chatLog = document.getElementById("chat");

function sendChatMessage() {
  if (!chatInput || !chatLog) return;

  const text = chatInput.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = text;
  chatLog.appendChild(userMsg);

  chatInput.value = "";
  chatLog.scrollTop = chatLog.scrollHeight;

  // Placeholder response so the flow feels complete without a backend
  setTimeout(() => {
    const aiMsg = document.createElement("div");
    aiMsg.className = "message ai";
    aiMsg.textContent = "Got it. (Connect a model backend to enable real responses.)";
    chatLog.appendChild(aiMsg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 400);
}

if (sendBtn) {
  sendBtn.addEventListener("click", sendChatMessage);
}

if (chatInput) {
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendChatMessage();
    }
  });
}


/* ---------- Login page: form submit ---------- */
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Placeholder auth flow — wire up to a real backend before going live.
    window.location.href = "dashboard.html";
  });
}


/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu after picking a link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}


console.log("CryptoAI engine active");
