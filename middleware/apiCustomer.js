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
async function fetchCustomer(customerNo) {
  try {
    const response = await axiosInstance.post("/customer/single", {
      customerNo: customerNo,
    });
    return response.data[0];
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}
module.exports = { fetchShipping, fetchCustomer };
