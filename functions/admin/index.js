const admin = require('firebase-admin')

if(process.env.FUNCTIONS_EMULATOR === 'true') {
  // index.jsから見た相対パスっぽい
  const path = './secrets/firebase.secret.json'
  const credential = admin.credential.cert(path)
  admin.initializeApp({ credential })
} else {
  admin.initializeApp()
}

module.exports = admin
