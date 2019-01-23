<template>
  <div class="first_countryCode">
    <div 
      v-if="type==1" 
      class="selectInput" 
      @click="open">
      <input 
        v-model="val" 
        :class="{borderRed:bolColor>0}" 
        readonly>
      <i :class="{active:bol}"/>
    </div>
    <p 
      v-else 
      class="val" 
      @click="open">+<span>{{ val }}</span><i :class="{active:bol}"/></p>
    <div 
      v-show = "bol" 
      class="box">
      <div class="seach">
        <input 
          v-model="seachVal" 
          type="text">
        <i class="icon-sousuo iconfont"/>
      </div>
      <div class="list">
        <p 
          v-for="(item,index) in countries" 
         
          :key="index" 
          @click="choseArea(item)" >
          <img :src="`/static/images/countries/${item.d}.png`">
          <span>{{ item.n }}</span>
          <span>+{{ item.d }}</span>
        </p>
      </div>
    </div>
    <div 
      v-show = "bol" 
      class="mask" 
      @click="open"/>
  </div>
</template>
<script>
import countries from '@/assets/js/countries'
export default {
  name: 'CountryCode',

  props: {
    type: {
      type: Number,
      default: 0
    },
    bolColor: {
      type: Number,
      default: 0
    }
  }, //['type', 'defaultVal', 'bolColor'],
  data() {
    return {
      countries: countries.list,
      val: '',
      bol: false,
      seachVal: ''
    }
  },
  watch: {
    seachVal(val) {
      this.countries.forEach((element, index) => {
        this.countries[index].b =
          element.n.toLowerCase().indexOf(val.toLowerCase()) != -1
            ? true
            : false
      })
    }
  },
  created() {
    this.val = this.type != 1 ? this.countries[0].d : ''
  },
  methods: {
    choseArea(item) {
      if (this.type == 1) {
        this.val = '+' + item.d + ' ' + item.n
      } else {
        this.val = item.d
      }

      this.$emit('obainVal', {
        type: 'country',
        data: item
      })
      this.open()
    },
    open() {
      this.bol = !this.bol
      this.$emit('obainVal', {
        bol: this.bol,
        val: this.val
      })
    },
    init(val) {
      this.val = val
    }
  }
}
</script>
<style lang="less">
.first_countryCode {
  text-align: left;
  .selectInput {
    position: relative;
    input {
      width: 100%;

      border-radius: 4px;
      width: 100%;

      display: block;
      padding: 0 8px;
      font-size: 14px;
      cursor: pointer;
    }
    i {
      position: absolute;
      top: 50%;
      right: 20px;
      margin-top: -1px;
    }
  }
  .val {
    cursor: pointer;
    text-align: center;

    position: relative;
    -webkit-user-select: none;
    span {
      padding: 0 5px 0 3px;
    }
    i {
      position: absolute;
      top: 50%;
      margin-top: -3px;
    }
  }
  .val,
  .selectInput {
    i {
      width: 0;
      height: 0;
      border-width: 6px 5px 0;
      border-style: solid;

      &.active {
        border-width: 0 5px 6px;
      }
    }
  }
  .box {
    width: 468px;
    height: 320px;
    position: absolute;
    top: 54px;
    left: 0;
    overflow: hidden;
    z-index: 8;
    .seach {
      padding: 15px;
      position: relative;
      input {
        width: 100% !important;
        height: 30px !important;
        padding-left: 34px !important;
      }
      i {
        position: absolute;
        top: 50%;
        left: 25px;
        font-size: 14px;
        margin-top: -7px;
        line-height: 1;
      }
    }
    .list {
      height: 260px;
      overflow-y: auto;
      p {
        height: 34px;
        line-height: 34px;
        padding: 0 15px 0 45px;
        position: relative;
        cursor: pointer;

        img {
          height: 14px;
          position: absolute;
          left: 15px;
          top: 50%;
          margin-top: -7px;
        }
        span {
          &:last-child {
            float: right;
          }
        }
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
  }
}
</style>
