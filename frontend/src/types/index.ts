export interface IShareRide {
    _id?: string;
    clerkId: string;
    from: string;
    to: string;
    date: Date;
    name: string;
    seats: number;
    cost: number;
}

export interface IRideQueryParams {
    date: string; // Format: YYYY-MM-DD
    time: string; // Format: HH:mm
    from: string;
    to: string;
}

export interface IPagination {
    page: number;
    limit: number;
    sortBy: string;
    order: "asc" | "desc" | string;
    clerkId: string;
    userId?: string;
}

export interface ISearch {
    from: string;
    to: string;
    date: string;
}

export interface IBook {
    driverId: string;
    passengerId: string;
    rideId: string;
    name: string;
    seats: number;
}

export interface BookingPagination {
    passengerId: string;
    page: string;
    limit: string;
    sortBy: string;
    order: "asc" | "desc";
}

export interface IncomingRideBookingPagination {
    driverId: string;
    page: string;
    limit: string;
    sortBy: string;
    order: "asc" | "desc";
}

export interface BookingStatusUpdate {
    _id: string;
    status: string;
}

export interface IContact {
    _id: string;
    clerkId: string;
    name: string;
    email: string;
}

export interface IEmail {
    email: string[];
    url: string;
}

export interface IHistory {
    passengerId?: string;
    driverId?: string;
}

// Importing necessary types from TypeScript
interface RideId {
    _id: string;
    clerkId: string;
    from: string;
    to: string;
    date: string;
    name: string;
    seats: number;
    cost: number;
    __v: number;
}

export interface IRide {
    _id: string;
    driverId: string;
    passengerId: string;
    rideId: RideId;
    name: string;
    seats: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}