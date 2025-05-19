const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  const baseUrl =
    NODE_ENV === "production"
      ? process.env.PRODUCTION
      : `http://localhost:${PORT}`;

  console.log(`Server is running in ${NODE_ENV} mode`);
  console.log(`Server URL: ${baseUrl}`);
});
