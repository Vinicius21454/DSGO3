import { Camera } from "../Componentes/Camera";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from "react";

export function Galeria() {
    const [fotos, setFotos] = useState(() => {
        const salvas = localStorage.getItem("fotos");
        return salvas ? JSON.parse(salvas) : [];
    });

    // Função de adicionar foto
    function adicionarFoto(novaFoto) {
        const novasFotos = [...fotos, novaFoto];
        setFotos(novasFotos);
        localStorage.setItem("fotos", JSON.stringify(novasFotos));
    }

    // Função para limpar a galeria
    function limparGaleria() {
        if (!confirm("Deseja limpar sua galeria?")) return;
        localStorage.removeItem("fotos");
        setFotos([]);
    }

    return (
        <main>
            <button type="button" onClick={limparGaleria}>Limpar galeria</button>
            <Camera onFotoTirada={adicionarFoto}/>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {fotos.map((foto, index) => (
                <ImageListItem key={index}>
                <img
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    loading="lazy"
                />
                </ImageListItem>
            ))}
            </ImageList>
        </main>
    );
}