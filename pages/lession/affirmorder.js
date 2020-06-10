// pages/lession/affirmorder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[
      {
        img:"../../images/lissionsimage2.png",
        name:"ps教程超级合集【1000集冠军课】",
        time:"永久有效",
        check:"false",
        checked:true
      }, {
        img: "../../images/lissionsimage2.png",
        name: "ps教程超级合集【1000集冠军课】",
        time: "永久有效",
        check: "false",
        checked: true
      },
      {
        img: "../../images/lissionsimage2.png",
        name: "ps教程超级合集【1000集冠军课】",
        time: "永久有效",
        check: "false",
        checked: true
      }
    ],
    openid:"",
    affirmorderid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var openid = wx.getStorageSync('openid')
    that.setData({
      openid:openid,
      affirmorderid:options.affirmorderid
    })
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos_showorder',
      data: {
        openid:that.data.openid,
        id:that.data.affirmorderid
      },
      method: 'post',
      success: function (res) {
        
        console.log(res)
        
        that.setData({
          admin_id: res.data.data.admin_id,
id:  res.data.data.id,
name:  res.data.data.name,
order_time: res.data.data.order_time,
price:  res.data.data.price,
smallimage:  res.data.data.smallimage,
title:  res.data.data.title,
user_nickname:  res.data.data.user_nickname,
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  pay:function(e){
    console.log(e)
    var that =this
    console.log(e)
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos_orderpay',
      data: {
        openid: that.data.openid,
        id:that.data.id,
        admin_id:that.data.admin_id,
      },
      method: 'post',
      success: function (res) {

        console.log(res.data)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success (res) { 
            wx.showToast({
              title: '支付成功',
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 2000);
          },
          fail (res) {
            wx.showToast({
              title: '支付失败',
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 2000);
           }
        })

      },
      fail: function (err) {
        console.log(err)
      },

    })
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