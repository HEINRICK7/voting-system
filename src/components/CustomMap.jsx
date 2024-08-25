import React from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CustomMarker from "./CustomMaker";
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

const { BaseLayer, Overlay } = LayersControl;

const CustomMap = ({ geoJsonData, onMarkerClick, locationVotes }) => {
  const geoJsonStyle = (feature) => ({
    color: feature.properties.NM_MUN === "Piripiri" ? "blue" : "gray",
    weight: feature.properties.NM_MUN === "Piripiri" ? 4 : 1,
    opacity: 1,
    fillOpacity: feature.properties.NM_MUN === "Piripiri" ? 0.2 : 0.1,
  });
  

  return (
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
            onClick={() => onMarkerClick(localDetailsFurnas)}
            radius={2500}
            votes={locationVotes["Furnas"] || 0}
          />
        </Overlay>

        <Overlay checked name="Poco Marker">
          <CustomMarker
            position={[-4.2389795, -41.9471199]}
            tooltipText="Poço"
            onClick={() => onMarkerClick(localDetailsPoco)}
            radius={300}
            votes={locationVotes["Poço"] || 0}
          />
        </Overlay>

        <Overlay checked name="Caiçara Marker">
          <CustomMarker
            position={[-4.234357, -41.854398]}
            tooltipText="Caiçara"
            onClick={() => onMarkerClick(localDetailsCaicara)}
            radius={200}
            votes={locationVotes["Caiçara"] || 0}
          />
        </Overlay>

        <Overlay checked name="São José Marker">
          <CustomMarker
            position={[-4.2226195, -41.9096409]}
            tooltipText="São José"
            onClick={() => onMarkerClick(localDetailsSaoJose)}
            radius={1000}
            votes={locationVotes["São José"] || 0}
          />
        </Overlay>

        <Overlay checked name="Pequi Marker">
          <CustomMarker
            position={[-4.3231323, -41.8353668]}
            tooltipText="Pequi"
            onClick={() => onMarkerClick(localDetailsPequi)}
            radius={500}
            votes={locationVotes["Pequi"] || 0}
          />
        </Overlay>

        <Overlay checked name="Acude Marker">
          <CustomMarker
            position={[-4.296958, -41.9079971]}
            tooltipText="Açude da Baixa"
            onClick={() => onMarkerClick(localDetailsAcude)}
            radius={240}
            votes={locationVotes["Açude da Baixa"] || 0}
          />
        </Overlay>

        <Overlay checked name="Campinas Marker">
          <CustomMarker
            position={[-4.2939706, -41.9458836]}
            tooltipText="Campinas"
            onClick={() => onMarkerClick(localDetailsCampinas)}
            radius={300}
            votes={locationVotes["Campinas"] || 0}
          />
        </Overlay>

        <Overlay checked name="ODJD Marker">
          <CustomMarker
            position={[-4.303907, -41.986142]}
            tooltipText="Olho D'àgua do João Domingos"
            onClick={() => onMarkerClick(localDetailsODJD)}
            radius={200}
            votes={locationVotes["Olho D'àgua do João Domingos"] || 0}
          />
        </Overlay>

        <Overlay checked name="Angical I Marker">
          <CustomMarker
            position={[-4.31896, -41.8488529]}
            tooltipText="Angical I"
            onClick={() => onMarkerClick(localDetailsAngicalI)}
            radius={300}
            votes={locationVotes["Angical I"] || 0}
          />
        </Overlay>

        <Overlay checked name="Angical II Marker">
          <CustomMarker
            position={[-4.307134, -41.860386]}
            tooltipText="Angical II"
            onClick={() => onMarkerClick(localDetailsAngicalII)}
            radius={300}
            votes={locationVotes["Angical II"] || 0}
          />
        </Overlay>

        <Overlay checked name="Angical III Marker">
          <CustomMarker
            position={[-4.308549, -41.882444]}
            tooltipText="Angical III"
            onClick={() => onMarkerClick(localDetailsAngicalIII)}
            radius={300}
            votes={locationVotes["Angical III"] || 0}
          />
        </Overlay>

        <Overlay checked name="Assentamento São Luiz Marker">
          <CustomMarker
            position={[-4.322522, -41.889977]}
            tooltipText="Assentamento São Luiz"
            onClick={() => onMarkerClick(localDetailsAssentamentoSãoLuiz)}
            radius={250}
            votes={locationVotes["Assentamento São Luiz"] || 0}
          />
        </Overlay>

        <Overlay checked name="Quebradas Marker">
          <CustomMarker
            position={[-4.326705, -41.902615]}
            tooltipText="Quebradas"
            onClick={() => onMarkerClick(localDetailsQuebradas)}
            radius={250}
            votes={locationVotes["Quebradas"] || 0}
          />
        </Overlay>

        <Overlay checked name="Vereda Marker">
          <CustomMarker
            position={[-4.3814574, -41.9114499]}
            tooltipText="Veredas do Zezinho"
            onClick={() => onMarkerClick(localDetailsVereda)}
            radius={900}
            votes={locationVotes["Veredas do Zezinho"] || 0}
          />
        </Overlay>

        <Overlay checked name="Currais Marker">
          <CustomMarker
            position={[-4.2061292, -41.8884622]}
            tooltipText="Currais Novos"
            onClick={() => onMarkerClick(localDetailsCurrais)}
            radius={300}
            votes={locationVotes["Currais Novos"] || 0}
          />
        </Overlay>

        <Overlay checked name="Satisfeito Marker">
          <CustomMarker
            position={[-4.1926529, -41.8929095]}
            tooltipText="Satisfeito"
            onClick={() => onMarkerClick(localDetailsSatisfeito)}
            radius={300}
            votes={locationVotes["Satisfeito"] || 0}
          />
        </Overlay>

        <Overlay checked name="Cortada Marker">
          <CustomMarker
            position={[-4.196865, -41.9174]}
            tooltipText="Cortada"
            onClick={() => onMarkerClick(localDetailsCortada)}
            radius={300}
            votes={locationVotes["Cortada"] || 0}
          />
        </Overlay>

        <Overlay checked name="Matões Marker">
          <CustomMarker
            position={[-4.264137, -41.917859]}
            tooltipText="Matões"
            onClick={() => onMarkerClick(localDetailsMatoes)}
            radius={150}
            votes={locationVotes["Matões"] || 0}
          />
        </Overlay>

        <Overlay checked name="Umburana Marker">
          <CustomMarker
            position={[-4.337132, -41.940236]}
            tooltipText="Umburana"
            onClick={() => onMarkerClick(localDetailsUmburana)}
            radius={150}
            votes={locationVotes["Umburana"] || 0}
          />
        </Overlay>

        <Overlay checked name="Saco dos Dionísios Marker">
          <CustomMarker
            position={[-4.274249, -41.850994]}
            tooltipText="Saco dos Dionísios"
            onClick={() => onMarkerClick(localDetailsSacoD)}
            radius={150}
            votes={locationVotes["Saco dos Dionísios"] || 0}
          />
        </Overlay>

        <Overlay checked name="Carnaubas Marker">
          <CustomMarker
            position={[-4.347447, -41.9793944]}
            tooltipText="Carnaubas"
            onClick={() => onMarkerClick(localDetailsCarnaubas)}
            radius={150}
            votes={locationVotes["Carnaubas"] || 0}
          />
        </Overlay>

        <Overlay checked name="Bela Vista Marker">
          <CustomMarker
            position={[-4.3492736, -41.9537482]}
            tooltipText="Bela Vista"
            onClick={() => onMarkerClick(localDetailsBelaVista)}
            radius={150}
            votes={locationVotes["Bela Vista"] || 0}
          />
        </Overlay>

        <Overlay checked name="Várzea Marker">
          <CustomMarker
            position={[-4.3998498, -41.8740778]}
            tooltipText="Várzea"
            onClick={() => onMarkerClick(localDetailsVarzea)}
            radius={150}
            votes={locationVotes["Várzea"] || 0}
          />
        </Overlay>

        <Overlay checked name="Várzea I Marker">
          <CustomMarker
            position={[-4.400015, -41.8733458]}
            tooltipText="Várzea I"
            onClick={() => onMarkerClick(localDetailsVarzeaI)}
            radius={150}
            votes={locationVotes["Várzea I"] || 0}
          />
        </Overlay>

        <Overlay checked name="Malhadinha Marker">
          <CustomMarker
            position={[-4.366158, -41.829651]}
            tooltipText="Malhadinha"
            onClick={() => onMarkerClick(localDetailsMalhadinha)}
            radius={150}
            votes={locationVotes["Malhadinha"] || 0}
          />
        </Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default CustomMap;
