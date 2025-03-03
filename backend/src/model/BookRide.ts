import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    driverId: string;
    passengerId: string;
    rideId: string;
    name: string;
}

const BookSchema = new Schema<IBook>(
    {
        driverId: { type: String, required: true },
        passengerId: { type: String, required: true },
        rideId: { type: String, required: true },
        name: { type: String, required: true },
    },
    { timestamps: true }
);

const BookRideModel = mongoose.model<IBook>("Book", BookSchema);
export default BookRideModel;
