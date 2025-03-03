import { Request } from "express"
export interface IShareRide {
    clerkId: string;
    from: string;
    to: string;
    date: Date;
    name: string;
    seats: number;
    cost: number;
}

export interface ShareRideRequest extends Request {
    body: IShareRide
}

export interface PaginationRequest extends Request {
    query: {
        page: string;
        limit: string;
        sortBy: string;
        order: "asc" | "desc";
        clerkId: string;
    }
}