
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
connectDB().catch(err => console.error("DB Connection failed:", err));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
