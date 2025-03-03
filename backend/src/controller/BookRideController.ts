import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import BookRideService from "../services/BookRideService";
import { HTTP_STATUS } from "../utils/constant";
import { BookPaginationRequest, BookRideRequest, } from "../types";
import logger from "../config/logger";

class BookRideController {
    constructor(private bookRideService: BookRideService) {
        this.bookRideService = bookRideService;
    }

    // Create a new booking
    async create(req: BookRideRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const booking = await this.bookRideService.createBooking(req.body);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: booking,
                message: "Ride booked successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Get all bookings for a passenger
    async getAll(req: BookPaginationRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const passengerId = req.query.passengerId;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || "createdAt";
            const order = (req.query.order as string) || "desc";

            logger.info(passengerId, page, limit, sortBy, order);

            const result = await this.bookRideService.getAllBookings(passengerId, page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Bookings fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get booking by ID
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const bookingId = req.params.id;
            const booking = await this.bookRideService.getBookingById(bookingId);
            if (!booking) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Booking not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: booking });
        } catch (error) {
            next(error);
        }
    }

    // Update booking details
    async update(req: BookRideRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const bookingId = req.params.id;
            const updatedBooking = await this.bookRideService.updateBooking(bookingId, req.body);
            if (!updatedBooking) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Booking not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: updatedBooking,
                message: "Booking updated successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete a booking
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const bookingId = req.params.id;
            const deleted = await this.bookRideService.deleteBooking(bookingId);
            if (!deleted) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Booking not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Booking deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default BookRideController;
