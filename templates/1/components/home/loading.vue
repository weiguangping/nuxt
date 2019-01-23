<template>
  <div class="first_load">
    <div class="banner" >
      <load/>
    </div>
    <div class="pad"/>
    <div class="list">
      <ul>
        <li/>
        <li/>
        <li/>
        <li/>
        <li/>
      </ul>
    </div>
    <div class="trading">
      <div class="tableBox">
        <div class="thead">
          <ul>
            <li>{{ $t('exchange.optional') }}</li>
            <li>BTC</li>
          </ul>
          <div class="seach">
            <i class="iconfont icon-sousuo"/>
            <input 
              :placeholder="$t('home.seachPlaceholder')" 
              type="text" >
          </div>
        </div>
        <div class="tbody">
          <ul class="headTable">
            <li>
              {{ $t("home.currency") }}
            </li>
            <li>
              {{ $t("home.currentPrice") }}
            </li>
            <li >
              {{ $t("home.topPrice") }}
            </li>
            <li>
              {{ $t("home.minimumPrice") }}
            </li>
            <li>
              {{ $t("home.upsAndDowns") }}
            </li>
            <li>
              {{ $t("home.tradingVolume") }}
            </li>
            <li>
              {{ $t("home.priceTrend") }}
            </li>
            <li>
              {{ $t("home.operation") }}
            </li>
          </ul>
          <div class="tbodyTable">
            <ul >
              <li class="collection " >
                <a >
                  <i class="iconfont icon-shoucang"/>
                  - -
                </a>
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li >
                - -
              </li>
              <li>
                - -
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li class="bnt">
                - -
              </li>

            </ul>
            <ul >
              <li class="collection " >
                <a >
                  <i class="iconfont icon-shoucang"/>
                  - -
                </a>
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li >
                - -
              </li>
              <li>
                - -
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li class="bnt">
                - -
              </li>

            </ul>
            <ul >
              <li class="collection " >
                <a >
                  <i class="iconfont icon-shoucang"/>
                  - -
                </a>
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li >
                - -
              </li>
              <li>
                - -
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li class="bnt">
                - -
              </li>

            </ul>
            <ul >
              <li class="collection " >
                <a >
                  <i class="iconfont icon-shoucang"/>
                  - -
                </a>
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li >
                - -
              </li>
              <li>
                - -
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li class="bnt">
                - -
              </li>

            </ul>
            <ul >
              <li class="collection " >
                <a >
                  <i class="iconfont icon-shoucang"/>
                  - -
                </a>
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li >
                - -
              </li>
              <li>
                - -
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li class="bnt">
                - -
              </li>

            </ul>
            <ul >
              <li class="collection " >
                <a >
                  <i class="iconfont icon-shoucang"/>
                  - -
                </a>
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li >
                - -
              </li>
              <li>
                - -
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li class="bnt">
                - -
              </li>

            </ul>
            <ul >
              <li class="collection " >
                <a >
                  <i class="iconfont icon-shoucang"/>
                  - -
                </a>
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li >
                - -
              </li>
              <li>
                - -
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li class="bnt">
                - -
              </li>

            </ul>
            <ul >
              <li class="collection " >
                <a >
                  <i class="iconfont icon-shoucang"/>
                  - -
                </a>
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li >
                - -
              </li>
              <li>
                - -
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li class="bnt">
                - -
              </li>

            </ul>
            <ul >
              <li class="collection " >
                <a >
                  <i class="iconfont icon-shoucang"/>
                  - -
                </a>
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li >
                - -
              </li>
              <li>
                - -
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li class="bnt">
                - -
              </li>

            </ul>
            <ul >
              <li class="collection " >
                <a >
                  <i class="iconfont icon-shoucang"/>
                  - -
                </a>
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li >
                - -
              </li>
              <li>
                - -
              </li>
              <li>
                - -
              </li>
              <li >
                - -
              </li>
              <li class="bnt">
                - -
              </li>

            </ul>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import load from "../public/loading/";
export default {
  name: "Loading",
  components: {
    load
  }
};
</script>

<style lang="less" scoped>
.first_load {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 999;
  background: #0e121c;
  .banner {
    width: 100%;
    background: #0e121c;
    padding: 290px 0;
  }
  .pad {
    height: 40px;
    background: #030711;
  }
  .list {
    overflow: hidden;
    padding: 50px 0 81px 0;
    width: 1200px;
    margin: auto;
    ul {
      margin-right: -20px;
      li {
        width: 224px;
        height: 117px;
        background: #161c2c;
        float: left;
        margin-right: 20px;
      }
    }
  }
  .chose {
    width: 1200px;
    margin: auto;
    overflow: hidden;
    li {
      width: 90px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      background: #161c2c;
      float: left;
      margin-right: 6px;
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
        input {
          background: #161c2c;
          padding: 0;
          line-height: 36px;
          &::-webkit-input-placeholder {
            font-size: 14px;
            color: #687284;
          }
        }
        i {
          font-size: 14px;
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
      .tbodyTable {
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
}
</style>
