import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";



interface Props {
    onShareRide: (ride: { name: string; from: string; to: string; dateTime: string; seats: number }) => void;
    onClose: () => void;
}

const ShareRideForm: React.FC<Props> = ({ onShareRide, onClose, }) => {
    const [name, setName] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [seats, setSeats] = useState("");



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            return toast.error("Name is required");
        } else if (name.trim().length < 3) {
            return toast.error("Name must be at least 3 characters");
        }

        if (!from.trim()) {
            return toast.error("Starting location is required");
        }

        if (!to.trim()) {
            return toast.error("Destination is required");
        }

        if (!dateTime.trim()) {
            return toast.error("Date and time are required");
        }

        if (!seats.trim() || isNaN(Number(seats)) || Number(seats) <= 0) {
            return toast.error("Please enter a valid number of seats");
        }

        onShareRide({ name, from, to, dateTime, seats: Number(seats) });
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Share a Ride</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="From"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="To"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <input
                        type="number"
                        placeholder="Seats Available"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                            Share
                        </button>
                        <button type="button" onClick={onClose} className="text-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default ShareRideForm;
