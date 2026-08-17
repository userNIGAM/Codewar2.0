import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import sponsorRoutes from "./routes/sponsor.routes.js";
import authRoutes from "./routes/auth.routes.js";
import supportedByRoutes from "./routes/supportedBy.routes.js";
import countdownRoutes from "./routes/countdown.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import awardRoutes from "./routes/award.routes.js";
import eventRoutes from "./routes/event.routes.js";
import winnerRoutes from "./routes/winnerRoutes.js";

const app = express();

// Security
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api", limiter);

// CORS
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/supported-by", supportedByRoutes);
app.use("/api/countdown", countdownRoutes);
app.use("/api/awards", awardRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/winners", winnerRoutes);
// Health check
app.get("/health", (req, res) => res.send("OK"));

// Global error handler
app.use(errorHandler);

export default app;
