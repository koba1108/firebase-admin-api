const { firebaseRegion } = require('./secrets/config')
const { auth, battery, vehicle } = require('./handlers')

const firebaseFunctions = require('firebase-functions')
const runtimeOpts = {
  timeoutSeconds: 540,
  memory: '2GB'
}
const { https } = firebaseFunctions.runWith(runtimeOpts).region(firebaseRegion)

exports.getVehicleList = https.onCall(vehicle.list)

exports.getAuthList = https.onCall(auth.list)
exports.getAuth = https.onCall(auth.get)
exports.addAuth = https.onCall(auth.add)
exports.editAuth = https.onCall(auth.edit)
exports.deleteAuth = https.onCall(auth.remove)

exports.getBatteryLogs = https.onCall(battery.logs)
exports.getDistanceTraveled = https.onCall(battery.getDistanceTraveled)
