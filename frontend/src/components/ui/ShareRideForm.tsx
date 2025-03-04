import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IShareRide } from "../../types";
import { useUser } from "@clerk/clerk-react";

interface Props {
    onShareRide: (data: IShareRide) => void;
    onClose: () => void;
}

const ShareRideForm: React.FC<Props> = ({ onShareRide, onClose }) => {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        name: "",
        from: "",
        to: "",
        date: "",
        seats: "",
        cost: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { name, from, to, date, seats, cost } = formData;

        if (!name.trim() || name.length < 3) {
            return toast.error("Name must be at least 3 characters long");
        }
        if (!from.trim() || !to.trim()) {
            return toast.error("Please enter valid locations");
        }
        if (!date.trim()) {
            return toast.error("Date is required");
        }
        if (isNaN(Number(seats)) || Number(seats) <= 0) {
            return toast.error("Enter a valid number of seats");
        }
        if (isNaN(Number(cost)) || Number(cost) <= 0) {
            return toast.error("Enter a valid cost");
        }

        const rideData: IShareRide = {
            clerkId: user!.id,
            from,
            to,
            date: new Date(date),
            name,
            seats: Number(seats),
            cost: Number(cost),
        };

        onShareRide(rideData);
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Share a Ride</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <input
                        type="text"
                        name="from"
                        placeholder="Starting Location"
                        value={formData.from}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <input
                        type="text"
                        name="to"
                        placeholder="Destination"
                        value={formData.to}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            name="seats"
                            placeholder="Seats"
                            value={formData.seats}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md"
                        />
                        <input
                            type="number"
                            name="cost"
                            placeholder="Cost"
                            value={formData.cost}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-1/2">
                            Share Ride
                        </button>
                        <button type="button" onClick={onClose} className="text-gray-600 w-1/2">
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