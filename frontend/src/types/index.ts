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
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    date: string; // Format: YYYY-MM-DD
    time: string; // Format: HH:mm
}
