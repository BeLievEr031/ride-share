import React, { useState } from "react";
import DriverHistory from "./DriverHistory";
import PassengerHistory from "./PassengerHistory";

const RideHistoryTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState("driver");

    return (
        <div className="max-w-4xl mx-auto mt-6 p-4">
            <div className="flex border-b border-gray-300 mb-4">
                <button
                    className={`flex-1 py-2 text-lg font-semibold ${activeTab === "driver" ? "border-b-4 border-blue-500 text-blue-600" : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("driver")}
                >
                    Driver History
                </button>
                <button
                    className={`flex-1 py-2 text-lg font-semibold ${activeTab === "passenger" ? "border-b-4 border-blue-500 text-blue-600" : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("passenger")}
                >
                    Passenger History
                </button>
            </div>

            <div>
                {activeTab === "driver" ? <DriverHistory /> : <PassengerHistory />}
            </div>
        </div>
    );
};

export default RideHistoryTabs;
