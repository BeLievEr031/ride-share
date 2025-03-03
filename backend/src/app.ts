import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import shareRideRouter from "./routes/shareRideRoutes";
const app = express();

app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}))

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: "1MB" }))
app.use(cookieParser())

app.use("/ride", shareRideRouter)

app.use(errorHandler)

export default app;