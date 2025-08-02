const path = require("path");

const getCurrentFilePath = () => {
  return path.basename(__filename);
};

module.exports = getCurrentFilePath;
