import { useRef, useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export function Geolocalizacao() {
  const mapRef = useRef(null);
  const rotaRef = useRef(null);

  const [form, setForm] = useState({
    lat1: "",
    lng1: "",
    lat2: "",
    lng2: "",
  });

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (!mapRef.current) {
      const mapa = L.map("mapa").setView([-23.55, -46.63], 13);
      mapRef.current = mapa;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapa);
    }
  }, []);

  function validarCampos() {
    let temp = {};

    if (!form.lat1) temp.lat1 = "Informe a latitude da origem.";
    if (!form.lng1) temp.lng1 = "Informe a longitude da origem.";
    if (!form.lat2) temp.lat2 = "Informe a latitude do destino.";
    if (!form.lng2) temp.lng2 = "Informe a longitude do destino.";

    setErros(temp);
    return Object.keys(temp).length === 0;
  }

  function gerarRota(e) {
    e.preventDefault();
    if (!validarCampos()) return;

    const p1 = L.latLng(parseFloat(form.lat1), parseFloat(form.lng1));
    const p2 = L.latLng(parseFloat(form.lat2), parseFloat(form.lng2));

    if (rotaRef.current) rotaRef.current.remove();

    rotaRef.current = L.Routing.control({
      waypoints: [p1, p2],
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      lineOptions: { addWaypoints: false },
    }).addTo(mapRef.current);

    mapRef.current.setView(p1, 15);
  }

  function pegarLocalizacaoOrigem() {
    navigator.geolocation.getCurrentPosition((pos) => {
      setForm({
        ...form,
        lat1: pos.coords.latitude.toFixed(6),
        lng1: pos.coords.longitude.toFixed(6),
      });
    });
  }

  function pegarLocalizacaoDestino() {
    navigator.geolocation.getCurrentPosition((pos) => {
      setForm({
        ...form,
        lat2: pos.coords.latitude.toFixed(6),
        lng2: pos.coords.longitude.toFixed(6),
      });
    });
  }

  return (
    <div className="sessao-mapa">
      <form className="form-mapa" onSubmit={gerarRota}>
        <h2>Gerar Rota</h2>

        {/* ORIGEM */}
        <fieldset>
          <legend>Origem</legend>

          <label>Latitude</label>
          <input
            type="number"
            name="lat1"
            step="any"
            value={form.lat1}
            onChange={(e) => setForm({ ...form, lat1: e.target.value })}
            className="caixaTexto"
          />
          {erros.lat1 && <p className="error">{erros.lat1}</p>}

          <label>Longitude</label>
          <input
            type="number"
            name="lng1"
            step="any"
            value={form.lng1}
            onChange={(e) => setForm({ ...form, lng1: e.target.value })}
            className="caixaTexto"
          />
          {erros.lng1 && <p className="error">{erros.lng1}</p>}

          <button type="button" className="btnLocal" onClick={pegarLocalizacaoOrigem}>
            Usar minha localização atual
          </button>
        </fieldset>

        {/* DESTINO */}
        <fieldset>
          <legend>Destino</legend>

          <label>Latitude</label>
          <input
            type="number"
            name="lat2"
            step="any"
            value={form.lat2}
            onChange={(e) => setForm({ ...form, lat2: e.target.value })}
            className="caixaTexto"
          />
          {erros.lat2 && <p className="error">{erros.lat2}</p>}

          <label>Longitude</label>
          <input
            type="number"
            name="lng2"
            step="any"
            value={form.lng2}
            onChange={(e) => setForm({ ...form, lng2: e.target.value })}
            className="caixaTexto"
          />
          {erros.lng2 && <p className="error">{erros.lng2}</p>}

          <button type="button" className="btnLocal" onClick={pegarLocalizacaoDestino}>
            Usar minha localização atual
          </button>
        </fieldset>

        <button type="submit" className="btnGerar">
          Gerar Rota
        </button>
      </form>

      <div id="mapa" className="mapa-container"></div>
    </div>
  );
}
 