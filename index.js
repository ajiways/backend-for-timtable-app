import express from "express";
import path from "path";
import mongoose from "mongoose";
import flash from "connect-flash/lib/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import userMiddleware from "./middleware/user.js";
import exphbs from "express-handlebars";
import { fileURLToPath } from "url";
import { MONGO_URI, SECRET_KEY, DB_OPTIONS } from "./config.js";
import helper from "./utils/hbs-helpers.js";
import apiRoutes from "./routes/api.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { authMiddleware } from "./middleware/variables.js";

const PORT = process.env.PORT || 3000;
const store = new MongoStore({
   mongoUrl: MONGO_URI,
   ttl: 24 * 3600,
});
const app = express();

const hbs = exphbs.create({
   defaultLayout: "main",
   extname: ".hbs",
   helpers: helper,
   partialsDir: path.join(__dirname, "views/partials"),
   layoutsDir: path.join(__dirname, "views/layouts"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
   session({
      secret: SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      store: store,
   })
);
app.use(flash());

app.use(userMiddleware);
app.use(authMiddleware);
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

const start = () => {
   try {
      app.listen(PORT, async () => {
         await mongoose.connect(MONGO_URI, DB_OPTIONS);
         console.log(`Server has been started on ${PORT}`);
      });
   } catch (e) {
      console.log(e);
   }
};
start();
