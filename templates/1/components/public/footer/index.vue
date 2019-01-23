<template>
  <div class="first_footer">
    <div class="cont">
      <div class="link">
        <div 
          v-if="data!=''" 
          class="left" >
          <img :src="'/api/resource/'+getBaseKey('logo')" >
          <p>{{ data.slogan.slogan }}</p>
         
        </div>
        <div class="list">
          <ul 
            v-for="(item,index) in data.commonPages" 
            :key="index" 
            class="fl">
            <li>
              {{ $t( bottom[ item.category ] ) }}
            </li>
            <li 
              v-for="(iten,index) in item.pages" 
              :key="index">
              <a 
                v-if="iten.pageUrl!=null" 
                :href="iten.pageUrl" 
                target="_blank">{{ iten.title }} </a>
              <router-link 
                v-else 
                :to="{name:'general',params:{type:iten.type}}" 
                target="_blank">{{ iten.title }} </router-link>
            </li>
          </ul>

        </div>
      </div>
      <div 
        v-if="data.friendLink&&data.friendLink.length>0" 
        class="friends">
        <ul>
          <li>{{ $t('footer.friends') }}：</li>
          <li 
            v-for="(item,index) in data.friendLink" 
            :key="index">
            <a 
              :href="item.linkUrl" 
              target="_blank">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="font">
          <span 
            v-if="getBaseKey('copyRight')" 
            class="filing">©  {{ getBaseKey('copyRight') }}</span>
          <a>
            <span> {{ $t('footer.txt') }} </span>
            <div class="promt">
              <p> {{ $t('footer.txt1') }}
              <em/></p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { bottom } from '~/assets/js/json'
export default {
  name: 'Footer',
  components: {},
  data() {
    return {
      bottom: bottom,
      data: ''
    }
  },

  computed: {
    ...mapGetters(['getBaseKey'])
  },
  created() {
    this.init()
  },

  methods: {
    init() {
      this.$api.indexBottom().then(res => {
        this.data = res
      })
    }
  }
}
</script>

<style lang="less" scoped>
.first_footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #030711;
  height: 389px;
  .cont {
    width: 1200px;
    margin: auto;
    .link {
      height: 244px;
      overflow: hidden;
    }
  }
  .hover {
    position: relative;
    &:hover {
      .code {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
      }
    }
  }
  .code {
    width: 90px;
    height: 90px;
    p {
      padding: 0;
    }
    position: absolute;
    top: 32px;
    left: -42px;
    padding-bottom: 30px;
    display: block;
    -webkit-transition: 0.2s all ease-out;
    transition: 0.2s all ease-out;

    transform-origin: 50% 0%;

    transform: scale(0);
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .left {
    width: 480px;
    float: left;
    padding-top: 44px;
    img {
      height: 30px;
    }
    .icon-logo {
      font-size: 34px;
      color: #ffc12a;
    }
    p {
      color: #474e5e;
      padding: 13px 0 22px 0;
    }
    ul {
      li {
        display: inline-block;
        margin-right: 15px;
        i {
          font-size: 18px;
          cursor: pointer;
          color: #737e92;
        }
        &:hover {
          color: #ffc12a;
        }
      }
    }
  }
  .list {
    float: right;
    padding-top: 45px;
    ul {
      padding-right: 77px;
    }
    li {
      margin-bottom: 10px;
      a {
        color: #687284;
        &:hover {
          color: #ffc12a;
        }
      }
      span {
        color: #687284;
      }
      &:first-child {
        margin-bottom: 24px;
        color: #ffc12a;
      }
    }
  }
  .friends {
    color: #687284;
    margin-top: 60px;
    ul {
      height: 35px;
    }
    li {
      display: inline-block;
      padding-right: 30px;
      padding-bottom: 10px;
      a {
        color: #687284;
        &:hover {
          color: #ffc12a;
        }
      }
      &:first-child {
        padding-right: 19px;
      }
    }
  }
  .bottom {
    line-height: 50px;
    height: 50px;
    border-top: 1px solid#161C2C;
    position: relative;
    box-sizing: border-box;
    .font {
      font-size: 12px;
      color: #687284;
      height: 12px;
      span {
        font-size: 12px;
        color: #687284;
      }
      span.filing {
        padding-right: 22px;
        border-right: 1px solid#474F5F;
        margin-right: 22px;
      }
      a {
        span {
          &:hover {
            color: #ffc12a;
          }
        }
        font-size: 12px;
        color: #474f5f;
        position: relative;
        .promt {
          bottom: -4px;
          left: 40px;
          position: absolute;
          padding-left: 20px;
          display: none;
          p {
            width: 850px;
            height: 54px;
            background: #161c2c;
            border-radius: 3px;
            line-height: 1.5;

            padding: 10px 17px;
            color: #687284;
            font-size: 12px;
            em {
              position: absolute;
              top: 34px;
              left: 14px;
              width: 0;
              height: 0;
              border-top: 6px solid transparent;
              border-bottom: 6px solid transparent;
              border-right: 6px solid#161C2C;

              //border-color:transparent  transparent transparent #fff;/*灰 透明 透明 */
            }
          }
        }
        &:hover {
          .promt {
            display: block;
          }
        }
      }
    }
  }
}
</style>
