// src/App.js
import React from "react";
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
        <MostVotedDrawer />
      </header>
      <MapComponent />
    </div>
  );
}

export default App;
