import { useSearchParams } from 'react-router-dom'
import UserTracker from './UserTracker'

function TrackUser() {
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    // const kmOffset = 1;
    const newLat = +lat! //+ (kmOffset * 0.009);
    const newLng = +lng! //+ (kmOffset * (0.009 / Math.cos(Number(lat!) * (Math.PI / 180))));
    return (
        <div>
            <div className='w-11/12 mx-auto rounded-xl overflow-hidden pt-16'>
                <UserTracker
                    lat={Number(newLat!)}
                    lng={Number(newLng!)}
                />
            </div>
        </div>
    )
}

export default TrackUser