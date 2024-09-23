const { sequelize, DataTypes } = require("../config/m3db");

const Document = sequelize.define(
  "OODOCU",
  {
    coNo: {
      type: DataTypes.NUMBER(3),
      allowNull: false,
      field: "OFCONO",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          if (value.toString().length !== 3) {
            throw new Error("OFCONO must be exactly 3 digits");
          }
        },
      },
    },
    orderNo: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
      field: "OFORNO",
      validate: {
        len: {
          args: [0, 10],
          msg: "Order No must be 0-10 digits long",
        },
      },
    },
    OFDONR: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      field: "OFDONR",
      validate: {
        len: {
          args: [0, 3],
          msg: "OFDONR No must be 0-3 digits long",
        },
      },
    },
    OFDOTP: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFDOTP",
      validate: {
        len: {
          args: [0, 1],
          msg: "OFDOTP No must be 0-1 digits long",
        },
      },
    },
    OFNOEX: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFNOEX",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        len: {
          args: [0, 2],
          msg: "OFDOTP No must be 0-2 digits long",
        },
      },
    },
    OFDOCD: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFDOCD",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          if (value.toString().length !== 1) {
            throw new Error("OFNOEX must be exactly 1 digits");
          }
        },
      },
    },
    OFDODT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFDODT",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          if (value.toString().length !== 8) {
            throw new Error("OFDODT must be exactly 8 digits");
          }
        },
      },
    },
    OFTXID: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFTXID",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        len: {
          args: [0, 13],
          msg: "OFDOTP No must be 0-13 digits long",
        },
      },
    },
    OFRGDT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFRGDT",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          if (value.toString().length !== 8) {
            throw new Error("OFRGDT must be exactly 8 digits");
          }
        },
      },
    },
    OFRGTM: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFRGTM",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          if (value.toString().length !== 6) {
            throw new Error("OFRGTM must be exactly 6 digits");
          }
        },
      },
    },
    OFLMDT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFLMDT",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          if (value.toString().length !== 8) {
            throw new Error("OFLMDT must be exactly 8 digits");
          }
        },
      },
    },
    OFCHNO: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFCHNO",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        len: {
          args: [0, 3],
          msg: "OFCHNO No must be 0-3 digits long",
        },
      },
    },
    OFCHID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OFCHID",
      validate: {
        len: {
          args: [0, 10],
          msg: "OFCHID No must be 0-10 digits long",
        },
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    primaryKey: false,
  }
);

module.exports = Document;
