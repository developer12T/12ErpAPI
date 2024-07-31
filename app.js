const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");

// Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const saleRouter = require("./routes/sale");
const customersRouter = require("./routes/customer");
const shinppingsRouter = require("./routes/shipping");
const orderRouter = require("./routes/order");
const promotionRouter = require("./routes/promotion");
const masterRouter = require("./routes/master");
const deliveryRouter = require("./routes/delivery");
const allowcateRouter = require("./routes/allowcate");
const prepareInvoiceRouter = require("./routes/prepareInvoice");
const documentRouter = require("./routes/document");

//import middleware
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//  Set Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/sales", saleRouter);
app.use("/customer", customersRouter);
app.use("/shinpping", shinppingsRouter);
app.use("/order", orderRouter);
app.use("/promotion", promotionRouter);
app.use("/master", masterRouter);
app.use("/prepare",prepareInvoiceRouter);
app.use("/delivery",deliveryRouter);
app.use("/allowcate",allowcateRouter);
app.use("/document",documentRouter);

app.use(errorHandler);

module.exports = app;
