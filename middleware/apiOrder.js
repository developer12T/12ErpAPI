const axiosInstance = require("./axios");

// async function insertAllocate(itemsData) {
//   try {
//     await axiosInstance.post("/allowcate/insert", {
//       items: itemsData,
//     });
//   } catch (error) {
//     console.error("Error fetching order type:", error);
//     throw error; // Re-throw the error if needed
//   }
// }
async function insertAllocate(itemsData) {
  return makePostRequest("/allowcate/insert", {
    items: itemsData,
  });
}

// async function insertOrderLine(itemsData) {
//   try {
//     await axiosInstance.post("/order/insertorderitem", {
//       items: itemsData,
//     });
//   } catch (error) {
//     console.error("Error fetching order type:", error);
//     throw error; // Re-throw the error if needed
//   }
// }

async function insertOrderLine(itemsData) {
  return makePostRequest("/order/insertorderitem", {
    items: itemsData,
  });
}

// async function insertDeliveryHead(data) {
//   try {
//     await axiosInstance.post("/delivery/insertHead", {
//       warehouse: data.warehouse,
//       coNo: 410,
//       runningNumberH: data.runningNumberH,
//       orderNo: data.orderNo,
//       orderType: data.orderType,
//       addressID: data.addressID,
//       customerNo: data.customerNo,
//       orderDate: data.orderDate,
//       requestDate: data.requestDate,
//       OARGTM: data.OARGTM,
//       OATIZO: data.OATIZO,
//       grossWeight: data.grossWeight,
//       netWeight: data.netWeight,
//     });
//   } catch (error) {
//     console.error("Error fetching order type:", error);
//     throw error; // Re-throw the error if needed
//   }
// }

async function insertDeliveryHead(data) {
  const {
    warehouse,
    runningNumberH,
    orderNo,
    orderType,
    addressID,
    customerNo,
    orderDate,
    requestDate,
    OARGTM,
    OATIZO,
    grossWeight,
    netWeight,
  } = data;
  return makePostRequest("/delivery/insertHead", {
    warehouse: warehouse,
    coNo: 410,
    runningNumberH: runningNumberH,
    orderNo: orderNo,
    orderType: orderType,
    addressID: addressID,
    customerNo: customerNo,
    orderDate: orderDate,
    requestDate: requestDate,
    OARGTM: OARGTM,
    OATIZO: OATIZO,
    grossWeight: grossWeight,
    netWeight: netWeight,
  });
}

async function insertDeliveryLine(itemsData) {
  try {
    await axiosInstance.post("/delivery/insertLine", {
      items: itemsData,
    });
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function insertPrepareInovoice(itemsData) {
  try {
    await axiosInstance.post("/prepare/insertA", {
      items: itemsData,
    });
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

// async function insertDocument(data) {
//   try {
//     await axiosInstance.post("/document/insert", {
//       orderType: data.orderType,
//       orderNo: data.orderNo,
//       coNo: 410,
//     });
//   } catch (error) {
//     console.error("Error fetching order type:", error);
//     throw error; // Re-throw the error if needed
//   }
// }
async function insertDocument(data) {
  const { orderType, orderNo } = data;
  return makePostRequest("/document/insert", {
    orderType: orderType,
    orderNo: orderNo,
    coNo: 410,
  });
}

// async function insertDistributionLine(itemsData) {
//   try {
//     await axiosInstance.post("/distribution/insertLine", {
//       items: itemsData,
//     });
//   } catch (error) {
//     console.error("Error fetching order type:", error);
//     throw error; // Re-throw the error if needed
//   }
// }
async function insertDistributionLine(itemsData) {
  return makePostRequest("/distribution/insertLine", {
    items: itemsData,
  });
}

// async function insertDistributionMGDADR(orderNo) {
//   try {
//     await axiosInstance.post("/distribution/insertMGDADR", {
//       orderNo: orderNo,
//     });
//   } catch (error) {
//     console.error("Error fetching order type:", error);
//     throw error; // Re-throw the error if needed
//   }
// }

async function insertDistributionMGDADR(orderNo) {
  return makePostRequest("/distribution/insertMGDADR", {
    orderNo: orderNo,
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

module.exports = {
  insertAllocate,
  insertDeliveryHead,
  insertDeliveryLine,
  insertOrderLine,
  insertPrepareInovoice,
  insertDocument,
  insertDistributionLine,
  insertDistributionMGDADR,
};
