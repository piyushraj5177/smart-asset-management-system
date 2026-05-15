const assetRoutes = require("./routes/assetRoutes");
const labRoutes = require("./routes/labRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/assets", assetRoutes);
app.use(
  "/api/maintenance",
  maintenanceRoutes
);

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});