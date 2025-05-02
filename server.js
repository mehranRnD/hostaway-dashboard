const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

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
      // "https://hooks.slack.com/services/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"; // Testing
    const { text } = req.body;

    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Slack webhook request failed");
    }

    res.status(200).json({ message: "Notification sent to Slack" });
  } catch (error) {
    console.error("Error sending to Slack:", error);
    res.status(500).json({ error: "Failed to send Slack notification" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
