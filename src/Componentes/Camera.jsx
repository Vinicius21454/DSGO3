// Ref: é o hook que permite que eu interaja com os periféricos do usuários
import { useState, useEffect, useRef } from "react";

export function Camera({ onFotoTirada }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [foto, setFoto] = useState(null);

    // Inicializa a câmera
    useEffect(() => {
        iniciarCamera();
    }, []);

    const iniciarCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        }
        catch(error) {
            console.error("Erro ao buscar vídeo/imagem: ", error);
        }
    }

    const tirarFoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imagem = canvas.toDataURL("image/png");

        setFoto(imagem);

        if (onFotoTirada) {
            // Permite a comunicação com as props
            onFotoTirada(imagem);
        }
    }

    function reiniciar() {
        setFoto(null);
        iniciarCamera();
    }

    function salvarFoto() {
        const link = document.createElement("a");
        link.href = foto;
        link.download = "Foto.png";
        link.click();
    }

    return (
        <main>
            <section className="camera-box">
                <h2>Captura de câmera</h2>
                <div className="preview">
                    {!foto ? (
                        <video ref={videoRef} autoPlay playsInline aria-label="Fluxo de câmera"/>
                    ) : (
                        <img src={foto} alt="Foto capturada" />
                    )}
                </div>
                <div>
                    {!foto ? (
                        <button type="button" onClick={tirarFoto}>Tirar foto</button>
                    ) : (
                        <div>
                            <button type="button" onClick={reiniciar}>Nova foto</button>
                            
                        </div>
                    )
                    }
                </div>
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </section>
        </main>
    );
}