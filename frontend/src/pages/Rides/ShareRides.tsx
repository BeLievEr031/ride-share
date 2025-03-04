import { useState } from "react";
import ShareRideCard from "../../components/ui/ShareRideCard";
import { IPagination, IShareRide } from "../../types";
import { useRideShareFetchQuery } from "../../hook/useRideShare";
import { useUser } from "@clerk/clerk-react";

// const dummyRides: IShareRide[] = [
//     {
//         clerkId: "1",
//         from: "New York",
//         to: "Boston",
//         date: new Date(),
//         name: "John Doe",
//         seats: 3,
//         cost: 25,
//     },
//     {
//         clerkId: "2",
//         from: "Los Angeles",
//         to: "San Francisco",
//         date: new Date(),
//         name: "Jane Smith",
//         seats: 2,
//         cost: 40,
//     },
//     {
//         clerkId: "3",
//         from: "Chicago",
//         to: "Detroit",
//         date: new Date(),
//         name: "Alice Brown",
//         seats: 4,
//         cost: 30,
//     }
// ];

function ShareRides() {
    const { user } = useUser();
    const [pagination] = useState<IPagination>({
        page: 1,
        limit: 10,
        sortBy: "date",
        order: "asc",
        clerkId: user!.id,
    });

    const { data, isError, isPending, error } = useRideShareFetchQuery(pagination)

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }


    return (
        <div className="grid grid-cols-5 gap-3 px-2 py-4">
            {
                data?.data?.data?.rides.length > 0 && data?.data?.data?.rides.map((item: IShareRide, index: number) => {
                    return <ShareRideCard ride={item} key={index} />
                })
            }
        </div>
    )
}

export default ShareRides;