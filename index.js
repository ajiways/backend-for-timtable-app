import express from "express";
import path from 'path';
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import { MONGO_URI } from "./config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001
const app = express()




const start = async () => {
    try {
        app.listen(PORT,()=> {
            mongoose.connect(MONGO_URI)
            console.log(`Server has been started on ${PORT}`);
        })
    } catch (e) {
        console.log(e)
    }
}
start()