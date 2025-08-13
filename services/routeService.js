const { DRODPR, DROUDI, DROUTE } = require("../models/route");
const path = require("path");
const currentFilePath = path.basename(__filename);
const errorEndpoint = require("../middleware/errorEndpoint");

exports.fetchRoute = async (shippingRoute) => {
  // console.log("shippingRoute",shippingRoute)
  try {
    const udiObj = {};
    const uteObj = {};
    // console.log("shippingRoute",shippingRoute)
    let RouteData = await DRODPR.findAll({
      where: {
        DOOBV2: shippingRoute,
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
    return routes[0];
  } catch (error) {
    throw errorEndpoint(currentFilePath, "fetchRoute:", error);
  }
};

exports.fetchRouteCode = async (routeCode) => {
  // console.log(routeCode)
  try {
    const udiObj = {};
    const uteObj = {};
    const RouteData = await DRODPR.findAll({
      where: {
        DOOBV2: routeCode,
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

    // console.log("routeCode",routeCode)
    const routes = RouteData.map((route) => {
      const method = udiObj[route.routeCode].method || "";
      const departureTime = udiObj[route.routeCode].departureTime || 0;
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
        departureTime: parseInt(departureTime),
      };
    });
    return routes;
  } catch (error) {
    throw errorEndpoint(currentFilePath, "fetchRouteCode:", error);
  }
};
