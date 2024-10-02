const { Policy, OOTYPE, MGTYPE } = require("../models/master");
exports.policy = async (req, res, next) => {
  try {
    const { orderType } = req.body;
    const policy = await OOTYPE.findOne({
      where: {
        OOORTP: orderType,
      },
    });

    let results = await Policy.findOne({
      where: {
        EDDPOL: policy.OODPOL,
        coNo: 410,
      },
    });
    results = {
      coNo: results.coNo,
      EDDPOL: results.EDDPOL,
      EDTX40: results.EDTX40,
      EDTX15: results.EDTX15.trim(),
      EDTRLV: results.EDTRLV,
    };

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

exports.distributionPolicy = async (req, res, next) => {
  try {
    const { mgType } = req.body;
    const policy = await MGTYPE.findOne({
      where: {
        YXTRTP: mgType,
        YXCONO: 410,
      },
    });
    // res.status(200).json(policy);

    let results = await Policy.findOne({
      where: {
        EDDPOL: policy.YXDPOL,
        coNo: 410,
      },
    });
    res.status(200).json(results);
    policy = {
      coNo: results.coNo,
      EDDPOL: results.EDDPOL,
      EDTX40: results.EDTX40,
      EDTX15: results.EDTX15.trim(),
      EDTRLV: results.EDTRLV,
    };

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};


