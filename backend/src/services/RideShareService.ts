import BookRideModel from "../model/BookRide";
import Ride from "../model/ShareRide";
import { IShareRide } from "../types";

class RideShareService {

    async create(rideData: IShareRide): Promise<IShareRide> {
        return await Ride.create(rideData);
    }

    async getAll(userId: string, page: number, limit: number, sortBy: string, order: string) {
        const offset = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [rides, totalRides] = await Promise.all([
            Ride.find({ clerkId: userId })
                .sort({ [sortBy]: sortOrder })
                .skip(offset)
                .limit(limit),
            Ride.countDocuments({ clerkId: userId })
        ]);

        return {
            rides,
            pagination: {
                totalRides,
                currentPage: page,
                totalPages: Math.ceil(totalRides / limit),
            },
        };
    }

    async getById(rideId: string): Promise<IShareRide | null> {
        return await Ride.findById(rideId);
    }

    async update(rideId: string, updateData: Partial<IShareRide>): Promise<IShareRide | null> {
        return await Ride.findByIdAndUpdate(rideId, updateData, { new: true });
    }

    async delete(rideId: string): Promise<IShareRide | null> {
        await BookRideModel.deleteMany({ rideId })
        return await Ride.findByIdAndDelete(rideId);
    }

    async search(from: string, to: string, date: string) {

        const inputDate = new Date(date);

        const startDate = new Date(inputDate);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(inputDate);
        endDate.setHours(23, 59, 59, 999);

        return await Ride.find({
            from,
            to,
            date: { $gte: startDate, $lte: endDate },
        });
    }
}

export default RideShareService;
