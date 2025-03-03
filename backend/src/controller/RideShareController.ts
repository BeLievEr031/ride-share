import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ShareRideService from "../services/RideShareService";
import { HTTP_STATUS } from "../utils/constant";
import { ShareRideRequest, PaginationRequest } from "../types";

class ShareRideController {
    constructor(private shareRideService: ShareRideService) {
        this.shareRideService = shareRideService;
    }

    // Create a new ride
    async create(req: ShareRideRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const ride = await this.shareRideService.create(req.body);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: ride,
                message: "Ride created successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Get all rides
    async getAll(req: PaginationRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const userId = req.query.clerkId
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || "date";
            const order = (req.query.order as string) || "asc";

            const result = await this.shareRideService.getAll(userId, page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Rides fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get ride by ID
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const rideId = req.params.id;
            const ride = await this.shareRideService.getById(rideId);
            if (!ride) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ride not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: ride });
        } catch (error) {
            next(error);
        }
    }

    // Update ride details
    async update(req: ShareRideRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const rideId = req.params.id;
            const updatedRide = await this.shareRideService.update(rideId, req.body);
            if (!updatedRide) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ride not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: updatedRide,
                message: "Ride updated successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete a ride
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const rideId = req.params.id;
            const deleted = await this.shareRideService.delete(rideId);
            if (!deleted) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ride not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Ride deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default ShareRideController;
