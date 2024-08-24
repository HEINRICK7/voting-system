import React, { useState, useEffect } from "react";
import { Button, Input, Modal, notification, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import candidateData from "../data/candidatos.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  localDetailsFurnas,
  localDetailsPoco,
  localDetailsCaicara,
  localDetailsSaoJose,
  localDetailsPequi,
  localDetailsAcude,
  localDetailsCampinas,
  localDetailsODJD,
  localDetailsAngicalI,
  localDetailsAngicalII,
  localDetailsAngicalIII,
  localDetailsAssentamentoSãoLuiz,
  localDetailsQuebradas,
  localDetailsVereda,
  localDetailsCurrais,
  localDetailsSatisfeito,
  localDetailsCortada,
  localDetailsMatoes,
  localDetailsUmburana,
  localDetailsSacoD,
  localDetailsCarnaubas,
  localDetailsBelaVista,
  localDetailsVarzea,
  localDetailsVarzeaI,
  localDetailsMalhadinha,
} from "./LocalDetails";
import CustomMarker from "./CustomMaker";

const { BaseLayer, Overlay } = LayersControl;

const CandidatoSlider = ({
  searchTerm,
  setSearchTerm,
  candidates = [],
  onVote,
  voteType,
  localDetails,
}) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.numero.includes(searchTerm)
  );

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <Input
          size="large"
          type="text"
          placeholder={`Buscar por nome ou número (${voteType})`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            borderRadius: "5px 0 0 5px",
            border: "1px solid #ccc",
          }}
        />
        <Button
          size="large"
          onClick={clearSearch}
          icon={<CloseOutlined />}
          style={{
            backgroundColor: "#ff4d4f",
            color: "#fff",
            borderRadius: "0 5px 5px 0",
            border: "none",
          }}
        />
      </div>

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
                <Divider orientation="left" key={2}>
                  Informações Local de Votação do Distrito
                </Divider>
                <strong>Zona Eleitoral:</strong> {localDetails.zona}
                <br />
                <strong>Seções:</strong> {localDetails.secoes.join(" ")}
                <br />
                <strong>Endereço:</strong> {localDetails.endereco}
                <br />
                <strong>Local:</strong> {localDetails.local}
                <br />
                <Button
                  type="primary"
                  style={{ marginTop: 10 }}
                  onClick={() => onVote(candidate.nome, voteType)}
                >
                  Votar em {candidate.nome}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Nenhum candidato encontrado.
          </div>
        )}
      </Slider>
    </div>
  );
};

const MapComponent = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localDetails, setLocalDetails] = useState(null);
  const [currentVoteType, setCurrentVoteType] = useState("Prefeito");

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

  // Função para exibir a notificação
  const openNotification = () => {
    notification.info({
      message: "Informação",
      description: (
        <span>
          Você pode <span style={{ fontWeight: 'bold' }}>arrastar para o lado</span> para ver todos os candidatos e escolher em quem votar.
        </span>
      ),
      placement: "top",
      duration: 6,
    });
  };
  const showModal = (details) => {
    setLocalDetails(details);
    setIsModalVisible(true);
    openNotification();
  };

  const handleVote = (nome, voteType) => {
    const audio = new Audio(process.env.PUBLIC_URL + "/sounds/urna.mp3");

    // Tocar o som de votação
    audio.play();

    // Mostrar a notificação imediatamente após o clique
    notification.success({
      message: `Voto computado!`,
      description: `Seu voto para ${voteType}(a) foi computado com sucesso: ${nome}`,
      placement: "top",
    });

    audio.onended = () => {
      if (voteType === "Prefeito") {
        setCurrentVoteType("Vereador");
      } else {
        setIsModalVisible(false);
        setCurrentVoteType("Prefeito");
      }
    };
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setCurrentVoteType("Prefeito");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentVoteType("Prefeito");
  };

  return (
    <>
      <MapContainer
        center={[-4.2715, -41.7769]}
        zoom={10}
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

          <Overlay checked name="Furnas Marker">
            <CustomMarker
              position={[-4.2712, -41.8821]}
              tooltipText="Furnas"
              onClick={() => showModal(localDetailsFurnas)}
              radius={2500}
            />
          </Overlay>

          <Overlay checked name="Poco Marker">
            <CustomMarker
              position={[-4.2389795, -41.9471199]}
              tooltipText="Poço"
              onClick={() => showModal(localDetailsPoco)}
              radius={300}
            />
          </Overlay>

          <Overlay checked name="Caiçara Marker">
            <CustomMarker
              position={[-4.234357, -41.854398]}
              tooltipText="Caiçara"
              onClick={() => showModal(localDetailsCaicara)}
              radius={200}
            />
          </Overlay>

          <Overlay checked name="São José Marker">
            <CustomMarker
              position={[-4.2226195, -41.9096409]}
              tooltipText="São José"
              onClick={() => showModal(localDetailsSaoJose)}
              radius={1000}
            />
          </Overlay>

          <Overlay checked name="Pequi Marker">
            <CustomMarker
              position={[-4.3231323, -41.8353668]}
              tooltipText="Pequi"
              onClick={() => showModal(localDetailsPequi)}
              radius={500}
            />
          </Overlay>

          <Overlay checked name="Acude Marker">
            <CustomMarker
              position={[-4.296958, -41.9079971]}
              tooltipText="Açude da Baixa"
              onClick={() => showModal(localDetailsAcude)}
              radius={240}
            />
          </Overlay>

          <Overlay checked name="Campinas Marker">
            <CustomMarker
              position={[-4.2939706, -41.9458836]}
              tooltipText="Campinas"
              onClick={() => showModal(localDetailsCampinas)}
              radius={300}
            />
          </Overlay>

          <Overlay checked name="ODJD Marker">
            <CustomMarker
              position={[-4.303907, -41.986142]}
              tooltipText="Olho D'àgua do João Domingos"
              onClick={() => showModal(localDetailsODJD)}
              radius={200}
            />
          </Overlay>

          <Overlay checked name="Angical I Marker">
            <CustomMarker
              position={[-4.31896, -41.8488529]}
              tooltipText="Angical I"
              onClick={() => showModal(localDetailsAngicalI)}
              radius={300}
            />
          </Overlay>

          <Overlay checked name="Angical II Marker">
            <CustomMarker
              position={[-4.307134, -41.860386]}
              tooltipText="Angical II"
              onClick={() => showModal(localDetailsAngicalII)}
              radius={300}
            />
          </Overlay>

          <Overlay checked name="Angical III Marker">
            <CustomMarker
              position={[-4.308549, -41.882444]}
              tooltipText="Angical III"
              onClick={() => showModal(localDetailsAngicalIII)}
              radius={300}
            />
          </Overlay>

          <Overlay checked name="Assentamento São Luiz Marker">
            <CustomMarker
              position={[-4.322522, -41.889977]}
              tooltipText="Assentamento São Luiz"
              onClick={() => showModal(localDetailsAssentamentoSãoLuiz)}
              radius={250}
            />
          </Overlay>

          <Overlay checked name="Quebradas Marker">
            <CustomMarker
              position={[-4.326705, -41.902615]}
              tooltipText="Quebradas"
              onClick={() => showModal(localDetailsQuebradas)}
              radius={250}
            />
          </Overlay>

          <Overlay checked name="Vereda Marker">
            <CustomMarker
              position={[-4.3814574, -41.9114499]}
              tooltipText="Veredas do Zezinho"
              onClick={() => showModal(localDetailsVereda)}
              radius={900}
            />
          </Overlay>

          <Overlay checked name="Currais Marker">
            <CustomMarker
              position={[-4.2061292, -41.8884622]}
              tooltipText="Currais Novos"
              onClick={() => showModal(localDetailsCurrais)}
              radius={300}
            />
          </Overlay>

          <Overlay checked name="Satisfeito Marker">
            <CustomMarker
              position={[-4.1926529, -41.8929095]}
              tooltipText="Satisfeito"
              onClick={() => showModal(localDetailsSatisfeito)}
              radius={300}
            />
          </Overlay>

          <Overlay checked name="Cortada Marker">
            <CustomMarker
              position={[-4.196865, -41.9174]}
              tooltipText="Cortada"
              onClick={() => showModal(localDetailsCortada)}
              radius={300}
            />
          </Overlay>

          <Overlay checked name="Matões Marker">
            <CustomMarker
              position={[-4.264137, -41.917859]}
              tooltipText="Matões"
              onClick={() => showModal(localDetailsMatoes)}
              radius={150}
            />
          </Overlay>

          <Overlay checked name="Umburana Marker">
            <CustomMarker
              position={[-4.337132, -41.940236]}
              tooltipText="Umburana"
              onClick={() => showModal(localDetailsUmburana)}
              radius={150}
            />
          </Overlay>

          <Overlay checked name="Saco dos Dionísios Marker">
            <CustomMarker
              position={[-4.274249, -41.850994]}
              tooltipText="Saco dos Dionísios"
              onClick={() => showModal(localDetailsSacoD)}
              radius={150}
            />
          </Overlay>

          <Overlay checked name="Carnaubas Marker">
            <CustomMarker
              position={[-4.347447, -41.9793944]}
              tooltipText="Carnaubas"
              onClick={() => showModal(localDetailsCarnaubas)}
              radius={150}
            />
          </Overlay>

          <Overlay checked name="Bela Vista Marker">
            <CustomMarker
              position={[-4.3492736, -41.9537482]}
              tooltipText="Bela Vista"
              onClick={() => showModal(localDetailsBelaVista)}
              radius={150}
            />
          </Overlay>

          <Overlay checked name="Várzea Marker">
            <CustomMarker
              position={[-4.3998498, -41.8740778]}
              tooltipText="Várzea"
              onClick={() => showModal(localDetailsVarzea)}
              radius={150}
            />
          </Overlay>

          <Overlay checked name="Várzea I Marker">
            <CustomMarker
              position={[-4.400015, -41.8733458]}
              tooltipText="Várzea I"
              onClick={() => showModal(localDetailsVarzeaI)}
              radius={150}
            />
          </Overlay>

          <Overlay checked name="Malhadinha Marker">
            <CustomMarker
              position={[-4.366158, -41.829651]}
              tooltipText="Malhadinha"
              onClick={() => showModal(localDetailsMalhadinha)}
              radius={150}
            />
          </Overlay>
        </LayersControl>
      </MapContainer>

      <Modal
        title="Escolha seu Candidato"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="100%"
      >
        {localDetails && (
          <CandidatoSlider
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            candidates={
              currentVoteType === "Prefeito"
                ? candidateData.prefeitos
                : candidateData.vereadores
            }
            onVote={handleVote}
            voteType={currentVoteType}
            localDetails={localDetails}
          />
        )}
      </Modal>
    </>
  );
};

export default MapComponent;
