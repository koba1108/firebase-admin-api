const axios = require('axios')
const { vehicleListUrl } = require('../secrets/config')

const list = async (data, context) => {
  if(!context.auth) return
  try {
    const { data } = await axios.post(vehicleListUrl)
    return data
  } catch (e) {
    return { error: e }
  }
}

module.exports = {
  list,
}
