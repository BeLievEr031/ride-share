import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// Custom icon
const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
});

// List of users with locations
const users = [
    // Mumbai Users
    { id: 1, name: "Ravi Verma", lat: 19.076, lng: 72.8777 },
    { id: 2, name: "Anjali Mehta", lat: 19.084, lng: 72.874 },
    { id: 3, name: "Vikas Patil", lat: 19.091, lng: 72.865 },
    { id: 4, name: "Neha Gupta", lat: 19.102, lng: 72.882 },
    { id: 5, name: "Rahul Sharma", lat: 19.110, lng: 72.890 },
    { id: 6, name: "Sanjay Yadav", lat: 19.097, lng: 72.872 },
    { id: 7, name: "Meena Desai", lat: 19.082, lng: 72.860 },
    { id: 8, name: "Pooja Nair", lat: 19.074, lng: 72.857 },
    { id: 9, name: "Akash Singh", lat: 19.120, lng: 72.900 },
    { id: 10, name: "Deepak Joshi", lat: 19.115, lng: 72.910 },
    // Other Cities
    { id: 11, name: "John Smith", lat: 40.7128, lng: -74.006 }, // New York, USA
    { id: 12, name: "Emma Brown", lat: 51.5074, lng: -0.1278 }, // London, UK
    { id: 13, name: "Carlos Rodriguez", lat: -34.6037, lng: -58.3816 }, // Buenos Aires, Argentina
    { id: 14, name: "Chen Wei", lat: 39.9042, lng: 116.4074 }, // Beijing, China
    { id: 15, name: "Liam O'Connor", lat: 53.3498, lng: -6.2603 }, // Dublin, Ireland
    { id: 16, name: "Sophia Müller", lat: 48.8566, lng: 2.3522 }, // Paris, France
    { id: 17, name: "Kaito Tanaka", lat: 35.6895, lng: 139.6917 }, // Tokyo, Japan
    { id: 18, name: "Fatima Ahmed", lat: 24.7136, lng: 46.6753 }, // Riyadh, Saudi Arabia
    { id: 19, name: "David Kim", lat: 37.5665, lng: 126.978 }, // Seoul, South Korea
    { id: 20, name: "Elena Petrova", lat: 55.7558, lng: 37.6173 }, // Moscow, Russia
    { id: 21, name: "Michael Scott", lat: -33.8688, lng: 151.2093 }, // Sydney, Australia
    { id: 22, name: "Lucas Oliveira", lat: -23.5505, lng: -46.6333 }, // São Paulo, Brazil
    { id: 23, name: "Ahmed Yusuf", lat: -1.286389, lng: 36.817223 }, // Nairobi, Kenya
    { id: 24, name: "Stefan Novak", lat: 52.2298, lng: 21.0122 }, // Warsaw, Poland
    { id: 25, name: "Emily Wilson", lat: 43.6532, lng: -79.3832 }, // Toronto, Canada
];


// Component to handle zoom on marker click
const MarkerWithZoom = ({ user }: { user: any }) => {
    const map = useMap();
    const handleMarkerClick = () => {
        map.setView([user.lat, user.lng], 17);
    };
    return (
        <Marker position={[user.lat, user.lng]} icon={customIcon} eventHandlers={{ click: handleMarkerClick }}>
            <Popup>
                <p className="font-bold">{user.name}'s location 📍</p>
            </Popup>
        </Marker>
    );
};

const DriversMap: React.FC = () => {
    return (
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border">
            <MapContainer center={[20.5937, 78.9629]} zoom={3} className="h-full w-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {users.map((user) => (
                    <MarkerWithZoom key={user.id} user={user} />
                ))}
            </MapContainer>
        </div>
    );
};

export default DriversMap;
