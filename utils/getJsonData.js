const fs = require("fs");
const path = require("path");
function getJsonData(fileName) {
  try {
    const jsonPathOrder = path.join(__dirname, "../", "Jsons", fileName);
    let JsonData = [];
    if (fs.existsSync(jsonPathOrder)) {
      const jsonDataOrder = fs.readFileSync(jsonPathOrder, "utf-8");
      JsonData = JSON.parse(jsonDataOrder);
    }
    return JsonData; // Access the data property
  } catch (error) {
    console.error("Error fetching order type:", error);
    throw error; // Re-throw the error if needed
  }
}

module.exports = {
  getJsonData,
};
