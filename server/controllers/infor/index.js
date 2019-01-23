const axios = require('../../api')
module.exports = {
    isLogin: async(req, res) => {
        axios.isLogin(req.session.access_token).then(
            data => {
                res.status(data.status).json(data.data)
            },
            data => {
                res.status(data.status).json(data.data)
            }
        )
    },
    getExchange: async(req, res) => {
        axios.getExchange().then(
            data => {
                res.status(data.status).json(data.data)
            },
            data => {
                res.status(data.status).json(data.data)
            }
        )
    },
    bottomInfor: async(req, res) => {
        axios.bottomInfor().then(
            data => {
                res.status(data.status).json(data.data)
            },
            data => {
                res.status(data.status).json(data.data)
            }
        )
    },
    domain: async(req, res) => {
        axios.domain().then(
            data => {
                res.status(data.status).json(data.data)
            },
            data => {
                res.status(data.status).json(data.data)
            }
        )
    }
}