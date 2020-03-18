const TRUNC_SEC_SQL = require('./sql/truncSec')
const TRUNC_MIN_SQL = require('./sql/truncMin')
const TRUNC_HOUR_SQL = require('./sql/truncHour')
const TRUNC_DAY_SQL = require('./sql/truncDay')
const TRUNC_WEEK_SQL = require('./sql/truncWeek')
const DIFF_TDT = require('./sql/diffTDT')

module.exports = {
  battery: {
    second(from, to) {
      return {
        query: TRUNC_SEC_SQL,
        params: {
          second: 1,
          from,
          to,
        },
      }
    },
    minute(from, to) {
      return {
        query: TRUNC_MIN_SQL,
        params: {
          minute: 15,
          from,
          to,
        },
      }
    },
    hour(from, to) {
      return {
        query: TRUNC_HOUR_SQL,
        params: {
          hour: 1,
          from,
          to,
        },
      }
    },
    day(from, to) {
      return {
        query: TRUNC_DAY_SQL,
        params: {
          day: 1,
          from,
          to,
        },
      }
    },
    week(from, to) {
      return {
        query: TRUNC_WEEK_SQL,
        params: {
          from,
          to,
        },
      }
    },
    diffTdt(from, to, limit = 5) {
      return {
        query: DIFF_TDT,
        params: {
          from,
          to,
          limit,
        },
      }
    },
  },
}
