// pages/myAddresss/myAddress.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rows: [],
    page: 0,
    id:'',
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var openid = wx.getStorageSync('openid')
    //console.log(openid)
    this.setData({
      openid:openid,
      id:options.videoid
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos_goinfo',
      data: {
        openid:that.data.openid,
        id:that.data.id
      },
      method: 'post',
      success: function (res) {
        
        console.log(res)
        that.setData({
          rows:res.data.data.lesson
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  gonext(e){
    
   // console.log(e.currentTarget.dataset.classid)
    wx.navigateTo({ url: '../video/video?id=' + this.data.id +'&lessionid=' + e.currentTarget.dataset.classid })




  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //wx.hideHomeButton()
    // if (getApp().shuaXin.address) {
    //   var that = this
    //   that.data.page = 0
    //   that.request()
    //   getApp().shuaXin.address = false
    // }
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
   * 去编辑
   */
  
})