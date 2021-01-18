// pages/my/my.js
import api from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
     user:{
       depName:"",
       userName:""
     }
  },
  openPage: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  },
  logout: function(e) {
    api.requestApi("POST","youzhitu/cms/login/logout",{"authorId":wx.getStorageSync('authorId')}).then(res=>{
      if(res.code == '0000'){
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 2000
        })
        let url = e.currentTarget.dataset.url;
        wx.reLaunch({
          url: url
        });
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user:{
        depName:wx.getStorageSync('depName'),
        userName:wx.getStorageSync('userName')
      }
    })
    api.requestApi("")
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