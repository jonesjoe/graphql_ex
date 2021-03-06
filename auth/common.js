const fs = require('fs')
const path = require('path')
const session = require('express-session')
const Keycloak = require('keycloak-connect')

function configureKeycloak(app, graphqlPath) {

  const keycloakConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../keycloak.json')))
  const memoryStore = new session.MemoryStore()

  app.use(session({
    secret: process.env.SESSION_SECRET_STRING || 'this should be a long secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }))

  const keycloak = new Keycloak({
    store: memoryStore
  }, keycloakConfig)

  app.use(keycloak.middleware({
    admin: graphqlPath
  }))

  app.use(graphqlPath, keycloak.middleware())
  return { keycloak }
}

module.exports = {
  configureKeycloak
}