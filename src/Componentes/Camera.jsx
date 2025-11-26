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
    setFotos((prevFotos) => [novaFoto, ...prevFotos]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#2aa6b6ff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      {/* Área da câmera */}
      <h2 style={{ marginBottom: 15, color: "#333" }}>🎥 Captura de câmera</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 12,
          border: "2px solid #007bff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      />
      <div style={{ marginTop: 15 }}>
        <button
          onClick={tirarFoto}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Tirar foto
        </button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Galeria de fotos */}
      <div style={{ marginTop: 30, width: "100%", textAlign: "center" }}>
        <h3 style={{ color: "#333" }}>📷 Galeria de fotos</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 15,
            marginTop: 10,
          }}
        >
          {fotos.map((foto, index) => (
            <img
              key={index}
              src={foto}
              alt={`Foto ${index + 1}`}
              style={{
                width: 120,
                borderRadius: 8,
                border: "2px solid #ccc",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
