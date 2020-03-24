const moment = require('../plugins/moment')
const { client } = require('../bigquery')
const { battery } = require('../bigquery/query')

const logs = async ({ unit, from, to }, context) => {
  if(!context.auth) return []
  if(battery.hasOwnProperty(unit)) {
    const fromTimestamp = moment(from).toISOString(true)
    const toTimestamp = moment(to).toISOString(true)
    const query = battery[unit](fromTimestamp, toTimestamp)
    const [rows] = await client.query(query)
    return rows
  }
  return []
}

const getDistanceTraveled = async ({ from, to }, context) => {
  if(!context.auth) return []
  const fromTimestamp = moment(from).startOf('day').toISOString(true)
  const toTimestamp = moment(to).endOf('day').toISOString(true)
  const query = battery.diffTdt(fromTimestamp, toTimestamp)
  const [rows] = await client.query(query)
  return rows
}

module.exports = {
  logs,
  getDistanceTraveled,
}
