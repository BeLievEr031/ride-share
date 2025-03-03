import DriverCard from "../../components/ui/DriversCard"
import SearchBar from "../../components/ui/SearchBar"
import { rideShareFetchQuery } from "../../http/api";
import { IRideQueryParams } from "../../types";

function Book() {

    const handleFetchShareRides = async (query: IRideQueryParams) => {
        try {
            const data = await rideShareFetchQuery(query)
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <SearchBar handleFetchShareRides={handleFetchShareRides} />
            <DriverCard />
        </div>
    )
}

export default Book