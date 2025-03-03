import mongoose, { Schema, Document } from "mongoose";

export interface IShareRide extends Document {
    clerkId: string;
    from: string;
    to: string;
    date: Date;
    name: string;
    seats: number;
    cost: number;
}

// Schema
const ShareRideSchema = new Schema<IShareRide>({
    clerkId: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: Date, required: true },
    name: { type: String, required: true },
    seats: { type: Number, required: true },
    cost: { type: Number, required: true },
});

const ShareRideModel = mongoose.model<IShareRide>("ShareRide", ShareRideSchema);
export default ShareRideModel;
