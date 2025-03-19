const express = require("express");
const router = express.Router();
const io = require("../../server");

const usersRouter = require("../users");
const saleRouter = require("./sale");
const customersRouter = require("./customer");
const shinppingsRouter = require("./shipping")(io);
const orderRouter = require("./order");
const promotionRouter = require("./promotion");
const masterRouter = require("./master");
const deliveryRouter = require("./delivery");
const allocateRouter = require("./allocate");
const prepareInvoiceRouter = require("./prepareInvoice");
const routeRouter = require("./route");
const distributionRouter = require("./distribution");
const receiveRouter = require("./receive");

router.use("/users", usersRouter);
router.use("/sales", saleRouter);
router.use("/customer", customersRouter);
router.use("/shinpping", shinppingsRouter);
router.use("/order", orderRouter);
router.use("/promotion", promotionRouter);
router.use("/master", masterRouter);
router.use("/prepare", prepareInvoiceRouter);
router.use("/delivery", deliveryRouter);
router.use("/allocate", allocateRouter);
router.use("/route", routeRouter);
router.use("/distribution", distributionRouter);
router.use("/receive", receiveRouter);

module.exports = router


