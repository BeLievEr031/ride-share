import express from "express";
import { createRide, getAllRides, getRideById, updateRide, deleteRide, getRidesByLocation } from "../controller/RideShareController";

const shareRideRouter = express.Router();

shareRideRouter.post("/", createRide);
shareRideRouter.get("/", getAllRides);
shareRideRouter.get("/:id", getRideById);
shareRideRouter.put("/:id", updateRide);
shareRideRouter.delete("/:id", deleteRide);
shareRideRouter.get("/search", getRidesByLocation); //Pass data in query param
export default shareRideRouter;
