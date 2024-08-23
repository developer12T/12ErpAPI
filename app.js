const express = require("express");
// Helmet used to Security
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require('cors')


// Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const saleRouter = require("./routes/12ErpAPI/sale");
const customersRouter = require("./routes/12ErpAPI/customer");
const shinppingsRouter = require("./routes/12ErpAPI/shipping");
const orderRouter = require("./routes/12ErpAPI/order");
const promotionRouter = require("./routes/12ErpAPI/promotion");
const masterRouter = require("./routes/12ErpAPI/master");
const deliveryRouter = require("./routes/12ErpAPI/delivery");
const allowcateRouter = require("./routes/12ErpAPI/allowcate");
const prepareInvoiceRouter = require("./routes/12ErpAPI/prepareInvoice");
const documentRouter = require("./routes/12ErpAPI/document");
const routeRouter = require("./routes/12ErpAPI/route");

const M3API = require("./routes/12ErpAPI/index");

//import middleware
const errorHandler = require("./middleware/errorHandler");

const app = express();

const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200 , // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ["POST"],
    credentials: true,
    maxAge: 3600
  }
// const app = restify.createServer({
//   name: "myapp",
//   version: "1.0.0",
// });

// app.use(restify.plugins.bodyParser());
app.use(cors(corsOptions))
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

app.use(errorHandler);

module.exports = app;
