import axios from "axios";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const getCoordinatesFromPlace = async (placeName: string): Promise<{ lat: number, lng: number } | null> => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: placeName,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        const data = response.data;

        if (data.status === "OK" && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } else {
            console.error("No results found for this place.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
};

export const parseDateTime = (isoString: string): { date: string; time: string } => {
    const dateObj = new Date(isoString);

    // Format date as "YYYY-MM-DD"
    const date = dateObj.toISOString().split("T")[0];

    // Extract hours and minutes
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");

    // Convert to 12-hour format
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for AM format

    // Format time as "hh:mm AM/PM"
    const time = `${hours}:${minutes} ${ampm}`;

    return { date, time };
};