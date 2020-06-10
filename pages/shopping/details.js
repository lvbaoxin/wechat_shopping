// pages/detail/detail.js

const utils = require('../../utils/util.js');
var imgUrls = [];
var detailImg = [];
var goodsId = null;
var goods = null;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:1,
    jiaru:true,
    isLike: false,
    showDialog: false,
    goods: null,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    multiArray: ['圆通', '顺丰', '韵达'],
    goodsItem: {
      activityId: null,
      buyRate: 0,
      classifyId: null,
      clickRate: 165,
      createDate: null,
      desc: null,
      imgUrls: ["../../images/details.jpg", "../../images/details.jpg"],
      details: ["https://img11.360buyimg.com/cms/jfs/t16906/54/833236005/285759/a76b529c/5aab7897N99b5ff48.jpg", "https://img10.360buyimg.com/imgzone/jfs/t15508/352/1652696048/105724/c31328ca/5a583251N697ca464.png"],
      discount: "9.6",
      height: 180,
      title: "", //商品副标题
      price: "", //商品价格
      sell_num: "", //	销量
      thumbimage: "", //	商品图片
      thumbimages: "", //商品图组
      infocontent: "", //详情
      postagedata: "", //是否包邮
      postageprice: "", //	邮费价格
      birthdaytime: "", //	生产日期
      createcode: "", //生产许可证编号
      guige: "", //规格
      serve: "", //服务
      name: "",
      price: 85,
      serve: "",
      privilegePrice: 89,
      sellnum: "",
      remark: null,
      shopGoodsImageList: null,
      stock: 0,
      updateDate: "null",
      count: 1
      
    },
    pingjia: [],
    select: false,
    currtab: 0,
    swipertab: [{
      name: '商品详情',
      index: 0
    }, {
      name: '商品评价',
      index: 1
    }],
    openid:"",
    goodsId:"",
    lunbotu:false,
    pingjia1:true,

  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false
    })
  },
  tabSwitch: function(e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
    console.log(e.target.dataset.current)
    if(e.target.dataset.current == 0){
      that.setData({
        lunbotu:false,
        pingjia1:true,
      })  
    }
    if(e.target.dataset.current == 1){
      that.setData({
        lunbotu:true,
        pingjia1:false,
      })
    }
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  tabChange: function(e) {
    this.setData({
      currtab: e.detail.current
    })
    //this.orderShow()
  },

  //预览图片
  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
    wx.showToast({
      title: "data.message",
      icon: 'success',
      duration: 2000
    });

  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '../shopcar/shopcar'
    })
  },
  // 立即购买
  immeBuy() {
    this.setData({
      jiaru:false
    })
    
  },
  addCar(e){
    console.log(e)
    this.setData({
      jiaru:true
    })
    wx.navigateTo({ url: '../affirmorder/affirmorder?goodsId=' + goodsId+'&num='+e.currentTarget.dataset.num})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var openid = wx.getStorageSync('openid')
    var that = this;
    that.setData({
      openid:openid,
      goodsId:options.goodsId
    })
    goodsId = options.goodsId;
    console.log('goodsId:' + goodsId);
    //加载商品详情
    //that.goodsInfoShow();
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/goodsinfo',
      data: {
        goods_id: goodsId
      },
      method: 'post',
      success: function(res) {
        console.log(res)
        that.setData({
          name: res.data.data.name,
          sellnum: res.data.data.sell_num,
          title: res.data.data.title, //商品副标题
          price: res.data.data.price,//商品价格
          sell_num: res.data.data.sell_num, //	销量
          thumbimage: res.data.data.thumbimage, //	商品图片
          thumbimages: res.data.data.thumbimages, //商品图组
          infocontent: res.data.data.infocontent, //详情
          postagedata: res.data.data.postagedata, //是否包邮
          postageprice: res.data.data.postageprice, //	邮费价格
          birthdaytime: res.data.data.birthdaytime, //	生产日期
          createcode: res.data.data.createcode, //生产许可证编号
          guige: res.data.data.guige, //规格
          serve: res.data.data.serve ,//服务
          infoimages:res.data.data.infoimages
        })
      },
      fail: function(err) {
        console.log(err)
      },

    });
    //获取评价
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/talk',
      data: {
        goods_id: that.data.goodsId,
        page:1
      },
      method: 'post',
      success: function (res) {
        
        that.setData({
          pingjia: res.data.data.list
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
  onReady: function() {
    this.getDeviceInfo()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * sku 弹出
   */
  toggleDialog: function() {
    // this.setData({
    //   showDialog: !this.data.showDialog
    // });
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/car_add',
      data: {
        openid:that.data.openid,
        id:goodsId
      },
      method: 'post',
      success: function (res) {
        
        //console.log(res)
        wx.showToast({
          title:res.data.msg,
          icon:"none"
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });



  },
  /**
   * sku 关闭
   */
  closeDialog: function() {
    console.info("关闭");
    this.setData({
      showDialog: false
    });
  },
  /* 减数 */
  delCount: function(e) {
    console.log("刚刚您点击了减1");
    var count = this.data.goods.count;
    // 商品总数量-1
    if (count > 1) {
      this.data.goods.count--;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  /* 加数 */
  addCount: function(e) {
    console.log("刚刚您点击了加1");
    var count = this.data.goods.count;
    // 商品总数量-1  
    if (count < 10) {
      this.data.goods.count++;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  //价格计算
  priceCount: function(e) {
    this.data.goods.totalMoney = this.data.goods.price * this.data.goods.count;
    this.setData({
      goods: this.data.goods
    })
  },
  /**
   * 加入购物车
   */
  // addCar: function(e) {
  //   var goods = this.data.goods;
  //   goods.isSelect = false;
  //   var count = this.data.goods.count;

  //   var title = this.data.goods.title;
  //   if (title.length > 13) {
  //     goods.title = title.substring(0, 13) + '...';
  //   }

  //   // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
  //   var arr = wx.getStorageSync('cart') || [];
  //   console.log("arr,{}", arr);
  //   if (arr.length > 0) {
  //     // 遍历购物车数组  
  //     for (var j in arr) {
  //       // 判断购物车内的item的id，和事件传递过来的id，是否相等  
  //       if (arr[j].goodsId == goodsId) {
  //         // 相等的话，给count+1（即再次添加入购物车，数量+1）  
  //         arr[j].count = arr[j].count + 1;
  //         // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
  //         try {
  //           wx.setStorageSync('cart', arr)
  //         } catch (e) {
  //           console.log(e)
  //         }
  //         //关闭窗口
  //         wx.showToast({
  //           title: '加入购物车成功！',
  //           icon: 'success',
  //           duration: 2000
  //         });
  //         this.closeDialog();
  //         // 返回（在if内使用return，跳出循环节约运算，节约性能） 
  //         return;
  //       }
  //     }
  //     // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
  //     arr.push(goods);
  //   } else {
  //     arr.push(goods);
  //   }
  //   // 最后，把购物车数据，存放入缓存  
  //   try {
  //     wx.setStorageSync('cart', arr)
  //     // 返回（在if内使用return，跳出循环节约运算，节约性能） 
  //     //关闭窗口
  //     wx.showToast({
  //       title: '加入购物车成功！',
  //       icon: 'success',
  //       duration: 2000
  //     });
  //     this.closeDialog();
  //     return;
  //   } catch (e) {
  //     console.log(e)
  //   }


  // }
  getDeviceInfo: function() {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
  // 加法
  add: function (e) {
    // console.log(this.data.count)
    this.data.count++; // 在data中定义的count值++
    //  然后在设置一下count值
    this.setData({
      count: this.data.count
    })
  },
  // 减法  
  can: function (e) {
    this.data.count--;
    // console.log(this.data.count)
    if (this.data.count <= 1) {
      this.data.count = 1
    }
    this.setData({
      count: this.data.count
    })
  },
})