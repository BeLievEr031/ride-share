import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/ui/Navbar"
import ShareRideForm from "../components/ui/ShareRideForm"
import { IShareRide } from "../types";
import { useRideShareCreateMutation } from "../hook/useRideShare";

function SecureLayout() {
    const [rideShare, setRideShare] = useState(false);
    const { mutate } = useRideShareCreateMutation(setRideShare);
    const handleCreateRide = (data: IShareRide) => {
        console.log(data);
        mutate(data);
    }

    return (
        <React.Fragment>
            <Navbar setRideShare={setRideShare} />
            <Outlet />
            {rideShare && <ShareRideForm onShareRide={handleCreateRide} onClose={() => { setRideShare(false) }} />}
        </React.Fragment>
    )
}

export default SecureLayout