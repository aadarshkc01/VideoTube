import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 8000;

// Catch programming errors / promise rejections that slip past asyncHandler
// (e.g. inside non-request code) instead of letting the process die silently.
process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION! Shutting down...", reason);
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION! Shutting down...", err);
    process.exit(1);
});

connectDB()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`⚙️  Server is running at port : ${PORT}`);
        });

        // Give in-flight requests a chance to finish before the process exits
        // (used by most hosts, and by nodemon, on restart/redeploy).
        const gracefulShutdown = (signal) => {
            console.log(`\n${signal} received. Closing server gracefully...`);
            server.close(() => {
                console.log("HTTP server closed.");
                process.exit(0);
            });
        };

        process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
        process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });
