// pages/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:
      {
    url: "../../images/orderlist.png",
    name: "运输中",
    dev: "圆通快递",
    type: "88179033030612",
    state: "待收货",
    btn: [
      {
        text: "删除",
        index: "3"
      },
      {
        text: "再来一单",
        index: "4"
      },
    ],
    num: "x1",
    allnum: "共一件商品",
    money: "132",
    allmoney: "132",
    cuidanbtn: ""
  }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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