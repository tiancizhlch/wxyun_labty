// pages/my/updatePsd/updatePsd.js
import api from "../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:"",
      oldPsd:"",
      newPsd:"",
      confirmPsd:""
  },
  bingOldPsd: function(e){
    this.setData({
      oldPsd: e.detail.value
    })
},
bindNewPos: function(e){
  this.setData({
    newPsd: e.detail.value
  })
},
bingConfirmPsd: function(e){
  this.setData({
    confirmPsd: e.detail.value
  })
},
clearn: function(e){
  var type = e.currentTarget.dataset.type;
  if(type == "old"){
    console.log(type);
    this.setData({
      oldPsd: ""
    })
  }else if(type == "new"){
    this.setData({
      newPsd:""
    })
  }else if(type == "confirm"){
    this.setData({
      confirmPsd:""
    })
  }
},
  updatePsd: function(){
     if(this.data.oldPsd == ""){
      wx.showToast({
        title: '旧密码不能为空',
        icon: 'none',
        duration: 2000
      })
     }else if(this.data.newPsd==""){
      wx.showToast({
        title: '新密码不能为空',
        icon: 'none',
        duration: 2000
      })
     }else if(this.data.confirmPsd==""){
      wx.showToast({
        title: '确认密码不能为空',
        icon: 'none',
        duration: 2000
      })
     }else{
       if(this.data.newPsd == this.data.confirmPsd){
         this.data.id = wx.getStorageSync('authorId');
        api.requestApi("POST","youzhitu/cms/login/wxCheckOldPsd",this.data).then(res=>{
          if(res.code == "0000"){
            wx.showToast({
              title: res.msg,
              icon: 'success',
              duration: 2000,
              success: function(){
                setTimeout(function () {
                  wx.navigateBack({ belta: 1 })
                }, 2000)
              }
            })
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
       }else{
        wx.showToast({
          title: '新密码与确认密码不一致，清重新输入',
          icon: 'none',
          duration: 2000
        })
       }
     }

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