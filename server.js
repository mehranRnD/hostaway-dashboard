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
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
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
app.get("/api/reservations/:id", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.hostaway.com/v1/reservations/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({
      error: "Failed to fetch reservation",
      details: error.message,
    });
  }
});

// API endpoint for finance fields
app.get("/api/financeStandardField/reservation/:id", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.hostaway.com/v1/financeStandardField/reservation/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching finance fields:", error);
    res.status(500).json({
      error: "Failed to fetch finance fields",
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
