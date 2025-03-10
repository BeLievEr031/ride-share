import express, { Request, Response, NextFunction } from "express";
import BookRideController from "../controller/BookRideController";
import BookRideService from "../services/BookRideService";
import { bookRideValidation } from "../validator/bookRideValidation";
import { BookPaginationRequest, BookRideRequest, HistoryRequest, IncomingRidePaginationRequest, StatusUpdateRequest, } from "../types";

const bookRideRouter = express.Router();

const bookRideService = new BookRideService();
const bookRideController = new BookRideController(bookRideService);

// Create a new booking
bookRideRouter.post(
    "/",
    bookRideValidation,
    (req: Request, res: Response, next: NextFunction) =>
        bookRideController.create(req as BookRideRequest, res, next)
);

// Get all bookings for a passenger
bookRideRouter.get(
    "/get-all",
    (req: Request, res: Response, next: NextFunction) =>
        bookRideController.getAll(req as BookPaginationRequest, res, next)
);


bookRideRouter.get(
    "/incoming-rides",
    (req: Request, res: Response, next: NextFunction) =>
        bookRideController.getAllIncomingRides(req as IncomingRidePaginationRequest, res, next)
);


bookRideRouter.put(
    "/update-status",
    (req: Request, res: Response, next: NextFunction) =>
        bookRideController.updateStatus(req as StatusUpdateRequest, res, next)

);

bookRideRouter.get("/history", (req: Request, res: Response, next: NextFunction) =>
    bookRideController.getHistory(req as HistoryRequest, res, next)
)

// Get booking by ID
bookRideRouter.get(
    "/:id",
    (req: Request, res: Response, next: NextFunction) =>
        bookRideController.getById(req, res, next)
);

// Update booking
bookRideRouter.put(
    "/:id",
    bookRideValidation,
    (req: Request, res: Response, next: NextFunction) =>
        bookRideController.update(req as BookRideRequest, res, next)
);


// Delete booking
bookRideRouter.delete(
    "/:id",
    (req: Request, res: Response, next: NextFunction) =>
        bookRideController.delete(req, res, next)
);





export default bookRideRouter;
