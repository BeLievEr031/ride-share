import DriverCard from "../../components/ui/DriversCard"
import SearchBar from "../../components/ui/SearchBar"
import { searchRideShareFetchQuery } from "../../http/api";
import { ISearch } from "../../types";

function Book() {

    // const { } = useRideShareSearchFetchQuery();

    const handleFetchShareRides = async (query: ISearch) => {
        try {
            const data = await searchRideShareFetchQuery(query)
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