// pages/active/active-details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes:"",
    activeId:"",
    grey:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this
   that.setData({
      activeId:options.activeId
    })
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/active_info',
      data: {
        id:that.data.activeId
      },
      method: 'post',
      success: function (res) {

        console.log(res)

        that.setData({
          endtime:res.data.data.endtime, 
          name:res.data.data.name,
          siteswitch:res.data.data.siteswitch,
          smallimage: res.data.data.smallimage,
          starttime: res.data.data.starttime,
          status: res.data.data.status,
          stitle: res.data.data.stitle,
          grey:res.data.data.grey,
          submit_num:res.data.data.submit_num,
          nodes:res.data.data.activecontent.replace(/(<img[\s\S]+?)/ig, '<img style="max-width:100% !important;margin:0 auto;display:block"'),
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
  baoming:function(){
    if(this.data.grey == 0){
      wx.navigateTo({
        url: '../ruzhu/ruzhu',
      })
    }
    if(this.data.grey == 1){
      wx.showToast({
        title: '活动未开始或已结束',
        icon:"none"
      })
    }
   
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