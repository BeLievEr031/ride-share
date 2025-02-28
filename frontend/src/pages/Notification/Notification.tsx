import React from "react";
import { FaBell, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface Notification {
    id: number;
    message: string;
    type: "success" | "error" | "info";
    timestamp: string;
}

const notifications: Notification[] = [
    {
        id: 1,
        message: "Your ride request has been accepted!",
        type: "success",
        timestamp: "2 mins ago",
    },
    {
        id: 2,
        message: "Payment for ride #12345 failed. Please try again.",
        type: "error",
        timestamp: "10 mins ago",
    },
    {
        id: 3,
        message: "New ride request from John Doe.",
        type: "info",
        timestamp: "30 mins ago",
    },
];

const Notification: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto mt-6 p-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaBell className="mr-2 text-yellow-500" /> Notifications
            </h2>
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-lg shadow-md flex justify-between items-center ${notification.type === "success"
                            ? "bg-green-100 border-l-4 border-green-500 text-green-700"
                            : notification.type === "error"
                                ? "bg-red-100 border-l-4 border-red-500 text-red-700"
                                : "bg-blue-100 border-l-4 border-blue-500 text-blue-700"
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            {notification.type === "success" && <FaCheckCircle className="text-green-500" />}
                            {notification.type === "error" && <FaTimesCircle className="text-red-500" />}
                            {notification.type === "info" && <FaBell className="text-blue-500" />}
                            <span>{notification.message}</span>
                        </div>
                        <span className="text-sm text-gray-500">{notification.timestamp}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;
