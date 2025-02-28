import React from "react";
import { FaMapMarkerAlt, FaUser, FaClock, FaDollarSign, FaCheck, FaTimes } from "react-icons/fa";

const rideRequests = [{
    id: "#56789",
    passenger: "John Doe",
    from: "San Francisco, CA",
    to: "Los Angeles, CA",
    dateTime: "2025-03-05 02:00 PM",
    fare: "$150",
},
{
    id: "#56789",
    passenger: "John Doe",
    from: "San Francisco, CA",
    to: "Los Angeles, CA",
    dateTime: "2025-03-05 02:00 PM",
    fare: "$150",
},
{
    id: "#56789",
    passenger: "John Doe",
    from: "San Francisco, CA",
    to: "Los Angeles, CA",
    dateTime: "2025-03-05 02:00 PM",
    fare: "$150",
},
{
    id: "#56789",
    passenger: "John Doe",
    from: "San Francisco, CA",
    to: "Los Angeles, CA",
    dateTime: "2025-03-05 02:00 PM",
    fare: "$150",
},
{
    id: "#56789",
    passenger: "John Doe",
    from: "San Francisco, CA",
    to: "Los Angeles, CA",
    dateTime: "2025-03-05 02:00 PM",
    fare: "$150",
}
];

const IncomingRide: React.FC = () => {
    return (
        <div className="grid grid-cols-4">
            {
                rideRequests.map((rideRequest) => {
                    return <div className="max-w-lg mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                        <h2 className="text-2xl font-bold mb-4">New Ride Request</h2>
                        <div className="space-y-4 text-gray-700">
                            <div className="flex items-center space-x-2">
                                <FaUser className="text-blue-500" />
                                <span className="font-medium">Passenger: {rideRequest.passenger}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaMapMarkerAlt className="text-red-500" />
                                <span className="font-medium">{rideRequest.from} → {rideRequest.to}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaClock className="text-gray-500" />
                                <span>{rideRequest.dateTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaDollarSign className="text-green-500" />
                                <span className="font-medium">Fare: {rideRequest.fare}</span>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600">
                                <FaCheck /> <span>Accept</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600">
                                <FaTimes /> <span>Decline</span>
                            </button>
                        </div>
                    </div>
                })
            }
        </div>

    );
};

export default IncomingRide;
