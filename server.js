const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDb = require("./config/dbConnection");
const errorhandler = require("./middleware/errorHandler");
require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

// CORS — allow all in dev, restrict in production
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? [process.env.FRONTEND_URL].filter(Boolean)
      : true,
    credentials: true,
  })
);

app.use(express.json());

// API routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve React production build
const frontendDistPath = path.join(__dirname, "mycontacts-frontend", "dist");
const indexHtmlPath = path.join(frontendDistPath, "index.html");

if (fs.existsSync(frontendDistPath)) {
  console.log("Serving frontend from:", frontendDistPath);

  // Serve static assets (JS, CSS, images)
  app.use(
    express.static(frontendDistPath, {
      maxAge: "1d",
      index: false, // disable auto index.html serving — we handle it manually
    })
  );

  // SPA fallback — serve index.html for all non-API GET routes
  app.get("*splat", (req, res) => {
    if (fs.existsSync(indexHtmlPath)) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.sendFile(indexHtmlPath);
    } else {
      res.status(404).send("Frontend build not found.");
    }
  });
} else {
  console.log("No frontend dist folder found, running API-only mode.");
  app.get("/", (req, res) => {
    res.json({ message: "MyContacts API is running." });
  });
}

// Error handling middleware
app.use(errorhandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
