<template>
  <header class="first_header">
    <div 
      class="logo" 
      @click="$router.push('/')">
      <img 
        v-if="getBaseKey('logo')!=''" 
        :src="'/api/resource/'+getBaseKey('logo')">
    </div>
    <ul 
      v-if="leftMenu" 
      class="leftMenu">
      <li class="hover" >
        <a @click="goExchange">{{ $t('header.coins') }}</a>
      </li>
      <li 
        v-if="menuAuth['/otc']&&menuAuth['/otc'].url!=''" 
        class="hover">
        <a 
          href="/otc" 
          target="_blank">{{ $t('header.fiat') }}</a>
      </li>
      <li 
        v-if="menuAuth['/united/home']&&menuAuth['/united/home'].url!=''" 
        class="hover">
        <nuxt-link 
          to="/united/home" 
          target="_blank">{{ $t('header.united') }}</nuxt-link>
      </li>
    </ul>
    <div class="rightMenu">
      <div 
        v-if="!getLoginStatus()" 
        class="logout fl">
        <ul>
          <li class="hover">
            <nuxt-link :to="'/'+$route.params.lang+'/login'">{{ $t('header.login') }}</nuxt-link>
          </li>
          <li class="hover">
            <nuxt-link :to="'/'+$route.params.lang+'/register'">{{ $t('header.register') }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div 
        v-else 
        class="infor fl">
        <ul class="list fl">
          <li class="item hover">
          <nuxt-link :to="'/asset'">{{ $t('header.assets') }}</nuxt-link></li>
          <li class="item hover">
            <nuxt-link to="/order">{{ $t('header.order') }}</nuxt-link>
          </li>
        </ul>
        <div class="userName fl">
          <div class="hover">
            <a>{{ userName|substring }}</a>
            <i class="iconfont icon-page-dowm"/>
          </div>
          <div class="select shadow">
            <ul>
              <li v-if="isHuIsEnable">
                <nuxt-link to="/personal/my/hu">{{ $t('header.myhu') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/personal">{{ $t('header.center') }}</nuxt-link>
              </li>
              <li v-if="isRebate">
                <nuxt-link to="/personal/invite">{{ $t('header.commission') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/personal/api/setting">{{ $t('header.apiSetting') }}</nuxt-link>
              </li>
              <li>
                <a @click="logout">{{ $t('header.exit') }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="lang fl">
        <i class="iconfont icon-lang"/>
        <div class="select shadow langBox" >
          <ul>
            <li 
              v-for="(item, index) in $store.state.locales" 
              :key="index" 
              @click="choseLang(item)">{{ $t('lang.'+item) }}</li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import filter from '@/assets/js/filter'
export default {
  name: 'Vhead',
  filters: {
    substring(val) {
      return filter.substring(val)
    }
  },
  props: {
    leftMenu: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      data: '',
      menu: [],
      isRebate: false,
      isHuIsEnable: false,
      menuAuth: '',
      userName: ''
    }
  },
  computed: {
    ...mapGetters(['getBaseKey', 'getLoginStatus'])
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    ...mapActions(['setLoginStatus']),
    init() {
      this.$api.header(this.getLoginStatus()).then(res => {
        this.menuAuth = res[0]
        if (this.getLoginStatus()) {
          console.log(res[1])
          this.userName = res[1].userAuthentication.details.name
          // this.isRebate = res[1].rebateIsEnable
          // this.isHuIsEnable = res[1].huIsEnable
        }
      })
    },
    choseLang(item) {
      this.$i18n.locale = item
      this.$store.commit('SET_LANG', item)
      console.log(this.$route)
      this.$router.push('/' + item)
      // this.radio.$emit('switchLang', item)
    },
    logout() {
      this.$api.logout().then(res => {
        console.log(1)
        this.setLoginStatus(false)
      })
    },

    goExchange() {
      // :to=""
      // let coins = localStorage.getItem('cions')
      //   ? localStorage.getItem('cions')
      //   : 'btc_usdt'
      this.$router.push('/exchange/btc_usdt')
    }
    // checkRebate() {
    //   this.api.checkRebateEnabld().then(res => {
    //     this.isRebate = res;
    //   });
    // }
  }
}
</script>

<style lang="less" >
.first_header {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  background: #161c2c;
  min-width: 1200px;
  -webkit-user-select: none;
  z-index: 1000;
  font-size: 14px;
  .logo {
    padding: 10px 0;
    margin-right: 52px;
    float: left;
    img {
      height: 28px;
      cursor: pointer;
    }
  }
  .leftMenu {
    line-height: 50px;
    height: 50px;
    float: left;
    li {
      float: left;
      padding-right: 45px;
    }
  }
  .rightMenu {
    float: right;
    .logout {
      line-height: 50px;
      height: 50px;
      li {
        float: left;
        margin-left: 35px;
        a {
          color: #adb8ca;
          &:hover {
            color: #ffc12a;
          }
        }
      }
    }
    .infor {
      position: relative;
      .list {
        li {
          line-height: 50px;
          height: 50px;
          float: left;
          margin-left: 35px;
        }
      }
      .userName {
        margin-left: 35px;
        position: relative;
        .hover {
          line-height: 50px;
          i {
            margin: 2px 0 0 7px;
            font-size: 8px;
            line-height: 13px;
            color: #adb8ca;
          }
        }
        &:hover {
          i {
            color: #ffc12a;
            &::before {
              content: '\e647';
            }
          }
          a {
            color: #ffc12a;
          }
          .select {
            display: block;
          }
        }
        .select {
          right: 0;
          margin-left: -60px;

          li {
            a {
              display: block;
              width: 100%;
              height: 100%;
              color: #adb8ca;
              padding: 0 20px 0 15px;
            }
          }
        }
      }
    }
    .lang {
      position: relative;
      margin-left: 25px;
      padding-left: 10px;
      i {
        font-size: 18px;
        color: #adb8ca;
        display: block;
        margin: 16px 0;
        height: 18px;
        line-height: 1;
        cursor: pointer;
      }
      &:hover {
        .select {
          display: block;
        }
        i {
          color: #ffc12a;
        }
      }
      .select {
        right: -10px;
        li {
          padding-left: 33px;
        }
      }
    }
    .langBox {
      width: 120px;
    }
    .select {
      position: absolute;
      top: 40px;
      max-width: 160px;
      border-radius: 3px;
      display: none;
      ul {
        padding: 8px 0;
        background: #161c2c;
        li {
          line-height: 36px;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          color: #adb8ca;
          cursor: pointer;
          &:hover {
            color: #161c2c;
            background: #ffc12a;
            a {
              color: #161c2c !important;
            }
          }
        }
      }
    }
  }
  .hover {
    a {
      color: #adb8ca;
      &:hover {
        color: #ffc12a;
      }
    }
  }
}
</style>
