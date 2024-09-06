const express = require("express");
// Helmet used to Security
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const debug = require("debug")("12erpapi:server");
const { rateLimit } =  require('express-rate-limit');

const app = express();

const server = http.createServer(app); // Create HTTP server
const io = socketIo(server);

// Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const saleRouter = require("./routes/12ErpAPI/sale");
const customersRouter = require("./routes/12ErpAPI/customer")(io);
const shinppingsRouter = require("./routes/12ErpAPI/shipping")(io);
const orderRouter = require("./routes/12ErpAPI/order");
const promotionRouter = require("./routes/12ErpAPI/promotion");
const masterRouter = require("./routes/12ErpAPI/master");
const deliveryRouter = require("./routes/12ErpAPI/delivery");
const allowcateRouter = require("./routes/12ErpAPI/allowcate");
const prepareInvoiceRouter = require("./routes/12ErpAPI/prepareInvoice");
const documentRouter = require("./routes/12ErpAPI/document");
const routeRouter = require("./routes/12ErpAPI/route");
const distributionRouter = require("./routes/12ErpAPI/distribution");

const M3API = require("./routes/12ErpAPI/index");

//import middleware
const errorHandler = require("./middleware/errorHandler");

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["POST"],
  credentials: true,
  maxAge: 3600,
};
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 1 minutes
// 	limit: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
// 	// store: ... , // Redis, Memcached, etc. See below.
// })

// Your other app setup code like middleware
app.use(express.json()); // Example middleware

// app.use(limiter)

app.use(cors(corsOptions));
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(xss());
//  Set Routes
app.use("/", indexRouter);
app.use("/12ErpAPI", M3API);

app.use("/users", usersRouter);
app.use("/sales", saleRouter);
app.use("/customer", customersRouter);
app.use("/shinpping", shinppingsRouter);
app.use("/order", orderRouter);
app.use("/promotion", promotionRouter);
app.use("/master", masterRouter);
app.use("/prepare", prepareInvoiceRouter);
app.use("/delivery", deliveryRouter);
app.use("/allowcate", allowcateRouter);
app.use("/document", documentRouter);
app.use("/route", routeRouter);
app.use("/distribution", distributionRouter);

app.use(errorHandler);

const port = normalizePort(process.env.PORT || "3000");

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);


// 
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

// module.exports = app;
