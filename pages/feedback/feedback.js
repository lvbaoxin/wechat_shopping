// pages/feedback/feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea:"",
    user:'',
    tel:'',
    openid:""
  },

  // 手机号部分

  inputPhoneNum: function (e) {

    let phoneNumber = e.detail.value

    if (phoneNumber.length === 11) {

      let checkedNum = this.checkPhoneNum(phoneNumber)

    }

  },

  checkPhoneNum: function (phoneNumber) {

    let str = /^1\d{10}$/

    if (str.test(phoneNumber)) {

      return true

    } else {

      wx.showToast({

        title: '手机号不正确',
        icon:"none"
        

      })

      return false

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  formSubmit: function (e) {

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/feedback',
      data: {
        contents: e.detail.value.textarea,
        name: e.detail.value.user,
        mobile: e.detail.value.tel,
        openid:that.data.openid
      },
      method: 'post',
      success: function (res) {

        console.log(res)
        if (res.data.statusCode == "200"){
          wx.showToast({
            title: '提交成功',
          })
          
        }
        else{
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
        }
      },
      fail: function (err) {
        console.log(err)
      },

    });
    setTimeout(() => {
      wx.switchTab({
        url: '../my/my',
      })
    }, 2000);
    
    this.setData({

      allValue: e.detail.value

    })

  },
  onLoad: function (options) {
    var openid = wx.getStorageSync('openid')
    var that = this
    that.setData({
      openid:openid
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