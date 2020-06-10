// pages/classify/classify.js

const utils = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    cateItems: [],
    curNav: 0,
    curIndex: 0,
    switchid:'',
  },

  switchRightTab: function (e) {
    let id = e.currentTarget.dataset.id, index = e.currentTarget.dataset.index;
    this.setData({
      curNav: id,
      curIndex: index,
      switchid:e.currentTarget.dataset.id
    })
    this.classifyShow();
  },
  //商品进入详情
  catchTapCategory: function (e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log('goodsId:' + goodsId);
    //新增商品用户点击数量
    //that.goodsClickShow(goodsId);
    //跳转商品详情
    wx.navigateTo({ url: '../shopping/details?goodsId=' + goodsId })
  },
  // //事件处理函数  
  // switchRightTab: function (e) {
  //   // 获取item项的id，和数组的下标值  
  //   let id = e.target.dataset.id,
  //     index = parseInt(e.target.dataset.index);
  //   // 把点击到的某一项，设为当前index  
  //   this.setData({
  //     curNav: id,
  //     curIndex: index
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.classifyShow();
  },
  classifyShow: function (success) {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/goods',
      data: {
        page:"1",//是	int	分页(要跳转到第几页)
        category_id:that.data.switchid,	//是	int	分类id(全部传0)
      },
      method: 'post',
      success: function(res) {
        res.data.data.category.unshift({id:0,name:"全部"})
       console.log(res)
        that.setData({
          cateItems:res.data.data.category,
          prolist:res.data.data.goods
        })
      },
      fail: function(err) {
        console.log(err)
      },
    })
  }
})