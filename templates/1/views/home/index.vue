<template>
  <section class="first_home">
    <v-header 
      :left-menu="true" 
    />
  
  </section>
  
</template>

<script>
import { mapGetters } from 'vuex'

import { vHeader } from '../../components/home/index.js'
import filter from '~/assets/js/filter'
export default {
  name: 'Home',
  head() {
    return {
      title: this.seoTitle
    }
  },
  components: {
    vHeader
  },
  filters: {
    coins(val) {
      return filter.coins(val)
    },
    trading(val) {
      return filter.trading(val)
    },
    pricing(val) {
      return filter.pricing(val)
    },
    toFixd2(val) {
      if (val) {
        return val.toFixed(2)
      }
    }
  },
  data() {
    return {
      banner: [],
      noticeList: [],
      seachText: '',
      recommend: '',

      menu: '',
      area: [],
      activeIndex: 0,
      collectionLenght: '',
      state: 0,
      obj: '',
      collections: [],
      isShow: false,
      channel: '',
      help: '',
      bannerBg: '',
      enableHelp: false,
      enableChannel: false,
      websocketObj: ''
    }
  },
  computed: {
    seoTitle() {
      return this.getBaseKey('seoTitle') + '-' + this.getBaseKey('shortName')
    },
    ...mapGetters(['getBaseKey', 'getUseKey'])
  },
  watch: {
    seachText(val) {
      this.seach()
    }
  },
  created() {
    // this.init()
  },

  methods: {
    init() {
      this.api
        .indexCenter(this)
        .then(res => {
          this.obj = res
          this.banner = res.other.banners
          this.noticeList = res.other.notices

          this.recommend = res.market.ranking
          this.collections = res.other.coinCustCollections
          this.menu = res.other.coinPairs
          this.area = res.market.basic
          this.channel = res.infor.channel
          this.help = res.infor.helpList
          this.enableHelp = res.infor.enableHelp
          this.enableChannel = res.infor.enableChannel
          this.bannerBg = res.infor.slogan.imageUrl
          let arr = [
            ...this.menu[0].coinParisStr.split(','),
            ...res.other.coinRecommend.split(',')
          ]
          this.websocket(arr.join(','))
          if (this.getUseKey('authenticated') && this.area.length > 0) {
            this.area.forEach((item, index) => {
              let symbol = item.symbol.toUpperCase().split('_')
              for (let i = 0; i < this.collections.length; i++) {
                if (
                  symbol[0] == this.collections[i].coinCode &&
                  symbol[1] == this.collections[i].priceCoinCode
                ) {
                  this.area[index].otime = true
                }
              }
            })
          }
          this.state = 1
          let _this = this
          let setTime = setTimeout(() => {
            _this.isShow = true
          }, 1000)
        })
        .catch(res => {
          this.isShow = true
        })
    },
    collection(symbol, bol, index) {
      let arr = symbol.toUpperCase().split('_')
      this.api
        .collection({
          coin_code: arr[0],
          price_coin_code: arr[1]
        })
        .then(res => {
          if (this.activeIndex === -1) {
            this.optional()
            return false
          }
          this.area[index].otime = bol != true ? true : false
        })
        .catch(res => {})
    },
    chose(i) {
      this.state = 0
      if (i === -1 && !this.getUseKey('authenticated')) {
        location.href = '/login'
        return false
      }

      this.activeIndex = i
      this.area = []
      if (i === -1) {
        this.optional()
        return false
      }
      this.api
        .switchPricing(
          {
            symbol: this.menu[i].coinParisStr.toLowerCase(),
            partition_by: this.$store.state.partitionBy,
            ranking_symbol: this.obj.other.coinRecommend.toLowerCase()
          },
          this
        )
        .then(res => {
          this.area = res[0] == undefined ? [] : res[0]
          this.collections = res[1]
          this.websocketSend(this.menu[i].coinParisStr.toLowerCase())
          if (this.getUseKey('authenticated') && this.area.length > 0) {
            this.area.forEach((item, index) => {
              let symbol = item.symbol.toUpperCase().split('_')
              for (let i = 0; i < this.collections.length; i++) {
                if (
                  symbol[0] == this.collections[i].coinCode &&
                  symbol[1] == this.collections[i].priceCoinCode
                ) {
                  this.area[index].otime = true
                }
              }
            })
          }
          this.state = 1
        })
    },
    optional() {
      this.state = 0
      this.api.optional().then(res => {
        res.basic.forEach((item, index) => {
          item.otime = true
        })
        this.area = res.basic
        this.state = 1
      })
    },
    seach() {
      for (let i = 0; i < this.area.length; i++) {
        let name = this.area[i].symbol
        this.area[i].ctime =
          name.toLowerCase().indexOf(this.seachText.toLowerCase()) != -1
            ? true
            : false
      }
    },
    websocket(data) {
      let url =
        window.location.protocol == 'http:'
          ? 'ws://' + window.location.host + '/was'
          : 'wss://' + window.location.host + '/was'
      this.websocketObj = new window.WebSocket(url)
      this.websocketObj.onopen = event => {
        this.websocketSend(data)
      }
      this.websocketObj.onclose = event => {
        this.websocketObj = null
      }
      this.websocketObj.onmessage = data => {
        let obj = JSON.parse(data.data)
        if (obj && obj.data) {
          this.area.forEach((item, index) => {
            let coins = item.symbol.replace(/_/g, '').toLowerCase()
            if (coins == obj.symbol) {
              item.new = obj.data.new
              item.high = obj.data.high
              item.low = obj.data.low
              item.rate = obj.data.rate
              item.volume = obj.data.volume
              item.price24 = obj.data.price24
            }
          })
          this.recommend.forEach((item, index) => {
            let coins = item.symbol.replace(/_/g, '').toLowerCase()
            if (coins == obj.symbol) {
              item.new = obj.data.new
              item.rate = obj.data.rate
              item.open = obj.data.open
              item.cost.usdtRate = obj.data.cost.usdtRate
              item.cost.cnyRate = obj.data.cost.cnyRate
            }
          })
        }
      }
    },
    websocketSend(data) {
      this.websocketObj.send(
        JSON.stringify({
          channel: 'statistics_24',
          symbol: data.replace(/_/g, '').toLowerCase(),
          bourse: this.$store.state.partitionBy
        })
      )
    }
  }
}
</script>

<style lang="less" scoped>
.first_home {
  min-width: 1200px;
  min-height: 100%;
  background-color: #0e121c;
  padding-bottom: 389px;
  box-sizing: border-box;
  position: relative;
  padding-top: 50px;
  .reference {
    border-bottom: 2px solid #030711;
    .tabItem {
      width: 1200px;
      margin: auto;
      padding: 50px 0;
      overflow: hidden;
      ul {
        margin-right: -20px;
      }
      li {
        width: 224px;
        float: left;
        margin-right: 20px;
        // height: 117px;

        background: #161c2c;
        padding: 20px 10px 10px 22px;
        box-sizing: border-box;
        position: relative;
        &:hover {
          box-shadow: 0px 10px 15px 4px rgba(0, 0, 0, 0.45);
        }
        p {
          line-height: 1;
          span {
            color: #adb8ca;
          }
          &:first-child {
            color: #687284;
          }
          &:nth-child(2) {
            font-size: 20px;
            color: #adb8ca;
            padding: 16px 0 8px 0;
          }
          &:nth-child(3) {
            font-size: 12px;
            color: #687284;
            padding: 0 0 12px 0;
          }
          &:nth-child(4) {
            font-size: 12px;
            color: #687284;
            padding: 0 0 1px 0;
          }
          &:nth-child(5) {
            font-size: 12px;
            color: #687284 !important;
          }
        }
        .itemMask {
          position: absolute;
          top: 20px;
          right: 10px;
          i {
            font-size: 12px;
          }
          p {
            color: #e94b37;
          }
          .green {
            color: #54bf13 !important;
          }
        }
      }
    }
  }
  .trading {
    padding: 30px 0 59px 0;
    .tableBox {
      width: 1200px;
      margin: auto;
    }
    .thead {
      padding-bottom: 29px;
      overflow: hidden;
      border-bottom: 1px solid #030711;
      li {
        float: left;
        width: 90px;
        height: 36px;
        box-sizing: border-box;
        text-align: center;
        line-height: 36px;
        margin-right: 4px;
        font-size: 16px;
        cursor: pointer;
        color: #adb8ca;
        background: #161c2c;
        transition: all 0.5s;
        &.active,
        &:hover {
          color: #030711 !important;
          background: #ffc12a;
        }
      }
      .seach {
        width: 190px;
        height: 36px;
        padding-left: 31px;
        box-sizing: border-box;
        float: right;
        position: relative;
        background: #161c2c;
        border: none;
        input {
          background: #161c2c;
          border-radius: 2px;
          display: inline-block;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          color: #adb8ca;
          outline: none;
          &::-webkit-input-placeholder {
            font-size: 14px;
            color: #687284;
          }
        }
        i {
          font-size: 14px;
          line-height: 1;
          position: absolute;
          top: 11px;
          left: 10px;
        }
      }
    }
    .tbody {
      .headTable {
        width: 100%;
        overflow: hidden;
        height: 54px;
        line-height: 54px;
        li {
          color: #687284;
        }
      }
      .publicNoData {
        max-height: 584px;
        height: 400px;
      }
      .tbodyTable {
        min-height: 300px;
        ul {
          height: 56px;
          line-height: 56px;
          border-bottom: 1px solid #030711;
          overflow: hidden;
          li {
            color: #adb8ca;
            font-size: 12px !important;
            color: #adb8ca;
            .trad {
              color: #adb8ca;
            }
            button {
              width: 50px;
              height: 24px;
              line-height: 24px;
              border-radius: 3px;
              background: #161c2c;
              cursor: pointer;
              border: 0;
              padding: 0;
              color: #adb8ca;
              &:hover {
                background: #ffc12a !important;

                a {
                  color: #161c2c;
                }
              }
              a {
                color: #adb8ca;
              }
            }
            span {
              font-size: 12px !important;
            }
          }
        }
        .collection {
          a {
            color: #687284;
            font-size: 12px;
            i {
              font-size: 16px;
              margin-right: 10px;
            }
            &.active {
              color: #ffc12a;
              span {
                color: #ffc12a;
              }
            }
          }
          .active {
            color: #ffc12a !important;
          }
        }
      }
      li {
        float: left;

        &:first-child {
          width: 192px;
          padding-left: 40px;
          box-sizing: border-box;
        }
        &:nth-child(2) {
          width: 138px;
        }
        &:nth-child(3) {
          width: 137px;
        }
        &:nth-child(4) {
          width: 150px;
        }
        &:nth-child(5) {
          width: 134px;
        }
        &:nth-child(6) {
          width: 125px;
        }
        &:nth-child(7) {
          width: 199px;
          text-align: center;
        }
        &:nth-child(8) {
          width: 125px;
          /*     padding-right: 38px;
            text-align: c;*/
          text-align: center;
        }
      }
    }
    .green {
      color: #54bf13 !important;
    }
    .red {
      color: #e94b37 !important;
    }
  }
  .noDate {
    height: 380px;
    padding-top: 60px;
    img {
      width: 200px;
      display: block;
      margin: auto;
      padding-bottom: 35px;
    }
    p {
      text-align: center;
      color: #f6f7fc;
      font-size: 14px;
      span {
        color: #f5d325;
        cursor: pointer;
      }
    }
  }
}
</style>
