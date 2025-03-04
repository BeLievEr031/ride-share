import React from "react";

interface Booking {
    driverId: string;
    passengerId: string;
    rideId: string;
    name: string;
    seats: number;
    status: "pending" | "accepted" | "declined" | "completed";
    amount: number;
    createdAt: string;
}

// Status color mapping
const statusColors: Record<Booking["status"], string> = {
    pending: "bg-yellow-100 text-yellow-600",
    accepted: "bg-green-100 text-green-600",
    declined: "bg-red-100 text-red-600",
    completed: "bg-blue-100 text-blue-600",
};

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-6 border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">{booking.name}</h2>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium ${statusColors[booking.status]}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
            </div>

            {/* Ride Info */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-500 text-sm">
                    <p className="font-medium">Ride ID:</p>
                    <p className="text-gray-700">{booking.rideId}</p>
                </div>
                <div className="text-gray-500 text-sm">
                    <p className="font-medium">Seats:</p>
                    <p className="text-gray-700">{booking.seats}</p>
                </div>
                <div className="text-gray-500 text-sm">
                    <p className="font-medium">Amount:</p>
                    <p className="text-gray-700 font-semibold">${booking.amount}</p>
                </div>
            </div>

            {/* Driver & Passenger */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-600 text-sm"><span className="font-semibold">Driver ID:</span> {booking.driverId}</p>
                <p className="text-gray-600 text-sm"><span className="font-semibold">Passenger ID:</span> {booking.passengerId}</p>
            </div>

            {/* Timestamp */}
            <p className="text-gray-400 text-sm text-center">Booked on: {new Date(booking.createdAt).toLocaleString()}</p>
        </div>
    );
};

// Dummy Data with Amount
const dummyBookings: Booking[] = [
    {
        driverId: "driver_123",
        passengerId: "passenger_456",
        rideId: "ride_789",
        name: "John Doe",
        seats: 2,
        status: "accepted",
        amount: 50,
        createdAt: "2025-03-01T14:30:00Z",
    },
    {
        driverId: "driver_987",
        passengerId: "passenger_654",
        rideId: "ride_321",
        name: "Jane Smith",
        seats: 1,
        status: "pending",
        amount: 30,
        createdAt: "2025-03-02T09:15:00Z",
    },
    {
        driverId: "driver_111",
        passengerId: "passenger_222",
        rideId: "ride_333",
        name: "Alice Brown",
        seats: 3,
        status: "completed",
        amount: 75,
        createdAt: "2025-02-28T18:00:00Z",
    },
    {
        driverId: "driver_444",
        passengerId: "passenger_555",
        rideId: "ride_999",
        name: "Robert Green",
        seats: 2,
        status: "declined",
        amount: 40,
        createdAt: "2025-02-25T12:45:00Z",
    },
];

// Parent Component to Render Bookings
const BookingList: React.FC = () => {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Bookings</h1>
            <div className="grid grid-cols-4 gap-4">
                {dummyBookings.map((booking, index) => (
                    <BookingCard key={index} booking={booking} />
                ))}
            </div>
        </div>
    );
};

export default BookingList;
