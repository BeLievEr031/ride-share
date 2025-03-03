import express, { Request, Response, NextFunction } from "express";
import ShareRideController from "../controller/RideShareController";
import ShareRideService from "../services/RideShareService";
import { shareRideValidator } from "../validator/rideShareValidation";
import { ShareRideRequest, PaginationRequest, SearchRequest } from "../types";

const shareRideRouter = express.Router();

const shareRideService = new ShareRideService();
const shareRideController = new ShareRideController(shareRideService);

// Create Share Ride
shareRideRouter.post(
    "/",
    shareRideValidator,
    (req: Request, res: Response, next: NextFunction) =>
        shareRideController.create(req as ShareRideRequest, res, next)
);

shareRideRouter.get(
    "/search",
    (req: Request, res: Response, next: NextFunction) =>
        shareRideController.search(req as SearchRequest, res, next)
);

// Get All Share Rides
shareRideRouter.get(
    "/get-all",
    (req: Request, res: Response, next: NextFunction) =>
        shareRideController.getAll(req as PaginationRequest, res, next)
);

// Get Share Ride By ID
shareRideRouter.get(
    "/:id",
    (req: Request, res: Response, next: NextFunction) =>
        shareRideController.getById(req, res, next)
);

// Update Share Ride
shareRideRouter.put(
    "/:id",
    shareRideValidator,
    (req: Request, res: Response, next: NextFunction) =>
        shareRideController.update(req as ShareRideRequest, res, next)
);

// Delete Share Ride
shareRideRouter.delete(
    "/:id",
    (req: Request, res: Response, next: NextFunction) =>
        shareRideController.delete(req, res, next)
);





export default shareRideRouter;
