//var fileData = require('../../utils/md5.js');
const app = getApp()
var token = "";
// var searchvalue="";
Page({
  data: {
    searchValue: "",
    searchData: [],
    
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/hotsearch_list',
      data: {
        
      },
      method: 'post',
      success: function (res) {
        
        console.log(res)
        
        that.setData({
          searchData: res.data.data,
          
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  onShow: function () {
    this.setData({
      searchValue: ""
    })
  },

  //输入内容时
  searchActiveChangeinput: function (e) {
    var val = e.detail.value;
    this.setData({
      showClearBtn: val != '' ? true : false,
      searchValue: val,
      searchinfo: val != '' ? false : true,
    })

  },
  //点击清除搜索内容
  searchActiveChangeclear: function (e) {
    this.setData({
      showClearBtn: false,
      searchValue: '',
    })
  },
  //点击聚集时
  focusSearch: function () {
    if (this.data.searchValue) {
      this.setData({
        showClearBtn: true
      })
    }
  },
  //搜索提交
  formSubmit: function (event) {
    console.log(event.detail.value.searchtext)
    var that = this;
    var searchtext = event.detail.value.searchtext
    wx.reLaunch
     ({ url: '../shopping/shopping?searchtext=' + searchtext })
  
  },
  
  //推荐产品跳转
  bindhistory: function (e) {
    var that = this;
   // console.log(e.currentTarget.dataset.name)
    var searchId = e.currentTarget.dataset.name
    wx.reLaunch
     ({ url: '../shopping/shopping?searchId=' + searchId })
  },
  //清除历史记录
  deleteHistory: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除历史搜索',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('searchData', []);
          that.setData({
            searchData: "",
            deletebtnhidden: false,
          });
        }
      }
    })
  },

})
//本地缓存
function cache(that, val) {
  var searchData = wx.getStorageSync('searchData') || [];
  console.log(searchData)
  if (val != "") {
    searchData.push(val)
  }
  wx.setStorageSync('searchData', searchData)
  var arr = searchData.reverse()
  app.Hisrecords = arr
  that.setData({
    searchData: arr,
    showClearBtn: false
  });
  if (val) {
    that.setData({
      deletebtnhidden: true
    });
    searchresult(val)
  }
}
//获取搜索词
function searchterm(that) {
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetList',
    data: {
      parm: parm,
      token: token,
      mod: mod,
    },
    success: function (res) {
      that.setData({
        searchterm: res.data.data,
      });
    }
  })
}
function searchresult(val) {
  wx.navigateTo({
    url: "/pages/searchresult/searchresult?val=" + val,
  })
}

// function md5(parm, mod) {
//   var my_provin = parm + mod + "3trf6572dft565yt";
//   var md5_provin = fileData.hexMD5(my_provin);
//   var md5_1_provin = md5_provin.substr(0, 3);
//   var md5_2_provin = md5_provin.substr(8, 3);
//   var md5_3_provin = md5_provin.substr(16, 3);
//   var md5_4_provin = md5_provin.substr(24, 3);
//   token = md5_1_provin + md5_2_provin + md5_3_provin + md5_4_provin;
// }

























