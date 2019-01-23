const express = require('express')
const consola = require('consola')
const cookieParser = require('cookie-parser')
const session = require('express-session')
// const NedbStore = require('nedb-session-store')(session)
const proxy = require('http-proxy-middleware')
const bodyParser = require('body-parser')
//const fileStore = require('session-file-store')(session)
const routes = require('./routes')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080

app.set('port', port)
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/static', express.static(__dirname + '/static'))
app.use(
  '/api/public/',
  proxy({
    target: 'http://hubi.test.uutaka.com',
    changeOrigin: true,
    proxyReqPathResolver: function(req, res, proxyOptions) {
      console.log('/login/: ' + proxyOptions)
    }
  })
)
app.use(
  '/api',
  proxy({
    target: 'http://app-hubi.test.uutaka.com',
    changeOrigin: true,
    proxyReqPathResolver: function(req, res, proxyOptions) {
      console.log('/login/: ' + proxyOptions)
    }
  })
)
app.use(
  '/login',
  proxy({
    target: 'http://app-hubi.test.uutaka.com',
    changeOrigin: true,
    proxyReqPathResolver: function(req, res, proxyOptions) {
      console.log('/login/: ' + proxyOptions)
    }
  })
)
app.use(
  '/oauth',
  proxy({
    target: 'http://app-hubi.test.uutaka.com',
    changeOrigin: true,
    proxyReqPathResolver: function(req, res, proxyOptions) {
      console.log('/oauth/: ' + proxyOptions)
    }
  })
)
// const sessionMiddleware = session({
//   secret: 'fas fas',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     path: '/',
//     httpOnly: true,
//     maxAge: 365 * 24 * 60 * 60 * 1000 // e.g. 1 year
//   },
//   store: new NedbStore({
//     filename: 'path_to_nedb_persistence_file.db'
//   })
// })
// app.use(sessionMiddleware)
app.use(
  session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: false,

    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
      maxAge: 1000 * 60 * 60 * 3 // 设置 session 的有效时间，单位毫秒
    }
  })
)

routes(app)
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
