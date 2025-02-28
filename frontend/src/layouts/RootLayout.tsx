import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function RootLayout() {
    const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoaded) return; // Ensure it only runs when loading is complete

        if (isSignedIn) {
            navigate("/ridea/home", { replace: true });
        } else {
            navigate("/auth", { replace: true });
        }
    }, [isSignedIn, isLoaded, navigate]); // ✅ Add dependencies

    if (!isLoaded) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <p className="w-[50px] h-[50px] border-blue-500 border-4 border-t-transparent animate-spin rounded-full"></p>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    );
}

export default RootLayout;
