const login = require('../controllers/login')
const infor = require('../controllers/infor')
module.exports = function(app) {
  app.post('/server/login', login.login)
  app.get('/server/login/strategy', login.strategy)
  app.post('/server/login/captcha', login.captcha)
  app.post('/server/login/verifying', login.verifying)
  app.get('/server/logout', login.logout)
  app.post('/server/register/captcha', login.registerCaptcha)
  app.post('/server/register', login.register)
  app.post('/server/pwd/captcha', login.pwdCaptcha)
  app.post('/server/pwd/reset', login.reset)
  app.get('/server/isLogin', infor.isLogin)

  app.get('/server/getExchange', infor.getExchange)
  app.get('/server/bottom/infor', infor.bottomInfor)
  app.get('/server/domain', infor.domain)
}
