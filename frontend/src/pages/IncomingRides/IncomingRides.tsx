import React, { useState } from "react";
import { FaMapMarkerAlt, FaUser, FaClock, FaDollarSign, FaCheck } from "react-icons/fa";
import { useIncomingRideFetchQuery, useUpdateBookingRideStatusMutation } from "../../hook/useBookRide";
import { IncomingRideBookingPagination } from "../../types";
import { useUser } from "@clerk/clerk-react";


interface RideRequest {
    _id?: string;
    id: string;
    passenger: string;
    from: string;
    to: string;
    dateTime: string;
    fare: string;
    name?: string;
    rideId?: {
        from: string;
        to: string;
        date: string;
        cost: number;
    };
    status: string;
}

// const rideRequests: RideRequest[] = [{
//     id: "#56789",
//     passenger: "John Doe",
//     from: "San Francisco, CA",
//     to: "Los Angeles, CA",
//     dateTime: "2025-03-05 02:00 PM",
//     fare: "$150",
// },
// {
//     id: "#56789",
//     passenger: "John Doe",
//     from: "San Francisco, CA",
//     to: "Los Angeles, CA",
//     dateTime: "2025-03-05 02:00 PM",
//     fare: "$150",
// },
// {
//     id: "#56789",
//     passenger: "John Doe",
//     from: "San Francisco, CA",
//     to: "Los Angeles, CA",
//     dateTime: "2025-03-05 02:00 PM",
//     fare: "$150",
// },
// {
//     id: "#56789",
//     passenger: "John Doe",
//     from: "San Francisco, CA",
//     to: "Los Angeles, CA",
//     dateTime: "2025-03-05 02:00 PM",
//     fare: "$150",
// },
// {
//     id: "#56789",
//     passenger: "John Doe",
//     from: "San Francisco, CA",
//     to: "Los Angeles, CA",
//     dateTime: "2025-03-05 02:00 PM",
//     fare: "$150",
// }
// ];


const IncomingRide: React.FC = () => {
    const { user } = useUser();
    const { mutate } = useUpdateBookingRideStatusMutation();
    const [pagination] = useState<IncomingRideBookingPagination>({
        driverId: user!.id,
        limit: "25",
        order: "asc",
        page: "1",
        sortBy: "createdAt"
    })
    const { data } = useIncomingRideFetchQuery(pagination)

    console.log(data?.data?.data?.incomingRides);

    const handleUpdateStatus = (id: string, status: string) => {
        console.log(id, status);
        mutate({ _id: id, status });
    }

    return (
        <div className="grid grid-cols-4 px-2 gap-3">
            {
                data?.data?.data?.incomingRides.length > 0 && data?.data?.data?.incomingRides.map((booking: RideRequest) => {
                    const rideRequest = {
                        _id: booking._id,
                        id: `#${booking._id!.slice(-5)}`, // Generating a short ID
                        passenger: booking.name,
                        from: booking.rideId!.from,
                        to: booking.rideId!.to,
                        fare: booking.rideId!.cost,
                        dateTime: new Date(booking.rideId!.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        }),
                        status: booking.status
                    }

                    return <div className="mt-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
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
                            <div>
                                <span className={`uppercase px-3 py-1 rounded-lg text-sm  bg-black text-white font-bold`}>
                                    {rideRequest.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6 gap-2">
                            {rideRequest.status === "pending" ? <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                                onClick={() => handleUpdateStatus(rideRequest._id!, "accept")}
                            >
                                <FaCheck /> <span>Accept</span>
                            </button> :
                                <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                                    onClick={() => handleUpdateStatus(rideRequest._id!, "completed")}
                                    disabled={rideRequest.status === "paid" ? true : false}
                                >
                                    <FaCheck /> <span>{rideRequest.status === "paid" ? "Paid" : "Completed"}</span>
                                </button>}
                            {/* <button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600">
                                <FaTimes /> <span>Decline</span>
                            </button> */}
                        </div>
                    </div >
                })
            }
        </div >

    );
};

export default IncomingRide;
