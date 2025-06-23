'use client';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapComponent({polygons,circle}) {
    return (
        <MapContainer center={[13.7563, 100.5018]} zoomControl={false} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
    {/* {polygons.map(function(options, polyline){
        <Polyline pathOptions={options} positions={polyline} />
    })} */}

        </MapContainer>

    );
}
