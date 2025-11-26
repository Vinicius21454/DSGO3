import { useRef, useEffect, useState } from "react";

export function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    iniciarCamera();
  }, []);

  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
    }
  };

  const tirarFoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const novaFoto = canvas.toDataURL("image/png");
    setFotos((prevFotos) => [novaFoto, ...prevFotos]); // adiciona nova foto no topo
  };

  return (
    <div>
      {/* Área da câmera */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: 400, borderRadius: 8 }}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={tirarFoto}>Tirar foto</button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Galeria de fotos */}
      <div style={{ marginTop: 20 }}>
        <h3>📷 Galeria de fotos</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {fotos.map((foto, index) => (
            <img
              key={index}
              src={foto}
              alt={`Foto ${index + 1}`}
              style={{
                width: 120,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
