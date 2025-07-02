'use client';

import { MapContainer, TileLayer, Polygon, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

const parseGeoJsonCoordinates = (geoJson) => {
    if (!geoJson || !geoJson.coordinates) return [];
    // For full GeoJSON parsing (outer + holes)
    if (geoJson.type === 'Polygon') {
        return [geoJson.coordinates]; // array of rings
    }
    if (geoJson.type === 'MultiPolygon') {
        return geoJson.coordinates.flat(); // array of arrays of rings
    }
    return [];
};
// Optional: Auto-fit map to bounds
const FitBounds = ({ polygons }) => {
    const map = useMap();

    useEffect(() => {
        if (polygons.length > 0) {
            const allPoints = polygons.flat();
            const latLngs = allPoints.map(([lat, lng]) => L.latLng(lat, lng));
            const bounds = L.latLngBounds(latLngs);
            map.fitBounds(bounds);
        }
    }, [polygons, map]);

    return null;
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random()* 0.8 * 16)];
  }
  return color;
}


const MyMap = ({ geoJsonString, markers }) => {
    const [polygons, setPolygons] = useState([]);

    useEffect(() => {
        if (geoJsonString) {
            try {
                const geo = typeof geoJsonString === 'string' ? JSON.parse(geoJsonString) : geoJsonString;
                const extractedPolygons = parseGeoJsonCoordinates(geo);
                setPolygons(extractedPolygons);
            } catch (err) {
                console.error("Invalid GeoJSON:", err);
            }
        }else{
            setPolygons([]);
        }
    }, [geoJsonString]);
const svgIcon = new L.DivIcon({
  html: `
    <div class="group">
      <svg class="fill-red-tcct group-hover:fill-blue-400 xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clip-rule="evenodd"/>
      </svg>
    </div>
  `,
  className: "hover",
  iconSize: [20, 20],
  iconAnchor: [10,10], 
});
    return (
        <MapContainer center={[13.75, 100.5]} zoom={6} style={{ height: "100%", width: "100vw" }} zoomControl={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            <FitBounds polygons={polygons} />
            {polygons.map((polygon, index) => (
                <Polygon key={index} positions={polygon} pathOptions={{ color: getRandomColor() }} />
            ))}
            {markers && markers.map((marker) => {
                if (marker.lat == "NULL" || marker.long == "NULL") {
                    return
                };
                const position = [marker.lat, marker.long];
                return (
                    <Marker key={marker.registration_num} position={position} icon={svgIcon}>
                        <Popup key={`${marker.registration_num}-popup`}>
                            <strong>{marker.name}</strong><br />
                            Registration: {marker.registration_num}

                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default MyMap;
