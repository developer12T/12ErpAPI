// Models
const { DRODPR, DROUDI, DROUTE } = require("../../models/route");
// Sequelize "OR"
const { Op } = require("sequelize");

exports.getRouteAll = async (req, res, next) => {
  try {
    const udiObj = {};
    const uteObj = {};
    const { routeCode } = req.body;

    const RouteData = await DRODPR.findAll({
      where: {
        coNo: 410,
        routeCode: {
          [Op.like]: `${routeCode}%`,
        },
      },
    });

    for (let i = 0; i < RouteData.length; i++) {
      const udiDatas = await DROUDI.findAll({
        where: {
          routeCode: RouteData[i].routeCode,
          coNo: 410,
        },
      });

      const udiData = udiDatas.map((data) => {
        return {
          routeCode: data.routeCode,
          DSRODN: data.DSRODN,
          method: data.method,
          departureTime: `${data.DSDETH}${data.DSDETM}`,
        };
      });

      const uteData = await DROUTE.findAll({
        where: {
          routeCode: RouteData[0].routeCode,
          coNo: 410,
        },
      });
      udiData.forEach((udi) => {
        udiObj[udi.routeCode] = {
          method: udi.method,
          departureTime: udi.departureTime,
        };
      });

      uteData.forEach((ute) => {
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
      const shippingRoute = route.DOOBV1.trim();
      const routeCode = route.routeCode.trim();
      return {
        shippingRoute: shippingRoute,
        routeCode: routeCode,
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
exports.getRoute = async (req, res, next) => {
  try {
    const { shippingRoute } = req.body;
    const udiObj = {};
    const uteObj = {};

    let RouteData = await DRODPR.findAll({
      where: {
        DOOBV1: shippingRoute,
        coNo: 410,
      },
    });

    const udiDatas = await DROUDI.findAll({
      where: {
        routeCode: RouteData[0].routeCode,
        coNo: 410,
      },
    });
    const udiData = udiDatas.map((data) => {
      return {
        routeCode: data.routeCode,
        DSRODN: data.DSRODN,
        method: data.method,
        departureTime: `${data.DSDETH}${data.DSDETM}`,
      };
    });

    const uteData = await DROUTE.findAll({
      where: {
        routeCode: RouteData[0].routeCode,
        coNo: 410,
      },
    });

    udiData.forEach((udi) => {
      udiObj[udi.routeCode] = {
        method: udi.method,
        departureTime: udi.departureTime,
      };
    });

    uteData.forEach((ute) => {
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
    res.json(routes[0]);
  } catch (error) {
    next(error);
  }
};
exports.getRouteCode = async (req, res, next) => {
  try {
    const { routeCode } = req.body;
    const udiObj = {};
    const uteObj = {};
    const RouteData = await DRODPR.findAll({
      where: {
        routeCode: routeCode,
        coNo: 410,
      },
    });

    const udiDatas = await DROUDI.findAll({
      where: {
        routeCode: RouteData[0].routeCode,
        coNo: 410,
      },
    });
    const udiData = udiDatas.map((data) => {
      return {
        routeCode: data.routeCode,
        DSRODN: data.DSRODN,
        method: data.method,
        departureTime: `${data.DSDETH}${data.DSDETM}`,
      };
    });

    const uteData = await DROUTE.findAll({
      where: {
        routeCode: RouteData[0].routeCode,
        coNo: 410,
      },
    });

    udiData.forEach((udi) => {
      udiObj[udi.routeCode] = {
        method: udi.method,
        departureTime: udi.departureTime,
      };
    });

    uteData.forEach((ute) => {
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
    res.json(routes[0]);
  } catch (error) {
    next(error);
  }
};
