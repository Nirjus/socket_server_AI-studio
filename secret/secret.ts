import dotenv from "dotenv";

dotenv.config({
    path:"./secret/.env"
})

export const port = process.env.PORT || 5000;

export const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";