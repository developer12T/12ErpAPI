const { sequelize, DataTypes } = require("../config/m3db");

const allocate = sequelize.define(
  "MITPLO",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MOCONO",
      primaryKey: true,
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("Company No must be exactly 3 digits");
          }
        },
      },
    },
    warehouse: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MOWHLO",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("Warehouse must be exactly 3 digits");
          }
        },
      },
    },
    itemCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MOITNO",
      validate: {
        len: {
          args: [0, 15],
          msg: "Item Code must be 0-15 digits long",
        },
      },
    },
    MOPLDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MOPLDT",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },

        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("MOPLDT must be exactly 8 digits");
          }
        },
      },
    },
    MOTIHM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MOTIHM",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 4) {
            throw new Error("MOTIHM must be exactly 4 digits");
          }
        },
      },
    },
    MOSTAT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOSTAT",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 2) {
            throw new Error("MOSTAT must be exactly 2 digits");
          }
        },
      },
    },
    MOPRIO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOPRIO",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 1) {
            throw new Error("MOPRIO must be exactly 1 digits");
          }
        },
      },
    },
    MOORCA: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOORCA",
      validate: {
        len: {
          args: [0, 3],
          msg: "MOORCA must be 0-3 digits long",
        },
      },
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MORIDN",
      primaryKey: true,
      validate: {
        len: {
          args: [0, 10],
          msg: "Order No must be 0-10 digits long",
        },
      },
    },
    itemNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MORIDL",
      primaryKey: true,
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        len: {
          args: [0, 6],
          msg: "Item No must be 0-6 digits long",
        },
      },
    },
    MORFTX: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MORFTX",
      validate: {
        len: {
          args: [0, 40],
          msg: "MORFTX must be 0-40 digits long",
        },
      },
    },
    MORPRT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MORPRT",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        len: {
          args: [0, 1],
          msg: "MORPRT must be 0-1 digits long",
        },
      },
    },
    MOTRQT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOTRQT",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        len: {
          args: [0, 15],
          msg: "MOTRQT must be 0-15 digits long",
        },
      },
    },
    MOALMT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOALMT",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        len: {
          args: [0, 1],
          msg: "MOALMT must be 0-1 digits long",
        },
      },
    },
    MOCALI: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MOCALI",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        len: {
          args: [0, 1],
          msg: "MOCALI must be 0-1 digits long",
        },
      },
    },
    MOLMTS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MOLMTS",
      validate: {
        isNumeric: {
          msg: "Request Date must contain only numbers", // Ensure the value is numeric
        },
        len: {
          args: [0, 18],
          msg: "MOLMTS must be 0-18 digits long",
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

module.exports = allocate;
