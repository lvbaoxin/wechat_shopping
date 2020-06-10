// pages/addAddress/addAddress.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bean: "",
    region: ['全部', '', ''],
    customItem: '全部',
    multiIndex: [0, 0, 0],
    proList: [],
    cityList: [],
    townList: [],
    openid: ""
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  onLoad: function (options) {
    var openid = wx.getStorageSync('openid')
    var that = this;
    that.setData({
      openid: openid
    })

  },
  //表单提交按钮
  formSubmit: function (e) {
    console.log(this.data.region[0])
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/address_add',
      data: {
        openid: this.data.openid,
        mobile: e.detail.value.tel, //是	string	收货手机号
        name: e.detail.value.user,
        address: e.detail.value.xiangxiadd, //是	string	收货姓名
        prov: this.data.region[0], //是	int	省id
        city: this.data.region[1], //是	int	市id
        area: this.data.region[2], //是	int	区id

      },
      method: 'post',
      success: function (res) {

        wx.showToast({
          title: res.data.msg,
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '../myAddress/myAddress',
          })

          // wx.navigateBack({
          //   delta: 1, // 返回上一级页面。

          // })
        }, 2000);
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




})