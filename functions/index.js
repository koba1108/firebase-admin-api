const firebaseFunctions = require('firebase-functions')
const { https } = firebaseFunctions.region('asia-east2')

const admin = require('firebase-admin')
if(process.env.FUNCTIONS_EMULATOR === 'true') {
  const path = './secrets/firebase.secret.json'
  const credential = admin.credential.cert(path)
  admin.initializeApp({ credential })
} else {
  admin.initializeApp()
}

const axios = require('axios')
const vehicleListUrl = 'http://103.1.114.100:4444/vehicleApi/getvehiclelist'

exports.getVehicleList = https.onCall(async (data, context) => {
  if(!context.auth) return
  try {
    const { data } = await axios.post(vehicleListUrl)
    return data
  } catch (e) {
    return { error: e }
  }
})

exports.getAuth = https.onCall(
  async (uid, context) => {
    if(!context.auth || !uid) return
    const response = { user: null, errorInfo: null }
    try {
      response.user = await admin.auth().getUser(uid)
    } catch (e) {
      response.errorInfo = e.errorInfo
    }
    return response
  },
)

exports.getAuthList = https.onCall(
  async (data, context) => {
    if(!context.auth) return
    return admin.auth().listUsers()
  },
)

exports.addAuth = https.onCall(
  async ({ displayName, email, password }, context) => {
    if(!context.auth) return
    const response = { user: null, errorInfo: null }
    try {
      const { data } = await admin.auth().createUser({
        displayName: displayName,
        email: email,
        emailVerified: false,
        password: password,
      })
      response.user = data
    } catch (e) {
      response.errorInfo = e.errorInfo
    }
    return response
  },
)

exports.editAuth = https.onCall(
  async ({ uid, displayName, email, password }, context) => {
    if(!context.auth || !uid) return
    const response = { user: null, errorInfo: null }
    try {
      const properties = {}
      if(displayName) {
        properties.displayName = displayName
      }
      if(email) {
        properties.email = email
      }
      if(password) {
        properties.password = password
      }
      const { data } = await admin.auth().updateUser(uid, properties)
      response.user = data
    } catch (e) {
      response.errorInfo = e.errorInfo
    }
    return response
  },
)

exports.deleteAuth = https.onCall(
  async (uid, context) => {
    if(!context.auth || !uid) return
    return admin.auth().deleteUser(uid)
  },
)
