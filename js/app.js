/* ===================================
   FUTEBOL AMISTOSO 2026
   APP.JS COMPLETO
=================================== */

/* CONFIG DATA DO EVENTO */

const EVENT_DATE = new Date("2026-06-27T15:20:00");

/* INIT */

document.addEventListener("DOMContentLoaded", init);

function init() {
    startCountdown();
    setupForm();
    setupModal();
    AOS.init();

    // EmailJS init (coloque sua chave depois)
    emailjs.init("snyazPDoD9pspzwpE");
}

/* ===================================
   COUNTDOWN
=================================== */

function startCountdown() {
    setInterval(() => {
        const now = new Date();
        const diff = EVENT_DATE - now;

        if (diff <= 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

    }, 1000);
}

/* ===================================
   FORM
=================================== */

function setupForm() {
    const form = document.getElementById("footballForm");

    form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const goleiro = document.getElementById("goleiro").checked ? "Sim" : "Não";

    if (!validateForm(nome)) {
        alert("Digite seu nome!");
        return;
    }

    const data = new Date().toLocaleString();

    const payload = {
        nome,
        goleiro,
        data
    };

    // ⚡ LIBERA O USUÁRIO INSTANTANEAMENTE
    launchConfetti();
    showModal();
    form.reset();

    // 📧 ENVIO EM SEGUNDO PLANO (NÃO TRAVA UI)
    sendEmail(payload).catch(error => {
        console.error("Erro EmailJS:", error);
    });

    sendToSheets(payload).catch(error => {
        console.error("Erro Sheets:", error);
    });
});

}

/* ===================================
   VALIDATION
=================================== */

function validateForm(nome) {
    return nome.length > 2;
}

/* ===================================
   EMAILJS
=================================== */

function sendEmail(data) {
    return emailjs.send(
        "service_vv9qpml",
        "template_ibu2617",
        {
            nome: data.nome,
            goleiro: data.goleiro,
            data: data.data
        }
    );
}

/* ===================================
   GOOGLE SHEETS (APPS SCRIPT)
=================================== */

function sendToSheets(data) {

    return fetch("https://script.google.com/macros/s/AKfycbxa4BLlPikgEcO9N4vM-gnqdNqTcCNrsStIImR6-JiJCQQ4MvH-sRSwEVUB3W3eGspW/exec", {
        method: "POST",
        body: new URLSearchParams({
            nome: data.nome,
            goleiro: data.goleiro,
            data: data.data
        })
    });
}
       
/* ===================================
   CONFETTI
=================================== */

function launchConfetti() {
    confetti({
        particleCount: 300,
        spread: 120,
        origin: { y: 0.6 }
    });
}

/* ===================================
   MODAL
=================================== */

function setupModal() {
    const modal = document.getElementById("successModal");
    const closeBtn = document.getElementById("closeModal");

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

function showModal() {
    document.getElementById("successModal").style.display = "flex";
}