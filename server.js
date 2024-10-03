const http = require("http");
const socketIo = require("socket.io");
const debug = require("debug")("12erpapi:server");
const app = require("./app"); // Import the Express app

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server);

// Attach io to routes that require it
const customersRouter = require("./routes/12ErpAPI/customer")(io);
const shippingsRouter = require("./routes/12ErpAPI/shipping")(io);

// Apply routes that require 'io'
app.use("/customer", customersRouter);
app.use("/shipping", shippingsRouter);

// Set the port
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Start listening on the server
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // Named pipe
    return val;
  }
  if (port >= 0) {
    // Port number
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
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // Handle specific listen errors with friendly messages
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
  const addr = server.address();
  const bind = typeof addr === "string" ? "Pipe " + addr : "Port " + addr.port;
  debug("Listening on " + bind);
}
