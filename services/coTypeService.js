const { OODFLT } = require('../models/master')
const { trimObjectStrings } = require('../utils/String')
const path = require('path')
const currentFilePath = path.basename(__filename)
const errorEndpoint = require('../middleware/errorEndpoint')

exports.fetchCotype = async orderType => {
  try {
    const coType = await OODFLT.findOne({
      where: {
        coNo: 410,
        orderType: orderType
      }
    })
    if (coType) {
      const response = trimObjectStrings(coType.toJSON())
      return response
    } else {
      const error = new Error('Not Found Order Type')
      error.statusCode = 404
      throw error
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, 'fetchCotype', error)
  }
}
