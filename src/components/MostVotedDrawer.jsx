import React, { useState } from "react";
import { Drawer, Button, List, Statistic, Divider, Avatar } from "antd";
import api from "../service";
import candidateData from "../data/candidatos.json"; // Importe seu JSON
import { Typography } from "antd";

const { Title } = Typography;

const MostVotedDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [voteData, setVoteData] = useState({
    votedPrefeitos: [],
    votedVereadores: [],
  });

  const fetchVoteData = async () => {
    try {
      const response = await api.get("/api/votes/most-voted");
      console.log("Dados recebidos:", response.data);
      setVoteData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados de votos:", error);
    }
  };

  const showDrawer = () => {
    fetchVoteData(); // Atualiza os dados antes de mostrar o Drawer
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const getImageForCandidate = (nome, tipo) => {
    const candidates =
      tipo === "prefeito" ? candidateData.prefeitos : candidateData.vereadores;
    const candidate = candidates.find((c) => c.nome === nome);
    return candidate ? candidate.imagem : null;
  };

  const renderCandidateData = (candidateData, tipo) => {
    const groupedByCandidate = candidateData.reduce((acc, curr) => {
      const existingCandidate = acc.find((c) => c.nome === curr.nome);
      if (existingCandidate) {
        existingCandidate.locations.push({
          location: curr.location,
          votes: curr.votes,
        });
        existingCandidate.totalVotes += curr.votes;
      } else {
        acc.push({
          nome: curr.nome,
          locations: [
            {
              location: curr.location,
              votes: curr.votes,
            },
          ],
          totalVotes: curr.votes,
          imagem: getImageForCandidate(curr.nome, tipo),
        });
      }
      return acc;
    }, []);

    return (
      <List
        itemLayout="horizontal"
        dataSource={groupedByCandidate}
        renderItem={(candidate) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar size={80} shape="square" src={candidate.imagem} />
              }
              title={
                <>
                  <strong>{candidate.nome}</strong>
                  <Statistic
                    title="Total de Votos"
                    value={candidate.totalVotes}
                    style={{ marginLeft: 20 }}
                  />
                </>
              }
              description={
                <>
                  <Divider style={{ margin: "10px 0" }} />
                  {candidate.locations.map((loc, index) => (
                    <div key={index}>
                      <strong>{loc.location}:</strong> {loc.votes} votos
                    </div>
                  ))}
                </>
              }
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <>
      <Button type="primary" style={{ margin: "10px 0" }} onClick={showDrawer}>
        Mostrar Candidatos Mais Votados
      </Button>
      <Drawer
        title="Candidatos Votados e Quantidade de Votos"
        placement="right"
        onClose={closeDrawer}
        visible={visible}
        width={500}
      >
        {voteData.votedPrefeitos.length > 0 ||
        voteData.votedVereadores.length > 0 ? (
          <>
            <Title level={2}>Prefeitos Votados</Title>
            {renderCandidateData(voteData.votedPrefeitos, "prefeito")}
            <Divider />
            <Title level={2}>Vereadores Votados</Title>
            {renderCandidateData(voteData.votedVereadores, "vereador")}
          </>
        ) : (
          <p>Não há dados de votação disponíveis.</p>
        )}
      </Drawer>
    </>
  );
};

export default MostVotedDrawer;
