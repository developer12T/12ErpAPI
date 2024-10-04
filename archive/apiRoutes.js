const axiosInstance = require("../middleware/axios");

async function fetchRoutes(shippingRoute) {
  try {
    const response = await axiosInstance.post("/route/single", {
      shippingRoute: shippingRoute,
    });
    return response.data[0];
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}
module.exports = { fetchRoutes };
