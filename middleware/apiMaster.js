const axiosInstance = require("./axios");

async function fetchOrderType(orderType) {
  return makePostRequest("/master/orderType", { orderType });
}

async function fetchDocumentType(orderType) {
  return makePostRequest("/master/documenttype/single", { orderType });
}

async function fetchOrderNoRunning(OOSPIC) {
  return makePostRequest("/master/runningNumber", {
    coNo: 410,
    series: OOSPIC,
    seriesType: "07",
  });
}

async function fetchRunningNumber(data) {
  const { coNo, series, seriesType } = data;
  return makePostRequest("/master/runningNumber", {
    coNo: coNo,
    series: series,
    seriesType: seriesType,
  });
}

async function updateRunningNumber(data) {
  const { coNo, series, seriesType, lastNo } = data;
  return makePostRequest("/master/runningNumber/update", {
    coNo: coNo,
    series: series,
    seriesType: seriesType,
    lastNo: lastNo,
  });
}

async function calWeight(data) {
  const { itemCode, qty } = data;
  return makePostRequest("/master/calweight", {
    itemCode: itemCode,
    qty: qty,
  });
}

async function calCost(data) {
  const { itemCode, qty } = data;
  return makePostRequest("/master/calcost", {
    itemCode: itemCode,
    qty: qty,
  });
}

async function fetchfactor(data) {
  const { itemCode, unit } = data;
  return makePostRequest("/master/unit", {
    itemCode: itemCode,
    unit: unit,
  });
}

async function fetchPolicy(orderType) {
  return makePostRequest("/master/policy/single", {
    orderType: orderType,
  });
}

async function fetchPolicyDistribution(orderType) {
  return makePostRequest("/master/policy/distribution/single", {
    mgType: orderType,
  });
}


async function fetchStock(data) {
  const { itemCode, warehouse } = data;
  return makePostRequest("/master/stocksingle", {
    warehouse: warehouse,
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

module.exports = {
  fetchOrderType,
  fetchOrderNoRunning,
  fetchRunningNumber,
  updateRunningNumber,
  calWeight,
  calCost,
  fetchfactor,
  fetchPolicy,
  fetchDocumentType,
  fetchStock,
  fetchPolicyDistribution
};
