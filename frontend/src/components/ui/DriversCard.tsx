import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Button from "../Button";
import { IShareRide } from "../../types";

// interface Ride {
//     _id: string;
//     clerkId: string;
//     from: string;
//     to: string;
//     date: string;
//     name: string;
//     seats: number;
//     cost: number;
// }

// const rides: Ride[] = [
//     {
//         _id: "67c5c26af6157b52b74990eb",
//         clerkId: "user_2tedTD6Grf65y87nLLRBuBYtjwE",
//         from: "Boisar",
//         to: "Palghar",
//         date: "2025-03-26T04:40:00.000Z",
//         name: "Raju",
//         seats: 4,
//         cost: 45,
//     },
// ];


interface IProp {
    rides: IShareRide[]
}

const DriverCard: React.FC<IProp> = ({ rides }) => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            {rides.map((ride: IShareRide) => (
                <div
                    key={ride._id}
                    className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between border"
                >
                    {/* Left Section: Driver Details */}
                    <div>
                        <h2 className="text-lg font-semibold text-orange-500">
                            {ride.name}
                        </h2>
                        <p className="text-gray-500">
                            Available Seats:
                            <span className="ml-1 font-semibold">{ride.seats}</span>
                        </p>
                        <p className="text-gray-500 font-semibold">Cost: ${ride.cost}</p>
                    </div>

                    {/* Middle Section: Route & Date */}
                    <div className="flex items-center">
                        <div className="text-center">
                            <FaMapMarkerAlt className="text-orange-500 mx-auto" />
                            <span className="text-orange-500 font-semibold">
                                {ride.from}
                            </span>
                            <p className="text-gray-500">{new Date(ride.date).toDateString()}</p>
                        </div>

                        <div className="mx-4 text-gray-500 text-sm">
                            <div className="border-t border-gray-400 w-24 mx-auto"></div>
                            <p className="text-center">Journey</p>
                        </div>

                        <div className="text-center">
                            <FaMapMarkerAlt className="text-orange-500 mx-auto" />
                            <span className="text-orange-500 font-semibold">
                                {ride.to}
                            </span>
                            <p className="text-gray-500">{new Date(ride.date).toLocaleTimeString()}</p>
                        </div>
                    </div>

                    {/* Right Section: Action Button */}
                    <Button className="bg-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600">
                        Book Now
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default DriverCard;

