import React from "react";
import { Marker, Tooltip, Circle } from "react-leaflet";
import L from "leaflet";

const CustomMarker = ({ position, tooltipText, onClick, radius, votes, circleColor }) => {

  const customMarkerIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [31, 31],
  });

  const handleTooltipClick = (e) => {
    e.stopPropagation(); // Impede que o clique acione outros eventos, como o clique no marcador
    onClick(); // Chama a função onClick passada como prop para abrir o modal
  };

  return (
    <>
      <Marker
        position={position}
        icon={customMarkerIcon}
        eventHandlers={{
          click: onClick,
        }}
      >
        <Tooltip direction="top" offset={[0, -25]} permanent interactive>
          <div onClick={handleTooltipClick} style={{ cursor: "pointer" }}>
            {tooltipText} - {votes} votos
          </div>
        </Tooltip>
      </Marker>
      <Circle center={position} radius={radius} pathOptions={{ color: circleColor, fillColor: circleColor, fillOpacity: 0.2 }}/>
    </>
  );
};

export default CustomMarker;
