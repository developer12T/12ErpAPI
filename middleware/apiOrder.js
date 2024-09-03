const axiosInstance = require("./axios");

async function insertAllocate(itemsData) {
  try {
    await axiosInstance.post("/allowcate/insert", {
      items: itemsData,
    });
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function insertOrderLine(itemsData) {
  try {
    await axiosInstance.post("/order/insertorderitem", {
      items: itemsData,
    });
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

async function insertDeliveryHead(data) {
  try {
    await axiosInstance.post("/delivery/insertHead", {
      warehouse: data.warehouse,
      coNo: 410,
      runningNumberH: data.runningNumberH,
      orderNo: data.orderNo,
      orderType: data.orderType,
      addressID: data.addressID,
      customerNo: data.customerNo,
      orderDate: data.orderDate,
      requestDate: data.requestDate,
      OARGTM: data.OARGTM,
      OATIZO: data.OATIZO,
      grossWeight: data.grossWeight,
      netWeight: data.netWeight,
    });
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
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
    try {
      await axiosInstance.post("/document/insert", {
        orderType: data.orderType,
        orderNo: data.orderNo,
        coNo: 410,
      });
    } catch (error) {
      console.error("Error fetching order type:", error);
      throw error; // Re-throw the error if needed
    }
  }

module.exports = {
  insertAllocate,
  insertDeliveryHead,
  insertDeliveryLine,
  insertOrderLine,
  insertPrepareInovoice,
  insertDocument
};
