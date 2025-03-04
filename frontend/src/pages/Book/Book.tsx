import { useState } from "react";
import DriverCard from "../../components/ui/DriversCard"
import SearchBar from "../../components/ui/SearchBar"
import { searchRideShareFetchQuery } from "../../http/api";
import { ISearch, IShareRide } from "../../types";

function Book() {

    // const { } = useRideShareSearchFetchQuery();
    const [rides, setRides] = useState<IShareRide[]>([])
    const handleFetchShareRides = async (query: ISearch) => {
        try {
            const data = await searchRideShareFetchQuery(query)
            console.log(data.data.data);
            setRides(data.data.data as IShareRide[])
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <SearchBar handleFetchShareRides={handleFetchShareRides} />
            <DriverCard rides={rides} />
        </div>
    )
}

export default Book