// pages/collect/collect.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: [
      {
        "activityimage": "../../images/collectlist.jpg",
        "activityname": "设计全套精品课程专辑",
        "type": "设计软件的应用技法讲解"
      },
      {
        "activityimage": "../../images/collectlist.jpg",
        "activityname": "设计全套精品课程专辑",
        "type": "设计软件的应用技法讲解"
      }
    ],
    openid: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var openid = wx.getStorageSync('openid')
    that.setData({
      openid: openid,
    })
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos_my',
      data: {
        openid: that.data.openid,
        page:1
      },
      method: 'post',
      success: function (res) {

        console.log(res)

        that.setData({
          activity: res.data.data,
          
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  watch:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({ url: '../selectclass/selectclass?videoid=' + e.currentTarget.dataset.id })
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