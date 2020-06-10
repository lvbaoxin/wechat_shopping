// pages/lessionalbum/lessionalbum.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      {
        id: 1,
        name: '价格降序'
      },
      {
        id: 2,
        name: '价格升序'
      },
      {
        id: 3,
        name: '销量降序'
      },{
        id: 4,
        name: '销量升序'
      }
      
      

    ],
    tabTxt: [ '排序'],//分类
    tab: [true, true, true],
    pinpaiList: [{ 'id': '1', 'title': '类型1' }, { 'id': '1', 'title': '类型2' }],
    pinpai_id: 0,//品牌
    pinpai_txt: '',
    jiage_id: 0,//价格
    jiage_txt: '',
    xiaoliang_id: 0,//销量
    xiaoliang_txt: '',
    alreadyOrder: [
      {
        url: "../../images/orderlist.png",
        name: "个人职业生涯计划",
        dev: "习惯、改善学习习惯和方法",
        type: "销量：7885",
        state: "../../images/fire.png",
        allnum: "16节课*20分钟/节",
        allmoney: "¥2100/专辑",
        cuidanbtn: ""
      },
      {
        url: "../../images/orderlist.png",
        name: "个人职业生涯计划",
        dev: "习惯、改善学习习惯和方法",
        type: "销量：7885",
        state: "../../images/fire.png",
        allnum: "16节课*20分钟/节",
        allmoney: "¥2100/专辑",
        cuidanbtn: ""
      }
    ],
    openid: "",
  },
  //搜索提交
  searchSubmit: function (event) {
    console.log(event.detail.value.teamSearchKeyWords)
    var that = this
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos_list',
      data: {
        page:1,
        like:event.detail.value.teamSearchKeyWords
      },
      method: 'post',
      success: function (res) {

        console.log(res)

        that.setData({
          alreadyOrder: res.data.data,
          
        })
      },
      fail: function (err) {
        console.log(err)
      },

    }); 

  },
  filterTab: function (e) {
    var data = [true, true, true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  bindPickerChange: function(e) {
    console.log(e)
    
    var that = this
    console.log(e.detail.value)
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos_list',
      data: {
        page:1,
        order:e.detail.value
      },
      method: 'post',
      success: function (res) {

        console.log(res)

        that.setData({
          alreadyOrder: res.data.data,
          "tab[0]":true
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  

  //加载数据
  getDataList: function () {
    //调用数据接口，获取数据


  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var openid = wx.getStorageSync('openid')
    that.setData({
      openid: openid,
    })
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/videos_list',
      data: {
        page:1
      },
      method: 'post',
      success: function (res) {

        console.log(res)

        that.setData({
          alreadyOrder: res.data.data,
          
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