'use client';

import { MapContainer, TileLayer, Polygon, useMap, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// --- Parse GeoJSON ---
const parseGeoJsonCoordinates = (geoJsonObj) => {
    const arr = [];

    geoJsonObj.forEach((obj) => {
        if (obj.type === 'Polygon') {
            arr.push(obj.coordinates);
        } else if (obj.type === 'MultiPolygon') {
            arr.push(obj.coordinates);
        }
    });
    return arr;
};

// --- Generate Random Color ---
function getRandomColor(seed) {
    if (typeof seed !== "number") {
        seed = seed.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }

    let hash = seed;
    hash = (hash ^ 0x3dfc) + (hash << 5);
    hash = (hash ^ (hash >> 7)) + (hash << 3);
    hash = hash & 0xffffff;

    let r = (seed * 5) + (hash & 0x3F);
    let g = (seed * 5) + ((hash >> 6) & 0x3F);
    let b = ((hash >> 12) & 0x3F);

    r = r % 200;
    g = g * g % 200;
    b = b * b * b % 200;

    const toHex = (v) => Math.min(255, v).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// --- Custom Hook to Track Zoom Level ---
function ZoomWatcher({ onZoomChange }) {
    useMapEvents({
        zoomend: (e) => {
            onZoomChange(e.target.getZoom());
        },
    });
    return null;
}

const MyMap = ({ geoJsonObj, markers }) => {
    const [polygons, setPolygons] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(6);
    const [mapCenter, setMapCenter] = useState([13.75, 100.5]);
    const ZOOM_THRESHOLD = 13;

    useEffect(() => {
        if (geoJsonObj) {
            try {
                const extractedPolygons = parseGeoJsonCoordinates(geoJsonObj);
                setPolygons(extractedPolygons);
            } catch (err) {
                console.error("Invalid GeoJSON:", err);
            }
        } else {
            setPolygons([]);
        }
    }, [geoJsonObj]);

    // Full custom SVG icon
    const svgIcon = new L.DivIcon({
        html: `
            <div class="group">
                <svg class="fill-red-600 group-hover:fill-blue-400" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clip-rule="evenodd"/>
                </svg>
            </div>
        `,
        className: "hover",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });

    // Simple dot icon for zoomed-out view
const dotIcon = new L.DivIcon({
    html: '<div style="width:4px; height:4px; background:red; border-radius:50%;"></div>',
    iconSize: [4, 4],         // match div size
    iconAnchor: [2, 2],       // center the icon (half width, half height)
    className: ''             
});
    function MapStateTracker({ onZoomChange, onCenterChange }) {
        useMapEvents({
            zoomend(e) {
                onZoomChange(e.target.getZoom());
            },
            moveend(e) {
                const center = e.target.getCenter();
                onCenterChange([center.lat, center.lng]);
            }
        });
        return null;
    }
    return (
        <MapContainer center={[13.75, 100.5]} zoom={6} style={{ height: "100%", width: "100vw" }} zoomControl={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            <MapStateTracker
                onZoomChange={setZoomLevel}
                onCenterChange={setMapCenter}
            />
            {/* Track zoom level */}
            <ZoomWatcher onZoomChange={setZoomLevel} />

            {/* Render polygons only if zoomed in */}
            {zoomLevel >= ZOOM_THRESHOLD }
            {polygons.map((obj, index) =>
                obj.map((blob, i) => (
                    <Polygon
                        key={`${index}-${i}`}
                        positions={blob}
                        pathOptions={{ color: getRandomColor(index) }}
                    />
                ))
            )}

            {/* Render markers based on zoom level */}
            {markers && markers.map((marker) => {
                if (!marker.lat || !marker.long || marker.lat === "NULL" || marker.long === "NULL") return null;
                const position = [marker.lat, marker.long];

                return zoomLevel >= ZOOM_THRESHOLD ? (
                    <Marker key={marker.registration_num} position={position} icon={svgIcon}>
                        <Popup>
                            <strong>{marker.name}</strong><br />
                            Registration: {marker.registration_num}
                        </Popup>
                    </Marker>
                ) : (
                    <Marker key={marker.registration_num} position={position} icon={dotIcon} />
                );
            })}
        </MapContainer>
    );
};

export default MyMap;
