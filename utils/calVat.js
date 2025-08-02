module.exports.totalDiscount = (total, totalNet) => {
  total = parseInt(total);
  totalNet = parseInt(totalNet);
  return Number(Math.round((total - totalNet) * 100) / 100);
};

module.exports.totalVat = (totalNet) => {
  totalNet = parseInt(totalNet);
  return Number(
    Math.round(
      (Math.round((totalNet - totalNet / 1.07) * 10000) / 10000) * 100
    ) / 100
  );
};

module.exports.totalNonVat = (totalNet, totalVat) => {
  totalNet = parseInt(totalNet);
  totalVat = parseInt(totalVat);
  return Number(
    Math.round((Math.round((totalNet - totalVat) * 10000) / 10000) * 100) / 100
  );
};

module.exports.nonVat = (total) => {
  total = parseInt(total);
  return Number(
    Math.round((Math.round((total / 1.07) * 10000) / 10000) * 100) / 100
  );
};
