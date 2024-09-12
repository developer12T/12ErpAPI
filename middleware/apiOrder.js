const axiosInstance = require("./axios");


async function insertAllocate(itemsData) {
  return makePostRequest("/allocate/insert", {
    items: itemsData,
  });
}


async function insertOrderLine(itemsData) {
  return makePostRequest("/order/insertorderitem", {
    items: itemsData,
  });
}


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


async function insertDocument(data) {
  const { orderType, orderNo } = data;
  return makePostRequest("/document/insert", {
    orderType: orderType,
    orderNo: orderNo,
    coNo: 410,
  });
}


async function insertDistributionLine(itemsData) {
  return makePostRequest("/distribution/insertLine", {
    items: itemsData,
  });
}


async function insertDistributionMGDADR(orderNo) {
  return makePostRequest("/distribution/insertMGDADR", {
    orderNo: orderNo,
  });
}


async function insertDistributionDeliveryHead(data) {
  const {
    warehouse,
    runningNumberH,
    orderNo,
    orderType,
    grossWeight,
  } = data;
  return makePostRequest("/distribution/insertDeliveryHead", {
    warehouse: warehouse,
    coNo: 410,
    runningNumberH: runningNumberH,
    orderNo: orderNo,
    orderType: orderType,
    grossWeight: grossWeight,
  });
}
async function insertDistributionDeliveryLine(itemsData) {
  return makePostRequest("/distribution/insertDeliveryLine", {
    items: itemsData,
  });
}


async function insertDistributionAllocate(itemsData) {
  return makePostRequest("/distribution/insertAllocate", {
    items: itemsData,
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
  insertDistributionDeliveryHead,
  insertDistributionDeliveryLine,
  insertDistributionAllocate,
};
