import { Request } from "express"
export interface IShareRide {
    clerkId: string;
    from: { location: string; latitude: number; longitude: number };
    to: { location: string; latitude: number; longitude: number };
    date: string; // Store as ISO string (YYYY-MM-DD)
    time: { hours: number; minutes: number }; // Structured time
    name: string;
    seats: number;
}



export interface ShareRideRequest extends Request {
    body: IShareRide
}