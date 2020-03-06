const { client } = require('../bigquery')

// クエリキャッシュについて
// https://cloud.google.com/bigquery/docs/cached-results?hl=ja
// クエリのパラメータ化
// https://cloud.google.com/bigquery/docs/parameterized-queries?hl=ja

const list = async (data, context) => {
  console.log('data', data)
  console.log('context.auth', context.auth)
  if(!context.auth) return
  const sql = `SELECT * FROM \`maas_mumbai.battery\` LIMIT 1000`
  const [rows] = await client.query(sql)
  return rows
}

module.exports = {
  list,
}
