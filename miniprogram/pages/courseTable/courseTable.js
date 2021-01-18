//index.js
//获取应用实例
import app from "../../utils/common";
import api from "../../utils/request";
Page({
  data: {
    // casArray: ['双眼皮', 'TBM', '隆胸', '减肥', '手动输入'],
    termArray: [],
    termIndex: 0,
    weeksArray: [],  //选择教学周
    weeksIndex: '',
    weeksDateList: [],  //数据库获取教学周课表信息
    monthNow: "",  //左上角月份
    schoolTime: [1,2,3,4,5,6,7,8,9,10,11,12],  //默认课节
    colorArrays: [ "#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    contentList: [],
  },
   /**
  * 生命周期函数--监听页面加载
   */

  bindTermPickerChange: function (e) {
    this.setData({
      termIndex: e.detail.value
    })
    this.getWeeks(this.data.termArray[e.detail.value].id);
    this.getLeftSide(this.data.termArray[e.detail.value].id);
  },
  bindWeekPickerChange: function (e) {
    this.setData({
      weeksIndex: e.detail.value
    })
    var startDate = new Date(this.data.weeksArray[this.data.weeksIndex].weekStartDate);
    var endDate = new Date(this.data.weeksArray[this.data.weeksIndex].weekEndDate);
    this.getHeader(startDate,endDate);
    let dataApi = {trimesterId:this.data.termArray[this.data.termIndex].id,teaId:wx.getStorageSync('userId'),weeksId:this.data.weeksArray[e.detail.value].id};
    api.requestApi("POST","youzhitu/laboratory/schedule/queryScheduleListByWx",dataApi).then(res=>{  
      let picNum = 0;
        res.forEach(element =>{
          picNum = element.pitchNum.split(",").length;
          element.pitchNum = picNum;
          this.data.schoolTime.forEach(sche =>{
            if(sche.startTime == element.startTime){
              element.startTime = sche.pitchNum
            }
          })
        })
        this.setData({
          contentList: res
        })
    })
    // wx.request({
    //   url: 'http://localhost:7002/youzhitu/laboratory/schedule/queryScheduleListByWx',
    //   method: 'post',
    //   data:{trimesterId:this.data.termArray[this.data.termIndex].id,teaId:wx.getStorageSync('userId'),weeksId:this.data.weeksArray[e.detail.value].id},
    //   header: app.header,
    //   success: res=>{
    //     console.log(res);
    //     if(app.checkPostRes(res.statusCode,res.data.msg) == false){
    //       return;
    //     }
        
    //     let picNum = 0;
    //       res.data.forEach(element =>{
    //         picNum = element.pitchNum.split(",").length;
    //         element.pitchNum = picNum;
    //         this.data.schoolTime.forEach(sche =>{
    //           if(sche.startTime == element.startTime){
    //             element.startTime = sche.pitchNum
    //           }
    //         })
    //       })
    //       console.log(res.data);
    //       this.setData({
    //         contentList: res.data
    //       })
        
    //   }
    // })
  },
  getHeader: function(startDate,endDate){
    this.data.weeksDateList = [];
    var arrHeader = [];
    var a = new Array("一", "二", "三", "四", "五", "六","日");
    var b = 0;
     this.data.monthNow = startDate.getMonth() + 1;
    while(endDate - startDate >= 0){
      let day = startDate.getDate();
      arrHeader.push({"weekDay":"周" + a[b],"day":  day + "号"});
      startDate.setDate(startDate.getDate() + 1);
      b++;
    }
    this.setData({
      weeksDateList: arrHeader,
      monthNow: this.data.monthNow
    })
  },
  getLeftSide: function(termId){
    this.data.schoolTime = [];
    api.requestApi("POST","/youzhitu/laboratory/schoolTime/querySchoolTime",{trimesterId:termId}).then(res=>{
      this.setData({
        schoolTime: res
      })
    })
    // wx.request({
    //   url: 'http://localhost:7004/schoolTime/querySchoolTime',
    //   method: 'post',
    //   data:{trimesterId:termId},
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: res=>{
    //     console.log(res.data)
    //     this.setData({
    //       schoolTime: res.data
    //     })
    //   }
    // })
  },
  getWeeks: function(termId){
    api.requestApi('post',"/youzhitu/laboratory/weeks/queryAll",{trimesterId:termId}).then(res=>{
      let i = 0;
        let nowDate = new Date();
        let startDate;
        let endDate;
        res.forEach(element => {
          element.creater = "第" + element.week + "周(" +app.DataFormat(element.weekStartDate) + "_" + app.DataFormat(element.weekEndDate) +")"
          if(nowDate >= element.weekStartDate && nowDate <= element.weekEndDate){
            startDate = new Date(element.weekStartDate);
            endDate = new Date(element.weekEndDate);
            this.setData({
              weeksIndex: i
            })
          }else{
            startDate = new Date(res[0].weekStartDate);
            endDate = new Date(res[0].weekEndDate);
          }
          i++;
        });
        this.setData({
          weeksArray: res
        })
        this.getHeader(startDate,endDate);
    })
    // wx.request({
    //   url: 'http://localhost:7004/weeks/queryAll',
    //   method: 'post',
    //   data:{trimesterId:termId},
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success:res=>{
    //     let i = 0;
    //     let nowDate = new Date();
    //     let startDate;
    //     let endDate;
    //     console.log(res.data);
    //     res.data.forEach(element => {
    //       element.creater = "第" + element.week + "周(" +app.DataFormat(element.weekStartDate) + "_" + app.DataFormat(element.weekEndDate) +")"
    //       if(nowDate >= element.weekStartDate && nowDate <= element.weekEndDate){
    //         startDate = new Date(element.weekStartDate);
    //         endDate = new Date(element.weekEndDate);
    //         this.setData({
    //           weeksIndex: i
    //         })
    //       }else{
    //         startDate = new Date(res.data[0].weekStartDate);
    //         endDate = new Date(res.data[0].weekEndDate);
    //       }
    //       i++;
    //     });
    //     this.setData({
    //       weeksArray: res.data
    //     })
    //     this.getHeader(startDate,endDate);
    //   }
    // })
  },
  onLoad: function () {
    api.requestApi(
      "POST",
      "/youzhitu/cms/trimester/queryTrimesterListBycondition",
      {}).then(res=>{
        let i = 0;
        let nowDate = new Date();
        var fristOne;
        res.list.forEach(element => {
          element.creater = app.DataFormat(element.startDate) + "----" + app.DataFormat(element.endDate)
          if(nowDate >= element.startDate && element.startDate <= element.endDate){
            fristOne = element.id;
            this.setData({
              termIndex: i
            })
          }
          i++;
        });
        this.setData({
          termArray: res.list
        })
        this.getLeftSide(fristOne);
        this.getWeeks(fristOne);
      })
    // wx.request({
    //   url: 'http://localhost:7003/trimester/queryTrimesterListBycondition',
    //   method: 'post',
    //   data:{},
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success:res=>{
    //     let i = 0;
    //     console.log(res);
    //     let nowDate = new Date();
    //     var fristOne;
    //     res.data.list.forEach(element => {
    //       element.creater = app.DataFormat(element.startDate) + "----" + app.DataFormat(element.endDate)
    //       if(nowDate >= element.startDate && element.startDate <= element.endDate){
    //         fristOne = element.id;
    //         this.setData({
    //           termIndex: i
    //         })
    //       }
    //       i++;
    //     });
    //     this.setData({
    //       termArray: res.data.list
    //     })
    //     this.getLeftSide(fristOne);
    //     this.getWeeks(fristOne);
    //   }
    // })
    
  }
})
