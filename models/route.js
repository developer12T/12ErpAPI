const { sequelize, DataTypes } = require("../config/m3db");

const DRODPR = sequelize.define(
  "DRODPR",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "DOCONO",
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "DOEDES",
    },
    DOOBV1: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull: false,
      field: "DOOBV1",
    },
    routeCode: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull: false,
      field: "DOROUT",
    },
    forwarding: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "DOFWNO",
    },
    transportation: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "DOTRCA",
    },
    routeDeparture: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "DORODN",
    },
    departureDay: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "DODDOW",
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

const DROUDI = sequelize.define(
  "DROUDI",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,

      field: "DSCONO",
    },
    routeCode: {
      type: DataTypes.STRING,
      primaryKey:true,
      allowNull: false,
      field: "DSROUT",
    },
    DSRODN: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      field: "DSRODN",
    },
    DSDETH: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "DSDETH",
    },
    DSDETM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "DSDETM",
    },
    method: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "DSMMDL",
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

const DROUTE = sequelize.define(
  "DROUTE",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "DRCONO",
    },
    DRRUTP: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      field: "DRRUTP",
    },
    routeCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      field: "DRROUT",
    },
    routeName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "DRTX40",
    },
    DRTX15: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "DRTX15",
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

module.exports = {
  DRODPR,
  DROUDI,
  DROUTE,
};
