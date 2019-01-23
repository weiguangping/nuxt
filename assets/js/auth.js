let sceneElement = document.getElementById("scene");
let scene = sceneElement ? sceneElement.value : "nvc_login";

window.NVC_Opt = {
  //无痕配置 && 滑动验证、刮刮卡通用配置
  appkey: "FFFF0N000000000067BC",
  scene: scene,
  isH5: false,
  popUp: false,
  renderTo: "#captcha",
  nvcCallback: function(data) {
    // data为getNVCVal()的值，此函数为二次验证滑动或者刮刮卡通过后的回调函数
    // data跟业务请求一起上传，由后端请求AnalyzeNvc接口，接口会返回100或者900
  },
  // trans: {'key1': 'code0', 'nvcCode': 400},
  trans: { nvcCode: 800 },
  language: "cn",
  //滑动验证长度配置
  customWidth: 300,
  //刮刮卡配置项
  width: 300,
  height: 100,
  elements: [
    "//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png",
    "//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png"
  ],
  bg_back_prepared:
    "//img.alicdn.com/tps/TB1skE5SFXXXXb3XXXXXXXXXXXX-100-80.png",
  bg_front:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAMAAADY1yDdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefk5w+ruswAAAAfSURBVFjD7cExAQAAAMKg9U9tCU+gAAAAAAAAAIC3AR+QAAFPlUGoAAAAAElFTkSuQmCC",
  obj_ok: "//img.alicdn.com/tfs/TB1rmyTltfJ8KJjy0FeXXXKEXXa-50-74.png",
  bg_back_pass: "//img.alicdn.com/tfs/TB1KDxCSVXXXXasXFXXXXXXXXXX-100-80.png",
  obj_error: "//img.alicdn.com/tfs/TB1q9yTltfJ8KJjy0FeXXXKEXXa-50-74.png",
  bg_back_fail: "//img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png",
  upLang: {
    cn: {
      _ggk_guide: "请摁住鼠标左键，刮出两面盾牌",
      _ggk_success: "恭喜您成功刮出盾牌<br/>继续下一步操作吧",
      _ggk_loading: "加载中",
      _ggk_fail: [
        "呀，盾牌不见了<br/>请",
        "javascript:noCaptcha.reset()",
        "再来一次",
        "或",
        "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN",
        "反馈问题"
      ],
      _ggk_action_timeout: [
        "我等得太久啦<br/>请",
        "javascript:noCaptcha.reset()",
        "再来一次",
        "或",
        "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN",
        "反馈问题"
      ],
      _ggk_net_err: [
        "网络实在不给力<br/>请",
        "javascript:noCaptcha.reset()",
        "再来一次",
        "或",
        "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN",
        "反馈问题"
      ],
      _ggk_too_fast: [
        "您刮得太快啦<br/>请",
        "javascript:noCaptcha.reset()",
        "再来一次",
        "或",
        "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN",
        "反馈问题"
      ]
    }
  }
};

var callbackName = "jsonp_callback";
//您注册请求的业务回调
window[callbackName] = function(json) {
  let code = json.result.code;
  if (code == 400) {
    //唤醒滑动验证
    getNC().then(function() {
      _nvc_nc.upLang("cn", {
        _startTEXT: "请按住滑块，拖动到最右边",
        _yesTEXT: "验证通过",
        _error300:
          '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
        _errorNetwork:
          '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
      });
      _nvc_nc.reset();
    });
  } else if (jcode === 600) {
    //唤醒刮刮卡
    getSC().then(function() {});
  } else if (code === 100 || json.result.code === 200) {
    //注册成功
    nvcReset();
    alert("register success!");
  } else if (code === 800 || json.result.code === 900) {
    //直接拦截
    nvcReset();
    alert("register failed!");
  }
};

let scripts = document.getElementsByTagName("script")[0];
let nvc = document.createElement("script");
nvc.src = "//g.alicdn.com/sd/nvc/1.1.112/guide.js";
scripts.parentNode.insertBefore(nvc, scripts);
