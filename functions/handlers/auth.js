const admin = require('../admin')

const get = async (uid, context) => {
  if(!context.auth || !uid) return
  const response = { user: null, errorInfo: null }
  try {
    response.user = await admin.auth().getUser(uid)
  } catch (e) {
    response.errorInfo = e.errorInfo
  }
  return response
}

const list = async (data, context) => {
  console.log('context.auth', context.auth)
  if(!context.auth) return
  return admin.auth().listUsers()
}

const add = async ({ displayName, email, password }, context) => {
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
}

const edit = async ({ uid, displayName, email, password }, context) => {
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
}

const remove = async (uid, context) => {
  if(!context.auth || !uid) return
  return admin.auth().deleteUser(uid)
}

module.exports = {
  list,
  get,
  add,
  edit,
  remove,
}
