import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IShareRide } from "../../types";



interface Props {
    onShareRide: (data: IShareRide) => void;
    onClose: () => void;
}

const GOOGLE_MAPS_API_KEY = "AIzaSyB95TJpqJwe-eE7RcYIR30IWYcfOatwiZM";

const getCoordinatesFromPlace = async (placeName: string): Promise<{ lat: number, lng: number } | null> => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: placeName,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        const data = response.data;

        if (data.status === "OK" && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } else {
            console.error("No results found for this place.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
};

const parseDateTime = (isoString: string): { date: string; time: string } => {
    const dateObj = new Date(isoString);

    // Format date as "YYYY-MM-DD"
    const date = dateObj.toISOString().split("T")[0];

    // Extract hours and minutes
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");

    // Convert to 12-hour format
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for AM format

    // Format time as "hh:mm AM/PM"
    const time = `${hours}:${minutes} ${ampm}`;

    return { date, time };
};
const ShareRideForm: React.FC<Props> = ({ onShareRide, onClose, }) => {
    const [name, setName] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [seats, setSeats] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
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

        const fromdata = await getCoordinatesFromPlace(from)
        const toData = await getCoordinatesFromPlace(to)
        const parsedDateTime = parseDateTime(dateTime)
        console.log(fromdata, toData);
        console.log(parsedDateTime);

        const data: IShareRide = {
            clerkId: "user_12345",
            from: {
                place: from,
                coordinates: [fromdata!.lat, fromdata!.lng],
            },
            to: {
                place: to,
                coordinates: [toData!.lat, toData!.lng],
            },
            date: new Date(parsedDateTime.date),
            time: parsedDateTime.time,
            name: name,
            seats: +seats,
        }


        onShareRide(data);
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
