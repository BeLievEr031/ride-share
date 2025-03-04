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
    order: "asc" | "desc";
    clerkId: string;
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