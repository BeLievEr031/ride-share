export interface IShareRide {
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

export interface IRideQueryParams {
    date: string; // Format: YYYY-MM-DD
    time: string; // Format: HH:mm
    from: string;
    to: string;
}
