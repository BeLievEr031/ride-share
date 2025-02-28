import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix default icon issue in Leaflet with Webpack
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useUser } from "@clerk/clerk-react";

// Custom icon
const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
});

// Component to update map view dynamically
const MapViewUpdater = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        if (position[0] !== 0 && position[1] !== 0) {
            map.setView(position, 13); // Initial zoom level
        }
    }, [position, map]);
    return null;
};

// Component to handle zoom on marker click
const MarkerWithZoom = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    const { user } = useUser();
    const handleMarkerClick = () => {
        map.setView(position, 17); // Zoom in when clicked
    };

    return (
        <Marker position={position} icon={customIcon} eventHandlers={{ click: handleMarkerClick }}>
            <Popup>
                <p className="font-bold font-archivo">
                    {user?.firstName}'s location. 📍
                </p>
            </Popup>
        </Marker>
    );
};


interface IMapProp {
    loading: boolean;
    error: string | null;
    location: [number, number]
}

const Map: React.FC<IMapProp> = ({ loading, error, location }) => {


    return (
        <div className="relative">
            {/* Show loading message while fetching location */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                    <p className="text-lg font-semibold text-gray-600">Fetching your location...</p>
                </div>
            )}

            {/* Show error message if location fetch fails */}
            {error && (
                <div className="text-red-500 text-center my-4 font-medium">
                    ⚠️ {error}
                </div>
            )}

            {!loading && (
                <MapContainer center={location} zoom={13} className="h-96 w-full rounded-lg">
                    <MapViewUpdater position={location} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {location[0] !== 0 && location[1] !== 0 && <MarkerWithZoom position={location} />}
                </MapContainer>
            )}
        </div>
    );
};

export default Map;
