const cams = [
  { id: "monumento-muni", nombre: "Monumento San Martín" },
  { id: "monumento-calle", nombre: "Monumento Calle" },
  { id: "isla132", nombre: "Isla 132" },
  { id: "canal7", nombre: "Canal 7" },
  { id: "mirador-rioneuquen", nombre: "Mirador Río Neuquén" },
  { id: "puente-riolimay", nombre: "Puente Río Limay" },
  { id: "rotonda-riolimay", nombre: "Rotonda Río Limay" },
  { id: "sandracanale", nombre: "Parque Sandra Canale" },
  { id: "parquecentral", nombre: "Parque Central" }
];

const container = document.getElementById("camGrid");

cams.forEach((cam, i) => {
  const div = document.createElement("div");
  div.className = "cam-container";

  div.innerHTML = `
    <video id="video_${i}" autoplay muted playsinline></video>
    <img id="fallback_${i}" src="PICOLAS CAM.png" style="display:none;">
    <div class="status">🟢 En vivo</div>
    <a href="view/view.html?id=${cam.id}" class="cam-link">${cam.nombre}</a>
  `;
  container.appendChild(div);

  const video = document.getElementById(`video_${i}`);
  const fallback = document.getElementById(`fallback_${i}`);

  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(`https://camaras.neuquencapital.gov.ar/live/${cam.id}.m3u8`);
    hls.attachMedia(video);

    hls.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
        video.style.display = "none";
        fallback.style.display = "block";
      }
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = `https://camaras.neuquencapital.gov.ar/live/${cam.id}.m3u8`;
  }
});

// recarga automática cada 5 min
setTimeout(() => location.reload(), 300000);
