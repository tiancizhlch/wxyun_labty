// pages/my/borrowReturn/borrowReturn.js
import api from "../../../utils/request";
import app from "../../../utils/common";
Page({
  /**
   * 页面的初始数据
   */
  data: {
// 数据源
    borrowReturnList:[],
    pages:2,
    pageNum: 1,
    pageSize: 7
  },

  getDataList: function(){
    var that = this.data.borrowReturnList;
    console.log(that);
    var reqData = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
     }
      api.requestApi("POST","youzhitu/laboratory/borrowReturn/queryAllByCondition",reqData).then(res=>{
        this.data.pages = res.pages;
        console.log(res);
        if(res.list!= []){
          res.list.forEach(item=>{
             item.borrowDate = app.DataFormat(item.borrowDate)
             if(item.returnDate == null){
              item.returnDate = "/";
             }else{
              item.returnDate = app.DataFormat(item.returnDate);
             }
             that.push(item);
          })
          this.setData({
           borrowReturnList: that
          })
        }
        console.log(res);
      })
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getDataList();
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
      //用户每次下拉页面值加一
    var that = this;
    var pageNum = that.data.pageNum;
    if(this.data.pageNum >= this.data.pages){
      wx.showToast({
        title: '没有更多数据了！',
        icon: 'none',
        duration: 3000
        })
    }else{
      pageNum = that.data.pageNum + 1;
      this.setData({
        pageNum: pageNum
      })
      //设置定时器
      var d = setTimeout(() => {
        wx.showToast({
          title: '加载数据中',
          icon: 'loading',
          mask: true,
          //成功返回函数
          success: (res) => {
            //关闭定时器
            clearInterval(d)
            //调用封装的网络请求函数
            this.getDataList()
          }
        })
      }, 1000)
    }
    
   
  },
  openDetail: function(e){
    var index = e.currentTarget.dataset.index;
    var queryDataObject = JSON.stringify(this.data.borrowReturnList[index]);
    wx.navigateTo({
      url: "/pages/my/borrowReturn/borrowReturnDetail/borrowReturnDetail?queryDataObject="+queryDataObject,
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})