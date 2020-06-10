// pages/classify/classify.js

const utils = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyItems: [],
    curNav: '',
    curIndex: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
    this.classifyShow();
  },

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
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos_category',
      data: {
        page:1,
        cid:that.data.curNav
      },
      method: 'post',
      success: function (res) {
        console.log(res)
        that.setData({
          classifyItems:res.data.data.category,
          shopClassifyDtoList:res.data.data.videos
         
        })     
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  godetails:function(e){
    wx.navigateTo({
      url: '../albumdetails/albumdetails?albumdetailsid='+e.currentTarget.dataset.id,
    })
  }
})