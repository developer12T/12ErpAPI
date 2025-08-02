const CryptoJS = require("crypto-js");
const { SECRET_KEY } = require("../config/index");

module.exports.encryptData = function (data) {
  const ciphertext = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  return ciphertext;
};



module.exports.decryptData = function (ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
