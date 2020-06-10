// pages/albumdetails/albumdetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tdetails: {
      img: "../../images/lissionsimage2.png",
      tit: "设计全套精品课程专辑",
      txt: '本套课程包含了橘子老师的全套五部超级合辑，包含了Photoshop、Lightroom、Illustrator、After Effects、XD、Sketchup，Vray，Lumion八大设计软件的应用技法讲解'

    },
    openid: "",
    albumdetailsid: "",
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    imgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var openid = wx.getStorageSync('openid')
    that.setData({
      openid: openid,
      albumdetailsid: options.albumdetailsid
    })
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos_info',
      data: {
        id: that.data.albumdetailsid
      },
      method: 'post',
      success: function (res) {

        console.log(res)

        that.setData({
          imgList: res.data.data.smallimages,
          admin_id: res.data.data.admin_id,
          falseprice: res.data.data.falseprice,
          id: res.data.data.id,
          infocontent: res.data.data.infocontent,
          name: res.data.data.name,
          price: res.data.data.price,

          title: res.data.data.title,
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
  buy:function(e){
    wx.navigateTo({ url: '../lession/affirmorder?affirmorderid=' + e.currentTarget.dataset.id })
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