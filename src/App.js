// src/App.js
import React from "react";
import "./App.css";
import MapComponent from "../src/components/MapComponent.js";

function App() {
  return (
    <div className="App">
      <header
        style={{
          textAlign: "center",
        }}
      >
        <h1>Intenção de Votos</h1>
        <p>
          Esta aplicação permite que os eleitores registrem sua intenção de voto
          nos candidatos locais.
        </p>
        <p>
          Utilize o mapa abaixo para selecionar sua região e escolher seu
          candidato.
        </p>
      </header>
      <MapComponent />
    </div>
  );
}

export default App;
