export interface IContact {
    id: number;
    clerkId: string;
    name: string;
    phone: string;
}

export interface IPagination {
    page: number;
    limit: number;
    order: "asc" | "desc";
    sortBy: string;
    clerkId?: string;
    userId?: string;
}

export interface IPhone {
    numbers: string[]
}

export interface IAlert {
    lat: number;
    lng: number;
    clerkId: string;
}

export interface IReportIncident {
    incidentType: string;
    lat: number;
    lng: number;
    description: string;
}

export interface IDangerZone {
    lat: number;
    lng: number;
    clerkId: string;
    zoneName: string;
}