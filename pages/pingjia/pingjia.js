// pages/pingjia/pingjia.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_score: 0,
    score: 0,
    score_text_arr: ['非常差', '差', '一般', '好', '非常好'],
    score_text: "",
    score_img_arr: [],
    upload_pic: [],
    is_upload: false,
    delete_ico: "../../images/del.png",
    camera_pic: "../../images/add.png",
    time: null,
    upload_img: [],
    text: "匿名",
    checked: true,
    openid: '',
    pimages:'',
    is_ano:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = wx.getStorageSync('openid')


    //console.log(openid)
    var that = this;
    that.setData({
      openid: openid,
    })

  },
  hrSubmit: function (e) {
    var that = this
    
    
    if(e.detail.value.switch){
      that.setData({
        is_ano:1
      })
    }
    else{
      that.setData({
        is_ano:0
      })
    }
    wx.request({
      url: app.d.ceshiUrl + 'public/api/Miniapp/talkorder',
      data: {
        openid: that.data.openid,
        order_id: "", //是	int	订单id
        is_ano: that.data.is_ano, //	是	int	是否匿名:0=否,1=是
        pimages: that.data.pimages, //	否	string	评论图组（用英文格式的逗号分割）
        contents: e.detail.value.advice, //	是	string	评论内容
      },
      method: 'post',
      success: function (res) {

        console.log(res)
        
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

  },
  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var addImg = res.tempFilePaths;
        var upload_pic = that.data.upload_pic;
        for (var i in addImg) {
          //判断已选图片数量
          if (upload_pic.length < 1) {
            upload_pic.push(addImg[i]);
          }
        }
        var is_upload = false;
        if (upload_pic.length >= 1) {
          is_upload = true;
        }
        that.setData({
          upload_pic: upload_pic,
          is_upload: is_upload
        })
        console.log(res.tempFiles[0].path)
        that.setData({
          pimages: res.tempFiles[0].path
        })
      }
    })

  },

  //上传评论
  onSubmit: function (e) {
    wx.showLoading({
      title: '上传中',
    })
    var that = this;
    var is = false;
    var picture_list = that.data.upload_pic;
    var upload_img = [];
    var flag = false;
    var index = 0;
    for (var i in picture_list) {
      this.upload_file_server(picture_list[i]).then(res => {
        upload_img.push({
          id: index,
          url: res
        });
        index += 1;
        that.setData({
          upload_img: upload_img
        })
      });
    }
    this.setData({
      text: e.detail.value.text
    })
    //判断图片上传成功后，在上传评论到服务器，解决异步问题
    this.setTime();


  },
  setTime: function () {
    var that = this;
    var time = setTimeout(function () {
      var upload_img = that.data.upload_img;
      var picture_list = that.data.upload_pic;
      //判断是否成功
      if (upload_img.length == picture_list.length) {
        //清除定时
        clearTimeout(that.data.time);
        //添加评论
        wx.request({
          url: 'http://localhost:8080' + '/comment/add',
          method: "POST",
          data: {
            text: that.data.text,
            urls: JSON.stringify(upload_img),
            score1: that.data.score
          },
          success: res => {
            wx.hideLoading();
            console.log(res);
          }
        });
      } else {
        //执行定时判断
        that.setTime();
      }
    }, 400);
    that.setData({
      time: time
    })
  },
  //上传图片
  upload_file_server: function (path) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'http://localhost:8080' + 'public/api/Miniapp/UploadImg',
        filePath: path,
        name: 'file',
        success: res => {
          var result = JSON.parse(res.data);
          resolve(result.msg);
        }
      });
    });
  },
  //删除图片
  deletePic: function (e) {
    var pic_index = e.currentTarget.dataset.pic_index;
    var upload_pic = [];
    for (let i in this.data.upload_pic) {
      if (i != pic_index) {
        upload_pic.push(this.data.upload_pic[i])
      }
    }
    this.setData({
      upload_pic: upload_pic,
      is_upload: false
    })

  }
})