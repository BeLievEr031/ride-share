import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/ui/Navbar"
import ShareRideForm from "../components/ui/ShareRideForm"

function SecureLayout() {
    const [rideShare, setRideShare] = useState(false);
    return (
        <React.Fragment>
            <Navbar setRideShare={setRideShare} />
            <Outlet />
            {rideShare && <ShareRideForm onShareRide={() => { }} onClose={() => { setRideShare(false) }} />}
        </React.Fragment>
    )
}

export default SecureLayout