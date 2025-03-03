import { Request, Response } from "express";
import ShareRideModel from "../model/ShareRide";

export const createRide = async (req: Request, res: Response) => {
    try {
        const { clerkId, from, to, date, time, name, seats } = req.body;

        // Manual validation for required fields
        if (!clerkId || !from?.place || !to?.place || !date || !time || !name || !seats) {
            res.status(400).json({ success: false, message: "All fields are required." });
            return;
        }

        // Validate coordinates (must be an array of two numbers)
        if (!Array.isArray(from.coordinates) || from.coordinates.length !== 2 ||
            !Array.isArray(to.coordinates) || to.coordinates.length !== 2 ||
            isNaN(from.coordinates[0]) || isNaN(from.coordinates[1]) ||
            isNaN(to.coordinates[0]) || isNaN(to.coordinates[1])) {
            res.status(400).json({ success: false, message: "Invalid coordinates format." });
            return;
        }

        // Validate date format (YYYY-MM-DD)
        const rideDate = new Date(date);
        if (isNaN(rideDate.getTime())) {
            res.status(400).json({ success: false, message: "Invalid date format." });
            return;
        }

        // Validate time format (HH:mm)
        const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(time)) {
            res.status(400).json({ success: false, message: "Time must be in HH:mm format." });
            return
        }

        // Validate seats (must be a positive integer)
        if (typeof seats !== "number" || seats < 1) {
            res.status(400).json({ success: false, message: "Seats must be a valid positive number." });
            return
        }

        const newRide = new ShareRideModel({
            clerkId,
            from: {
                place: from.place,
                coordinates: [parseFloat(from.coordinates[0]), parseFloat(from.coordinates[1])],
            },
            to: {
                place: to.place,
                coordinates: [parseFloat(to.coordinates[0]), parseFloat(to.coordinates[1])],
            },
            date: rideDate,
            time,
            name,
            seats,
        });

        // Save to database
        const savedRide = await newRide.save();

        res.status(201).json({ success: true, data: savedRide });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating ride", error });
    }
};


export const getAllRides = async (req: Request, res: Response) => {
    try {
        const rides = await ShareRideModel.find();
        res.status(200).json({ success: true, data: rides });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching rides", error });
    }
};

export const getRideById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ride = await ShareRideModel.findById(id);

        if (!ride) {
            res.status(404).json({ success: false, message: "Ride not found" });
            return;
        }

        res.status(200).json({ success: true, data: ride });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching ride", error });
    }
};

export const updateRide = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedRide = await ShareRideModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedRide) {
            res.status(404).json({ success: false, message: "Ride not found" });
            return;
        }

        res.status(200).json({ success: true, data: updatedRide });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating ride", error });
    }
};

export const deleteRide = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedRide = await ShareRideModel.findByIdAndDelete(id);

        if (!deletedRide) {
            res.status(404).json({ success: false, message: "Ride not found" });
            return;
        }

        res.status(200).json({ success: true, message: "Ride deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting ride", error });
    }
};


export const getRidesByLocation = async (req: Request, res: Response) => {
    try {
        const { fromLat, fromLng, toLat, toLng, date, time } = req.query;

        if (!fromLat || !fromLng || !toLat || !toLng || !date || !time) {
            res.status(400).json({ success: false, message: "Missing required query parameters." });
            return;
        }

        const fromCoordinates = [parseFloat(fromLng as string), parseFloat(fromLat as string)];
        const toCoordinates = [parseFloat(toLng as string), parseFloat(toLat as string)];
        const selectedDate = new Date(date as string);
        const selectedTime = time as string;

        // MongoDB Query
        const rides = await ShareRideModel.find({
            $or: [
                {
                    from: { coordinates: { $near: { $geometry: { type: "Point", coordinates: fromCoordinates }, $maxDistance: 5000 } } },
                    to: { coordinates: { $near: { $geometry: { type: "Point", coordinates: toCoordinates }, $maxDistance: 5000 } } },
                },
                {
                    from: { coordinates: { $near: { $geometry: { type: "Point", coordinates: toCoordinates }, $maxDistance: 5000 } } },
                    to: { coordinates: { $near: { $geometry: { type: "Point", coordinates: fromCoordinates }, $maxDistance: 5000 } } },
                },
            ],
            date: { $eq: selectedDate },
            time: { $eq: selectedTime },
        });

        res.status(200).json({ success: true, data: rides });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching rides", error });
    }
};
