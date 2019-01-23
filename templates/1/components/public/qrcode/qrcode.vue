<template>
  <div class="posterMake">
    <div :id="`qrcode`+index" style="display:none"/>
    <div :id="`poster`+index" style="display:none">
      <canvas :id="`myCanvas`+index" :width="pw" :height="ph"/>
    </div>
    <img :id="`srcImg`+index" src>
    <button>
      <a :href="urlBase64" :download="`download_`+index">{{ $t('invite.download') }}</a>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    //背景图宽
    posterWidth: {
      type: String,
      required: true
    },
    //背景图高
    posterHeight: {
      type: String,
      required: true
    },
    //二维码宽
    qrcodeWidth: {
      type: String,
      required: true
    },
    //二维码高
    qrcodeHeight: {
      type: String,
      required: true
    },
    //索引
    index: {
      type: String,
      required: true
    },
    //位置left
    left: {
      type: String,
      required: true
    },
    //位置top
    top: {
      type: String,
      required: true
    },
    //链接地址
    url: {
      type: String,
      required: true
    },
    //背景图
    poster: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      qrcode: "",
      urlBase64: "",
      pw: "", //背景图宽
      ph: "", //背景图高
      qw: "", //二维码宽
      qh: "", //二维码高
      zl: "", //位置left
      zt: "" //位置top
    };
  },
  mounted() {
    this.init();
    this.draw();
  },
  methods: {
    //初始化参数
    init() {
      this.pw = this.posterWidth ? this.posterWidth : "200";
      this.ph = this.posterHeight ? this.posterHeight : "356";
      this.qw = this.qrcodeWidth ? this.qrcodeWidth : "47";
      this.qh = this.qrcodeHeight ? this.qrcodeHeight : "47";
      this.zl = this.left ? this.left : "145";
      this.zt = this.top ? this.top : "302";
    },
    draw() {
      let _this = this;
      _this.qrcode = new QRCode(`qrcode` + _this.index, {
        width: _this.qw, // 设置宽度，单位像素
        height: _this.qh, // 设置高度，单位像素
        text: _this.url // 设置二维码内容或跳转地址
      });
      var c = document.getElementById(`myCanvas` + _this.index);
      var ctx = c.getContext("2d");
      var bgImg = new Image();
      var codeImg = document.getElementById(`qrcode` + _this.index).lastChild;
      bgImg.crossOrigin = "*"; //解决跨域问题
      codeImg.crossOrigin = "*";
      codeImg.src = c.toDataURL("images/png");
      bgImg.src = _this.poster;
      bgImg.onload = function() {
        ctx.drawImage(bgImg, 0, 0, _this.pw, _this.ph); //在canvas 上面画图
        ctx.drawImage(codeImg, _this.zl, _this.zt, _this.qw, _this.qh);
        var base64 = c.toDataURL("images/png"); //只有canvas只有toDataURL方法
        document
          .getElementById(`srcImg` + _this.index)
          .setAttribute("src", base64);
        _this.urlBase64 = base64;
        _this.$emit("newPoster", {
          url: base64,
          index: _this.index
        }); //获取合成后的图片
      };
    }
  }
};
</script>

<style lang="less" scoped>
#qrcode,
#poster,
#srcImg {
  display: none;
}
.posterMake {
  button {
    width: 140px;
    height: 40px;
    line-height: 40px;
    background: #ffc12a;
    border-radius: 4px;
    border: 0;
    outline: none;
    cursor: pointer;
    display: block;
    margin: 15px auto 0;
    padding: 0;
    a {
      color: #161c2c;
      display: block;
      width: 100%;
      height: 100%;
    }
    &:hover {
      background-color: #ffca4a;
    }
    &:focus {
      background-color: #efaa00;
    }
  }
}
</style>
