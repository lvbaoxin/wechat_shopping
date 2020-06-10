// pages/lession/lession.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexlink: [{
        imagepath: "../../images/lession-linnk1.png",
        text: "课程分类",
        link: '../lessiontype/lessiontype',
      },
      {
        imagepath: "../../images/lession-linnk2.png",
        text: "课程专辑",
        link: '../lessionalbum/lessionalbum'
      },
      {
        imagepath: "../../images/lession-linnk3.png",
        text: "平台活动"
      },
      {
        imagepath: "../../images/lession-linnk4.png",
        text: "商家入驻",
        link: '../ruzhu/ruzhu'
      },
    ],
    activity: [{
        "activityimage": "../../images/lessimage.png",
        "activityname": "死磕原理-分子间作用力详解",
        "activitypeople": "20人购买"
      },
      {
        "activityimage": "../../images/lessimage.png",
        "activityname": "死磕原理-分子间作用力详解",
        "activitypeople": "20人购买"
      },
    ],
    imgList: [{
        imagepath: "../../images/lessionbg.jpg",
        link: '../search-details/search-details',
      }, {
        imagepath: "../../images/lessionbg.jpg",
        link: '../search-details/search-details',
      },
      {
        imagepath: "../../images/lessionbg.jpg",
        link: '../search-details/search-details',
      }
    ],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 3000,
    duration: 500
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
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos',
      data: {

      },
      method: 'post',
      success: function (res) {

        console.log(res)

        that.setData({
          imgList: res.data.data.banner,
          activity: res.data.data.videos
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  details: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../albumdetails/albumdetails?albumdetailsid=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showTabBar();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  formSubmit: function (e) {
    var that = this

    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos_list',
      data: {
        page: 1,
        like: e.detail.value.search,
        order: 1
      },
      method: 'post',
      success: function (res) {
        that.setData({
          activity: res.data.data
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
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