const formatK = (value) => `${new Intl.NumberFormat("fr-FR").format(value)} k€`;
const formatPercent = (value) => `${Number(value).toFixed(1).replace(".", ",")} %`;

const revenue = document.querySelector("#revenue");
const margin = document.querySelector("#margin");
const cash = document.querySelector("#cash");
const generateButton = document.querySelector("#generateButton");
const deckStage = document.querySelector("#deckStage");
const pipeline = document.querySelector(".pipeline");
const generatedState = document.querySelector("#generatedState");
const chartBars = [...document.querySelectorAll("#slideChart i")];

function updateInputs() {
  document.querySelector("#revenueValue").textContent = formatK(revenue.value);
  document.querySelector("#marginValue").textContent = formatPercent(margin.value);
  document.querySelector("#cashValue").textContent = formatK(cash.value);
  generatedState.textContent = "MODIFICATIONS EN ATTENTE";
  generatedState.classList.remove("success");
  deckStage.classList.remove("generated");
}

[revenue, margin, cash].forEach((input) => input.addEventListener("input", updateInputs));

generateButton.addEventListener("click", () => {
  generateButton.disabled = true;
  generateButton.querySelector("span").textContent = "Contrôle des données…";
  pipeline.classList.remove("running");
  void pipeline.offsetWidth;
  pipeline.classList.add("running");

  window.setTimeout(() => {
    document.querySelector("#deckRevenue").textContent = formatK(revenue.value);
    document.querySelector("#deckMargin").textContent = formatPercent(margin.value);
    document.querySelector("#deckCash").textContent = formatK(cash.value);
    const seed = Number(revenue.value) / 18;
    chartBars.forEach((bar, index) => {
      const height = Math.max(20, Math.min(96, seed - 18 + index * 9 + Number(margin.value) * .35));
      bar.style.height = `${height}%`;
    });
    generatedState.textContent = "✓ REPORTING GÉNÉRÉ";
    generatedState.classList.add("success");
    deckStage.classList.add("generated");
    generateButton.querySelector("span").textContent = "Reporting généré";
    generateButton.disabled = false;
  }, 820);
});

const heroVisual = document.querySelector("#heroVisual");
const dataCube = document.querySelector("#dataCube");
if (window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    dataCube.style.setProperty("--ry", `${-22 + x * 16}deg`);
    dataCube.style.setProperty("--rx", `${-10 - y * 12}deg`);
  });
  heroVisual.addEventListener("pointerleave", () => {
    dataCube.style.setProperty("--ry", "-22deg");
    dataCube.style.setProperty("--rx", "-10deg");
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();

const demoVideo = document.querySelector("#demoVideo");
if (demoVideo) {
  Promise.all([0, 1, 2, 3].map((part) => fetch(`cadence_demo_v2.mp4.part${part}`).then((response) => {
    if (!response.ok) throw new Error("Video unavailable");
    return response.arrayBuffer();
  }))).then((parts) => {
    const videoBlob = new Blob(parts, { type: "video/mp4" });
    demoVideo.src = URL.createObjectURL(videoBlob);
  }).catch(() => {
    demoVideo.insertAdjacentText("afterend", "La vidéo est momentanément indisponible.");
  });
}
