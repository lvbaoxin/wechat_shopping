// pages/video/video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    neirong: "",
    videoid:"",
    openid:"",
    lessionid:'',
    url:'',
    nodes:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    var openid = wx.getStorageSync('openid')
    that.setData({
      openid: openid,
      videoid:options.id,
      lessionid:options.lessionid
    })
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos_lesson',
      data: {
        openid: that.data.openid,	
        id: that.data.videoid,	
       lesson_id:that.data.lessionid
      },
      method: 'post',
      success: function (res) {

        console.log(res)

        that.setData({
          //activity: res.data.data,
          url:res.data.data.url,
          nodes:res.data.data.infocontent.replace(/(<img[\s\S]+?)/ig, '<img style="width:100%;margin:0 auto;display:block"'),
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