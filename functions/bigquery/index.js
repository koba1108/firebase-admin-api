const { BigQuery } = require('@google-cloud/bigquery')
const { nymbus } = require('../secrets/config')

const client = new BigQuery({
  projectId: nymbus.projectId,
  keyFilename: './secrets/bigquery.secret.json',
})

module.exports = {
  client,
}
