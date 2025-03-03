import mongoose, { Schema, Document } from "mongoose";

export interface IShareRide extends Document {
    clerkId: string;
    from: {
        place: string;
        coordinates: [number, number]; // [longitude, latitude]
    };
    to: {
        place: string;
        coordinates: [number, number]; // [longitude, latitude]
    };
    date: Date;
    time: string;
    name: string;
    seats: number;
}

// Schema
const ShareRideSchema = new Schema<IShareRide>({
    clerkId: { type: String, required: true },
    from: {
        place: { type: String, required: true },
        coordinates: { type: [Number], required: true, index: "2dsphere" }, // GeoJSON format
    },
    to: {
        place: { type: String, required: true },
        coordinates: { type: [Number], required: true, index: "2dsphere" },
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    name: { type: String, required: true },
    seats: { type: Number, required: true },
});

const ShareRideModel = mongoose.model<IShareRide>("ShareRide", ShareRideSchema);
export default ShareRideModel;
