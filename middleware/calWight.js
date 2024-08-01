const axios = require("axios");
const { HOST } = require("../../config/index");

module.exports.calWight = async (itemCode, qty) => {
  const calWight = await axios({
    method: "post",
    url: `${HOST}master/calwight`,
    data: {
      itemCode: itemCode,
      qty: qty,
    },
  });
  return calWight.data;
};
