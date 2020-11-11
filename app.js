const express = require("express");

const path = require("path");

const multer = require("multer");

const helmet = require("helmet");

const compression = require("compression");

// requiring dotenv for fetching api details
require("dotenv").config();

// defining a dynamic port number/3000
const port = process.env.PORT || 3000;

// database connection pool
const db = require("./util/database");

const app = express();

// importing all the routes
const authRoutes = require("./routes/auth");

const adminRoutes = require("./routes/administrator");

const userRoutes = require("./routes/user");

// Multer file storage config
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

// multer file filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// initializing parser from express
app.use(express.json());

// multer middleware
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);

// defining static path of images folder
app.use("/images", express.static(path.join(__dirname, "images")));

// cors error middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// using the defined routes
app.use("/auth", authRoutes);

app.use("/administrator", adminRoutes);

app.use("/user", userRoutes);

app.use(helmet());

app.use(compression());

//central error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

// listining http
app.listen(port, () => {
  console.log("Running");
});
