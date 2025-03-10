import mongoose from "mongoose";
import Book from "../model/BookRide";
import { IBook } from "../types";

class BookRideService {

    // Create a new booking
    async createBooking(bookingData: IBook): Promise<IBook> {
        return await Book.create(bookingData);
    }

    // Get all bookings for a passenger with pagination and sorting
    async getAllBookings(passengerId: string, page: number, limit: number, sortBy: string, order: string) {
        const offset = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [bookings, totalBookings] = await Promise.all([
            Book.find({ passengerId })
                .populate("rideId")
                .sort({ [sortBy]: sortOrder })
                .skip(offset)
                .limit(limit),
            Book.countDocuments({ passengerId })
        ]);

        return {
            bookings,
            pagination: {
                totalBookings,
                currentPage: page,
                totalPages: Math.ceil(totalBookings / limit),
            },
        };
    }

    async getAllIncomingRides(driverId: string, page: number, limit: number, sortBy: string, order: string) {
        const offset = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [incomingRides, totalBookings] = await Promise.all([
            Book.find({ driverId })
                .populate("rideId")
                .sort({ [sortBy]: sortOrder })
                .skip(offset)
                .limit(limit),
            Book.countDocuments({ driverId })
        ]);

        return {
            incomingRides,
            pagination: {
                totalBookings,
                currentPage: page,
                totalPages: Math.ceil(totalBookings / limit),
            },
        };
    }

    // Get a booking by ID
    async getBookingById(bookingId: string): Promise<IBook | null> {
        return await Book.findById(bookingId);
    }

    // Update a booking
    async updateBooking(bookingId: string, updateData: Partial<IBook>): Promise<IBook | null> {
        return await Book.findByIdAndUpdate(bookingId, updateData, { new: true });
    }

    async updateStatus(id: mongoose.Schema.Types.ObjectId, status: string) {
        return await Book.findOneAndUpdate({
            _id: id
        },
            {
                $set: {
                    status
                }
            }, {
            new: true
        })
    }

    // Delete a booking
    async deleteBooking(bookingId: string): Promise<IBook | null> {
        return await Book.findByIdAndDelete(bookingId);
    }

    async driverHistory(driverId: string) {
        return await Book.find({ driverId }).populate("rideId")
    }

    async passangerHistory(passengerId: string) {
        return await Book.find({ passengerId }).populate("rideId")
    }
}


export default BookRideService;
