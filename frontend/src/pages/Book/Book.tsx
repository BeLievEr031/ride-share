import { useState } from "react";
import DriverCard from "../../components/ui/DriversCard"
import SearchBar from "../../components/ui/SearchBar"
import { searchRideShareFetchQuery } from "../../http/api";
import { ISearch, IShareRide } from "../../types";
import BookingForm from "../../components/ui/BookingForm";
import { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";


export interface Iinfo { driverId: string; rideId: string }

function Book() {
    const { user } = useUser();
    // const { } = useRideShareSearchFetchQuery();
    const [rides, setRides] = useState<IShareRide[]>([])
    const [bookRide, setBookRide] = useState<boolean>(false)
    const [info, setInfo] = useState<Iinfo | null>(null)
    const handleFetchShareRides = async (query: ISearch) => {
        try {
            const data = await searchRideShareFetchQuery(query)
            console.log(data.data.data);
            setRides(data.data.data as IShareRide[])
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = (data: { name: string; seats: number }) => {
        console.log({
            ...data,
            ...info,
            passengerId: user!.id
        });

    }

    const onOpen = (data: Iinfo) => {
        setBookRide(true)
        setInfo(data)
    }

    const onClose = () => {
        setBookRide(false)
    }


    return (
        <div>
            <SearchBar handleFetchShareRides={handleFetchShareRides} />
            <DriverCard rides={rides} onOpen={onOpen} />

            {bookRide && <div className="h-screen w-full fixed inset-0 flex justify-center items-center bg-black/80">
                <BookingForm onSubmit={onSubmit} onClose={onClose} />
            </div>}

            <Toaster />
        </div>
    )
}

export default Book