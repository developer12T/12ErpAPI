const { Warehouse } = require('../models/master')
const errorEndpoint = require('../middleware/errorEndpoint')
// const { trimObjectStrings } = require("../utils/String");
const path = require('path')
const currentFilePath = path.basename(__filename)
const { Op } = require('sequelize')

exports.fetchArea = async warehouseCode => {
  try {
    // const { warehouseCode } = req.body
    const WarehouseData = await Warehouse.findOne({
      where: {
        coNo: 410,
        warehouse: warehouseCode
      }
    })
    const areaData = {
      coNo: WarehouseData.coNo,
      warehouse: WarehouseData.warehouseName,
      area: String(WarehouseData.warehouseName).slice(0, 5)
    }

    return areaData
  } catch (error) {
    // Enhanced error handling
    throw errorEndpoint(currentFilePath, 'fetchArea', error)
  }
}

exports.getArea = async (req, res, next) => {
  try {
    const { warehouseCode } = req.body
    const WarehouseData = await Warehouse.findOne({
      where: {
        coNo: 410,
        warehouse: warehouseCode
      }
    })

    const areaData = {
      coNo: WarehouseData.coNo,
      warehouse: WarehouseData.warehouse,
      area: String(WarehouseData.warehouseName).slice(0, 5)
    }
    if (areaData) {
      res.status(200).json(areaData)
    } else {
      const error = new Error('Not Found Area')
      error.statusCode = 404
      throw error
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, 'getArea', error)
  }
}

exports.fetchWareHose = async areaCode => {
  try {
    const WarehouseData = await Warehouse.findOne({
      where: {
        coNo: 410,
        warehouseName: {
          [Op.like]: `${areaCode}%`
        }
      }
    })
    const areaData = {
      coNo: WarehouseData.coNo,
      warehouse: WarehouseData.warehouse,
      area: String(WarehouseData.warehouseName).slice(0, 5)
    }
    return areaData
  } catch (error) {
    throw errorEndpoint(currentFilePath, 'fetchWareHose', error)
  }
}

exports.getWareHose = async (req, res, next) => {
  try {
    const { areaCode } = req.body
    const WarehouseData = await Warehouse.findOne({
      where: {
        coNo: 410,
        warehouseName: {
          [Op.like]: `${areaCode}%`
        }
      }
    })
    if (WarehouseData) {
      const areaData = {
        coNo: WarehouseData.coNo,
        warehouse: WarehouseData.warehouse,
        area: String(WarehouseData.warehouseName).slice(0, 5)
      }
      res.status(200).json(areaData)
    } else {
      const error = new Error('Not Found Area')
      error.statusCode = 404
      throw error
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, 'getWareHose', error)
  }
}
