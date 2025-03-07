import { checkSchema } from "express-validator";

export const contactValidator = checkSchema({
    clerkId: {
        in: ["body"],
        exists: {
            errorMessage: "Clerk ID is required",
        },
        isString: {
            errorMessage: "Clerk ID must be a string",
        },
        trim: true
    },
    name: {
        in: ["body"],
        exists: {
            errorMessage: "Name is required",
        },
        isString: {
            errorMessage: "Name must be a string",
        },
        trim: true
    },
    email: {
        in: ["body"],
        exists: {
            errorMessage: "Phone number is required",
        },
        isString: {
            errorMessage: "Phone number must be a string",
        },
        trim: true,

    }
});



export const validateEmails = checkSchema({
    email: {
        in: ["body"], // The array should be in the request body
        isArray: {
            errorMessage: "emails must be an array",
        },
        notEmpty: {
            errorMessage: "emails array should not be empty",
        },
        custom: {
            options: (value) => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!value.every((email: string) => typeof email === "string" && emailRegex.test(email))) {
                    throw new Error("Each email must be a valid email address.");
                }
                return true;
            },
        },
    },
});


