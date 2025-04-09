// Models
const { Balance, Locate } = require('../../models/master')
// Sequelize "OR"
const { Op } = require('sequelize')

exports.getStockAll = async (req, res, next) => {
  try {
    const locateData = {}
    const { warehouse } = req.body
    const BalanceData = await Balance.findAll({
      where: {
        warehouse: warehouse,
        coNo: 410,
        // itemCode: '10010601011'
        itemCode: {
          [Op.or]: [
            { [Op.ne]: null },
            { [Op.ne]: '' },
            // { [Op.eq]: "600102390" },
            { [Op.notLike]: 'ZNS%' },
            { [Op.notLike]: '800%' },
            { [Op.notLike]: 'PRO%' },
            { [Op.notLike]: 'DIS%' },
            { [Op.notLike]: '100            ' }
          ]
        }
      }
    })

    for (let i = 0; i < BalanceData.length; i++) {
      locateData[BalanceData[i].itemCode.trim()] = []
      // console.log(`BalanceData[${i}].itemCode`, BalanceData[i].itemCode)
      // console.log('locateData[BalanceData[i].itemCode.trim()]', locateData)
      const locate = await Locate.findAll({
        where: {
          warehouse: warehouse,
          itemCode: BalanceData[i].itemCode.trim(),
          coNo: 410
        }
      })

      // console.log('Locate.findAll', locate.length)

      for (let j = 0; j < locate.length; j++) {
        locateData[BalanceData[i].itemCode.trim()].push({
          location: locate[j].location.trim(),
          lot: locate[j].lot,
          itemOnHand: locate[j].itemOnHand,
          itemallocated: locate[j].itemallocated // Assuming promotionName is a property of PromotionData
        })
      }
    }

    const stocks = BalanceData.map(stock => {
      const locate = locateData[stock.itemCode.trim()] || []
      const itemCode = stock.itemCode.trim()

      return {
        coNo: stock.coNo,
        warehouse: stock.warehouse,
        itemCode: itemCode,
        itemPcs: stock.itemPcs,
        allocateMethod: stock.allocateMethod,
        itemallocated: stock.itemallocated,
        itemAllowcatable: stock.itemAllowcatable,
        lot: locate
      }
    })
    res.json(stocks)
  } catch (error) {
    next(error)
  }
}
exports.getStockDetail = async (req, res, next) => {
  try {
    let locatearr = []
    const { warehouse, itemCode } = req.body

    const BalanceData = await Balance.findAll({
      where: {
        warehouse: warehouse,
        itemCode: itemCode,
        coNo: 410
      }
    })

    const locate = await Locate.findAll({
      where: {
        warehouse: warehouse,
        itemCode: itemCode.trim(),
        coNo: 410
      }
    })

    consle.log('locate', locate)

    // for (let i = 0; i < locate.length; i++) {
    //   const location = locate[i].location.trim();
    //   locatearr.push({
    //     location: location,
    //     lot: locate[i].lot,
    //     itemOnHand: locate[i].itemOnHand,
    //     itemallocated: locate[i].itemallocated,
    //   });
    // }
    const stocks = BalanceData.map(stock => {
      const itemCode = stock.itemCode.trim()
      return {
        coNo: stock.coNo,
        warehouse: stock.warehouse,
        itemCode: itemCode,
        itemPcs: stock.itemPcs,
        allocateMethod: stock.allocateMethod,
        itemallocated: stock.itemallocated,
        itemAllowcatable: stock.itemAllowcatable,
        lot: locatearr
      }
    })
    res.json(stocks[0])
  } catch (error) {
    next(error)
  }
}
