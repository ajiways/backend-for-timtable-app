import express, { json } from "express";
import path, { join } from 'path';
import mongoose from "mongoose";
import flash from "flash/index.js";
import session from "express-session";
import { fileURLToPath } from 'url';
import { MONGO_URI } from "./config.js";
import { default as apiRoutes } from "./routes/api.js";
import { default as authRoutes } from "./routes/auth.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(flash())

app.use('/auth', authRoutes)
app.use('/api', apiRoutes)



const start = () => {
    try {
        app.listen(PORT, async ()=> {
            await mongoose.connect(MONGO_URI)
            console.log(`Server has been started on ${PORT}`);
        })
    } catch (e) {
        console.log(e)
    }
}
start()