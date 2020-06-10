const app = getApp()
var searchId = null;
var searchtext = null
Page({
  data: {
    motto: 'Hello World',
    array: [
      {
        id: 0,
        name: '价格降序'
      },
      {
        id: 1,
        name: '价格升序'
      },
      {
        id: 2,
        name: '销量降序'
      },{
        id: 3,
        name: '销量升序'
      },{
        id: 4,
        name: '评论量降序'
      },
      {
        id: 5,
        name: '评论量升序'
      }
      
      

    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [],
    prolist: [],
    imageurl0: "../../images/mo.png",//默认排序图
    imageurl1: "../../images/mo.png",//默认排序图
    daindex1: 0,
    daindex0: 0,
    imageurl2: "../../images/mo.png",
    daindex2: 0,
    loading: false,//显示加载
    period: false,//显示无数据
    select: 0,//选中
    sort: 0,// 1 asc 升序   0 desc 降序
    types: '刷新', // 点击更多、下拉上啦刷新
    currentTab: 0,
    navScrollLeft: 0,
    switchid:'',
    paixu:"",
    searchtext:""
  },
  //事件处理函数

  onLoad: function (option) {
    var that = this
    searchId = option.searchId;
    searchtext = option.searchtext
    that.setData({
      searchtext:searchtext
    })
    console.log('option:' + searchtext);
    //请求接口
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/goods',
      data: {
        page:"1",//是	int	分页(要跳转到第几页)
        category_id:that.data.switchid,	//是	int	分类id(全部传0)
        orderbuy:that.data.paixu,	//是	int	排序:0=价格降序,1=价格升序,2=销量降序,3=销量升序,4=评论量降序,5=评论量升序
        keyword:searchtext,	//否	string	搜索商品
        hot:searchId	//否	string	热门搜索
      },
      method: 'post',
      success: function (res) {
        res.data.data.category.unshift({id:0,name:"全部"})
        console.log(res)
        
        that.setData({
          navData: res.data.data.category,
          prolist:res.data.data.goods
        })

      },
      fail: function (err) {
        console.log(err)
      },

    });
  },
  //顶部排序
  bindPickerChange: function(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    

    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/goods',
      data: {
        page:"1",//是	int	分页(要跳转到第几页)
        category_id:that.data.switchid,	//是	int	分类id(全部传0)
        orderbuy:e.detail.value,	//是	int	排序:0=价格降序,1=价格升序,2=销量降序,3=销量升序,4=评论量降序,5=评论量升序
        keyword:"",	//否	string	搜索商品
        hot:"",	//否	string	热门搜索
       
      },
      method: 'post',
      success: function (res) {
        
        console.log(res)
        res.data.data.category.unshift({id:0,name:"全部"})
        that.setData({
          navData: res.data.data.category,
          prolist:res.data.data.goods,
          index: e.detail.value
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
  },


  switchNav(event) {
    var that = this
    console.log(event.currentTarget.dataset.id)
    that.setData({
      switchid:event.currentTarget.dataset.id
    })
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/goods',
      data: {
        page:"1",//是	int	分页(要跳转到第几页)
        category_id:that.data.switchid,	//是	int	分类id(全部传0)
        orderbuy:that.data.paixu,	//是	int	排序:0=价格降序,1=价格升序,2=销量降序,3=销量升序,4=评论量降序,5=评论量升序
        keyword:"",	//否	string	搜索商品
        hot:""	//否	string	热门搜索
      },
      method: 'post',
      success: function (res) {
        
        console.log(res)
        res.data.data.category.unshift({id:0,name:"全部"})
        that.setData({
          navData: res.data.data.category,
          prolist:res.data.data.goods
        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
   // 排序
  choosesort0: function (e) {
    var that = this;
    if (this.data.daindex0 == 0) {
      this.setData({
        imageurl0: "../../images/xia.png",
        daindex0: 1,
        imageurl1: "../../images/mo.png",
        imageurl2: "../../images/mo.png",
      })
    } else {
      this.setData({
        imageurl0: "../../images/shang.png",
        daindex0: 0,
        imageurl2: "../../images/mo.png",
        imageurl1: "../../images/mo.png",
      })
    }
    this.setData({
      select: 0,
      sort: that.data.daindex0,
      page: 1,
      period: false,
    });
    that.sort();
  },
  // 销量
  choosesort1: function (e) {
    var that = this;
    if (this.data.daindex1 == 0) {
      this.setData({
        imageurl1: "../../images/xia.png",
        daindex1: 1,
        imageurl2: "../../images/mo.png",
        imageurl0: "../../images/mo.png",
      })
    } else {
      this.setData({
        imageurl1: "../../images/shang.png",
        daindex1: 0,
        imageurl2: "../../images/mo.png",
        imageurl0: "../../images/mo.png",
      })
    }
    this.setData({
      select: 1,
      sort: that.data.daindex1,
      page: 1,
      period: false,
    });
    that.sort();
  },
  // 价格
  choosesort2: function (e) {
    var that = this;
    if (this.data.daindex2 == 0) {
      this.setData({
        imageurl2: "../../images/shang.png",
        daindex2: 1,
        imageurl1: "../../images/mo.png",
        imageurl0: "../../images/mo.png",
      })
    } else {
      this.setData({
        imageurl2: "../../images/xia.png",
        imageurl1: "../../images/mo.png",
        imageurl0: "../../images/mo.png",
        daindex2: 0
      })
    }
    this.setData({
      select: 2,
      sort: that.data.daindex2,
      page: 1,
      period: false,
    });
    that.sort();
  },

  //排序
  sort: function () {
    //页面初始化 options为页面跳转所带来的参数
    var that = this;
    var objectId = that.data.objectId;
    if (that.data.type == 1 || that.data.type == 0) {
      that.getkeywordgood(that.data.keyword);
    } else {
      that.listdetail(objectId);
    }
  },
  listdetail: function (objectId, types = 0) {
    var that = this;
    var select = that.data.select;
    var sort = that.data.sort;
    if (types == 0) {
      var page = that.data.page
    } else {
      var page = that.data.page + 1;
    }
    
   
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
  goSearch: function () {
    wx.navigateTo({
      url: '../search-details/search-details',
    })
  },
})