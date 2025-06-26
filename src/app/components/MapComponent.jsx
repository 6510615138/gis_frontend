'use client';

import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
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
const MyMap = ({ geoJsonString }) => {
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
        }
    }, [geoJsonString]);

    return (
        <MapContainer center={[13.75, 100.5]} zoom={6} style={{ height: "100%", width: "100vw" }} zoomControl={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            <FitBounds polygons={polygons} />
            {polygons.map((polygon, index) => (
                <Polygon key={index} positions={polygon} pathOptions={{ color: 'blue'}} />
            ))}
        </MapContainer>
    );
};

export default MyMap;
