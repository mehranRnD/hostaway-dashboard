require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://159.223.201.156:3000"
    : "http://localhost:3000";

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Slack notification route
app.post("/send-to-slack", async (req, res) => {
  try {
    const slackWebhookUrl =
      "https://hooks.slack.com/services/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";
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text message is required" });
    }

    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    // console.log("Slack response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Slack webhook error response:", errorText);
      throw new Error(
        `Slack webhook request failed with status ${response.status}: ${errorText}`
      );
    }

    res.status(200).json({ message: "Notification sent to Slack" });
  } catch (error) {
    console.error("Error sending to Slack:", error);
    res.status(500).json({
      error: "Failed to send notification to Slack",
      details: error.message,
    });
  }
});

// API endpoint for reservations
app.get("/api/reservations", async (req, res) => {
  try {
    const response = await fetch("https://api.hostaway.com/v1/reservations", {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({
      error: "Failed to fetch reservations",
      details: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}`);
});
