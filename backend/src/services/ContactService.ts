import Contact from "../model/Contact";
import { IContact } from "../types";

class ContactService {
    // Create a new contact
    async create(contactData: IContact): Promise<IContact> {
        const contact = new Contact(contactData);
        return await contact.save();
    }

    // Get all contacts with pagination
    async getAll(userId: string, page: number, limit: number, sortBy: string, order: string) {
        const skip = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1; // 1 for ascending, -1 for descending

        const contacts = await Contact.find({ clerkId: userId })
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit);

        const totalContacts = await Contact.countDocuments({ clerkId: userId });

        return {
            contacts,
            pagination: {
                totalContacts,
                currentPage: page,
                totalPages: Math.ceil(totalContacts / limit),
            },
        };
    }

    // Get contact by ID
    async getById(contactId: string): Promise<IContact | null> {
        return await Contact.findById(contactId);
    }

    // Update contact details
    async update(contactId: string, updateData: Partial<IContact>): Promise<IContact | null> {
        return await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
    }

    // Delete a contact
    async delete(contactId: string): Promise<boolean> {
        const result = await Contact.findByIdAndDelete(contactId);
        return result !== null;
    }
}

export default ContactService;
