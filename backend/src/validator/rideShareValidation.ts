import { checkSchema } from "express-validator";


export const shareRideValidator = checkSchema({
    clerkId: {
        in: ["body"],
        isString: { errorMessage: "clerkId must be a string" },
        notEmpty: { errorMessage: "clerkId is required" },
    },
    from: {
        in: ["body"],
        isString: { errorMessage: "From location must be a string" },
        notEmpty: { errorMessage: "From location is required" },
    },
    to: {
        in: ["body"],
        isString: { errorMessage: "To location must be a string" },
        notEmpty: { errorMessage: "To location is required" },
    },
    date: {
        in: ["body"],
        isISO8601: { errorMessage: "Invalid date format, use ISO8601 format" },
        notEmpty: { errorMessage: "Date is required" },
    },
    name: {
        in: ["body"],
        isString: { errorMessage: "Name must be a string" },
        notEmpty: { errorMessage: "Name is required" },
    },
    seats: {
        in: ["body"],
        isInt: { options: { min: 1 }, errorMessage: "Seats must be a positive integer" },
        notEmpty: { errorMessage: "Seats are required" },
    },
    cost: {
        in: ["body"],
        isFloat: { options: { min: 0 }, errorMessage: "Cost must be a positive number" },
        notEmpty: { errorMessage: "Cost is required" },
    },
});

