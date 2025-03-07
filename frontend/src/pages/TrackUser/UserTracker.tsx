import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Icon for the User Marker
const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // User icon
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

// Custom Icon for Fixed Marker
const fixedIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684910.png", // Pin icon
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

interface IProp {
    lat: number;
    lng: number
}

const UserTracker: React.FC<IProp> = ({ lat, lng }) => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [path, setPath] = useState<[number, number][]>([]);

    // Fixed Marker Location (Set your fixed point)
    // const fixedLocation: [number, number] = [37.7749, -122.4194]; // San Francisco (Example)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        // Function to get user location
        setLoading(true)
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const newLocation: [number, number] = [position.coords.latitude, position.coords.longitude];
                setUserLocation(newLocation);

                // Update the path dynamically
                setLoading(false);
                setPath((prevPath) => [...prevPath, newLocation]);
            },
            (error) => {
                console.error("Error getting user location:", error);
            },
            { enableHighAccuracy: true, maximumAge: 10000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <React.Fragment>
            {
                loading ?
                    <div className="w-full h-96 flex flex-col justify-center items-center font-bold text-2xl text-slate-600">
                        <p>
                            Please wait we are loading map.
                        </p>
                        <p className="w-10 h-10 mt-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></p>
                    </div>
                    :
                    <MapContainer center={[lat, lng]} zoom={13} className="h-96 w-full">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        {/* Fixed Marker */}
                        <Marker position={[lat, lng]} icon={fixedIcon} />

                        {/* User Marker */}
                        {userLocation && <Marker position={userLocation} icon={userIcon} />}

                        {/* Path from Fixed Marker to User */}
                        {userLocation && <Polyline positions={[[lat, lng], ...path]} color="blue" />}
                    </MapContainer>
            }
        </React.Fragment>

    );
};

export default UserTracker;
