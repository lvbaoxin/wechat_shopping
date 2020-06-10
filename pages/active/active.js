// pages/active/active.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/active_list',
      data: {
        page: 1
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  activedetail: function (e) {
    var activeId = e.currentTarget.dataset.id;
    console.log('activeId:' + activeId);
    wx.navigateTo({
      url: '../active/active-details?activeId=' + activeId
    })

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