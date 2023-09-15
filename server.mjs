import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.config.mjs";

import errorHandler from "./middleware/errorHandler.mjs";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import cron from "node-cron";
import cookieParser from "cookie-parser";

const app = express();

//imports routes
import user_router from "./routes/user.route.mjs";
import { getWeather } from "./controllers/weather.controller.mjs";

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); //cross orgin resource sharing for giving access to our api

const { json, urlencoded } = express;

app.use(express.json());
app.use(morgan("dev"));

app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use("/api/user", user_router);

//authenticate the using middleware and cookie befor use uncomment
// app.use(authenticate);
// app.get("/api/authenticate", (req, res, next) => {
//   next();
// });

app.use(errorHandler);

cron.schedule("* * * * *", getWeather);

const startServer = async () => {
  try {
    app.listen(8085, () => {
      connectDB();
      console.log("Server started on port http://localhost:8085");
    });
  } catch (err) {
    console.log(err);
  }
};

export { startServer };
