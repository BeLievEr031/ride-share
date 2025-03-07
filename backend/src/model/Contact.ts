import { Schema, model, Document } from "mongoose";

interface IContact extends Document {
    clerkId: string;
    name: string;
    email: string;
}

const contactSchema = new Schema<IContact>(
    {
        clerkId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // assuming the email should be unique
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Simple regex for email validation
        },
    },
    {
        timestamps: true, // Mongoose will automatically handle createdAt and updatedAt
    }
);


const Contact = model<IContact>("Contact", contactSchema);

export default Contact;
