import React, { useState } from "react";
import AddContactForm from "./AddContactForm";
// import EditContactForm from "./EditContactForm";
import { useAlertMutation, useContactAddMutation, useContactDeleteMutation, useContactFetchQuery } from "../../hook/useContact";
import { useUser } from "@clerk/clerk-react";
import { IContact, IPagination } from "../../types";
import toast, { Toaster } from "react-hot-toast";

interface Contact {
    _id: string;
    name: string;
    email: string;
}

interface IProp {
    location: [number, number];
    loading: boolean;
}

const EmergencyContacts: React.FC<IProp> = ({ location, loading }) => {
    const { mutate } = useContactAddMutation();
    const { mutate: deleteMutation } = useContactDeleteMutation();
    const { mutate: alertMutation, isSuccess: SendSuccess } = useAlertMutation();
    const { user } = useUser();

    const [pagination] = useState<IPagination>({
        limit: 20,
        order: "desc",
        page: 1,
        sortBy: "createdAt",
        userId: user ? user!.id : "",
        clerkId: user ? user!.id : ""
    })

    const { isPending, isError, error, data } = useContactFetchQuery(pagination);
    // const [contacts, setContacts] = useState<Contact[]>([
    //     { id: "4", name: "John Doe", email: "+91234567890" },
    //     { id: "5", name: "Jane Smith", email: "+91234567891" },
    // ]);

    // const [editingContact, setEditingContact] = useState<Contact | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddContact = (newContact: Contact) => {
        mutate({ ...newContact, clerkId: user!.id });
        setIsAdding(false);
    };

    // const handleUpdateContact = (updatedContact: Contact) => {
    //     setContacts(
    //         contacts.map((contact) =>
    //             contact.id === updatedContact.id ? updatedContact : contact
    //         )
    //     );
    //     setEditingContact(null);
    // };

    const handleDeleteContact = (id: string) => {
        console.log(id);
        deleteMutation(id);
    };

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    const handleSendAlert = () => {
        const email = data?.data?.data?.contacts.map((item: IContact) => {
            return item.email
        })
        const id = new Date()
        const url = `http://localhost:5173/track-user?id=${id}&lat=${location[0]}&lng=${location[1]}`
        alertMutation({ email, url })
    }


    if (SendSuccess) {
        toast.success("Alert has been sent.")
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 text-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md mb-6" onClick={handleSendAlert} disabled={loading}>
                {!loading ? "Alert Now" :
                    <p className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></p>
                }
            </button>

            <div className="space-y-4">
                {data?.data?.data?.contacts && data?.data?.data?.contacts?.map((contact: IContact) => (
                    <div key={contact._id} className="flex justify-between items-center border p-4 rounded-lg">
                        <div>
                            <p className="font-semibold text-left">{contact.name}</p>
                            <p className="text-gray-600 text-left">{contact.email}</p>
                        </div>
                        <div className="space-x-4">
                            {/* <button
                                onClick={() => setEditingContact(contact)}
                                className="text-blue-600"
                            >
                                Edit
                            </button> */}
                            <button
                                onClick={() => handleDeleteContact(contact._id)}
                                className="text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => setIsAdding(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md mt-6"
            >
                Add Emergency Contact
            </button>

            {isAdding && <AddContactForm onAddContact={(data) => handleAddContact(data as Contact)} onClose={() => setIsAdding(false)} />}
            {/* {editingContact && (
                <EditContactForm contact={editingContact} onUpdateContact={handleUpdateContact} onClose={() => setEditingContact(null)} />
            )} */}

            <Toaster />
        </div>
    );
};

export default EmergencyContacts;
