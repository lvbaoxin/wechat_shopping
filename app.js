//app.js
var util = require('./utils/util.js');
var QQMapWX = require('./pages/libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var amapFile = require('./utils/amap-wx.js')
var myAmapFun = new amapFile.AMapWX({key:'dc888b96cc39ccdb1ec1844977249611'});
App({
  d:{
    ceshiUrl: util.getUri(),
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function (res) {
       
       console.log(res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            method:'post',
            url: 'https://lytx.pskjcs.cn/public/api/Miniapp/permissions',
            data: {
              code: res.code
            },
            success: function (res) {
              //console.log(res.data.data.openid)
              wx.setStorageSync('openid', res.data.data.openid)
            },
            fail: function (res) {

            }
          })
        }
      },
      fail: function (res) {

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
             
            //  console.log(res)
              this.globalData.userInfo = res.userInfo
              if(this.onUserInfoReady) this.onUserInfoReady(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
    // myAmapFun.getRegeo({
      
    //   success: function(data){
    //     //成功回调
    //     wx.setStorageSync('address', data[0].regeocodeData.addressComponent.city)
    //     console.log(data[0].regeocodeData.addressComponent.city)
    //     // that.setData({
    //     //   address:data[0].regeocodeData.addressComponent.city
    //     // })
    //   },
    //   fail: function(info){
    //     //失败回调
    //     console.log(info)
    //   }
    // })
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
       console.log('onCheckForUpdate====', res)
       // 请求完新版本信息的回调
       if (res.hasUpdate) {
        console.log('res.hasUpdate====')
        updateManager.onUpdateReady(function () {
         wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
           console.log('success====', res)
           // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
           if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
           }
          }
         })
        })
        updateManager.onUpdateFailed(function () {
         // 新的版本下载失败
         wx.showModal({
          title: '已经有新版本了哟~',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
         })
        })
       }
      })
     }
    
  },
  globalData: {
    userInfo: null,
    tel:'',
    mobile:"",
    nickname:'',
    avatar:"",
    openid:""
  }
})