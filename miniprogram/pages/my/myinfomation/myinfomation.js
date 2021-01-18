// pages/my/myinfomation/myinfomation.js
import api from "../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
     name:"",
     genderName:"",
     depName:"",
     professionalName:"",
     className:"",
     grade:"",
     num:"",
     phone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var role = wx.getStorageSync('role');
     var url;
     console.log(role);
     if(role == 1){
       url = "youzhitu/cms/teacher/queryTeacherById";
     }else if(role == 2){
       url = "youzhitu/cms/student/queryStudentById";
     }
     var userId = wx.getStorageSync('userId');
     api.requestApi("POST",url,{id:userId}).then(res=>{
       let sexName;
       if(res.objectResult.gender == 0){
        sexName = "男"
       }else{
        sexName = "女"
       }
       if(role == 1){
         this.setData({
          name:res.objectResult.teacherName,
          genderName:sexName,
          depName:res.objectResult.depName,
          professionalName:"",
          className:"",
          grade:"",
          num:res.objectResult.teaNum,
          phone:res.objectResult.phone
         })
       }else if(role == 2){
        this.setData({
          name:res.objectResult.name,
          genderName:sexName,
          depName:res.objectResult.depName,
          professionalName:res.objectResult.professionalName,
          className:res.objectResult.className,
          grade:res.objectResult.grade,
          num:res.objectResult.stuNum,
          phone:res.objectResult.phone
         })
       }
     })
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