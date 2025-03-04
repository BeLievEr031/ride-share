import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    driverId: string;
    passengerId: string;
    rideId: string;
    name: string;
    seats: number;
}

const BookSchema = new Schema<IBook>(
    {
        driverId: { type: String, required: true },
        passengerId: { type: String, required: true },
        rideId: { type: String, required: true },
        name: { type: String, required: true },
        seats: { type: Number, required: true }
    },
    { timestamps: true }
);

const BookRideModel = mongoose.model<IBook>("Book", BookSchema);
export default BookRideModel;
