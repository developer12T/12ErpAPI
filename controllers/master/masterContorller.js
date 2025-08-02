// Models
const {
  ItemFac,
  ItemMaster,
  Warehouse,
  Policy,
  OOTYPE,
  MGTYPE,
  ItemUnit,
  OODFLT
} = require('../../models/master')

const { OrderLine } = require('../../models/order')

const {
  NumberSeries,
  NumberSeriesInvoice
} = require('../../models/runningnumber')
const MoveMent = require('../../models/transection')
// Utils
const { trimObjectStrings } = require('../../utils/String')

const { Sequelize, Op } = require('sequelize')

exports.getCalWeight = async (req, res, next) => {
  try {
    const { itemCode, qty } = req.body
    let itemData = await ItemMaster.findOne({
      where: {
        itemCode: itemCode
      }
    })
    itemData = {
      itemCode: itemData.itemCode.trim(),
      status: itemData.status,
      netWeight: Number(Number(itemData.netWeight * qty).toFixed(3)),
      grossWeight: Number(Number(itemData.grossWeight * qty).toFixed(3))
    }
    res.json(itemData)
  } catch (error) {
    next(error)
  }
}

exports.getCalCost = async (req, res, next) => {
  try {
    const { itemCode, qty } = req.body
    let itemData = await ItemFac.findOne({
      where: {
        itemCode: itemCode,
        coNo: 410
      }
    })
    itemData = {
      itemCode: itemData.itemCode.trim(),
      cost: Number(Number(itemData.cost * qty).toFixed(6))
    }
    res.json(itemData)
  } catch (error) {
    next(error)
  }
}

exports.getRunningNumber = async (req, res, next) => {
  try {
    const { series, seriesType, coNo } = req.body
    const result = await NumberSeries.findOne({
      where: {
        coNo: coNo,
        series: series,
        seriesType: seriesType
      }
    })
    res.json(result)
  } catch (error) {
    next(error)
  }
}

exports.getRunningNumberInvoice = async (req, res, next) => {
  try {
    const { series, year, coNo } = req.body
    const result = await NumberSeriesInvoice.findAll({
      attributes: {
        exclude: ['id']
      },
      where: {
        coNo: coNo,
        series: series,
        year: year
      }
    })
    const numberInvoice = result.map(number => {
      const prefix = number.prefix.trim()
      return {
        coNo: number.coNo,
        series: number.series,
        prefix: prefix,
        seriesName: number.seriesName,
        year: number.year,
        startNo: number.startNo,
        finalNo: number.finalNo,
        lastNo: parseInt(`${prefix}${number.lastNo}`)
      }
    })
    res.json(numberInvoice)
  } catch (error) {
    next(error)
  }
}

exports.postUpdateRunningNumber = async (req, res, next) => {
  try {
    const { coNo, lastNo, seriesType, series } = req.body
    const update = await NumberSeries.update(
      { lastNo: lastNo },
      {
        attributes: { exclude: ['id'] },
        where: {
          coNo: coNo,
          series: series,
          seriesType: seriesType
        }
      }
    )
    res.json(update)
  } catch (error) {
    next(error)
  }
}

exports.postUpdateRunningNumberInvoice = async (req, res, next) => {
  try {
    const { coNo, lastNo, year, series } = req.body
    const update = await NumberSeriesInvoice.update(
      { lastNo: lastNo },
      {
        where: {
          coNo: coNo,
          series: series,
          year: year
        }
      }
    )
    res.json(update)
  } catch (error) {
    next(error)
  }
}

exports.getWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findAll({
      where: {
        coNo: 410
      }
    })
    res.json(warehouse)
  } catch (error) {
    next(error)
  }
}

exports.getPolicy = async (req, res, next) => {
  try {
    const { orderType } = req.body
    const policy = await OOTYPE.findOne({
      where: {
        OOORTP: orderType
      }
    })

    const results = await Policy.findOne({
      where: {
        EDDPOL: policy.OODPOL,
        coNo: 410
      }
    })

    if (results) {
      const response = trimObjectStrings(results.toJSON())
      res.status(200).json(response)
    } else {
      const error = new Error('Not Found Address')
      error.statusCode = 404
      throw error
    }
  } catch (error) {
    next(error)
  }
}

exports.getDistributionpolicy = async (req, res, next) => {
  try {
    const { mgType } = req.body
    const policy = await MGTYPE.findOne({
      where: {
        YXTRTP: mgType,
        YXCONO: 410
      }
    })
    res.status(200).json(policy)
  } catch (error) {
    next(error)
  }
}

exports.getOrdertype = async (req, res, next) => {
  try {
    const { orderType } = req.body
    const response = await OOTYPE.findOne({
      where: {
        OOORTP: orderType
      }
    })

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

exports.getItemAll = async (req, res, next) => {
  try {
    const itemData = await ItemMaster.findAll({
      where: {
        coNo: 410
      }
    })
    const response = itemData.map(item => trimObjectStrings(item.toJSON()))
    res.json(response)
  } catch (error) {
    next(error)
  }
}

exports.getTransectionLot = async (req, res, next) => {
  try {
    const { towarehouse, orderId, itemCode } = req.body
    const itemData = await MoveMent.findOne({
      where: {
        coNo: 410,
        towarehouse: towarehouse,
        itemCode: itemCode,
        orderId: orderId
      }
    })
    // const response = itemData.map(item => trimObjectStrings(item.toJSON()))
    res.json(itemData)
  } catch (error) {
    next(error)
  }
}

exports.getItemDetails = async (req, res, next) => {
  try {
    const itemFacObj = {}
    let unitarr = []
    let { itemCode } = req.body
    const maxUnitfactor = await ItemUnit.max('factor', {
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1
      }
    })
    const maxUnitData = await ItemUnit.findOne({
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1,
        factor: maxUnitfactor
      }
    })
    const minUnitfactor = await ItemUnit.min('factor', {
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1
      }
    })

    const minUnitData = await ItemUnit.findOne({
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1,
        factor: minUnitfactor
      }
    })

    const itemData = await ItemMaster.findAll({
      where: {
        coNo: 410,
        itemCode: itemCode
      }
    })

    // Gather itemCode values to make a batch request
    itemCode = itemData.map(item => item.itemCode.trim())
    const facDatas = await ItemFac.findAll({
      where: {
        coNo: 410,
        itemCode: itemCode
      }
    })

    const facData = facDatas.map(item => {
      const itemCode = item.itemCode.trim()
      return {
        itemCode: itemCode,
        M9FACI: item.M9FACI,
        cost: item.cost
      }
    })

    facData.forEach(fac => {
      itemFacObj[fac.itemCode] = fac.cost
    })

    for (let i = 0; i < itemData.length; i++) {
      const itemUnitData = await ItemUnit.findAll({
        where: { itemCode: itemData[i].itemCode, coNo: 410, facType: 1 }
        // group: ["MMFUDS"],
      })
      for (let j = 0; j < itemUnitData.length; j++) {
        unitarr.push({
          facType: itemUnitData[j].facType,
          factor: itemUnitData[j].factor,
          unit: itemUnitData[j].unit
        })
      }
    }

    const items = itemData.map(item => {
      const itemCode = item.itemCode.trim()
      const itemName = item.itemName.trim()
      const itemDescription = item.itemDescription.trim()
      const itemType = item.itemType.trim()
      const MMITGR = item.MMITGR.trim()
      const itemClass = item.itemClass.trim()
      const itemGroup = item.itemGroup.trim()
      const cost = itemFacObj[itemCode] || 0
      return {
        coNo: item.coNo,
        itemCode: itemCode,
        status: item.status,
        itemName: itemName,
        itemDescription: itemDescription,
        MMITGR: MMITGR,
        itemClass: itemClass,
        itemType: itemType,
        itemGroup: itemGroup,
        basicUnit: item.MMUNMS,
        cost: cost,
        netWeight: item.netWeight,
        grossWeight: item.grossWeight,
        unit: unitarr,
        minUnit: {
          facType: minUnitData.facType,
          factor: minUnitData.factor,
          unit: minUnitData.unit
        },
        maxUnit: {
          facType: maxUnitData.facType,
          factor: maxUnitData.factor,
          unit: maxUnitData.unit
        }
      }
    })
    res.json(items)
  } catch (error) {
    next(error)
  }
}

exports.getCoType = async (req, res, next) => {
  try {
    const { orderType } = req.body
    const coType = await OODFLT.findOne({
      where: {
        coNo: 410,
        orderType: orderType
      }
    })
    if (coType) {
      const response = trimObjectStrings(coType.toJSON())
      res.status(200).json(response)
    } else {
      const error = new Error('Not Found Order Type')
      error.statusCode = 404
      throw error
    }
  } catch (error) {
    next(error)
  }
}

exports.getItemAnalysis = async (req, res, next) => {
  try {
    const results = await OrderLine.findAll({
      attributes: [
        [Sequelize.fn('LEFT', Sequelize.col('OBLMDT'), 6), 'YearMonth'], // Use Sequelize.fn for LEFT function
        'OBITNO', // Keep item number as is
        [Sequelize.fn('SUM', Sequelize.col('OBPONR')), 'monthlySum'] // Sum the OBPONR column
      ],
      where: {
        coNo: 410,
        OBLMDT: { [Op.like]: '2024%' }, // Filter for the year 2024
        OBCUNO: '21000026' // Filter by customer number
      },
      group: [
        [Sequelize.fn('LEFT', Sequelize.col('OBLMDT'), 6)], // Group by YearMonth
        'OBITNO' // Group by item number
      ]
    })

    // res.json(results)

    // Transform data into monthly columns
    // const monthlyData = {}
    // results.forEach(result => {
    //   const { YearMonth, OBITNO: itemNo, monthlySum } = result.dataValues

    //   if (!monthlyData[itemNo]) {
    //     monthlyData[itemNo] = {
    //       itemNo,
    //       January: 0,
    //       February: 0,
    //       March: 0,
    //       April: 0,
    //       May: 0,
    //       June: 0,
    //       July: 0,
    //       August: 0,
    //       September: 0,
    //       October: 0,
    //       November: 0,
    //       December: 0,
    //       MAX: 0,
    //       AVG: 0,
    //       Summarize: 0
    //     }
    //   }

    //   // Map monthly sums to corresponding months
    //   const month = YearMonth.slice(4, 6) // Extract the month part (e.g., '01', '02', etc.)
    //   const monthMap = {
    //     '01': 'January',
    //     '02': 'February',
    //     '03': 'March',
    //     '04': 'April',
    //     '05': 'May',
    //     '06': 'June',
    //     '07': 'July',
    //     '08': 'August',
    //     '09': 'September',
    //     10: 'October',
    //     11: 'November',
    //     12: 'December'
    //   }

    //   monthlyData[itemNo][monthMap[month]] = monthlySum
    //   monthlyData[itemNo].Summarize += monthlySum // Calculate total sum
    //   monthlyData[itemNo].MAX = Math.max(monthlyData[itemNo].MAX, monthlySum) // Update MAX
    // })

    // // Calculate AVG
    // Object.values(monthlyData).forEach(data => {
    //   const totalMonths = Object.keys(data)
    //     .filter(
    //       key =>
    //         key !== 'itemNo' &&
    //         key !== 'MAX' &&
    //         key !== 'AVG' &&
    //         key !== 'Summarize'
    //     )
    //     .reduce((count, key) => count + (data[key] > 0 ? 1 : 0), 0)
    //   data.AVG = totalMonths > 0 ? data.Summarize / totalMonths : 0
    // })

    // // Send response
    // res.json(Object.values(monthlyData))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while fetching data.' })
  }
}
