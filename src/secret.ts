import dotenv from "dotenv";
dotenv.config({path: "./.env"});

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
export const PORT = process.env.PORT || 3000;
export const ORIGIN = process.env.ORIGIN || "http://localhost:3000";
export const DATABASE_URL = process.env.DATABASE_URL;
export const FE_BASE_URL = process.env.FE_BASE_URL || "http://localhost:5173";


 

