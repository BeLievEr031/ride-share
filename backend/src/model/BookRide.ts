import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    driverId: string;
    passengerId: string;
    rideId: string;
    name: string;
    seats: number;
    status: "pending" | "accepted" | "declined" | "completed"
}

const BookSchema = new Schema<IBook>(
    {
        driverId: { type: String, required: true },
        passengerId: { type: String, required: true },
        rideId: { type: String, required: true },
        name: { type: String, required: true },
        seats: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "accepted", "declined", "completed"]
        }
    },
    { timestamps: true }
);

const BookRideModel = mongoose.model<IBook>("Book", BookSchema);
export default BookRideModel;
