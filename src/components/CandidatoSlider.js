// src/components/CandidatoSlider.js
import React from "react";
import { Input, Button, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
                  onClick={() => onVote(candidate, voteType)}
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

export default CandidatoSlider;
