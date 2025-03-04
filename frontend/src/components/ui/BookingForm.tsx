import { useState, ChangeEvent, FormEvent } from "react";
import Button from "../Button";
import toast from "react-hot-toast";

interface BookingFormProps {
    onSubmit: (formData: { name: string; seats: number }) => void;
    onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState<{ name: string; seats: number }>({
        name: "",
        seats: 1,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "seats" ? Math.max(1, parseInt(value) || 1) : value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.name.trim() === "") {
            // alert("Please enter your name");
            toast.error("Please enter your name.")
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Book Your Ride</h2>
            <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Seats Input */}
                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Seats</label>
                    <input
                        type="number"
                        name="seats"
                        min="1"
                        value={formData.seats}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600"
                >
                    Confirm Booking
                </Button>
                <Button
                    type="submit"
                    variant="outline"
                    className="mt-1 w-full py-2 rounded-lg font-semibold "
                    onClick={onClose}
                >
                    Cancel Booking
                </Button>
            </form>
        </div>
    );
};

export default BookingForm;
