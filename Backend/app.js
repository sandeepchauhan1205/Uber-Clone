import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import captainRoutes from "./routes/captain.route.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// apis
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/captain", captainRoutes);

export default app;
