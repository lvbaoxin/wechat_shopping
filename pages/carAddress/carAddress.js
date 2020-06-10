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
    openid: "",
    mobile: "", //是	string	收货手机号
    name: "",
    address: "", //是	string	收货姓名
    prov: "", //是	int	省id
    city: "", //是	int	市id
    area: "", //是	int	区id
    goodsId:'',
    num:''
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  onLoad: function (options) {
    console.log(options)
    var openid = wx.getStorageSync('openid')
    var that = this;
    that.setData({
      openid: openid,
      goodsId:options.goodsId,
      num:options.num,
    })

  },
  //表单提交按钮
  formSubmit: function (e) {
    var that = this
    console.log(that.data.region[0])
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/address_add',
      data: {
        openid: that.data.openid,
        mobile: e.detail.value.tel, //是	string	收货手机号
        name: e.detail.value.user,
        address: e.detail.value.xiangxiadd, //是	string	收货姓名
        prov: that.data.region[0], //是	int	省id
        city: that.data.region[1], //是	int	市id
        area: that.data.region[2], //是	int	区id

      },
      method: 'post',
      success: function (res) {

        wx.showToast({
          title: res.data.msg,
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../affirmorder/affirmorder?mobile=' + e.detail.value.tel + '&name=' + e.detail.value.user + "&address=" + e.detail.value.xiangxiadd + "&prov=" + that.data.region[0] + "&city=" + that.data.region[1] + "&area=" + that.data.region[2]  + "&goodsId=" + that.data.goodsId+ "&num=" + that.data.num,
          })


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