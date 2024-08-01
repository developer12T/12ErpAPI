const { DRODPR, DROUDI, DROUTE } = require("../../models/route");
const { HOST } = require("../../config/index");
const axios = require("axios");

exports.index = async (req, res, next) => {
  try {
    const { shippingRoute } = req.body;
    const udiObj = {};
    const uteObj = {};
    
    const RouteData = await DRODPR.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
      },
    });
    for (let i = 0; i < RouteData.length; i++) {
      const udiData = await axios({
        method: "post",
        url: `${HOST}route/udi`,
        data: { routeCode: RouteData[i].routeCode },
      });

      const uteData = await axios({
        method: "post",
        url: `${HOST}route/ute`,
        data: { routeCode: RouteData[i].routeCode },
      });

      udiData.data.forEach((udi) => {
        udiObj[udi.routeCode] = {
          method: udi.method,
          departureTime: udi.departureTime,
        };
      });

      uteData.data.forEach((ute) => {
        uteObj[ute.routeCode] = ute.routeName;
      });
    }

    const routes = RouteData.map((route) => {
      const method = udiObj[route.routeCode].method || "";
      const departureTime = udiObj[route.routeCode].departureTime || "";
      const routeName = uteObj[route.routeCode] || "";
      const forwarding = route.forwarding.trim();
      const place = route.place.trim();
      const transportation = route.transportation.trim();
      return {
        shippingRoute: shippingRoute,
        routeCode: route.routeCode,
        routeName: routeName,
        method: method,
        forwarding: forwarding,
        place: place,
        transportation: transportation,
        routeDeparture: route.routeDeparture,
        departureDay: route.departureDay,
        departureTime: departureTime,
      };
    });
    res.json(routes);
  } catch (error) {
    next(error);
  }
};

exports.udi = async (req, res, next) => {
  try {
    const { routeCode } = req.body;
    const RouteData = await DROUDI.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        routeCode: routeCode,
        coNo: 410,
      },
    });
    const result = RouteData.map((data) => {
      return {
        routeCode: data.routeCode,
        DSRODN: data.DSRODN,
        method: data.method,
        departureTime: `${data.DSDETH}${data.DSDETM}`,
      };
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.dpr = async (req, res, next) => {
  try {
    const { routeCode } = req.body;
    const RouteData = await DRODPR.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        routeCode: routeCode,
      },
    });
    res.json(RouteData);
  } catch (error) {
    next(error);
  }
};
exports.ute = async (req, res, next) => {
  try {
    const { routeCode } = req.body;
    const RouteData = await DROUTE.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        routeCode: routeCode,
        coNo: 410,
      },
    });
    res.json(RouteData);
  } catch (error) {
    next(error);
  }
};

exports.single = async (req, res, next) => {
  try {
    const { shippingRoute } = req.body;
    const udiObj = {};
    const uteObj = {};
    const RouteData = await DRODPR.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        DOOBV1: shippingRoute,
        coNo: 410,
      },
    });
    const udiData = await axios({
      method: "post",
      url: `${HOST}route/udi`,
      data: { routeCode: RouteData[0].routeCode },
    });

    const uteData = await axios({
      method: "post",
      url: `${HOST}route/ute`,
      data: { routeCode: RouteData[0].routeCode },
    });

    udiData.data.forEach((udi) => {
      udiObj[udi.routeCode] = {
        method: udi.method,
        departureTime: udi.departureTime,
      };
    });

    uteData.data.forEach((ute) => {
      uteObj[ute.routeCode] = ute.routeName;
    });

    const routes = RouteData.map((route) => {
      const method = udiObj[route.routeCode].method || "";
      const departureTime = udiObj[route.routeCode].departureTime || "";
      const routeName = uteObj[route.routeCode] || "";
      const forwarding = route.forwarding.trim();
      const place = route.place.trim();
      const transportation = route.transportation.trim();
      return {
        shippingRoute: shippingRoute,
        routeCode: route.routeCode,
        routeName: routeName,
        method: method,
        forwarding: forwarding,
        place: place,
        transportation: transportation,
        routeDeparture: route.routeDeparture,
        departureDay: route.departureDay,
        departureTime: departureTime,
      };
    });
    res.json(routes);
  } catch (error) {
    next(error);
  }
};
