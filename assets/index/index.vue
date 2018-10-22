<template>
  <div class="index">
    <headers ref="headers" :title="title"></headers>
    <div class="aa-shopBriefly" v-if="getmyshopsData" style="margin-top:1.16rem;">
			<span class="aa-shopPic">
				<!--<img v-if="getmyshopsData.Logo" :src="getmyshopsData.Logo">
				<img v-if="!getmyshopsData.Logo" src="../../assets/images/pic_no.jpg">-->

				<img v-if="getmyshopsData.Logo" v-on:click="showCarImg(getmyshopsData.Logo,$event)"
             v-bind:src="getmyshopsData.Logo">
				<img v-if="!getmyshopsData.Logo" src="../../assets/images/pic_no.jpg">
			</span>
      <ul>
        <li class="aa-shopName">
          <p class="aa-shopName">{{getmyshopsData.CloudShopName}}</p>
          <!--明天开始-->
          <span class="spanbox" @click="share">分享门店</span>
          <!-- <input type="submit" name="" value="预览" v-on:click="goMyShop()"> -->
          <!--<input class="ba-yulan" type="submit" name="" value="" v-on:click="goMyShop()">-->
        </li>
        <li class="aa-shopMain">
          <p>{{getmyshopsData.Description}}</p>
          <a @click="viewDetails()"
             v-if="getmyshopsData.Description?(getmyshopsData.Description.length>20):false">详情</a>
        </li>
      </ul>

    </div>

    <!-- 新客户关注的店 -->
    <!--<div class="af-shopIndexRemind" @click="goAuthstrLine()" v-if="getApplyJoinShopData.totalCount>0">-->
      <!--有新客户申请关注了你的店，去看看-->
    <!--</div>-->
    <div class="cs-shopIndexRemind" @click="tostep" v-show="getmyshopsData.HasDistributorTask">
      待完成任务
    </div>
    <div class="aa-shopManage">
      <ul>
        <li class="icon_product" v-on:click="productLine()">
          <span></span>
          <p class="aa-productManage">上架管理</p>
        </li>
        <li class="icon_redPacket" v-on:click="redPacket()">
          <span class="activity-lxl"></span>
          <p>营销活动</p>
        </li>
        <li class="icon_customer" v-on:click="goMyCustomer()">
          <span></span>
          <p class="aa-customerManage">客户管理</p>
          <!--<div class="ab-customerRemind" v-if="cloudCustomer">
                        <p>邀请客户来门店看看吧！只有被添加的客户才能看到你的价格并调货！</p>
                        <a v-on:click="immedateAdd()">立即添加</a>
                    </div>-->
        </li>

        <!--<li class="icon_order" v-on:click="orderManagement()">
                    <span></span>
                    <p class="aa-orderManage">订单管理</p>
                </li>-->

        <li class="icon_parts" v-on:click="waresManage()">
          <span></span>
          <p class="aa-partsManage">定价管理</p>
          <!--<div class="ab-priceRemind" v-if="cloudPrice">
                        <p>想让客户更有欲望来调货？快去完善价格吧！</p>
                        <a v-on:click="showCustomerCloud()">知道了</a>
                    </div>-->
        </li>
      </ul>
    </div>

    <div class="aa-shopLogin">
      <p>批量导入价格、按车型设置主推配件品牌等更多操作，请在电脑上完成</p>
      <p class="aa-productManage"></p>
      <input type="submit" class="loginPc" name="" value="登录电脑版智配Store" v-on:click="loginPc()">
    </div>
    <!--邀请客户下单-->
    <a v-on:click="shareShop()" class="ab-shopInvitation" v-if="false"></a>
    <!--邀请客户下单20180130-->
    <!--<a v-on:click="shareShop()" class="ab-shopInvitation"></a>-->
    <SeeDetails v-if="showDetails" v-on:hideDetails="getHideDetails" v-bind:parentData="parentData"></SeeDetails>
    <!--开店成功-->
    <div class="aa-shopIndexPop" v-if="createFinishShow">
      <ul>
        <li>恭喜您，开店成功啦！</li>
      </ul>
    </div>
    <!--升级门店成功-->
    <div class="aa-shopIndexPop" v-if="upgradeFinishShow">
      <ul>
        <li>恭喜您，升级成功啦！</li>
      </ul>
    </div>
    <!-- 分享门店 -->
    <noRedPacketSet v-if="sharePop&&getmyshopsData.HasRedPacket==0"
                    v-on:shareFriendsHide="shareFriendsHide"></noRedPacketSet>
    <!--<shareFriends v-if="sharePop&&getmyshopsData.HasRedPacket==0" v-on:shareFriendsHide="shareFriendsHide" v-bind:shareFlag="1" v-bind:shareData="getmyshopsData"></shareFriends>-->

    <!--<shareFriends v-if="sharePop&&getmyshopsData.HasRedPacket==1" v-on:shareFriendsHide="shareFriendsHide"-->
                  <!--v-bind:shareFlag="3" v-bind:shareData="getmyshopsData"></shareFriends>-->

    <!-- 主营业务碳层 -->
    <ShopInfoPop ref="ShopInfoPop" v-show="shopInfo"></ShopInfoPop>

    <!--查看Logo图片-->
    <photowipe v-bind:list="maxslideImg" ref="photowipe" v-bind:options="options"></photowipe>

    <!-- 分享门店 -->
    <shareFriends v-if="sharePops" v-on:shareFriendsHide="shareFriendsHide" v-bind:shareFlag="3" v-bind:shareData="getmyshopsData"></shareFriends>
  </div>

</template>

<script>
  import seeDetails from '../../components/seeDetails.vue';
  import headers from '../../components/headers.vue';
  import shareFriends from '../../components/shareFriends.vue';
  import noRedPacketSet from '../../components/noRedPacketSet.vue';
  import shopInfoPop from '../../components/shopInfoPop.vue';
  import photowipe from '../../components/photoswipe.vue';
  import {commonMixin} from '../../config/base/commonMixin.js';

  var resourceUrl = process.env.apiDomain;
  export default {
    name: 'index',
    mixins: [commonMixin],
    components: {
      SeeDetails: seeDetails,
      headers: headers,
      shareFriends: shareFriends,
      ShopInfoPop: shopInfoPop,
      photowipe: photowipe,
      noRedPacketSet: noRedPacketSet,
      shareFriends:shareFriends
    },
    data() {
      return {
        OpenAlert: {},
        getmyshopsData: {},
        resualtUrl: 'myCustomer.html?',
        showDetails: false,
        parentData: {},
        title: "",
        createFinishShow: this.getQueryString('createFinish') == 1 ? true : false,
        upgradeFinishShow: sessionStorage.getItem("upgradeShopApp") ? true : false,
        backurlplus: window.location.href.split("?")[0] + "?shopid=" + this.getQueryString('shopid'),
        cloudPrice: false,
        cloudCustomer: false,
        sharePop: false,
        resultUrl: 'myCustomerNews.html?diff=',
        shopInfo: false,
        getApplyJoinShopData: {},
        // 看图需要的参数
        maxslideImg: [],
        options: {
          getThumbBoundsFn(index) {
            var thumbnail = document.querySelectorAll('.action_carimg')[0];
            var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            var rect = thumbnail.getBoundingClientRect();
            var ret = {
              x: rect.left + rect.width / 2,
              y: rect.top + pageYScroll + rect.height / 2,
              w: 0
            };
            return ret;
          }
        },
        sharePops:false
      }
    },

    created() {
      var _this = this;
      sessionStorage.setItem('createFinishShow', _this.getQueryString('createFinish'));
      if (_this.androidOrios() == 0) {
        _this.getmyshops();
        // _this.getApplyJoinShopList();
        _this.getAlertView();
      } else {
        _this.appLoadComplete(function () {
          _this.getmyshops();
          // _this.getApplyJoinShopList();
          _this.getAlertView();
        });
      }
    },
    mounted() {

      var _this = this;
      if (_this.getQueryString('backurl')) {
        _this.listenBackEvent();
      } else {
        _this.listenBackEvent("native_CloseWebview");
      }

      if (_this.createFinishShow) {
        setTimeout(function () {
          _this.createFinishShow = false;
          _this.cloudPrice = true;
        }, 3000);
      }
      ;
      if (_this.upgradeFinishShow) {
        setTimeout(function () {
          _this.upgradeFinishShow = false;
          sessionStorage.removeItem('upgradeShopApp');
        }, 3000);
      }
      ;
      //设置头部红包按钮
      // _this.setHeaderRedPacket();
    },
    methods: {
      //设置头部红包按钮
      // setHeaderRedPacket() {
      // 	var _self = this;
      // 	$(_self.$refs.headers.$refs.redHeader).addClass('redPacket');
      // },
      //获取组件是否隐藏的值
      getHideDetails(data) {
        var _this = this;
        _this.showDetails = data;
      },
      //获取用户自己的门店信息
      getmyshops() {
        var _this = this;
        _this.ajax({
          type: "POST",
          url: resourceUrl + "/H5User/GetShopInfo",
          dataType: "JSON",
          success: function (data) {
            _this.getmyshopsData = data.Body;
            _this.setTitle(_this.getmyshopsData.CloudShopName);
            _this.title = _this.getmyshopsData.CloudShopName;
            localStorage.setItem('myShopInfo', JSON.stringify(_this.getmyshopsData));

          }
        });
      },
      //获取打招呼客户列表
      getApplyJoinShopList() {
        var _this = this;
        _this.ajax({
          type: "POST",
          url: resourceUrl + "/H5User/GetApplyJoinShopList",
          dataType: "JSON",
          data: {
            "cloudShopId": localStorage.getItem("manageshopid"),
            "status": 10
          },
          success: function (data) {
            _this.getApplyJoinShopData = data.Body;
          }
        });
      },
      //获取是否需要弹出Alert弹层
      getAlertView() {
        var _this = this;
        _this.ajax({
          type: "POST",
          url: resourceUrl + "/H5User/OpenAlert",
          dataType: "JSON",
          success: function (data) {
            _this.OpenAlert = data.Body;
            if (_this.OpenAlert != null) {
              _this.setupWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('native_GetVersion', "", function (response) {
                  if (response > 2.8) {
                    if (_this.androidOrios() == 2) {
                      _this.OpenAlert.cmdValue = _this.OpenAlert.cmdValue.replace(/"/g, "'");
                    }

                    var data = {
                      "alertNo": _this.OpenAlert.alertNo,
                      "cmd": _this.OpenAlert.cmd,
                      "cmdValue": _this.OpenAlert.cmdValue,
                      "isCancel": _this.OpenAlert.isCancel,
                      "showImg": _this.OpenAlert.showImg
                    };
                    _this.setupWebViewJavascriptBridge(function (bridge) {

                      bridge.callHandler('native_Alter', data, function (response) {
                      });
                    });
                  }
                });
              });

            }
          }
        });
      },
      // 跳转到待审核客户
      goAuthstrLine() {
        var _this = this;
        _this.goUrl('authstrLine', [{
          "param": "backurl",
          "value": encodeURIComponent(_this.backurlplus)
        }]);
      },
      //跳转到我的客户列表页
      goMyCustomer() {
        var _this = this;
        _this.goUrl('customerManagement', [{
          "param": "backurl",
          "value": encodeURIComponent(_this.backurlplus)
        }]);
        sessionStorage.setItem('backgoUrl', _this.backurlplus);
      },
      //跳转到订单管理
      orderManagement() {
        var _this = this;
        _this.goUrl('orderManage', [{
          "param": "backurl",
          "value": encodeURIComponent(_this.backurlplus)
        }])
      },
      //跳转到红包界面
      redPacket() {
        event.stopPropagation();
        //挑红包页面
        var _self = this;
        _self.goUrl('shopactivity', [{
          "param": "backurl",
          "value": encodeURIComponent(window.location.href)
        }]);
      },
      // //点击查看详情
      // viewDetails(event, shopName, business) {
      // 	//阻止事件冒泡
      // 	event.stopPropagation();
      // 	var _this = this;
      // 	_this.showDetails = true;
      // 	_this.parentData.shopName = shopName;
      // 	_this.parentData.business = business;
      // },
      //点击跳转到产品线管理
      productLine() {
        var _this = this;
        _this.goUrl('proLineManage', [{
          "param": "backurl",
          "value": encodeURIComponent(_this.backurlplus)
        }])
      },
      //点击跳转到商品管理
      waresManage() {
        var _this = this;
        _this.goUrl('wareList', [{
          "param": "backurl",
          "value": encodeURIComponent(_this.backurlplus)
        }]);
        sessionStorage.removeItem('cId');
      },
      //点击跳转到我的门店
      goMyShop() {
        var _this = this;
        _this.setupWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('native_JumpUrl', {
            url: _this.getmyshopsData.Domain
          }, function (response) {
          });
        });
      },
      //登录电脑版
      loginPc() {
        var _this = this;
        _this.setupWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('native_QrcodeScan', '', function (response) {
          });
        });
      },
      //展示客户云朵飘
      showCustomerCloud() {
        var _this = this;
        event.stopPropagation();
        _this.cloudCustomer = true;
        _this.cloudPrice = false;
      },
      //点击立即添加客户
      immedateAdd() {
        var _this = this;
        event.stopPropagation();
        window.location.href = _this.resultUrl + '1' + "&fromWhe=1&backurl=" + encodeURIComponent(_this.backurlplus);
        sessionStorage.setItem('backgoUrl', _this.backurlplus);
      },
      //点击分享门店
      shareShop() {
        var _this = this;
        event.stopPropagation();
        _this.sharePop = true;
      },
      // 获取分享传递的数据
      shareFriendsHide(data) {
        var _this = this;
        _this.sharePops = data;
      },
      // 点击详情查看主营业务
      viewDetails() {
        var _this = this;
        _this.shopInfo = true;
        _this.$refs.ShopInfoPop.description = _this.getmyshopsData.Description;
      },

      //点击查看图片
      showCarImg: function (images, el) {
        //阻止事件冒泡
        event.stopPropagation();
        $(".action_carimg").removeClass("action_carimg");
        $(el.currentTarget).addClass("action_carimg");
        var _self = this;
        images = images.replace("?x-oss-process=image/resize,m_fill,h_96,w_96", "");
        var imgInfo = images.split('?');

        var shopInfoLogo = _self.getmyshopsData.DescriptionPhoto.split(',');
        imgInfo = imgInfo.concat(shopInfoLogo);

        _self.slideImg = imgInfo;
        _self.maxslideImg.splice(0);
        $.each(imgInfo, function (i, item) {
          _self.maxslideImg.push({
            src: item
          });
        });
        this.$refs.photowipe.show(0);
      },
      //分享门店
      share() {
        this.sharePops = true;

      },
      tostep(){
        var _this = this;
        var baseUrl = window.location.protocol + '//' + window.location.host + "/step.html?backurl=native_CloseWebview"  ;

        this.setupWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('native_JumpUrl', {url: baseUrl}, function (response) {

          })
        })
      }

    }
  }
</script>

<style>
  @import url("../../assets/css/app.css");
  @import url("../../assets/css/index.css");
  @import url("../../assets/css/myshopstyle.css");

  .activity-lxl {
    background: url("../../assets/images/icon_shopindexActivity.png") no-repeat center center !important;
    background-size: auto 1.24rem !important;
  }

  .cs-shopIndexRemind {
    width: 100%;
    height: .84rem;
    padding: 0 .32rem;
    background: #fff0ee url(../../assets/images/arrow_red.png) no-repeat 9.52rem center;
    background-size: auto .32rem;
    border-top: 1px solid #ebb2ae;
    border-bottom: 1px solid #ebb2ae;
    font-size: .36rem;
    line-height: .84rem;
    text-align: left;
    color: #e74c3c;
    float: left;
    clear: left;
  }
</style>
