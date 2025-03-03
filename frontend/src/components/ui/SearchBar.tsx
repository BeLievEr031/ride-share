import React, { useState } from "react";
import Button from "../Button";
import { IRideQueryParams } from "../../types";
import { getCoordinatesFromPlace, parseDateTime } from "../../utils/location";

interface IProp {
    handleFetchShareRides: (query: IRideQueryParams) => void
}

const SearchBar: React.FC<IProp> = ({ handleFetchShareRides }) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departure, setDeparture] = useState("");


    const handleClick = async () => {
        try {


            console.log(from);
            console.log(to);
            console.log(departure);
            const { date, time } = parseDateTime(departure)
            const coordinates1 = await getCoordinatesFromPlace(from);
            const coordinates2 = await getCoordinatesFromPlace(to);
            console.log(coordinates1);
            console.log(coordinates2);

            const query: IRideQueryParams = {
                date,
                time,
                from,
                to,
            }

            await handleFetchShareRides(query);

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="flex items-center border rounded-lg overflow-hidden max-w-4xl mx-auto shadow-md px-2 mt-4">
            {/* From Input */}
            <input
                type="text"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="p-4 w-1/4 border-r outline-none"
            />

            {/* To Input */}
            <input
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="p-4 w-1/4 border-r outline-none"
            />

            {/* Departure Date */}
            <div className="p-4 w-1/4 border-r flex flex-col">
                <span className="text-gray-500 text-sm">Departure</span>
                <input
                    type="date"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="outline-none text-black"
                />
            </div>

            {/* Search Button */}
            <Button className="bg-orange-500 mx-2 text-white px-6 py-4 font-semibold hover:bg-orange-600 w-1/4" onClick={handleClick}>
                Search
            </Button>
        </div>
    );
};

export default SearchBar;
