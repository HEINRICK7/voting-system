// src/components/CustomMarker.js
import React from "react";
import { Marker, Tooltip, Circle } from "react-leaflet";
import L from "leaflet";

const CustomMarker = ({ position, tooltipText, onClick, radius }) => {
  const customMarkerIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [31, 31],
  });

  return (
    <>
      <Marker
        position={position}
        icon={customMarkerIcon}
        eventHandlers={{
          click: onClick,
        }}
      >
        <Tooltip direction="top" offset={[0, -25]} permanent>
          {tooltipText}
        </Tooltip>
      </Marker>
      <Circle center={position} radius={radius} />
    </>
  );
};

export default CustomMarker;
