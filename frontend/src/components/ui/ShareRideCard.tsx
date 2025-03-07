import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaDollarSign } from "react-icons/fa";
import Button from "../Button";
import { useRideDeleteMutation } from "../../hook/useRideShare";

interface IShareRide {
    _id?: string;
    clerkId: string;
    from: string;
    to: string;
    date: Date;
    name: string;
    seats: number;
    cost: number;
}

const ShareRideCard: React.FC<{ ride: IShareRide }> = ({ ride }) => {

    const { mutate } = useRideDeleteMutation();

    const handleDelete = (id: string) => {
        mutate(id)
    }

    return (
        <div className=" p-4 shadow-lg rounded-2xl border border-gray-200 bg-white">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Ride with {ride.name}</h2>
            </div>
            <div className="p-4 space-y-4">
                <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-blue-500" size={18} />
                    <p className="text-gray-700">From: <span className="font-medium">{ride.from}</span></p>
                </div>
                <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-red-500" size={18} />
                    <p className="text-gray-700">To: <span className="font-medium">{ride.to}</span></p>
                </div>
                <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-green-500" size={18} />
                    <p className="text-gray-700">Date: <span className="font-medium">{new Date(ride.date).toLocaleDateString()}</span></p>
                </div>
                <div className="flex items-center space-x-2">
                    <FaUser className="text-purple-500" size={18} />
                    <p className="text-gray-700">Seats Available: <span className="font-medium">{ride.seats}</span></p>
                </div>
                <div className="flex items-center space-x-2">
                    <FaDollarSign className="text-yellow-500" size={18} />
                    <p className="text-gray-700">Cost per seat: <span className="font-medium">${ride.cost}</span></p>
                </div>

                <Button variant="danger" onClick={() => handleDelete(ride._id!)}>Delete</Button>
            </div>
        </div>
    );
};

export default ShareRideCard;
