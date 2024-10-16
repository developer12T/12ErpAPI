const { sequelize, DataTypes } = require('../config/m3db')

const Order = sequelize.define(
  'OOHEAD',
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'OACONO',
      validate: {
        isNumeric: true
      }
    },
    OADIVI: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'OADIVI',
      validate: {
        isLenghtRequired (value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error('OADIVI must be exactly 3 digits')
          }
        }
      }
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'OAORNO',
      validate: {
        len: {
          args: [0, 10],
          msg: 'Order No must be 0-10 digits long'
        }
      }
    },
    orderType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAORTP',
      validate: {
        isLenghtRequired (value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error('Order Type must be exactly 3 digits')
          }
        }
      }
    },
    OAFACI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAFACI',
      validate: {
        isLenghtRequired (value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error('OAFACI must be exactly 3 digits')
          }
        }
      }
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAWHLO',
      validate: {
        isLenghtRequired (value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error('Warehouse must be exactly 3 digits')
          }
        }
      }
    },
    requestDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'OARLDT',
      validate: {
        isNumeric: {
          msg: 'Request Date must contain only numbers' // Ensure the value is numeric
        },
        isLenghtRequired (value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error('requestDate must be exactly 8 digits')
          }
        }
      }
    },
    customerNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OACUNO',
      validate: {
        len: {
          args: [0, 10],
          msg: 'Customer No must be 0-10 digits long'
        }
      }
    },
    orderDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'OAORDT',
      validate: {
        isNumeric: {
          msg: 'Order Date must contain only numbers' // Ensure the value is numeric
        },
        isLenghtRequired (value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error('Order Date must be exactly 8 digits')
          }
        }
      }
    },
    orderStatusLow: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAORSL',
      validate: {
        isNumeric: {
          msg: 'Order Status Low must contain only numbers' // Ensure the value is numeric
        },
        isLenghtRequired (value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 2) {
            throw new Error('Order Status Low must be exactly 2 digits')
          }
        }
      }
    },
    orderStatusHigh: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAORST',
      validate: {
        isNumeric: {
          msg: 'Order Status High must contain only numbers' // Ensure the value is numeric
        },
        isLenghtRequired (value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 2) {
            throw new Error('Order Status High must be exactly 2 digits')
          }
        }
      }
    },
    addressID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAADID',
      validate: {
        len: {
          args: [0, 6],
          msg: 'Address ID must be 0-6 digits long'
        }
      }
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'OABRLA',
      validate: {
        len: {
          args: [0, 15],
          msg: 'Total must be 0-15 digits long'
        }
      }
    },
    totalNet: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'OANTLA',
      validate: {
        len: {
          args: [0, 15],
          msg: 'Total net must be 0-15 digits long'
        }
      }
    },
    OAFRE1: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAFRE1',
      validate: {
        len: {
          args: [0, 5],
          msg: 'OAFRE1 must be 0-5 digits long'
        }
      }
    },
    OADISY: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OADISY',
      validate: {
        len: {
          args: [0, 10],
          msg: 'OADISY must be 0-10 digits long'
        }
      }
    },
    OARLDZ: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OARLDZ',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 8) {
          throw new Error('OARLDZ must be exactly 8 digits')
        }
      }
    },
    OATIZO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OATIZO',
      validate: {
        len: {
          args: [0, 5],
          msg: 'OATIZO must be 0-10 digits long'
        }
      }
    },
    OAOPRI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAOPRI',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 1) {
          throw new Error('OAOPRI must be exactly 1 digits')
        }
      }
    },
    OAAICD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAAICD',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 1) {
          throw new Error('OAAICD must be exactly 1 digits')
        }
      }
    },
    OAOT38: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAOT38',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 1) {
          throw new Error('OAOT38 must be exactly 1 digits')
        }
      }
    },
    OALNCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OALNCD',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 2) {
          throw new Error('OAOT38 must be exactly 2 digits')
        }
      }
    },
    OATEPY: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OATEPY',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 3) {
          throw new Error('OATEPY must be exactly 2 digits')
        }
      }
    },
    OAPYCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAPYCD',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 3) {
          throw new Error('OAPYCD must be exactly 3 digits')
        }
      }
    },
    OAMODL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAMODL',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 3) {
          throw new Error('OAMODL must be exactly 3 digits')
        }
      }
    },
    OATEDL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OATEDL',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 3) {
          throw new Error('OATEDL must be exactly 3 digits')
        }
      }
    },
    OASMCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OASMCD',
      validate: {
        len: {
          args: [0, 10],
          msg: 'Sale Code must be 0-10 digits long'
        }
      }
    },
    OAOREF: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAOREF',
      validate: {
        len: {
          args: [0, 30],
          msg: 'Reference must be 0-30 digits long'
        }
      }
    },
    OAYREF: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAYREF',
      validate: {
        len: {
          args: [0, 30],
          msg: 'Note must be 0-30 digits long'
        }
      }
    },
    OAVRCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAVRCD',
      validate: {
        len: {
          args: [0, 2],
          msg: 'OAVRCD must be 0-2 digits long'
        }
      }
    },
    OAPYNO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAPYNO',
      validate: {
        len: {
          args: [0, 10],
          msg: 'OAPYNO must be 0-10 digits long'
        }
      }
    },
    OAINRC: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAINRC',
      validate: {
        len: {
          args: [0, 10],
          msg: 'OAINRC must be 0-10 digits long'
        }
      }
    },
    OATINC: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OATINC',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 1) {
          throw new Error('OATINC must be exactly 1 digits')
        }
      }
    },
    OALOCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OALOCD',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 3) {
          throw new Error('OALOCD must be exactly 3 digits')
        }
      }
    },
    OACUCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OACUCD',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 3) {
          throw new Error('OACUCD must be exactly 3 digits')
        }
      }
    },
    OADCCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OADCCD',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 1) {
          throw new Error('OADCCD must be exactly 1 digits')
        }
      }
    },
    OACRTP: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OACRTP',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 2) {
          throw new Error('OADCCD must be exactly 2 digits')
        }
      }
    },
    OADMCU: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OADMCU',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 1) {
          throw new Error('OADMCU must be exactly 1 digits')
        }
      }
    },
    OAFDED: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAFDED',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 8) {
          throw new Error('OAFDED must be exactly 8 digits')
        }
      }
    },
    OALDED: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OALDED',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 8) {
          throw new Error('OALDED must be exactly 8 digits')
        }
      }
    },
    OARESP: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OARESP',
      validate: {
        len: {
          args: [0, 10],
          msg: 'OARESP must be 0-10 digits long'
        }
      }
    },
    OABLRO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OABLRO',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OABLRO must be 0-15 digits long'
        }
      }
    },
    OACOAM: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OACOAM',
      validate: {
        len: {
          args: [0, 17],
          msg: 'OACOAM must be 0-17 digits long'
        }
      }
    },
    OABRAM: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OABRAM',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OACOAM must be 0-15 digits long'
        }
      }
    },
    OATXAP: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OATXAP',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 1) {
          throw new Error('OATXAP must be exactly 1 digits')
        }
      }
    },
    OACHNO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OACHNO',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 3) {
          throw new Error('OACHNO must be exactly 3 digits')
        }
      }
    },
    OADECU: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OADECU',
      validate: {
        len: {
          args: [0, 10],
          msg: 'OADECU must be 0-10 digits long'
        }
      }
    },
    OARGDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OARGDT',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 8) {
          throw new Error('OARGDT must be exactly 8 digits')
        }
      }
    },
    OARGTM: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OARGTM',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 6) {
          throw new Error('OARGTM must be exactly 6 digits')
        }
      }
    },
    OALMDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OALMDT',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 8) {
          throw new Error('OALMDT must be exactly 8 digits')
        }
      }
    },
    OACHID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OACHID',
      validate: {
        len: {
          args: [0, 10],
          msg: 'OACHID must be 0-10 digits long'
        }
      }
    },
    OALMTS: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OALMTS',
      validate: {
        len: {
          args: [0, 18],
          msg: 'OACHID must be 0-18 digits long'
        }
      }
    },

    totalVat: {
      type: DataTypes.VIRTUAL,
      get () {
        return Number(
          Math.round(
            (Math.round((this.totalNet - this.totalNet / 1.07) * 10000) /
              10000) *
              100
          ) / 100
        )
      },
      set (value) {
        throw new Error('Do not try to set the `totalVat` value!')
      }
    },
    totalDiscount: {
      type: DataTypes.VIRTUAL,
      get () {
        return Number(Math.round((this.total - this.totalNet) * 100) / 100)
      },
      set (value) {
        throw new Error('Do not try to set the `totalDiscount` value!')
      }
    },
    totalNonVat: {
      type: DataTypes.VIRTUAL,
      get () {
        return Number(
          Math.round(
            (Math.round((this.totalNet - this.totalVat) * 10000) / 10000) * 100
          ) / 100
        )
      },
      set (value) {
        throw new Error('Do not try to set the `totalNonVat` value!')
      }
    },
    grossWeight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'OAGRWE',
      validate: {
        len: {
          args: [0, 9],
          msg: 'Gross Weight must be 0-9 digits long'
        }
      }
    },
    netWeight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'OANEWE',
      validate: {
        len: {
          args: [0, 9],
          msg: 'Net Weight must be 0-9 digits long'
        }
      }
    },
    OANTAM: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'OANTAM'
      // validate: {
      //   len: {
      //     args: [0, 9],
      //     msg: 'Net Weight must be 0-9 digits long'
      //   }
      // }
    },
    OACUDT: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'OACUDT',
      isLenghtRequired (value) {
        // Custom validator to ensure exactly 8 digits
        if (value.toString().length !== 8) {
          throw new Error('OACUDT must be exactly 8 digits')
        }
      }
    },
    OAPLTB: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OAPLTB'
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
)

const OrderLine = sequelize.define(
  'OOLINE',
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'OBCONO',
      isLenghtRequired (value) {
        if (value.toString().length !== 3) {
          throw new Error('Company No must be exactly 3 digits')
        }
      }
    },
    OBDIVI: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'OBDIVI',
      isLenghtRequired (value) {
        if (value.toString().length !== 3) {
          throw new Error('OBDIVI must be exactly 3 digits')
        }
      }
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'OBORNO',
      validate: {
        len: {
          args: [0, 10],
          msg: 'Order No must be 0-10 digits long'
        }
      }
    },
    itemNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'OBPONR',
      validate: {
        len: {
          args: [1, 5],
          msg: 'Order No must be 1-5 digits long'
        }
      }
    },
    orderStatusLow: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBORST',
      isLenghtRequired (value) {
        if (value.toString().length !== 2) {
          throw new Error('OBDIVI must be exactly 2 digits')
        }
      }
    },
    OBFACI: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBFACI',
      isLenghtRequired (value) {
        if (value.toString().length !== 3) {
          throw new Error('OBFACI must be exactly 3 digits')
        }
      }
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBWHLO',
      isLenghtRequired (value) {
        if (value.toString().length !== 3) {
          throw new Error('Warehouse must be exactly 3 digits')
        }
      }
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'OBITNO',
      validate: {
        len: {
          args: [1, 15],
          msg: 'Item Code must be 1-15 digits long'
        }
      }
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBTEDS',
      validate: {
        len: {
          args: [1, 60],
          msg: 'Item Name must be 1-60 digits long'
        }
      }
    },
    OBITDS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBITDS',
      validate: {
        len: {
          args: [1, 30],
          msg: 'OBITDS must be 1-30 digits long'
        }
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBORQA',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OBORQA must be 0-15 digits long'
        }
      }
    },
    qtyQT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBORQT',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OBORQT must be 0-15 digits long'
        }
      }
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBALUN',
      isLenghtRequired (value) {
        if (value.toString().length !== 3) {
          throw new Error('Unit must be exactly 3 digits')
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBSAPR',
      validate: {
        len: {
          args: [0, 15],
          msg: 'Item Price must be 0-15 digits long'
        }
      }
    },
    OBDIA1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBDIA1',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OBDIA1 must be 0-15 digits long'
        }
      }
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBDIA2',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OBDIA2 must be 0-15 digits long'
        }
      }
    },
    OBDIA3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBDIA3',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OBDIA3 must be 0-15 digits long'
        }
      }
    },
    OBDIA4: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBDIA4',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OBDIA4 must be 0-15 digits long'
        }
      }
    },
    OBDIA5: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBDIA5',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OBDIA5 must be 0-15 digits long'
        }
      }
    },
    OBDIA6: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBDIA6',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OBDIA6 must be 0-15 digits long'
        }
      }
    },
    netPrice: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBNEPR',
      validate: {
        len: {
          args: [0, 17],
          msg: 'Item Net Price must be 0-17 digits long'
        }
      }
    },
    total: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBLNA2',
      validate: {
        len: {
          args: [0, 15],
          msg: 'Item Total must be 0-15 digits long'
        }
      }
    },
    promotionCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBPIDE',
      validate: {
        len: {
          args: [0, 4],
          msg: 'Item Promotion must be 0-4 digits long'
        }
      }
    },
    OBPLDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBPLDT',
      isLenghtRequired (value) {
        if (value.toString().length !== 8) {
          throw new Error('OBPLDT must be exactly 8 digits')
        }
      }
    },
    OBPLHM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBPLHM',
      isLenghtRequired (value) {
        if (value.toString().length !== 4) {
          throw new Error('OBPLDT must be exactly 4 digits')
        }
      }
    },

    OBPRIO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBPRIO',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBPRIO must be exactly 1 digits')
        }
      }
    },
    OBIVQA: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBIVQA',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OBIVQA must be 0-15 digits long'
        }
      }
    },
    OBATPR: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBATPR',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBATPR must be exactly 1 digits')
        }
      }
    },
    OBMODL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBMODL',
      validate: {
        len: {
          args: [0, 3],
          msg: 'OBMODL must be 0-3 digits long'
        }
      }
    },
    OBTEDL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBTEDL',
      validate: {
        len: {
          args: [0, 3],
          msg: 'OBTEDL must be 0-3 digits long'
        }
      }
    },
    OBRGDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBRGDT',
      isLenghtRequired (value) {
        if (value.toString().length !== 8) {
          throw new Error('OBRGDT must be exactly 8 digits')
        }
      }
    },
    OBRGTM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBRGTM',
      isLenghtRequired (value) {
        if (value.toString().length !== 6) {
          throw new Error('OBRGTM must be exactly 6 digits')
        }
      }
    },
    OBLMDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBLMDT',
      isLenghtRequired (value) {
        if (value.toString().length !== 8) {
          throw new Error('OBLMDT must be exactly 8 digits')
        }
      }
    },
    OBCHNO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBCHNO',
      isLenghtRequired (value) {
        if (value.toString().length !== 3) {
          throw new Error('OBCHNO must be exactly 3 digits')
        }
      }
    },
    OBCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBCHID',
      validate: {
        len: {
          args: [0, 10],
          msg: 'OBTEDL must be 0-10 digits long'
        }
      }
    },
    OBLMTS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBLMTS',
      validate: {
        len: {
          args: [0, 18],
          msg: 'OBTEDL must be 0-18 digits long'
        }
      }
    },
    OBORCO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBORCO',
      validate: {
        len: {
          args: [0, 3],
          msg: 'OBORCO must be 0-3 digits long'
        }
      }
    },
    OBLNAM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBLNAM',
      validate: {
        isNumeric: {
          msg: 'OBLNAM must contain only numbers' // Ensure the value is numeric
        },
        len: {
          args: [0, 15],
          msg: 'OBLNAM must be 0-15 digits long'
        }
      }
    },
    OBUCOS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBUCOS',
      validate: {
        isNumeric: {
          msg: 'OBUCOS must contain only numbers' // Ensure the value is numeric
        },
        len: {
          args: [0, 17],
          msg: 'OBUCOS must be 0-17 digits long'
        }
      }
    },
    OBCOFA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBCOFA',
      validate: {
        isNumeric: {
          msg: 'requestDate must contain only numbers' // Ensure the value is numeric
        },
        len: {
          args: [0, 15],
          msg: 'OBCOFA must be 0-15 digits long'
        }
      }
    },
    OBACRF: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBACRF',
      validate: {
        len: {
          args: [0, 8],
          msg: 'OBORCO must be 0-8 digits long'
        }
      }
    },
    OBDWDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDWDT',
      isLenghtRequired (value) {
        if (value.toString().length !== 8) {
          throw new Error('OBDWDT must be exactly 8 digits')
        }
      }
    },
    OBCODT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBCODT',
      isLenghtRequired (value) {
        if (value.toString().length !== 8) {
          throw new Error('OBCODT must be exactly 8 digits')
        }
      }
    },
    OBCOHM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBCOHM',

      isLenghtRequired (value) {
        if (value.toString().length !== 4) {
          throw new Error('OBCOHM must be exactly 4 digits')
        }
      }
    },
    OBDWDZ: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDWDZ',
      isLenghtRequired (value) {
        if (value.toString().length !== 8) {
          throw new Error('OBDWDZ must be exactly 8 digits')
        }
      }
    },
    OBCODZ: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBCODZ',
      isLenghtRequired (value) {
        if (value.toString().length !== 8) {
          throw new Error('OBCODZ must be exactly 8 digits')
        }
      }
    },
    OBTIZO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBTIZO',
      validate: {
        len: {
          args: [0, 5],
          msg: 'OBORCO must be 0-5 digits long'
        }
      }
    },
    OBSTCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBSTCD',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBSTCD must be exactly 1 digits')
        }
      }
    },
    OBCOCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBCOCD',
      validate: {
        len: {
          args: [0, 5],
          msg: 'OBCOCD must be 0-5 digits long'
        }
      }
    },
    OBUCCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBUCCD',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBUCCD must be exactly 1 digits')
        }
      }
    },
    OBVTCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBVTCD',
      isLenghtRequired (value) {
        if (value.toString().length !== 2) {
          throw new Error('OBVTCD must be exactly 2 digits')
        }
      }
    },
    OBSMCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBSMCD',
      validate: {
        len: {
          args: [1, 10],
          msg: 'Item Sale Code must be 1-10 digits long'
        }
      }
    },
    OBCUNO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBCUNO',
      validate: {
        len: {
          args: [1, 10],
          msg: 'Item Customer No must be 1-10 digits long'
        }
      }
    },
    OBADID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBADID',
      validate: {
        len: {
          args: [1, 6],
          msg: 'Item Address ID must be 1-6 digits long'
        }
      }
    },
    OBROUT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBROUT',
      validate: {
        len: {
          args: [0, 6],
          msg: 'OBROUT must be 0-6 digits long'
        }
      }
    },
    OBRODN: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBRODN',
      validate: {
        len: {
          args: [0, 3],
          msg: 'OBROUT must be 0-3 digits long'
        }
      }
    },
    OBDSDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDSDT',
      isLenghtRequired (value) {
        if (value.toString().length !== 8) {
          throw new Error('OBDSDT must be exactly 8 digits')
        }
      }
    },
    OBDSHM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDSHM',
      isLenghtRequired (value) {
        if (value.toString().length !== 4) {
          throw new Error('OBDSHM must be exactly 4 digits')
        }
      }
    },
    OBFDED: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBFDED',
      isLenghtRequired (value) {
        if (value.toString().length !== 8) {
          throw new Error('OBFDED must be exactly 8 digits')
        }
      }
    },
    OBLDED: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBLDED',
      isLenghtRequired (value) {
        if (value.toString().length !== 8) {
          throw new Error('OBLDED must be exactly 8 digits')
        }
      }
    },
    OBCINA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBCINA',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBCINA must be exactly 1 digits')
        }
      }
    },
    OBDECU: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDECU',
      validate: {
        len: {
          args: [0, 10],
          msg: 'OBDECU must be 0-10 digits long'
        }
      }
    },
    OBTEPY: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBTEPY',
      isLenghtRequired (value) {
        if (value.toString().length !== 3) {
          throw new Error('OBTEPY must be exactly 3 digits')
        }
      }
    },
    OBPMOR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBPMOR',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBPMOR must be exactly 1 digits')
        }
      }
    },
    OBUPAV: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBUPAV',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBUPAV must be exactly 1 digits')
        }
      }
    },
    OBSPUN: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBSPUN',
      isLenghtRequired (value) {
        if (value.toString().length !== 3) {
          throw new Error('OBSPUN must be exactly 3 digits')
        }
      }
    },
    OBPRMO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBPRMO',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBPRMO must be exactly 1 digits')
        }
      }
    },
    OBDIC1: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDIC1',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBDIC1 must be exactly 1 digits')
        }
      }
    },
    OBDIC2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDIC2',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBDIC2 must be exactly 1 digits')
        }
      }
    },
    OBDIC3: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDIC3',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBDIC3 must be exactly 1 digits')
        }
      }
    },
    OBDIC4: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDIC4',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBDIC4 must be exactly 1 digits')
        }
      }
    },
    OBDIC5: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDIC5',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBDIC5 must be exactly 1 digits')
        }
      }
    },
    OBDIC6: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDIC6',

      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBDIC6 must be exactly 1 digits')
        }
      }
    },
    OBCMP5: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBCMP5',
      validate: {
        len: {
          args: [0, 4],
          msg: 'OBCMP5 must be 0-4 digits long'
        }
      }
    },
    OBDIBE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDIBE',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBDIBE must be exactly 1 digits')
        }
      }
    },
    OBDIRE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDIRE',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBDIRE must be exactly 1 digits')
        }
      }
    },
    OBDDSU: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDDSU',
      isLenghtRequired (value) {
        if (value.toString().length !== 1) {
          throw new Error('OBDDSU must be exactly 1 digits')
        }
      }
    },
    OBRNQT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBRNQT',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OBRNQT must be 0-15 digits long'
        }
      }
    },
    OBRNQA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBRNQA',
      validate: {
        len: {
          args: [0, 15],
          msg: 'OBRNQA must be 0-15 digits long'
        }
      }
    },
    OBBANO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OBBANO',
      validate: {
        len: {
          args: [0, 20],
          msg: 'OBBANO must be 0-15 digits long'
        }
      }
    },
    OBPCOF: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBPCOF'
    },
    OBDCCS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDCCS'
    },
    OBCOFS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBCOFS'
    },
    OBDMCF: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDMCF'
    },
    OBDMCS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OBDMCS'
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
)

module.exports = { Order, OrderLine }
