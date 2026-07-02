import express from "express";
import cors from "cors";
import morgan from "morgan";

import sponsorRoutes from "./routes/sponsor.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api/sponsors", sponsorRoutes);

export default app;