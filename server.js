const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

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

    console.log("Sending Slack notification:", text);

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

    console.log("Slack response status:", response.status);

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
