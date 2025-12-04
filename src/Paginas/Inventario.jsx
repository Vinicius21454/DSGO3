import { useEffect, useState } from "react";

export function Inventario() {
  const [figurinhas, setFigurinhas] = useState([]);

  useEffect(() => {
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setFigurinhas(armazenado);
  }, []);

  const limparInventario = () => {
    if (!window.confirm("Deseja realmente limpar o inventário?")) return;
    localStorage.removeItem("inventario");
    setFigurinhas([]);
  };

  // 👉 Nova função para adicionar figurinha
  const adicionarFigurinha = (figurinha) => {
    const inventarioAtual = JSON.parse(localStorage.getItem("inventario")) || [];
    const novoInventario = [...inventarioAtual, figurinha];
    localStorage.setItem("inventario", JSON.stringify(novoInventario));
    setFigurinhas(novoInventario);
  };

  return (
    <main className="conteiner">
      <section className="inventario">
        <h2>Inventário</h2>
        <button className="limpar-inventario" onClick={limparInventario}>
          Limpar Inventário
        </button>

        {figurinhas.length === 0 ? (
          <p className="vazio">Nenhuma figurinha coletada ainda!</p>
        ) : (
          <div className="grid">
            {figurinhas.map((f) => (
              <div key={f.id} className="figurinha">
                <img src={f.imagem} alt={f.nome} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
