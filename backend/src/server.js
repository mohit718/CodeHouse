import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express from "express";
import { serve } from "inngest/express";
import path from "path";
import { connectDB } from "./libs/db.js";
import env from "./libs/env.js";
import { client, functions } from "./libs/inngest.js";
import chatRoutes from "./routes/chatRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();

const __project_root = path.join(path.resolve(), "../");

// middlewares
app.use(express.json());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ client: client, functions: functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/problem", problemRoutes);

app.get("/health", (req, res) => {
  res
    .status(200)
    .json({
      message: "API is up & running.",
      status: 200,
      environment: env.NODE_ENV,
    });
});

if (env.NODE_ENV === "production") {
  app.use(express.static(path.join(__project_root, "frontend", "dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__project_root, "frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(
        `✅[${env.NODE_ENV}] server running on http://localhost:${env.PORT}`,
      );
    });
  } catch (error) {
    console.error("❌Failed to start the server.", error);
  }
};

startServer();
