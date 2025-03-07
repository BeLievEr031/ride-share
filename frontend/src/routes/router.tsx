import { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layouts/RootLayout";
import Auth from "../pages/Auth/Auth";
import SecureLayout from "../layouts/SecureLayout";
import Home from "../pages/Home/Home";
import Map from "../pages/Map/Map";
import Book from "../pages/Book/Book";
import Alert from "../pages/Alert/Alert";
import History from "../pages/History/History";
import Notification from "../pages/Notification/Notification";
import IncomingRide from "../pages/IncomingRides/IncomingRides";
import ShareRides from "../pages/Rides/ShareRides";
import BookingList from "../pages/Booking/Booking";
import TrackUser from "../pages/TrackUser/TrackUser";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "ridea",
                element: <SecureLayout />,
                children: [
                    {
                        path: "home",
                        element: <Home />
                    },
                    {
                        path: "map",
                        element: <Map />
                    },
                    {
                        path: "book",
                        element: <Book />
                    },
                    {
                        path: "alert",
                        element: <Alert />
                    },
                    {
                        path: "incoming-rides",
                        element: <IncomingRide />
                    },
                    {
                        path: "history",
                        element: <History />
                    },
                    {
                        path: "notification",
                        element: <Notification />
                    },
                    {
                        path: "share-rides",
                        element: <ShareRides />
                    },
                    {
                        path: "your-rides",
                        element: <BookingList />
                    },
                ]
            },
        ]
    },
    {
        path: "/auth",
        element: <Auth />
    },
    {
        path: "/track-user",
        element: <TrackUser />
    }
])

export default router;