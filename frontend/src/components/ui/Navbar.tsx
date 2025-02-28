import { NavLink } from "react-router-dom";
import { FaCar } from "react-icons/fa"; // For Report Incident icon
import { TbBrandBooking } from "react-icons/tb";
import Button from "../Button";
import React from "react";

interface IProp {
    setRideShare: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setRideShare }: IProp) => {
    const handleOpenRideShareForm = () => {
        setRideShare(true);
    }

    return (
        <nav className="flex justify-between items-center py-3 px-6 bg-white shadow-md sticky top-0">
            <div className="flex items-center">
                <span className="text-purple-600 text-2xl font-bold flex items-center gap-2">
                    <FaCar size={25} color="" />
                    Ridea
                </span>
            </div>

            <div className="space-x-6 hidden md:flex font-Signika-Negative font-semibold text-xl">
                <NavLink to="/ridea/home" className={({ isActive }) => isActive ? "text-blue-600 underline" : "text-gray-700"}>
                    Home
                </NavLink>
                <NavLink to="/ridea/map" className={({ isActive }) => isActive ? "text-blue-600 underline" : "text-gray-700"}>
                    Map
                </NavLink>
                <NavLink to="/ridea/book" className={({ isActive }) => isActive ? "text-blue-600 underline" : "text-gray-700"}>
                    Book
                </NavLink>
                <NavLink to="/ridea/alert" className={({ isActive }) => isActive ? "text-blue-600 underline" : "text-gray-700"}>
                    Alert
                </NavLink>
                <NavLink to="/ridea/incoming-rides" className={({ isActive }) => isActive ? "text-blue-600 underline" : "text-gray-700"}>
                    Incoming Rides
                </NavLink>
                <NavLink to="/ridea/history" className={({ isActive }) => isActive ? "text-blue-600 underline" : "text-gray-700"}>
                    History
                </NavLink>
                <NavLink to="/ridea/notification" className={({ isActive }) => isActive ? "text-blue-600 underline" : "text-gray-700"}>
                    Notification
                </NavLink>
            </div>

            <div className="flex space-x-3 ">
                <Button className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition font-semibold" onClick={handleOpenRideShareForm}>
                    <TbBrandBooking className="mr-2" size={25} />
                    Share Ride
                </Button>
                <Button variant="danger" className="font-semibold text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Logout
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
