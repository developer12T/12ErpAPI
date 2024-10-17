const { sequelize, DataTypes } = require("../config/m3db");

const DeliveryLine = sequelize.define(
  "MHDISL",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URCONO",
      validate: {
        isNumeric: {
          msg: "Company No must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("Company No must be exactly 3 digits");
          }
        },
      },
    },
    URDLIX: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: "URDLIX",
      validate: {
        len: {
          args: [0, 11],
          msg: "URDLIX must be 0-11 digits long",
        },
        isNumeric: {
          msg: "URDLIX must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    URRORC: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URRORC",
      validate: {
        len: {
          args: [0, 1],
          msg: "URRORC must be 0-1 digits long",
        },
        isNumeric: {
          msg: "URRORC must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    URRIDN: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URRIDN",
      validate: {
        len: {
          args: [0, 10],
          msg: "URRIDN must be 0-10 digits long",
        },
      },
    },
    URRIDL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URRIDL",
      validate: {
        len: {
          args: [0, 6],
          msg: "URRIDL must be 0-6 digits long",
        },
        isNumeric: {
          msg: "URRIDL must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    URITNO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URITNO",
      validate: {
        len: {
          args: [0, 15],
          msg: "URRIDL must be 0-15 digits long",
        },
      },
    },
    URFACI: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URFACI",
      validate: {
        len: {
          args: [0, 3],
          msg: "URFACI must be 0-3 digits long",
        },
      },
    },
    URTRQT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URTRQT",
      validate: {
        len: {
          args: [0, 15],
          msg: "URTRQT must be 0-15 digits long",
        },
        isNumeric: {
          msg: "URTRQT must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    URSTCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URSTCD",
      validate: {
        len: {
          args: [0, 1],
          msg: "URSTCD must be 0-1 digits long",
        },
        isNumeric: {
          msg: "URSTCD must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    URRGDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URRGDT",
      validate: {
        isNumeric: {
          msg: "URRGDT must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("URRGDT must be exactly 8 digits");
          }
        },
      },
    },
    URRGTM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URRGTM",
      validate: {
        isNumeric: {
          msg: "URRGTM must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 6) {
            throw new Error("URRGTM must be exactly 6 digits");
          }
        },
      },
    },
    URLMDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URLMDT",
      validate: {
        isNumeric: {
          msg: "URLMDT must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("URLMDT must be exactly 8 digits");
          }
        },
      },
    },
    URCHNO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URCHNO",
      validate: {
        len: {
          args: [0, 3],
          msg: "URCHNO must be 0-3 digits long",
        },
      },
    },
    URCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URCHID",
      validate: {
        len: {
          args: [0, 10],
          msg: "URCHNO must be 0-10 digits long",
        },
      },
    },
    URLMTS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URLMTS",
      validate: {
        len: {
          args: [0, 18],
          msg: "URCHNO must be 0-18 digits long",
        },
        isNumeric: {
          msg: "URRGTM must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    URSCES: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URSCES",
      validate: {
        len: {
          args: [0, 2],
          msg: "URSCES must be 0-2 digits long",
        },
      },
    },
    grossWeight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "URGRWE",
      validate: {
        len: {
          args: [0, 9],
          msg: "Gross Weight must be 0-9 digits long",
        },
        isNumeric: {
          msg: "Gross Weight must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    netWeight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "URNEWE",
      validate: {
        len: {
          args: [0, 9],
          msg: "Net Weight must be 0-9 digits long",
        },
        isNumeric: {
          msg: "Net Weight must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    URALUN: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "URALUN",
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

const DeliveryHead = sequelize.define(
  "MHDISH",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQCONO",
      validate: {
        isNumeric: {
          msg: "OQCONO must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("OQCONO must be exactly 3 digits");
          }
        },
      },
    },
    OQDLIX: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      field: "OQDLIX",
      validate: {
        len: {
          args: [0, 11],
          msg: "OQDLIX must be 0-11 digits long",
        },
        isNumeric: {
          msg: "OQDLIX must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQDPOL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQDPOL",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("OQDPOL must be exactly 3 digits");
          }
        },
      },
    },
    OQCOAA: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQCOAA",
      validate: {
        len: {
          args: [0, 6],
          msg: "OQCOAA must be 0-6 digits long",
        },
      },
    },
    OQCOAF: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQCOAF",
      validate: {
        len: {
          args: [0, 6],
          msg: "OQCOAF must be 0-6 digits long",
        },
      },
    },
    OQCONB: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQCONB",
      validate: {
        len: {
          args: [0, 10],
          msg: "OQCONB must be 0-10 digits long",
        },
      },
    },
    OQWHLO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQWHLO",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("OQWHLO must be exactly 3 digits");
          }
        },
      },
    },
    OQINOU: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQINOU",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 1) {
            throw new Error("OQWHLO must be exactly 1 digits");
          }
        },
      },
    },
    OQCONA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQCONA",
      validate: {
        len: {
          args: [0, 10],
          msg: "OQCONA must be 0-10 digits long",
        },
      },
    },
    OQSDES: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQSDES",
      validate: {
        len: {
          args: [0, 10],
          msg: "OQSDES must be 0-10 digits long",
        },
      },
    },
    OQDSDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDSDT",
      validate: {
        isNumeric: {
          msg: "OQDSDT must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("OQDSDT must be exactly 8 digits");
          }
        },
      },
    },
    OQTRDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQTRDT",
      validate: {
        isNumeric: {
          msg: "OQTRDT must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("OQTRDT must be exactly 8 digits");
          }
        },
      },
    },
    OQTRTM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQTRTM",
      validate: {
        isNumeric: {
          msg: "OQTRTM must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 6) {
            throw new Error("OQTRTM must be exactly 6 digits");
          }
        },
      },
    },
    OQROUT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQROUT",
      validate: {
        len: {
          args: [0, 6],
          msg: "OQSDES must be 0-6 digits long",
        },
      },
    },
    OQRORC: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQRORC",
      validate: {
        len: {
          args: [0, 1],
          msg: "OQRORC must be 0-1 digits long",
        },
        isNumeric: {
          msg: "OQRORC must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQTTYP: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQTTYP",
      validate: {
        len: {
          args: [0, 2],
          msg: "OQTTYP must be 0-2 digits long",
        },
        isNumeric: {
          msg: "OQTTYP must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQRIDN: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQRIDN",
      validate: {
        len: {
          args: [0, 10],
          msg: "OQRIDN must be 0-10 digits long",
        },
      },
    },
    OQEDES: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQEDES",
      validate: {
        len: {
          args: [0, 10],
          msg: "OQEDES must be 0-10 digits long",
        },
      },
    },

    OQNEWE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQNEWE",
      validate: {
        len: {
          args: [0, 9],
          msg: "Net Weight must be 0-9 digits long",
        },
        isNumeric: {
          msg: "Net Weight must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQGRWE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQGRWE",
      validate: {
        len: {
          args: [0, 9],
          msg: "Gross Weight must be 0-9 digits long",
        },
        isNumeric: {
          msg: "Gross Weight must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQTIZO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQTIZO",
      validate: {
        len: {
          args: [0, 5],
          msg: "OQTIZO must be 0-5 digits long",
        },
      },
    },
    OQDTDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDTDT",
      validate: {
        isNumeric: {
          msg: "OQDTDT must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("OQDTDT must be exactly 8 digits");
          }
        },
      },
    },
    OQDOCR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDOCR",
      validate: {
        len: {
          args: [0, 1],
          msg: "OQDOCR must be 0-1 digits long",
        },
        isNumeric: {
          msg: "OQDOCR must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQDOCE: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQDOCE",
      validate: {
        len: {
          args: [0, 1],
          msg: "OQDOCE must be 0-1 digits long",
        },
        isNumeric: {
          msg: "OQDOCE must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQDEWD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDEWD",
      validate: {
        len: {
          args: [0, 1],
          msg: "OQDEWD must be 0-1 digits long",
        },
      },
    },
    OQSEEQ: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQSEEQ",
      validate: {
        len: {
          args: [0, 2],
          msg: "OQSEEQ must be 0-2 digits long",
        },
        isNumeric: {
          msg: "OQSEEQ must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQIVSS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQIVSS",
      validate: {
        len: {
          args: [0, 1],
          msg: "OQIVSS must be 0-1 digits long",
        },
        isNumeric: {
          msg: "OQIVSS must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQPRIO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQPRIO",
      validate: {
        len: {
          args: [0, 1],
          msg: "OQPRIO must be 0-1 digits long",
        },
        isNumeric: {
          msg: "OQPRIO must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQCSCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQCSCD",
      validate: {
        len: {
          args: [0, 3],
          msg: "OQCSCD must be 0-3 digits long",
        },
      },
    },
    OQAGKY: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQAGKY",
      validate: {
        len: {
          args: [0, 60],
          msg: "OQAGKY must be 0-60 digits long",
        },
      },
    },
    OQRGDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQRGDT",
      validate: {
        isNumeric: {
          msg: "OQRGDT must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("OQRGDT must be exactly 8 digits");
          }
        },
      },
    },
    OQRGTM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQRGTM",
      validate: {
        isNumeric: {
          msg: "OQRGTM must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 6) {
            throw new Error("OQRGTM must be exactly 6 digits");
          }
        },
      },
    },
    OQLMDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQLMDT",
      validate: {
        isNumeric: {
          msg: "OQLMDT must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("OQLMDT must be exactly 8 digits");
          }
        },
      },
    },
    OQCHNO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQCHNO",
      validate: {
        len: {
          args: [0, 3],
          msg: "OQCHNO must be 0-3 digits long",
        },
        isNumeric: {
          msg: "OQCHNO must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQCHID",
      validate: {
        len: {
          args: [0, 10],
          msg: "OQCHID must be 0-10 digits long",
        },
      },
    },
    OQSCES: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQSCES",
      validate: {
        len: {
          args: [0, 2],
          msg: "OQSCES must be 0-2 digits long",
        },
      },
    },
    OQLMTS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQLMTS",
      validate: {
        len: {
          args: [0, 18],
          msg: "OQLMTS must be 0-18 digits long",
        },
        isNumeric: {
          msg: "OQLMTS must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQDSHM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDSHM",
      validate: {
        len: {
          args: [0, 4],
          msg: "OQDSHM must be 0-4 digits long",
        },
        isNumeric: {
          msg: "OQDSHM must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQSROD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQSROD",
      validate: {
        len: {
          args: [0, 3],
          msg: "OQSROD must be 0-3 digits long",
        },
        isNumeric: {
          msg: "OQSROD must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQRODN: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQRODN",
      validate: {
        len: {
          args: [0, 3],
          msg: "OQRODN must be 0-3 digits long",
        },
        isNumeric: {
          msg: "OQRODN must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OQMODL: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQMODL",
      validate: {
        len: {
          args: [0, 3],
          msg: "OQMODL must be 0-3 digits long",
        },
      },
    },
    OQMODF: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQMODF",
      validate: {
        len: {
          args: [0, 3],
          msg: "OQMODF must be 0-3 digits long",
        },
      },
    },
    OQTEDL: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQTEDL",
      validate: {
        len: {
          args: [0, 3],
          msg: "OQTEDL must be 0-3 digits long",
        },
      },
    },
    OQTEDF: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQTEDF",
      validate: {
        len: {
          args: [0, 3],
          msg: "OQTEDF must be 0-3 digits long",
        },
      },
    },
    OQPGRS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQPGRS",
      validate: {
        len: {
          args: [0, 2],
          msg: "OQPGRS must be 0-2 digits long",
        },
      },
    },
    OQPIST: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQPIST",
      validate: {
        len: {
          args: [0, 2],
          msg: "OQPIST must be 0-2 digits long",
        },
      },
    },
    OQECAR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQECAR",
      validate: {
        len: {
          args: [0, 2],
          msg: "OQECAR must be 0-2 digits long",
        },
      },
    },
    OQPONO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQPONO",
      validate: {
        len: {
          args: [0, 10],
          msg: "OQPONO must be 0-10 digits long",
        },
      },
    },
    OQULZO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQULZO",
      validate: {
        len: {
          args: [0, 5],
          msg: "OQULZO must be 0-5 digits long",
        },
      },
    },
    OQFWNS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQFWNS",
      validate: {
        len: {
          args: [0, 10],
          msg: "OQULZO must be 0-10 digits long",
        },
      },
    },
    OQFWNO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQFWNO",
      validate: {
        len: {
          args: [0, 10],
          msg: "OQFWNO must be 0-10 digits long",
        },
      },
    },
    OQIRST: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQIRST",
      validate: {
        len: {
          args: [0, 2],
          msg: "OQIRST must be 0-2 digits long",
        },
      },
    },
    OQSROT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQSROT",
      validate: {
        len: {
          args: [0, 6],
          msg: "OQSROT must be 0-6 digits long",
        },
      },
    },
    OQDTHM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDTHM",
    },
    OQCUCL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQCUCL",
    },
    OQRLFA: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQRLFA",
    },
    OQRLTD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQRLTD",
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

module.exports = { DeliveryHead, DeliveryLine };
