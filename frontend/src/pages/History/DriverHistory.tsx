import React from "react";
import { FaMapMarkerAlt, FaRegMoneyBillAlt, FaUser, FaStar, FaClock } from "react-icons/fa";

interface Ride {
    id: string;
    from: string;
    to: string;
    dateTime: string;
    fare: string;
    paymentMethod: string;
    passenger: string;
    rating: number;
    status: string;
}

const rideHistory: Ride[] = [
    {
        id: "#12345",
        from: "New York, NY",
        to: "Los Angeles, CA",
        dateTime: "2025-03-01 10:00 AM",
        fare: "$250",
        paymentMethod: "Credit Card",
        passenger: "John Doe",
        rating: 4.8,
        status: "Completed",
    },
    {
        id: "#67890",
        from: "Chicago, IL",
        to: "Houston, TX",
        dateTime: "2025-02-25 03:00 PM",
        fare: "$180",
        paymentMethod: "Cash",
        passenger: "Emma Smith",
        rating: 4.5,
        status: "Completed",
    },
];

const DriverRideHistory: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto mt-6 p-4">
            <h2 className="text-2xl font-bold mb-4">Ride History</h2>
            <div className="space-y-4">
                {rideHistory.map((ride) => (
                    <div key={ride.id} className="bg-white shadow-lg rounded-xl border border-gray-200 p-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">{ride.id}</span>
                            <span
                                className={`px-3 py-1 text-sm font-medium rounded-full ${ride.status === "Completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {ride.status}
                            </span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700 mt-2">
                            <FaMapMarkerAlt className="text-red-500" />
                            <span className="font-medium">
                                {ride.from} → {ride.to}
                            </span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm mt-2">
                            <div className="flex items-center space-x-2">
                                <FaClock /> <span>{ride.dateTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaRegMoneyBillAlt /> <span>{ride.fare} ({ride.paymentMethod})</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-gray-700 mt-2">
                            <div className="flex items-center space-x-2">
                                <FaUser className="text-blue-500" /> <span>{ride.passenger}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FaStar className="text-yellow-500" /> <span>{ride.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DriverRideHistory;
