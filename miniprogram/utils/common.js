var app = {
  // url: "http://zhaotuyun.xyz:8888/api",
  url: "",
  DataFormat : function(timestamp, formats){
// formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分
    formats = formats || 'Y-m-d';

    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };
    var myDate = timestamp? new Date(timestamp): new Date();
    var year = myDate.getFullYear();
    var month = zero(myDate.getMonth() + 1);
    var day = zero(myDate.getDate());
    var hour = zero(myDate.getHours());
    var minite = zero(myDate.getMinutes());
    var second = zero(myDate.getSeconds());
    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
  },
  header: {
    'content-type': 'application/json', // 默认值
    'token': wx.getStorageSync('token'),
    'authorId': wx.getStorageSync('authorId')
  },
  checkPostRes: function(code,msg){
     if(code == '200'){
      return true;
     }else{
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
      wx.reLaunch({
        url: '/pages/login/login'
      })
      return false;
     }
  }
}
module.exports = app