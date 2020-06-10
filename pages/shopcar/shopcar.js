const app = getApp()
var idstring;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isDelete: 0,
    iscart: false, //控制购物车有没有数据
    total: 0, //总金额
    allsel: false, //全选
    totalCount: 0, //商品数量
    idx: 0, //选中商品的下标
    goodsId_arr: [],
    openid: "",
    checkall: true,
    ids: [],
    idarr: [],
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var openid = wx.getStorageSync('openid')
    var that = this
    that.setData({
      openid: openid
    })
    //请求列表接口
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/car',
      data: {
        openid: that.data.openid
      },
      method: 'post',
      success: function (res) {
        
        let totalPrice = 0;
        

        let num = 0;
        let shopcar = res.data.data;
        for (let i = 0; i < shopcar.length; i++) {
          totalPrice += shopcar[i].price * shopcar[i].goods_num;
          num += shopcar[i].goods_num;
        }
        for (var i = 0; i < res.data.data.length; i++) {
          that.data.idarr.push(res.data.data[i].id)
          
        }
        console.log(res.data.data)

        that.setData({
          cartList: res.data.data,
          total: totalPrice.toFixed(2), //总价格
          idarr: that.data.idarr
        })
        idstring = that.data.idarr.toString()
        console.log(idstring)
        // var gooosnum;
        
        
        // for (let i = 0; i < shopcar.length; i++) {
        //   gooosnum = shopcar[i].goods_num;
        //   console.log(gooosnum)
        //   if (gooosnum == 1) {
        //     that.setData({
        //       disabled: true
        //     })
        //   } else if (gooosnum < 2) {
        //     that.setData({
        //       disabled: false
        //     })
        //   }
        // }
      
        
      },
      fail: function (err) {
        console.log(err)
      },

    });
    

  },

  // 店铺中的全选
  storeselected: function (e) {
    var shopcar = this.data.cartList //购物车数据
    let index = e.currentTarget.dataset.index //当前店铺下标
    // console.log(JSON.stringify(shopcar) +"当前店铺下标:"+JSON.stringify(e));
    var thisstoredata = shopcar[index].goodsList //当前店铺商品数据
    // 改变当前店铺状态
    if (shopcar[index].shopCheck) {
      shopcar[index].shopCheck = false;
      for (let i in thisstoredata) { //改变店铺下面的商品状态
        shopcar[index].goodsList[i].check = false;
      }
    } else {
      shopcar[index].shopCheck = true;
      for (let i in thisstoredata) {
        shopcar[index].goodsList[i].check = true;
      }
    }
    this.setData({
      cartList: shopcar, //店铺下得商品数量
      idx: index
    })
    this.allallprices();
    this.getTotalPrice();
  },
  // 商品的选中
  goodsselected: function (e) {
    let _this = this;
    var shopcar = this.data.cartList //购物车数据
    let index = e.currentTarget.dataset.index //当前商品在店铺中的下标
    let idx = e.currentTarget.dataset.selectIndex;
    let cai = shopcar[idx].goodsList; //当前商品的店铺data.goodsList
    let curt = cai[index]; //当前商品数组
    var goods_id = e.currentTarget.dataset.goodsid; //选中的商品id
    this.data.goodsId_arr.push(goods_id); //选中的商品id  push到数组中
    console.log("去重后的商品id数组：" + this.data.goodsId_arr);

    if (curt.check) {
      shopcar[idx].goodsList[index].check = false; //改变当前商品状态
      shopcar[idx].shopCheck = false; //店铺状态改变
    } else {
      shopcar[idx].goodsList[index].check = true;
      console.log(shopcar[idx].goodsList[index].check);
      // 当店铺选中商品数量与店铺总数量相等时 改变店铺状态
      var storegoodsleg = shopcar[idx].goodsList.length; //店铺中商品个数
      var goodsList = shopcar[idx].goodsList;
      var selectedleg = 0;
      for (var i in goodsList) {
        if (goodsList[i].check) {
          selectedleg++;
        }
      }
      if (storegoodsleg == selectedleg) {
        shopcar[idx].shopCheck = true;
      }

    }
    // console.log(_this.data.allsel)
    this.setData({
      cartList: shopcar, //更新
      allsel: _this.data.allsel,
      idx: index,
      // goodsId_arr: temp
    })
    this.allallprices();
    this.getTotalPrice();
  },
  // //全选条件 条件->商铺全选择全选 反之
  allallprices: function () {
    var shopcar = this.data.cartList; //购物车数据
    let storenum = shopcar.length;
    let allselected = this.data.allsel;
    let allselectednum = 0;
    for (let i = 0; i < shopcar.length; i++) {
      if (shopcar[i].shopCheck == true) {
        allselectednum++;
      }
    }
    if (storenum == allselectednum) {
      allselected = true;
    } else {
      allselected = false;
    }
    this.setData({
      allsel: allselected
    })
    this.getTotalPrice();
  },
  // 点击全选
  selectalltap: function () {
    var shopcar = this.data.cartList; //购物车数据
    // console.log("购物车数据:"+shopcar);
    let allsel = this.data.allsel;
    if (allsel) {
      allsel = false
    } else {
      allsel = true
    }
    for (var i = 0, len = shopcar.length; i < len; i++) {
      shopcar[i].shopCheck = allsel;
      var goodsList = shopcar[i].goodsList
      for (var a = 0; a < goodsList.length; a++) {
        goodsList[a].check = allsel
      }
    }
    this.setData({
      cartList: shopcar, //最后赋值到data中渲染到页面
      allsel: allsel
    })
    this.getTotalPrice();

  },
  // // 加函数
  add: function (e) {
    console.log(e.currentTarget.dataset.id)
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/car_edit',
      data: {
        openid: that.data.openid,
        id: e.currentTarget.dataset.id,
        is_plus: 1
      },
      method: 'post',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        that.setData({
          disabled: false
        })
        const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
        perpage.onLoad()
        // setTimeout(() => {
        //   wx.redirectTo({
        //     url: '../../pages/orderDetails/orderDetails',
        //   })
        // }, 2000);

      },
      fail: function (err) {
        console.log(err)
      },

    });
  },

  checkboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      ids: e.detail.value
    })
    // console.log(this.data.ids)
  },
  // // 减函数
  reduce: function (e) {
    console.log(e.currentTarget.dataset.id)
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/car_edit',
      data: {
        openid: that.data.openid,
        id: e.currentTarget.dataset.id,
        is_plus: 2
      },
      method: 'post',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        var gooosnum;
        var shopcar = that.data.cartList;
        for (let i = 0; i < shopcar.length; i++) {
          gooosnum = shopcar[i].goods_num;
          console.log(gooosnum)
          // if (gooosnum == 2) {
        //   that.setData({
        //     disabled: true
        //   })
        }
        // if (gooosnum == 2) {
        //   that.setData({
        //     disabled: true
        //   })
        // } else if (gooosnum < 2) {
        //   that.setData({
        //     disabled: false
        //   })
        // }
        const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
        perpage.onLoad()

      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  // 计算总价和总数
  getTotalPrice: function () {
    let totalPrice = 0;
    let num = 0;
    // let shopcar = this.data.cartList[0].goodsList; //购物车数剧
    let shopcar = this.data.cartList; //购物车数剧
    // console.log(JSON.stringify(shopcar));
    for (let i = 0; i < shopcar.length; i++) {
      totalPrice += i.price * i.goods_num;
      num += i.goods_num;
      console.log("总价格:" + totalPrice);
    }

    this.setData({
      total: totalPrice.toFixed(2), //总价格
      totalCount: num //总数
    })
  },
  //点击编辑
  getEdit: function (e) {
    var edit = this.data.isDelete;
    if (edit == 0) {
      this.setData({
        isDelete: 1,
        checkall: false
      })
    } else {
      this.setData({
        isDelete: 0,
        checkall: true
      })
    }
  },
  deleteList: function (e) {

    //var that = this
    // var shopcar = this.data.cartList; //购物车数据
    // for (let i in shopcar) {
    //   for (let j in shopcar[i].goodslist) {
    //     if (shopcar[i].goodslist[j].check == true) {
    //       newArray.push(shopcar[i].goodslist[j].id);
    //     }
    //   }
    // }
    var that = this
    console.log(that.data.ids.toString())
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/car_del',
      data: {
        openid: that.data.openid,
        ids: that.data.ids.toString()
      },
      method: 'post',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
        perpage.onLoad()

      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  Settlement: function (e) {

    console.log(idstring)
    wx.navigateTo({
      url: '../carorder/carorder?carorder=' + idstring
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
    const pages = getCurrentPages()
    const perpage = pages[pages.length - 1]
    perpage.onLoad()
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

  },



})