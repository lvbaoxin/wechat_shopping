// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    nickName: '',
    getphone:false,
    avatarUrl: "../../images/userinfo.png",
    tel: "",
    indexlink: [{
        imagepath: "../../images/userlink1.png",
        text: "订单",
        link: '../orderDetails/orderDetails'
      },
      {
        imagepath: "../../images/userlink2.png",
        text: "分享",
        link: '../arshe/share'
      },
      {
        imagepath: "../../images/userlink3.png",
        text: "我的收藏",
        link: '../collect/collect'
      },
      {
        imagepath: "../../images/userlink4.png",
        text: "地址管理",
        link: '../myAddress/myAddress'
      },

    ],
    toollist: [{
        imagepath: "../../images/toolicon1.png",
        text: "我的课程",
        link: '../mylession/mylession',
        next: "../../images/toolicon4.png"
      },
      {
        imagepath: "../../images/toolicon2.png",
        text: "意见反馈",
        link: '../feedback/feedback',
        next: "../../images/toolicon4.png"
      },
      {
        imagepath: "../../images/toolicon3.png",
        text: "关于我们",
        link: '../about/about',
        next: "../../images/toolicon4.png"
      }
    ],
    openid:'',
    code:'',
    getuserbar: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    getuserinfo: true,

  },
  address: function (e) {
    wx.redirectTo({
      url: '../../pages/myAddress/myAddress',
    })
  },
  // address:function(e){
  //   wx.chooseAddress({
  //     success: function (res) {
  //       console.log(res.userName)
  //       console.log(res.postalCode)
  //       console.log(res.provinceName)
  //       console.log(res.cityName)
  //       console.log(res.countyName)
  //       console.log(res.detailInfo)
  //       console.log(res.nationalCode)
  //       console.log(res.telNumber)
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(that.data.tel)
    var openid = wx.getStorageSync('openid')
    that.setData({
      openid:openid,
     
    })
    
   
    
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
     
    
    
    // console.log(app.globalData.openid)
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/my',
      data: {
        openid: that.data.openid
      },
      method: 'post',
      success: function (res) {

        console.log(res)
        that.setData({
          nickName: res.data.data.nickname,
          avatarUrl: res.data.data.avatar,
          tel: res.data.data.mobile,
         
        })
        if(that.data.tel){
          that.setData({
            getphone:true
          })
        }
        else{
          that.setData({
            getphone:false
          })
        }
      },
      fail: function (err) {
        console.log(err)
      },

    });
    wx.login({
      success: function (res) {
       
        if (res.code) {
          console.log(res.code)
          wx.request({
            method:'post',
            url: app.d.ceshiUrl + 'public/api/Miniapp/get_sessionkey',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res)
              wx.setStorageSync('session_key', res.data.data.session_key)
              wx.setStorageSync('openid2', res.data.data.openid)

            },
            fail: function (res) {

            }
          })
          
        }
      },
      fail: function (res) {

      }
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
  getPhoneNumber(e) {
   var that  = this
   var openid2 = wx.getStorageSync('openid2')
   var session_key = wx.getStorageSync('session_key')
   console.log(e)
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/getuserinfo',
      data: {
        session_key:session_key, //	是	string	换取 session_key
        encryptedData: e.detail.encryptedData, //	是	string	加密数据
        iv: e.detail.iv, //是	string	初始向量
        openid: openid2,

      },
      method: 'post',
      success: function (res) {

        console.log(res)
        wx.showToast({
          title: "获取手机号成功",
        })
        that.setData({
          tel: res.data.phoneNumber,
           getphone:true
        })
        const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
        perpage.onLoad()
        
      },
      fail: function (err) {
        console.log(err)
        wx.showToast({
          title: "获取手机号失败",
        })
      },

    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})