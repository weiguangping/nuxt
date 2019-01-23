import axios from '../assets/api'
export default async function(req, res, next) {
    // req 是 Node.js http request 对象

    let exchangeInfor = await axios.getExchange()

    req.exchangeInfor = exchangeInfor
        // res 是 Node.js http response 对象

    //next是一个调用下一个中间件的函数
    // 如果您的中间件不是最终执行，请不要忘记在最后调用next！
    next()
}