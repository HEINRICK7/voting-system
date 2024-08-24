import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  Circle,
  LayersControl,
  Tooltip, // Importar Tooltip
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import candidateData from "../data/candidatos.json";
import Slider from "react-slick"; // Importa o Slider do react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { BaseLayer, Overlay } = LayersControl;

// Componente de Slider dos Vereadores
const VereadoresSlider = ({ searchTerm, setSearchTerm, localDetails }) => {
  // Configurações do carrossel
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Função para filtrar os candidatos com base no termo de busca
  const filteredCandidates = candidateData.filter(
    (candidate) =>
      candidate.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.numero.includes(searchTerm)
  );

  return (
    <div>
      <h3 style={{ textAlign: "center", color: "#4E4E4E" }}>
        Escolha seu Candidato
      </h3>

      <input
        type="text"
        placeholder="Arraste para o lado - Buscar por nome ou número"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <Slider {...sliderSettings}>
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + candidate.imagem}
                  alt={candidate.nome}
                  style={{
                    width: "150px",
                    borderRadius: 10,
                    marginBottom: "10px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "20px",
                  }}
                >
                  <strong
                    style={{
                      fontSize: "25px",
                      color: "#757D75",
                      fontWeight: "900",
                    }}
                  >
                    {candidate.nome}
                  </strong>
                  <span
                    style={{
                      fontSize: "25px",
                      background: "#6C7A89",
                      padding: 8,
                      width: "90px",
                      textAlign: "center",
                      color: "#FFF",
                      borderRadius: "0px 10px 0 20px",
                    }}
                  >
                    {candidate.numero}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <strong style={{ marginTop: "10px", fontSize: 20 }}>
                  {candidate.informacoes.nomeCompleto}
                </strong>
                <br />
                <strong>Partido:</strong> {candidate.partido}
                <br />
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Nenhum candidato encontrado.
          </div>
        )}
      </Slider>

      <div style={{ marginTop: "20px" }}>
        <h4>Detalhes do Local de Votação</h4>
        <p>
          <strong>Endereço:</strong> {localDetails.endereco}
        </p>
        <p>
          <strong>Zona:</strong> {localDetails.zona}
        </p>
        <p>
          <strong>Seções:</strong> {localDetails.secoes.join(", ")}
        </p>
      </div>

      <div style={{ flex: 1, marginTop: "20px" }}>
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2ECC71",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            cursor: "pointer",
          }}
          onClick={() => {
            const audio = new Audio(
              process.env.PUBLIC_URL + "/sounds/urna.mp3"
            );
            audio.play();
            alert("Voto computado com sucesso!");
          }}
        >
          Votar
        </button>
      </div>
    </div>
  );
};

const MapComponent = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca

  useEffect(() => {
    fetch("/data/PI_Municipios_2022_final.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setGeoJsonData(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar GeoJSON:", error);
      });
  }, []);

  const geoJsonStyle = (feature) => {
    return {
      color: feature.properties.NM_MUN === "Piripiri" ? "blue" : "gray",
      weight: feature.properties.NM_MUN === "Piripiri" ? 4 : 1,
      opacity: 1,
      fillOpacity: feature.properties.NM_MUN === "Piripiri" ? 0.2 : 0.1,
    };
  };

  const customMarker = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [31, 31],
  });

  const localDetailsFurnas = {
    endereco: "POVOADO FURNAS S/N, ZONA RURAL",
    zona: 11,
    secoes: [118, 158, 230],
  };

  const localDetailsPoco = {
    endereco: "ESCOLA ESTADUAL RURAL, POVOADO",
    zona: 11,
    secoes: [118, 158, 230],
  };

  const localDetailsCaicara = {
    endereco: "CAIÇARA",
    zona: 11,
    secoes: [103, 270],
  };

  const localDetailsSaoJose = {
    endereco: "São José",
    zona: 11,
    secoes: [103, 270],
  };

  const localDetailsPequi = {
    endereco: "Pequi",
    zona: 11,
    secoes: [103, 270],
  };
  const localDetailsAcude = {
    endereco: "Açude da Baixa",
    zona: 11,
    secoes: [103, 270],
  };

  return (
    <MapContainer
      center={[-4.2715, -41.7769]}
      zoom={12}
      style={{ height: "80vh", width: "100%" }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </BaseLayer>

        <BaseLayer name="Satélite">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data ©2024 Imagery ©2024 TerraMetrics"
          />
        </BaseLayer>

        <BaseLayer name="Terreno">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)"
          />
        </BaseLayer>

        <Overlay checked name="Municípios">
          {geoJsonData && <GeoJSON data={geoJsonData} style={geoJsonStyle} />}
        </Overlay>

        {/* Marcador em Furnas */}
        {/* Marcador em Furnas */}
        <Overlay checked name="Furnas Marker">
          <Marker position={[-4.2712, -41.8821]} icon={customMarker}>
            <Tooltip direction="top" offset={[0, -25]} permanent>
              Furnas
            </Tooltip>
            <Popup style={{ width: "100vw", height: "80vh" }}>
              <VereadoresSlider
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                localDetails={localDetailsFurnas}
              />
            </Popup>
          </Marker>
        </Overlay>
        <Overlay name="Furnas Circle">
          <Circle center={[-4.2712, -41.8821]} radius={2000} />
        </Overlay>

        {/* Marcador em Poço */}
        <Overlay checked name="Poco Marker">
          <Marker position={[-4.2389795, -41.9471199]} icon={customMarker}>
            <Tooltip direction="top" offset={[0, -25]} permanent>
              Poço
            </Tooltip>
            <Popup style={{ width: "100vw", height: "80vh" }}>
              <VereadoresSlider
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                localDetails={localDetailsPoco}
              />
            </Popup>
          </Marker>
        </Overlay>
        <Overlay name="Poco Circle">
          <Circle center={[-4.2389795, -41.9471199]} radius={300} />
        </Overlay>

        {/* Marcador em Caiçara */}
        <Overlay checked name="Caiçara Marker">
          <Marker position={[-4.234357, -41.854398]} icon={customMarker}>
            <Tooltip direction="top" offset={[0, -25]} permanent>
              Caiçara
            </Tooltip>
            <Popup style={{ width: "100vw", height: "80vh" }}>
              <VereadoresSlider
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                localDetails={localDetailsCaicara}
              />
            </Popup>
          </Marker>
        </Overlay>
        <Overlay name="Caiçara Circle">
          <Circle center={[-4.234357, -41.854398]} radius={200} />
        </Overlay>

        {/* Marcador em São José */}
        <Overlay checked name="São José Marker">
          <Marker position={[-4.2226195, -41.9096409]} icon={customMarker}>
            <Tooltip direction="top" offset={[0, -25]} permanent>
              São José
            </Tooltip>
            <Popup style={{ width: "100vw", height: "80vh" }}>
              <VereadoresSlider
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                localDetails={localDetailsSaoJose}
              />
            </Popup>
          </Marker>
        </Overlay>
        <Overlay name="São José Circle">
          <Circle center={[-4.2226195, -41.9096409]} radius={1000} />
        </Overlay>

        {/* Marcador em Pequi */}
        <Overlay checked name="Pequi Marker">
          <Marker position={[-4.3106089, -41.8614255]} icon={customMarker}>
            <Tooltip direction="top" offset={[0, -25]} permanent>
              Pequi
            </Tooltip>
            <Popup style={{ width: "100vw", height: "80vh" }}>
              <VereadoresSlider
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                localDetails={localDetailsPequi}
              />
            </Popup>
          </Marker>
        </Overlay>
        <Overlay name="Pequi Circle">
          <Circle center={[-4.3106089, -41.8614255]} radius={700} />
        </Overlay>

        {/* Marcador em Açude da baixa */}
        <Overlay checked name="Acude Marker">
          <Marker position={[-4.296958, -41.9079971]} icon={customMarker}>
            <Tooltip direction="top" offset={[0, -25]} permanent>
              Açude da Baixa
            </Tooltip>
            <Popup style={{ width: "100vw", height: "80vh" }}>
              <VereadoresSlider
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                localDetails={localDetailsAcude}
              />
            </Popup>
          </Marker>
        </Overlay>
        <Overlay name="Acude Circle">
          <Circle center={[-4.296958, -41.9079971]} radius={500} />
        </Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default MapComponent;
