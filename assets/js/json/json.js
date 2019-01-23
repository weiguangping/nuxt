
let variable = [
  "personal.Vlow",
  "personal.low",
  "personal.medium",
  "personal.high",
  'personal.Vhigh',
  'personal.goCertification',
  'personal.recertification'
]
let verifyState = {
  UNREAL: ['personal.unCertification', 'icon-zhuyi', 'personal.unCertificationTxt', 'personal.goCertification'],
  AUDIT: ['personal.review', 'icon-hb_icon_audit1', 'personal.reviewTxt'],
  REAL: ['personal.certified', 'icon-zhengquetishi green', 'personal.certifiedTxt'],
  REFUSED: ['personal.refusedL', 'icon-guanbi1 red', 'personal.refusedLTxt', 'personal.update'],
  PRIMARY: ['personal.unCertification', 'icon-zhuyi', 'personal.unCertificationTxt', 'personal.goCertification','personal.certified', 'icon-zhengquetishi green'],
}
let phoneState = {
  No: ['personal.goBind', 'icon-zhuyi', 'personal.unbounded', 'personal.boundedTxt'],
  Yes: ['personal.modifyBind', 'icon-zhengquetishi green', 'personal.bounded', 'personal.boundedTxt1']
}
let emailState = {
  Yes: ['icon-zhengquetishi green', 'personal.bounded', 'personal.emailTxt',],
  No: ['icon-zhuyi', 'personal.unbounded', 'personal.unboundedTxt']
}
let googleState = {
  No: ['personal.goBind', 'icon-zhuyi', 'personal.unbounded', 'personal.googleVerifierTxt'],
  Yes: ['personal.modifyBind', 'icon-zhengquetishi green', 'personal.bounded', 'personal.googleTxt']
}
let loginState = {
  success: 'personal.success',
  failure: 'personal.failure'
}
let google = {
  'bind': ''
}
let bindPhoneEorr = {
  phone_captcha_faild: "personal.codeError",
  assetpwd_faild: "personal.assetsPwdErr",
}
let historys = {
  tradeStrategy: 'personal.history.tradeSrategy',
  loginStrategy:'personal.history.loginStrategy',
  WITH_OUT: 'personal.history.WITH_OUT',
  ONE_HOUR: 'personal.history.ONE_HOUR',
  TWENTYF_HOUR: 'personal.history.TWENTYF_HOUR',
  EVERY_TIME: 'personal.history.EVERY_TIME',
  withdrawStrategy: 'personal.history.withdrawSrategy',
  TRADE_PASSWORD: 'personal.history.TRADE_PASSWORD',
  TRADE_PASSWORD_GOOGLECODE: 'personal.history.TRADE_PASSWORD_GOOGLECODE',
  TRADE_PASSWORD_MSG_EMAIL: 'personal.history.TRADE_PASSWORD_MSG_EMAIL',
  TRADE_PASSWORD_GOOGLECODE_MSG_EMAIL: 'personal.history.TRADE_PASSWORD_GOOGLECODE_MSG_EMAIL',

  PWD: 'personal.history.PWD',
  PWD_GOOGLE: 'personal.history.PWD_GOOGLE',
  PWD_GOOGLE_REMOTE: 'personal.history.PWD_GOOGLE_REMOTE',
  PWD_REMOTE: 'personal.history.PWD_REMOTE',
}
let uploads = [{
  lable: 'personal.passport',
  txt: 'personal.authTxt112',
  url: '',
  bol: 0
}, {
  lable: 'personal.picture',
  txt: 'personal.authTxt111',
  url: '',
  bol: 0
}, {
  lable: 'personal.certificate',
  txt: 'personal.authTxt113',
  url: '',
  bol: 0
}]
let loginStrategy = [
  {
    name: 'personal.adjust1',
    type: false,
    active: 'PWD'
  },
  {
    name: 'personal.adjust2',
    type: true,
    active: 'PWD_GOOGLE'
  },
  {
    name: 'personal.adjust3',
    type: true,
    active: 'PWD_GOOGLE_REMOTE'
  },
  {
    name: 'personal.adjust4',
    type: false,
    active: 'PWD_REMOTE'
  }
]
let tradeStrategy = [{
  name: 'personal.transaction1',
  type: false,
  active: 'WITH_OUT'
}, {
  name: 'personal.transaction2',
  type: true,
  active: 'ONE_HOUR'
}, {
  name: 'personal.transaction3',
  type: true,
  active: 'TWENTYF_HOUR'
}, {
  name: 'personal.transaction4',
  type: true,
  active: 'EVERY_TIME'
}]
let withdrawStrategy = [{
  name: 'personal.withdraw1',
  type: 0,
  active: 'TRADE_PASSWORD_GOOGLECODE'
}, {
  name: 'personal.withdraw2',
  type: 1,
  active: 'TRADE_PASSWORD_MSG_EMAIL'
}, {
  name: 'personal.withdraw3',
  type: 2,
  active: 'TRADE_PASSWORD_GOOGLECODE_MSG_EMAIL'
}]
let currentState = {
  SUBMITTING: 'order.SUBMITTING',
  SUBMITTED: 'order.SUBMITTED',
  SUBMITTED_FAIL: 'order.SUBMITTED_FAIL',
  PARTIAL_FILLED: 'order.PARTIAL_FILLED',
  PARTIAL_CANCELED: 'order.PARTIAL_CANCELED',
  FILLED: 'order.FILLED',
  CANCELED: 'order.CANCELED'
}
let operation = {
  parameter_not_valid: 'err.parameter_not_valid',
  entrust_trade_deny: 'err.entrust_trade_deny',
  entrust_fund_password_error: 'err.entrust_fund_password_error',
  entrust_coin_pairs_not_exist: 'err.entrust_coin_pairs_not_exist',
  entrust_amount_gt_max_allow: 'err.entrust_amount_gt_max_allow',
  entrust_amount_lt_min_allow: 'err.entrust_amount_lt_min_allow',
  entrust_increase_gt_max_allow: 'err.entrust_increase_gt_max_allow',
  entrust_decline_lt_min_allow: 'err.entrust_decline_lt_min_allow'
}
let bottom = {
  about: 'footer.aboutUs.title',
  ABOUT: 'footer.aboutUs.rateExplain',
  CONTACT: 'footer.aboutUs.contact',
  explain: 'footer.serviceSupport.title',
  USER_AGREEMENT: 'footer.serviceSupport.USER_AGREEMENT',
  LEGAL: 'footer.serviceSupport.LEGAL',
  RATE: 'footer.serviceSupport.RATE',
  TRADING_RULES: 'footer.serviceSupport.TRADING_RULES',
  server: 'footer.service.title',
  USER_GUIDE: '',
  FAQ: '',
  REAL_NAME_GUIDE: ''
}

export {

  variable,
  verifyState,
  phoneState,
  emailState,
  googleState,
  loginState,
  bindPhoneEorr,
  historys,
  uploads,
  loginStrategy,
  tradeStrategy,
  withdrawStrategy,
  currentState,
  operation,
  bottom
}
