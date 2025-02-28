import React, { useState } from "react";

interface Props {
    contact: { id: number; name: string; phone: string };
    onUpdateContact: (contact: { id: number; name: string; phone: string }) => void;
    onClose: () => void;
}

const EditContactForm: React.FC<Props> = ({ contact, onUpdateContact, onClose }) => {
    const [name, setName] = useState(contact.name);
    const [phone, setPhone] = useState(contact.phone);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone) return;
        onUpdateContact({ id: contact.id, name, phone });
    };

    return (
        <div className="fixed z-[999] inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Edit Contact</h2>
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                            Update
                        </button>
                        <button type="button" onClick={onClose} className="text-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContactForm;
