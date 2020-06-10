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
      name: '系统公告',
      index: 1
    }, {
      name: '账户通知',
      index: 2
    },
    {
      name: '物流订单',
      index: 3
    }, {
      name: '优惠活动',
      index: 4
    }
    ],
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
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
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
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({
      currtab: e.detail.current
    })
    this.orderShow()
  },

  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
      case 3:
        that.daishouhuo()
        break
      case 4:
        that.yiwancheng()
        break
     
    }
  },
  // 全部
  alreadyShow: function () {
    this.setData({
      alreadyOrder: [
        {
          url: "../../images/icon5.png",
          name: "系统公告",
          dev: "订单支付完成：您的商城订单：92173809759999，已经支付完成，快递小哥正在安排发货，请等待！",
          time: "2018-12-15"       
        },
        {
          url: "../../images/icon5.png",
          name: "系统公告",
          dev: "订单支付完成：您的商城订单：92173809759999，已经支付完成，快递小哥正在安排发货，请等待！",
          time: "2018-12-15"
        }
        
      ]
    })
  },
  //待付款
  waitPayShow: function () {
    this.setData({
      waitPayOrder: [
        {
          url: "../../images/icon5.png",
          name: "系统公告",
          dev: "订单支付完成：您的商城订单：92173809759999，已经支付完成，快递小哥正在安排发货，请等待！",
          time: "2018-12-15"
        },
        {
          url: "../../images/icon5.png",
          name: "系统公告",
          dev: "订单支付完成：您的商城订单：92173809759999，已经支付完成，快递小哥正在安排发货，请等待！",
          time: "2018-12-15"
        }

      ]
    })
  },
  //待发货
  lostShow: function () {
    this.setData({
      lostOrder: [
        {
          url: "../../images/icon5.png",
          name: "系统公告",
          dev: "订单支付完成：您的商城订单：92173809759999，已经支付完成，快递小哥正在安排发货，请等待！",
          time: "2018-12-15"
        },
        {
          url: "../../images/icon5.png",
          name: "系统公告",
          dev: "订单支付完成：您的商城订单：92173809759999，已经支付完成，快递小哥正在安排发货，请等待！",
          time: "2018-12-15"
        }

      ]
    })
  },
  //待收货
  daishouhuo: function () {
    this.setData({
      daishouhuo: [
        {
          url: "../../images/icon5.png",
          name: "系统公告",
          dev: "订单支付完成：您的商城订单：92173809759999，已经支付完成，快递小哥正在安排发货，请等待！",
          time: "2018-12-15"
        },
        {
          url: "../../images/icon5.png",
          name: "系统公告",
          dev: "订单支付完成：您的商城订单：92173809759999，已经支付完成，快递小哥正在安排发货，请等待！",
          time: "2018-12-15"
        }

      ]
    })
  },
  //待完成
  yiwancheng: function () {
    this.setData({
      yiwancheng: [
        {
          url: "../../images/icon5.png",
          name: "系统公告",
          dev: "订单支付完成：您的商城订单：92173809759999，已经支付完成，快递小哥正在安排发货，请等待！",
          time: "2018-12-15"
        },
        {
          url: "../../images/icon5.png",
          name: "系统公告",
          dev: "订单支付完成：您的商城订单：92173809759999，已经支付完成，快递小哥正在安排发货，请等待！",
          time: "2018-12-15"
        }

      ]
    })
  },
  
  caozuo: function (e) {
    console.log(e)
  }

})