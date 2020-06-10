// pages/myAddresss/myAddress.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rows: [],
    page: 0,
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = wx.getStorageSync('openid')
    //console.log(openid)
    this.setData({
      openid:openid
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/address_list',
      data: {
        openid:that.data.openid
      },
      method: 'post',
      success: function (res) {
        
        console.log(res)
        that.setData({
          rows:res.data.data
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
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
  shanchu:function(e){
    console.log(e.currentTarget.dataset.id)
     var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/address_del',
      data: {
        openid:that.data.openid,
        id:e.currentTarget.dataset.id
      },
      method: 'post',
      success: function (res) {
        
       wx.showToast({
         title: '删除成功',
       })
       
       setTimeout(() => {
        wx.switchTab({
          url: '../my/my',
        })
       }, 2000);
       


      
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
   * 去编辑
   */
  bianJi: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: '/pages/exitAddress/exitAddress?id=' + id,
    })
  },

  /**
   * 删除
   */
  del: function (e) {
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中……',
            mask: true
          })
          // wx.request({
          //   url: getApp().appData.host + "UserDel", //仅为示例，并非真实的接口地址
          //   data: {
          //     "delID": id,
          //     "mod": "dress",
          //     "token": getApp().appData.userInfo.token
          //   },
          //   header: {
          //     'content-type': 'application/json', // 默认值
          //   },
          //   method: 'POST',
          //   success: function (res) {
          //     console.log("删除", res.data)
          //     //请求成功
          //     if (res.data.state == 1) {
          //       wx.hideLoading()
          //       wx.showToast({
          //         title: '删除成功',
          //       })
          //       that.data.rows.splice(index, 1)
          //       that.setData({
          //         rows: that.data.rows
          //       })
          //       getApp().shuaXin.addressDel =true
          //     } else {//请求失败
          //       wx.hideLoading()
          //       wx.showToast({
          //         title: '删除失败',
          //       })
          //     }
          //   },
          //   fail: function (res) {
          //     wx.hideLoading()
          //     wx.showToast({
          //       title: '请求失败',
          //     })
          //   },

          // })
        } else if (res.cancel) {

        }
      }
    })
  },

  /**
   * 默认
   */
  moRen: function (e) {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var item = e.currentTarget.dataset.item
    var BaoCunDiZhi = new Object()
    BaoCunDiZhi.ID = item.ID
    BaoCunDiZhi.uID = getApp().appData.userInfo.ID
    BaoCunDiZhi.uName = getApp().appData.userInfo.uName
    BaoCunDiZhi.provin = item.provin
    BaoCunDiZhi.city = item.city
    BaoCunDiZhi.town = item.town
    BaoCunDiZhi.street = ""
    BaoCunDiZhi.dress = item.dress
    BaoCunDiZhi.contact = item.contact
    BaoCunDiZhi.mobile = item.mobile
    BaoCunDiZhi.token = getApp().appData.userInfo.token
    BaoCunDiZhi.zip = ""
    BaoCunDiZhi.isdefault = !item.isdefault
    // wx.request({
    //   url: getApp().appData.host + "DressSave", //仅为示例，并非真实的接口地址
    //   data: {
    //     "json": JSON.stringify(BaoCunDiZhi),
    //     "token": getApp().appData.userInfo.token
    //   },
    //   header: {
    //     'content-type': 'application/json', // 默认值
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log("修改默认", res.data)
    //     //请求成功
    //     if (res.data.state == 1) {
    //       // wx.hideLoading()
    //       that.data.page = 0
    //       that.request()
    //     } else {//请求失败      
    //       wx.hideLoading()
    //     }
    //   },
    //   fail: function (res) {
    //     wx.hideLoading()
    //   },
    //   complete: function () {
    //     wx.stopPullDownRefresh();
    //   }
    // })
  },
  radioChange:function(e){
    var that = this
    console.log(e.detail.value)
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/address_default',
      data: {
        id:e.detail.value,
        openid:that.data.openid
      },
      method: 'post',
      success: function (res) {
        
        console.log(res)
        wx.showToast({
          title: "修改成功",
        })
        setTimeout(() => {
          wx.navigateBack({
            complete: (res) => {
              delta: 1
            },
          })
        }, 2000);
        
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  // 网络请求
  request: function () {
    var that = this
    if (that.data.page == 0) {
      that.data.rows = []
    }
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    
  },
  
})