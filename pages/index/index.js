//index.js
const app = getApp()
var QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var amapFile = require('../../utils/amap-wx.js')
Page({
  data: {
    getuserbar: true,
    address: "",
    swiperH: '',
    nowIdx: 1,
    imgList: [],
    indexlink: [{
        imagepath: "../../images/index-linnk1.png",
        text: "热门课程",
      },
      {
        imagepath: "../../images/index-linnk2.png",
        text: "推荐活动"
      },
      {
        imagepath: "../../images/index-linnk3.png",
        text: "精选专辑"
      },
      {
        imagepath: "../../images/index-linnk4.png",
        text: "精选商品"
      },
    ],
    "products": [],
    lessions: [{
        "lessionimage": "../../images/lissionsimage.png",
        "lessionname": "新款女士手提包新款女士手提包",
        "lessiondev": "63万人购买观看",
        "price": "￥45",
        "tag": "有图文"
      },
      {
        "lessionimage": "../../images/lissionsimage.png",
        "lessionname": "新款女士手提包",
        "lessiondev": "63万人购买观看",
        "price": "￥45",
        "tag": "有图文"
      },
      {
        "lessionimage": "../../images/lissionsimage.png",
        "lessionname": "新款女士手提包",
        "lessiondev": "招财猫包包",
        "price": "￥45",
        "tag": ""
      },
      {
        "lessionimage": "../../images/lissionsimage.png",
        "lessionname": "新款女士手提包",
        "lessiondev": "招财猫包包",
        "price": "￥45",
        "tag": ""
      },
    ],
    activity: [{
        "activityimage": "../../images/activityimag.png",
        "activityname": "英语口语直播课，的体验《乱斗西游2真人一",
        "activityteacher": "贝贝老师",
        "activitytype": '英语',
        "activitytime": "12-20 13:32",
        "activitypeople": "20人"
      },
      {
        "activityimage": "../../images/activityimag.png",
        "activityname": "英语口语直播课，的体验《乱斗西游2真人一",
        "activityteacher": "贝贝老师",
        "activitytype": '英语',
        "activitytime": "12-20 13:32",
        "activitypeople": "20人"
      },
    ],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 500,
    duration: 500,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    getuserinfo: true,
    openid: '',
    isHide: false,
    xindex: 0,
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goSearch: function () {
    wx.navigateTo({
      url: '../search-details/search-details',
    })
  },
  moreshop: function () {
    wx.switchTab({
      url: '../shopping/shopping',
    })
  },
  morelession: function () {
    wx.switchTab({
      url: '../lession/lession',
    })
  },

  getlocal: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
      },
    })
  },

  onLoad: function (options) {
    var openid = wx.getStorageSync('openid')
    var address = wx.getStorageSync('address')
    console.log(address)
    var that = this
    console.log(options.citySelected)
    if (options.citySelected == undefined) {
      console.log("aaa")
      var myAmapFun = new amapFile.AMapWX({
        key: 'dc888b96cc39ccdb1ec1844977249611'
      });
      myAmapFun.getRegeo({

        success: function (data) {
          //成功回调
          console.log(data[0].regeocodeData.addressComponent.city)
          that.setData({
            address: data[0].regeocodeData.addressComponent.city
          })
        },
        fail: function (info) {
          //失败回调
          console.log(info)
        }
      })
      const pages = getCurrentPages()
      const perpage = pages[pages.length - 1]
      perpage.onLoad()
    } else if (options.citySelected) {
      console.log("bbb")
      that.setData({
        address: options.citySelected
      })
    }
    that.setData({
      openid: openid,
      //address:options.citySelected
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }

    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/index',
      data: {},
      method: 'post',
      success: function (res) {

        console.log(res.data.data)

        that.setData({
          imgList: res.data.data.banner,
          products: res.data.data.goods,
          lesson: res.data.data.lesson,
          activity:res.data.data.active,
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
    

  },
  godetails: function (e) {
    console.log(e.currentTarget.dataset.id)
    var that = this;
    if (app.globalData.userInfo == null) {
      that.setData({

        getuserbar: false
      })
      if (app.globalData.userInfo) {
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (that.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    }
    else{
      wx.navigateTo({
        url: '../albumdetails/albumdetails?albumdetailsid=' + e.currentTarget.dataset.id,
      })
    }
    
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo

    var that = this
    console.log(e)
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/register',
      data: {
        nickname: e.detail.userInfo.nickName,
        avatar: e.detail.userInfo.avatarUrl,
        openid: that.data.openid,
      },
      method: 'post',
      success: function (res) {
        console.log(res)

        wx.showToast({
          title: "登录成功",
        })
        that.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true,
          getuserbar: true,
        })
        const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
        perpage.onLoad()

      },
      fail: function (err) {
        console.log(err)
      },

    });



  },
  onShow: function () {

  },
  //获取swiper高度
  getHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth - 2 * 50; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width;
    var sH = winWid * imgh / imgw + "px"
    this.setData({
      swiperH: sH //设置高度
    })
  },
  //swiper滑动事件
  swiperChange: function (e) {
    this.setData({
      nowIdx: e.detail.current
    })
  },
  onChange: function (e) {
    this.setData({
      xindex: e.detail.current
    });
  },
  //商品进入详情
  catchTapCategory: function (e) {
    var that = this;
    if (app.globalData.userInfo == null) {
      that.setData({

        getuserbar: false
      })
      if (app.globalData.userInfo) {
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (that.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    } else {
      var goodsId = e.currentTarget.dataset.goodsid;
      console.log('goodsId:' + goodsId);
      wx.navigateTo({
        url: '../shopping/details?goodsId=' + goodsId
      })
    }








  },
  getaddress: function () {
    wx.navigateTo({
      url: '../address/address?currentcity=' + this.data.address
    })
  },
  jxzj:function(){
    wx.switchTab({
      url: '../lession/lession',
    })
  },
  jxsp:function(){
    wx.switchTab({
      url: '../shopping/shopping' 
    })
  },
  jxhd:function(){
    wx.navigateTo({
      url: '../active/active' 
    })
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  activedetail:function(e){
    var that = this
    if (app.globalData.userInfo == null) {
      that.setData({

        getuserbar: false
      })
      if (app.globalData.userInfo) {
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (that.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    } else {
      var activeId = e.currentTarget.dataset.id;
      console.log('activeId:' + activeId);
      wx.navigateTo({
        url: '../active/active-details?activeId=' + activeId
      })
    }
  }
})