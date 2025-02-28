/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import EmergencyContacts from './EmergencyContact'
import Map from '../../components/ui/Map';

function Alert() {
    const [location, setLocation] = useState<[number, number]>([0, 0]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation([position.coords.latitude, position.coords.longitude]);
                setError(null);
                setLoading(false);
            },
            (error) => {
                console.log("Error ", error);
                setError(error.message);
                setLoading(false);
            }
        );
    }, []);
    return (
        <React.Fragment>
            <EmergencyContacts location={location} loading={loading} />
            <div className='mt-10 w-11/12 mx-auto'>
                <Map error={error} location={location} loading={loading} />
            </div>
        </React.Fragment>
    )
}

export default Alert