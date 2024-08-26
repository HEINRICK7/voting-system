// src/App.js
import React from "react";
import { Alert } from "antd";
import "./App.css";

import MapComponent from "../src/components/MapComponent.js";
import MostVotedDrawer from "../src/components/MostVotedDrawer";

function App() {
  return (
    <div className="App">
      <header
        style={{
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1>Intenção de Votos</h1>
        <p>
          Esta aplicação permite que os eleitores registrem sua intenção de voto
          nos respequitivos candidatos.
          <br />
          Utilize o mapa abaixo para selecionar sua região e escolher seu
          candidato.
        </p>
        <Alert
          message="Aviso Importante"
          description="Este aplicativo é destinado exclusivamente para fins acadêmicos. Ele simula a coleta de intenções de voto para as eleições de 2024 e não deve ser usado para fins oficiais."
          type="warning"
          showIcon
          style={{ marginBottom: "20px" }}
        />
        <MostVotedDrawer />
      </header>
      <MapComponent />
    </div>
  );
}

export default App;
