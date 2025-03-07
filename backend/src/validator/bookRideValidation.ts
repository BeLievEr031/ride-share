import { checkSchema } from "express-validator";

export const bookRideValidation = checkSchema({
    driverId: {
        in: ["body"],
        exists: { errorMessage: "Driver ID is required" },
        isString: { errorMessage: "Driver ID must be a string" },
        notEmpty: { errorMessage: "Driver ID cannot be empty" },
    },
    passengerId: {
        in: ["body"],
        exists: { errorMessage: "Passenger ID is required" },
        isString: { errorMessage: "Passenger ID must be a string" },
        notEmpty: { errorMessage: "Passenger ID cannot be empty" },
    },
    rideId: {
        in: ["body"],
        exists: { errorMessage: "Ride ID is required" },
        isString: { errorMessage: "Ride ID must be a string" },
        notEmpty: { errorMessage: "Ride ID cannot be empty" },
    },
    name: {
        in: ["body"],
        exists: { errorMessage: "Name is required" },
        isString: { errorMessage: "Name must be a string" },
        notEmpty: { errorMessage: "Name cannot be empty" },
        isLength: {
            options: { min: 2 },
            errorMessage: "Name must be at least 2 characters long",
        },
    },
});


export const historyValidation = checkSchema({
    driverId: {
        in: ["body"],
        exists: { errorMessage: "Driver ID is required" },
        isString: { errorMessage: "Driver ID must be a string" },
        notEmpty: { errorMessage: "Driver ID cannot be empty" },
    },
    passengerId: {
        in: ["body"],
        exists: { errorMessage: "Passenger ID is required" },
        isString: { errorMessage: "Passenger ID must be a string" },
        notEmpty: { errorMessage: "Passenger ID cannot be empty" },
    }
})