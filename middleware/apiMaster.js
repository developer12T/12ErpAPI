const axiosInstance = require("./axios");

async function fetchOrderType(orderType) {
  try {
    const response = await axiosInstance.post("/master/orderType", {
      orderType: orderType,
    });
    // 'series' now holds the response data
    return response.data; // Access the data property
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function fetchDocumentType(orderType) {
  try {
    const response = await axiosInstance.post("/master/documenttype/single", {
      orderType: orderType,
    });
    // 'series' now holds the response data
    return response.data; // Access the data property
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function fetchOrderNoRunning(OOSPIC) {
  try {
    const response = await axiosInstance.post("/master/runningNumber", {
      coNo: 410,
      series: OOSPIC,
      seriesType: "07",
    });
    return response.data; // Access the data property
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function fetchRunningNumber(data) {
  try {
    const response = await axiosInstance.post("/master/runningNumber", {
      coNo: data.coNo,
      series: data.series,
      seriesType: data.seriesType,
    });
    return response.data; // Access the data property
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function updateRunningNumber(data) {
  try {
    await axiosInstance.post("/master/runningNumber/update", {
      coNo: data.coNo,
      series: data.series,
      seriesType: data.seriesType,
      lastNo: data.lastNo,
    });
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function calWeight(data) {
  try {
    const response = await axiosInstance.post("/master/calweight", {
      itemCode: data.itemCode,
      qty: data.qty,
    });
    return response.data; // Access the data property
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function calCost(data) {
  try {
    const response = await axiosInstance.post("/master/calcost", {
      itemCode: data.itemCode,
      qty: data.qty,
    });
    return response.data; // Access the data property
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function fetchfactor(data) {
  try {
    const response = await axiosInstance.post("/master/unit", {
      itemCode: data.itemCode,
      unit: data.unit,
    });
    return response.data; // Access the data property
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function fetchPolicy(orderType) {
  try {
    const response = await axiosInstance.post("/master/policy/single", {
      orderType: orderType,
    });
    return response.data; // Access the data property
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function fetchStock(data) {
  try {
    const response = await axiosInstance.post("/master/stocksingle", {
      warehouse: data.warehouse,
      itemCode: data.itemCode,
    });
    return response.data[0]; // Access the data property
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
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
};
