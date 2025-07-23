import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import { setupDatabase } from "./db/db.js";
import { seedUser } from "./models/user.model.js";

dotenv.config();

// mongodbConnect();
setupDatabase();
seedUser();

const app = express();
app.use(
    cors({
        origin: [
            "https://auth-panel.thekamalnayan.live",
            "https://auth-panel-ten.vercel.app",
            "http://localhost:3000",
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/userImages", express.static("public/userImages"));
app.use("/api", userRoute);

app.listen(5000, () => console.log("✅ Server 5000"));