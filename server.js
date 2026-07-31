const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDb = require("./config/dbConnection");
const errorhandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, or postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(new Error("CORS policy error: Origin not allowed"), false);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve static frontend assets in production or if build directory exists
const frontendDistPath = path.join(__dirname, "mycontacts-frontend", "dist");
if (process.env.NODE_ENV === "production" || fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.resolve(frontendDistPath, "index.html"));
    }
    next();
  });
}

// Error handling middleware
app.use(errorhandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
