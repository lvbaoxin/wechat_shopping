// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{
        name: '全部',
        index: 0
      }, {
        name: '待付款',
        index: 1
      }, {
        name: '待发货',
        index: 2
      },
      {
        name: '待收货',
        index: 3
      }, {
        name: '已完成',
        index: 4
      }, {
        name: '待评价',
        index: 5
      }
    ],
    openid: "",
    status: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = wx.getStorageSync('openid')
    this.setData({
      openid: openid
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    // 页面渲染完成
    //this.getDeviceInfo()
    //this.orderShow()
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/order',
      data: {
        openid: that.data.openid,
        page: '1',
        status: -1

      },
      method: 'post',
      success: function (res) {
        that.setData({
          alreadyOrder: res.data.data
        })
        var maps = new Map([
          ['0', '待付款'],
          ['1', '待发货'],
          ['2', '待收货'],
          ['3', '已完成'],
          ['4', '待评价']
        ]);
        that.data.alreadyOrder = that.data.alreadyOrder.map(element => {
          element.status = maps.get(element.status);
          return element;
        });
        that.setData({
          alreadyOrder: that.data.alreadyOrder
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },

  /**
   * @Explain：选项卡点击切换
   */
  tabSwitch: function (e) {
    console.log(e.currentTarget.dataset.current)
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
    switch (e.currentTarget.dataset.current) {
      case 0:
        wx.request({
          url: app.d.ceshiUrl + 'public/api/Miniapp/order',
          data: {
            openid: that.data.openid,
            page: '1',
            status: -1

          },
          method: 'post',
          success: function (res) {
            console.log(res)
            that.setData({
              alreadyOrder: res.data.data
            })
            var maps = new Map([
              ['0', '待付款'],
              ['1', '待发货'],
              ['2', '待收货'],
              ['3', '已完成'],
              ['4', '待评价']
            ]);
            that.data.alreadyOrder = that.data.alreadyOrder.map(element => {
              element.status = maps.get(element.status);
              return element;
            });
            that.setData({
              alreadyOrder: that.data.alreadyOrder
            })
          },
          fail: function (err) {
            console.log(err)
          },

        });
        break;
      case 1:
        wx.request({
          url: app.d.ceshiUrl + 'public/api/Miniapp/order',
          data: {
            openid: that.data.openid,
            page: '1',
            status: 0

          },
          method: 'post',
          success: function (res) {
            console.log(res)
            that.setData({
              alreadyOrder: res.data.data
            })
            var maps = new Map([
              ['0', '待付款'],
              ['1', '待发货'],
              ['2', '待收货'],
              ['3', '已完成'],
              ['4', '待评价']
            ]);
            that.data.alreadyOrder = that.data.alreadyOrder.map(element => {
              element.status = maps.get(element.status);
              return element;
            });
            that.setData({
              alreadyOrder: that.data.alreadyOrder
            })
          },
          fail: function (err) {
            console.log(err)
          },

        });
        break;
      case 2:
        wx.request({
          url: app.d.ceshiUrl + 'public/api/Miniapp/order',
          data: {
            openid: that.data.openid,
            page: '1',
            status: 1

          },
          method: 'post',
          success: function (res) {
            console.log(res)
            that.setData({
              alreadyOrder: res.data.data
            })
            var maps = new Map([
              ['0', '待付款'],
              ['1', '待发货'],
              ['2', '待收货'],
              ['3', '已完成'],
              ['4', '待评价']
            ]);
            that.data.alreadyOrder = that.data.alreadyOrder.map(element => {
              element.status = maps.get(element.status);
              return element;
            });
            that.setData({
              alreadyOrder: that.data.alreadyOrder
            })
          },
          fail: function (err) {
            console.log(err)
          },

        });
        break;
      case 3:
        wx.request({
          url: app.d.ceshiUrl + 'public/api/Miniapp/order',
          data: {
            openid: that.data.openid,
            page: '1',
            status: 2

          },
          method: 'post',
          success: function (res) {
            console.log(res)
            that.setData({
              alreadyOrder: res.data.data
            })
            var maps = new Map([
              ['0', '待付款'],
              ['1', '待发货'],
              ['2', '待收货'],
              ['3', '已完成'],
              ['4', '待评价']
            ]);
            that.data.alreadyOrder = that.data.alreadyOrder.map(element => {
              element.status = maps.get(element.status);
              return element;
            });
            that.setData({
              alreadyOrder: that.data.alreadyOrder
            })
          },
          fail: function (err) {
            console.log(err)
          },

        });
        break;
      case 4:
        wx.request({
          url: app.d.ceshiUrl + 'public/api/Miniapp/order',
          data: {
            openid: that.data.openid,
            page: '1',
            status: 3

          },
          method: 'post',
          success: function (res) {
            console.log(res)
            that.setData({
              alreadyOrder: res.data.data
            })
            var maps = new Map([
              ['0', '待付款'],
              ['1', '待发货'],
              ['2', '待收货'],
              ['3', '已完成'],
              ['4', '待评价']
            ]);
            that.data.alreadyOrder = that.data.alreadyOrder.map(element => {
              element.status = maps.get(element.status);
              return element;
            });
            that.setData({
              alreadyOrder: that.data.alreadyOrder
            })
          },
          fail: function (err) {
            console.log(err)
          },

        });
        break;
      case 5:
        wx.request({
          url: app.d.ceshiUrl + 'public/api/Miniapp/order',
          data: {
            openid: that.data.openid,
            page: '1',
            status: 4

          },
          method: 'post',
          success: function (res) {
            console.log(res)
            that.setData({
              alreadyOrder: res.data.data
            })
            var maps = new Map([
              ['0', '待付款'],
              ['1', '待发货'],
              ['2', '待收货'],
              ['3', '已完成'],
              ['4', '待评价']
            ]);
            that.data.alreadyOrder = that.data.alreadyOrder.map(element => {
              element.status = maps.get(element.status);
              return element;
            });
            that.setData({
              alreadyOrder: that.data.alreadyOrder
            })
          },
          fail: function (err) {
            console.log(err)
          },

        });
        break;
      default:
        break;
    }
  },
  shanchu:function(e){
    //console.log(e.currentTarget.dataset.id)
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/ord_del',
      data: {
        openid: that.data.openid,
        id:e.currentTarget.dataset.id

      },
      method: 'post',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '../../pages/orderDetails/orderDetails',
          })
        }, 2000);
        
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  fukuan:function(e){
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/ord_pay',
      data: {
        openid: that.data.openid,
        id:e.currentTarget.dataset.id

      },
      method: 'post',
      success: function (res) {
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success(res) {
            wx.showToast({
              title: '支付成功',
            })
            
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 2000);

            
          },
          fail(res) {
            wx.showToast({
              title: '支付失败',
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 2000);
          }
        })
        
      },
      
      fail: function (err) {
        console.log(err)
      },

    });
  },
  cuidan:function(e){
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/ord_quickly',
      data: {
        openid: that.data.openid,
        id:e.currentTarget.dataset.id

      },
      method: 'post',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        that.onShow()
        
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  pingjia:function(e){

  },
  zailai:function(e){
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/ord_again',
      data: {
        openid: that.data.openid,
        id:e.currentTarget.dataset.id

      },
      method: 'post',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        that.onShow()
        
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  chakan:function(e){
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/ord_kd',
      data: {
        openid: that.data.openid,
        id:e.currentTarget.dataset.id

      },
      method: 'post',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        that.onShow()
        
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  queren:function(e){
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/ord_take',
      data: {
        openid: that.data.openid,
        id:e.currentTarget.dataset.id

      },
      method: 'post',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '../../pages/orderDetails/orderDetails',
          })
        }, 2000);
        
      },
      fail: function (err) {
        console.log(err)
      },

    });
  }


})