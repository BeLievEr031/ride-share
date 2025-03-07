import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
interface Props {
    onAddContact: (contact: { name: string; email: string }) => void;
    onClose: () => void;
}

const AddContactForm: React.FC<Props> = ({ onAddContact, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            return toast.error("Name is required");
        } else if (name.trim().length < 3) {
            return toast.error("Name must be at least 3 characters");
        }

        if (!email.trim()) {
            return toast.error("Email is required");
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
            return toast.error("Please enter a valid email address");
        }

        onAddContact({ name, email });
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add Emergency Contact</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                            Add
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

export default AddContactForm;
