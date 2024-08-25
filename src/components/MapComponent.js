// src/components/MapComponent.js
import React, { useState, useEffect } from "react";
import { Modal, notification } from "antd";
import CandidatoSlider from "./CandidatoSlider";
import CustomMap from "./CustomMap";
import candidateData from "../data/candidatos.json";
import MostVotedDrawer from "./MostVotedDrawer";
import api from "../service";

const MapComponent = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [locationVotes, setLocationVotes] = useState({}); // Armazena votos por localidade
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localDetails, setLocalDetails] = useState(null);
  const [currentVoteType, setCurrentVoteType] = useState("Prefeito");
  const [chosenPrefeito, setChosenPrefeito] = useState(null);
  const [chosenVereador, setChosenVereador] = useState(null);
  const [updateVotes, setUpdateVotes] = useState(false);
  const [votesUpdated, setVotesUpdated] = useState(false);

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

  // Carregar a contagem de votos por localidade
  useEffect(() => {
    api
      .get("/api/votes/countByLocation")
      .then((response) => {
        const votesData = response.data.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {});
        setLocationVotes(votesData);
      })
      .catch((error) => {
        console.error("Erro ao buscar contagem de votos:", error);
      });
  }, [updateVotes]);

  // UseEffect para monitorar mudanças em chosenVereador e chamar submitVote quando não for null
  useEffect(() => {
    if (chosenVereador && chosenPrefeito) {
      submitVote();
    }
  }, [chosenVereador]);

  const openNotification = () => {
    notification.info({
      message: "Informação",
      description: (
        <span>
          Você pode{" "}
          <span style={{ fontWeight: "bold" }}>arrastar para o lado</span> para
          ver todos os candidatos e escolher em quem votar.
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

  const handleVote = (candidate, voteType) => {
    const audio = new Audio(process.env.PUBLIC_URL + "/sounds/urna.mp3");
    audio.play();

    if (voteType === "Prefeito") {
      setChosenPrefeito({ nome: candidate.nome, numero: candidate.numero });
      setCurrentVoteType("Vereador");
    } else if (voteType === "Vereador") {
      setChosenVereador({ nome: candidate.nome, numero: candidate.numero });
    }
  };

  const submitVote = async () => {
    try {
      const response = await api.post("/api/votes", {
        candidatoPrefeito: chosenPrefeito,
        candidatoVereador: chosenVereador,
        local: localDetails.endereco,
      });
  
      if (response.status === 201) {
        notification.success({
          message: "Voto Computado",
          description: "Seu voto foi computado com sucesso!",
        });
        resetVotingProcess();
        setUpdateVotes((prev) => !prev);
        setVotesUpdated((prev) => !prev);
        console.log("votesUpdated foi alterado para:", !votesUpdated); // Adicione este log
      } else {
        notification.error({
          message: "Erro ao Computar Voto",
          description: "Ocorreu um erro ao tentar computar seu voto.",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar voto:", error);
      notification.error({
        message: "Erro ao Computar Voto",
        description: "Ocorreu um erro ao tentar computar seu voto.",
      });
    }
  };
  

  const resetVotingProcess = () => {
    setChosenPrefeito(null);
    setChosenVereador(null);
    setCurrentVoteType("Prefeito");
    setIsModalVisible(false);
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
      <CustomMap
        geoJsonData={geoJsonData}
        onMarkerClick={showModal}
        locationVotes={locationVotes}
      />
      <MostVotedDrawer key={votesUpdated ? "true" : "false"} votesUpdated={votesUpdated} />
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
