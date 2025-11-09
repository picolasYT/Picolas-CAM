const cams = [
  { nombre: "Monumento San Martín", url: "camaras/camara1.html", id: "monumento-muni" },
  { nombre: "Monumento Calle", url: "camaras/camara2.html", id: "monumento-calle" },
  { nombre: "Isla 132", url: "camaras/camara3.html", id: "isla132" },
  { nombre: "Canal 7", url: "camaras/camara4.html", id: "canal7" },
  { nombre: "Mirador Río Neuquén", url: "camaras/camara5.html", id: "mirador-rioneuquen" },
  { nombre: "Puente Río Limay", url: "camaras/camara6.html", id: "puente-riolimay" },
  { nombre: "Rotonda Río Limay", url: "camaras/camara7.html", id: "rotonda-riolimay" },
  { nombre: "Parque Sandra Canale", url: "camaras/camara8.html", id: "sandracanale" },
  { nombre: "Parque Central", url: "camaras/camara9.html", id: "parquecentral" }
];

const container = document.getElementById("camGrid");

cams.forEach((cam, i) => {
  const div = document.createElement("div");
  div.className = "cam-container";

  div.innerHTML = `
    <video id="video_${i}" autoplay muted playsinline></video>
    <img id="fallback_${i}" src="PICOLAS CAM.png" style="display:none;">
    <div class="cam-info">
      <a href="${cam.url}" class="cam-link">${cam.nombre}</a>
      <span class="status">🟢 En vivo</span>
    </div>
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
