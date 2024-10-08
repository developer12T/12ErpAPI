// app.js
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const indexRouter = require("./routes/index");
const M3API = require("./routes/12ErpAPI/index");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// CORS options
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: ["POST"],
  credentials: true,
  maxAge: 3600,
};

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(limiter);

// Routes
app.use("/", indexRouter);
app.use("/erp", M3API);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
