const axiosInstance = require("./axios");

async function fetchShipping(data) {
  try {
    const response = await axiosInstance.post("/shinpping/single", {
      customerNo: data.customerNo,
      addressID: data.addressID,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}
async function fetchSale(itemCode) {
  return makePostRequest("sales/single", {
    itemCode: itemCode,
  });
}

async function makePostRequest(endpoint, data) {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${endpoint}:`, error);
    throw error;
  }
}
module.exports = { fetchSale };
