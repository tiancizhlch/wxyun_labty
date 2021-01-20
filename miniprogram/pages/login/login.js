
// pages/login/login.js
// import app from "../../utils/common";
// const $api = require('../../utils/request.js').api;
var app = getApp();
const db = wx.cloud.database();
const zhaotuyun = db.collection('zhaotuyun'); 
import api from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userName:'',
      password:'',
      urlIndex:'',
      configList:[]
  },

  bindUrlPickerChange: function(e){
    app.globalData.url = this.data.configList[e.detail.value].schoolUrl;
    this.setData({
      urlIndex:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    zhaotuyun.get({
      success: res=>{
        console.log(res);
        this.setData({
          configList: res.data
         })
         console.log(res.data);
         app.globalData.url = res.data[0].schoolUrl;
      }
    })
    //  wx.request({
    //    url: 'http://zhaotuyun.xyz:8081/wxlab/codeConfig/queryConfigListByType',
    //    method: 'post',
    //    data:{type:"wxLabUrl",sign:"1"},
    //    header: {
    //      'content-type': 'application/json' // 默认值
    //    },
    //    success:res=>{
    //      console.log(res)
    //      this.setData({
    //       configList: res.data.list
    //      })
    //    }
    //  })
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
  usernameInput: function(e){
      this.setData({
        userName: e.detail.value
      })
  },
  passwordInput: function(e){
    this.setData({
      password: e.detail.value
    })
},
  login: function(){
    if(this.data.urlIndex == ''){
      return  wx.showToast({
        title: '请选择学校',
        icon: 'none',
        duration: 2000
      })
    }
    if(this.data.userName.length == 0 || this.data.password.length == 0){
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    }else{
      api.requestApi("POST","/youzhitu/cms/login/login",this.data).then(res=>{
        if(res.code == '0000'){
          wx.setStorageSync('token', res.token);
          wx.setStorageSync('userId', res.userId);
          wx.setStorageSync('authorId', res.authorId);
          wx.setStorageSync('myFileId', res.teacherResponseDto.phone);
          wx.setStorageSync('role', res.admin.role);
          if(res.admin.role == '1'){
            wx.setStorageSync('depName', res.teacherResponseDto.depName);
            wx.setStorageSync('userName', res.teacherResponseDto.teacherName);
          }else if(res.admin.role == '2'){
            wx.setStorageSync('depName', res.studentResponseDto.depName);
            wx.setStorageSync('userName', res.studentResponseDto.name);
          }
          wx.switchTab({
            url: '../index/index',
          })
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }).catch(msg=>{
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 2000
        })
      })

      }
    //   wx.request({
    //     url: app.url + '/youzhitu/cms/login/login',
    //     method: 'post',
    //     data:this.data,
    //     header: {
    //       'content-type': 'application/json' // 默认值
    //     },
    //     success:res=>{
    //       console.log(res.data);
    //       if(res.data.code == '0000'){
    //         wx.setStorageSync('token', res.data.token);
    //         wx.setStorageSync('userId', res.data.userId);
    //         wx.setStorageSync('authorId', res.data.authorId);
    //         wx.switchTab({
    //           url: '../index/index',
    //         })
    //       }else{
    //         wx.showToast({
    //           title: res.data.msg,
    //           icon: 'none',
    //           duration: 2000
    //         })
    //       }
    //     }
    //   })
    // }
  }
})