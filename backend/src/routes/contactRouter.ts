import express, { Request, Response, NextFunction } from "express";
import ContactController from "../controller/ContactController";
import ContactService from "../services/ContactService";
import { contactValidator, validateEmails } from "../validator/contactValidator";
import { ContactRequest, PaginationRequest, SendAlertRequest } from "../types";
const contactRouter = express.Router();

const contactService = new ContactService();
const contactController = new ContactController(contactService);


contactRouter.post("/alert", validateEmails, (req: Request, res: Response, next: NextFunction) => contactController.sendAlert(req as SendAlertRequest, res, next))

// Create Contact
contactRouter.post("/", contactValidator, (req: Request, res: Response, next: NextFunction) => contactController.create(req as ContactRequest, res, next));

// Get All Contacts
contactRouter.get("/", (req: Request, res: Response, next: NextFunction) => contactController.getAll(req as PaginationRequest, res, next));

// Get Contact By ID
contactRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => contactController.getById(req, res, next));

// Update Contact
contactRouter.put("/:id", contactValidator, (req: Request, res: Response, next: NextFunction) => contactController.update(req as ContactRequest, res, next));

// Delete Contact
contactRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) => contactController.delete(req, res, next));

export default contactRouter;
