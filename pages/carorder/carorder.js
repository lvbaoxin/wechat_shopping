// pages/confirmOrder/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 1,
    deliveryTime: [],
    multiArray: ['圆通', '顺丰', '韵达'],
    youhuiquan: ['1元', '2元', '3元'],
    alreadyOrder: [],
    addr_address: '',
    addr_area: '',
    addr_city: '',
    addr_mobile: '',
    addr_name: '',
    addr_prov: '',
    price_all: '',
    num_all: '',
    ordercomment: "",
    openid:"",
    num:"",
    carorder:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
    var openid = wx.getStorageSync('openid')
    var that = this
    that.setData({
      openid: openid,
      carorder:options.carorder,
      addr_address: options.address,
      addr_area: options.area,
      addr_city: options.city,
      addr_mobile: options.mobile,
      addr_name: options.name,
      addr_prov: options.prov,
    })
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/order_info',
      data: {
        openid: that.data.openid,
        car_ids:that.data. carorder,
      },
      method: 'post',
      success: function (res) {

        console.log(res)
        that.setData({
          addr_address: res.data.data.addr_address,
          addr_area: res.data.data.addr_area,
          addr_city: res.data.data.addr_city,
          addr_mobile: res.data.data.addr_mobile,
          addr_name: res.data.data.addr_name,
          addr_prov: res.data.data.addr_prov,
          alreadyOrder: res.data.data.god_all[0],
          price_all: res.data.data.price_all,
          num_all: res.data.data.num_all,
          postageprice:res.data.data.postageprice

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
  ordercomment: function (e) {
    console.log(e)
    this.setData({
      ordercomment: e.detail.value
    })
  },
  confirmbuttom: function (e) {
    var that =this
    console.log(that.data)
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/order_info_pay',
      data: {
        openid: that.data.openid,
        num: that.data.num,
        prov: that.data.addr_prov, //	是	string	省(汉字)
        city: that.data.addr_city, //	是	string	市(汉字)
        area: that.data.addr_area, //	是	string	区(汉字)
        ids: that.data.carorder,//	是	string	商品id（英文格式逗号分隔:1,2,3）
        name:that.data.addr_name, //	是	string	收货姓名
        mobile:that.data.addr_mobile, //	是	string	收货电话
        address_info:that.data.addr_address, //是	string	详细地址
        goods_price:that.data.price_all, //是	string	总金额
        post_price:that.data.postageprice, //	是	string	总邮费
        buy_num: that.data.num_all, //是	string	总数量
        other: that.data.ordercomment,//	是	string	备注
      },
      method: 'post',
      success: function (res) {

        
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success (res) { 
            wx.showToast({
              title: '支付成功',
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 2000);
          },
          fail (res) { 
            if(that.data.addr_name == ''){
              
              wx.showToast({
              title: '请填写收货地址',
              icon:"none"
            })
            }else{
              wx.showToast({
                title: '支付失败',
                icon:"none"
              })
            }
            
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

    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/order_info',
      data: {
        openid: that.data.openid,
        car_ids:that.data.carorder,
      },
      method: 'post',
      success: function (res) {

        console.log(res)
        that.setData({
          addr_address: res.data.data.addr_address,
          addr_area: res.data.data.addr_area,
          addr_city: res.data.data.addr_city,
          addr_mobile: res.data.data.addr_mobile,
          addr_name: res.data.data.addr_name,
          addr_prov: res.data.data.addr_prov,
          alreadyOrder: res.data.data.god_all[0],
          price_all: res.data.data.price_all,
          num_all: res.data.data.num_all,
          postageprice: res.data.data.postageprice

        })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindyouhuiquan: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  addaddress:function(){
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  bianJi: function (e) {
    console.log(e)
   
    wx.navigateTo({
      url: '/pages/myAddress/myAddress',
    })
  },






})