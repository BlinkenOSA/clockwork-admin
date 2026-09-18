import React, {useEffect} from "react";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {GeoJSON, MapContainer, Marker, TileLayer, useMap} from "react-leaflet";

const defaultMarkerIcon = L.icon({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const FitGeoShapeBounds = ({geoJson}) => {
  const map = useMap();

  useEffect(() => {
    if (!geoJson) {
      return;
    }

    const layer = new L.GeoJSON(geoJson);
    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, {padding: [16, 16]});
    }
  }, [geoJson, map]);

  return null;
};

const SetMarkerView = ({coordinates, zoom}) => {
  const map = useMap();

  useEffect(() => {
    if (!coordinates) {
      return;
    }

    map.setView([coordinates.lat, coordinates.long], zoom);
  }, [coordinates, map, zoom]);

  return null;
};

export const AuthorityGeoShapeMap = ({geoShape, coordinates, title}) => {
  const geoJson = geoShape?.data;
  const hasCoordinates = typeof coordinates?.lat === 'number' && typeof coordinates?.long === 'number';

  if (!geoJson && !hasCoordinates) {
    return null;
  }

  const latitude = typeof geoShape?.latitude === 'number'
    ? geoShape.latitude
    : hasCoordinates
      ? coordinates.lat
      : 0;
  const longitude = typeof geoShape?.longitude === 'number'
    ? geoShape.longitude
    : hasCoordinates
      ? coordinates.long
      : 0;
  const zoom = typeof geoShape?.zoom === 'number' ? geoShape.zoom : hasCoordinates ? 10 : 4;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      scrollWheelZoom={false}
      className="authority-geo-shape-map"
      attributionControl={true}
      aria-label={title ? `${title} geoshape map` : 'Geoshape map'}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        geoJson &&
        <GeoJSON
          data={geoJson}
          style={() => ({
            color: '#2f5f8f',
            weight: 2,
            fillColor: '#8fb3d9',
            fillOpacity: 0.4
          })}
        />
      }
      {
        geoJson &&
        <FitGeoShapeBounds geoJson={geoJson} />
      }
      {
        hasCoordinates &&
        <Marker
          position={[coordinates.lat, coordinates.long]}
          icon={defaultMarkerIcon}
        />
      }
      {
        hasCoordinates && !geoJson &&
        <SetMarkerView coordinates={coordinates} zoom={zoom} />
      }
    </MapContainer>
  );
};
