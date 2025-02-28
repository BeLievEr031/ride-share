import React from "react";
import Button from "../Button";

interface Driver {
    id: number;
    name: string;
    seats: number;
    days: string[];
    pickup: { location: string; time: string; date: string };
    dropoff: { location: string; time: string; date: string };
    duration: string;
}

const drivers: Driver[] = [
    {
        id: 101,
        name: "John Doe",
        seats: 4,
        days: ["S", "M", "T", "W", "T", "F", "S"],
        pickup: { location: "Mumbai", time: "08:00", date: "Fri, 28 Feb" },
        dropoff: { location: "Delhi", time: "20:30", date: "Fri, 28 Feb" },
        duration: "12hr 30min",
    },
    {
        id: 102,
        name: "Alex Smith",
        seats: 2,
        days: ["M", "W", "F"],
        pickup: { location: "Bangalore", time: "06:00", date: "Fri, 28 Feb" },
        dropoff: { location: "Hyderabad", time: "13:00", date: "Fri, 28 Feb" },
        duration: "7hr 00min",
    },
];

const DriverCard: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            {drivers.map((driver) => (
                <div
                    key={driver.id}
                    className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between border"
                >
                    {/* Left Section: Driver Details */}
                    <div>
                        <h2 className="text-lg font-semibold text-orange-500">
                            {driver.id} {driver.name}
                        </h2>
                        <p className="text-gray-500">
                            Available Seats:
                            <span className="ml-1 font-semibold">
                                {driver.seats}
                            </span>
                        </p>
                    </div>

                    {/* Middle Section: Route & Duration */}
                    <div className="flex items-center">
                        <div className="text-center">
                            <span className="text-orange-500 font-semibold">
                                {driver.pickup.location}
                            </span>
                            <p className="text-xl font-bold">{driver.pickup.time}</p>
                            <p className="text-gray-500">{driver.pickup.date}</p>
                        </div>

                        <div className="mx-4 text-gray-500 text-sm">
                            <div className="border-t border-gray-400 w-24 mx-auto"></div>
                            <p className="text-center">{driver.duration}</p>
                        </div>

                        <div className="text-center">
                            <span className="text-orange-500 font-semibold">
                                {driver.dropoff.location}
                            </span>
                            <p className="text-xl font-bold">{driver.dropoff.time}</p>
                            <p className="text-gray-500">{driver.dropoff.date}</p>
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
