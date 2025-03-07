import { Request } from "express"
import mongoose from "mongoose";
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
        userId: string;
    }
}

export interface BookPaginationRequest extends Request {
    query: {
        passengerId: string;
        page: string;
        limit: string;
        sortBy: string;
        order: "asc" | "desc";
    }
}

export interface IncomingRidePaginationRequest extends Request {
    query: {
        driverId: string;
        page: string;
        limit: string;
        sortBy: string;
        order: "asc" | "desc";
    }
}

export interface SearchRequest extends Request {
    query: {
        from: string;
        to: string;
        date: string;
    }
}

export interface IBook {
    driverId: string;
    passengerId: string;
    rideId: mongoose.Schema.Types.ObjectId;
    name: string;
    seats: number;
}

export interface BookRideRequest extends Request {
    body: IBook
}

export interface StatusUpdateRequest extends Request {
    body: {
        _id: mongoose.Schema.Types.ObjectId;
        status: string;
    }
}

export interface HistoryRequest extends Request {
    body: {
        passengerId?: string;
        driverId?: string;
    }
}

export interface CreateOrderRequest {
    body: {
        id: mongoose.Schema.Types.ObjectId;
    }
}

export interface IContact {
    clerkId: string;
    name: string;
    email: string;
}


export interface ContactRequest extends Request {
    body: IContact
}

export interface IPhone {
    url: string;
    email: string[]
}

export interface SendAlertRequest {
    body: IPhone
}