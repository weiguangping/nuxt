const axios = require('../../api')
const qs = require('qs')
module.exports = {
  login: async (req, res) => {
    axios
      .login({
        username: req.body.username, //,
        password: req.body.password, //,
        scope: 'openid',
        grant_type: 'password',
        _captcha_version: '2'
      })
      .then(
        data => {
          req.session.access_token = data.data.access_token
          res.status(data.status).json(data.data)
        },
        data => {
          res.status(data.status).json(data.data)
        }
      )
  },
  strategy: async (req, res) => {
    axios.loginStrategy(req.session.access_token).then(
      data => {
        res.status(data.status).json(data.data)
      },
      data => {
        res.status(data.status).json(data.data)
      }
    )
  },
  captcha: async (req, res) => {
    axios.loginCaptcha(req.session.access_token).then(
      data => {
        res.status(data.status).json(data.data)
      },
      data => {
        res.status(data.status).json(data.data)
      }
    )
  },
  verifying: async (req, res) => {
    axios
      .loginVerifying(
        {
          captcha_code: req.body.captcha_code,
          google_code: req.body.google_code
        },
        req.session.access_token
      )
      .then(
        data => {
          res.status(data.status).json(data.data)
        },
        data => {
          res.status(data.status).json(data.data)
        }
      )
  },
  logout: async (req, res) => {
    req.session.access_token = ''
    res.status(200).json({
      isLogin: false
    })
  },
  registerCaptcha: async (req, res) => {
    axios
      .registerCaptha({
        prefix: req.body.prefix,
        account: req.body.account
      })
      .then(
        data => {
          res.status(data.status).json(data.data)
        },
        data => {
          res.status(data.status).json(data.data)
        }
      )
  },
  register: async (req, res) => {
    axios
      .register({
        prefix: req.body.prefix,
        account: req.body.account,
        captcha: req.body.captcha,
        password: req.body.password,
        invitation_code: req.body.invitation_code,
        _captcha_version: 2,
        scene: 'register'
      })
      .then(
        data => {
          res.status(data.status).json(data.data)
        },
        data => {
          res.status(data.status).json(data.data)
        }
      )
  },
  pwdCaptcha: async (req, res) => {
    axios
      .pwdCaptha({
        prefix: req.body.prefix,
        account: req.body.account
      })
      .then(
        data => {
          res.status(data.status).json(data.data)
        },
        data => {
          res.status(data.status).json(data.data)
        }
      )
  },
  reset: async (req, res) => {
    axios
      .reset(
        {
          prefix: req.body.prefix,
          account: req.body.account,
          password: req.body.password,
          captcha: req.body.captcha
        },
        req.session.access_token
      )
      .then(
        data => {
          res.status(data.status).json(data.data)
        },
        data => {
          res.status(data.status).json(data.data)
        }
      )
  }
}
