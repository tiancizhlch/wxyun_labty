const app = getApp();
var api = {
  requestApi: function(method, url, data) {
    var baseURL = app.globalData.url;
        console.log(baseURL);
        if(baseURL.indexOf("http://")==-1){
          wx.showToast({
            title: "学校访问地址无效，请重新获取登录",
            icon: 'none',
            duration: 2000
          })
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/login/login'
            })
          },2000)
        }
    return new Promise(function(resolve, reject) {
        let header = {
            'content-type': 'application/json',
            'token': wx.getStorageSync('token'),
            'authorId': wx.getStorageSync('authorId')
        };
        wx.request({
            url: app.globalData.url + url,
            method: method,
            data: data,
            header: header,
            success(res) {
              if(res.statusCode == 200){
                resolve(res.data);
               }else{
                reject(res.data.msg);
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
                setTimeout(function(){
                  wx.reLaunch({
                    url: '/pages/login/login'
                  })
                },2000)
                
              }
            },
            fail(err) {
                //请求失败
                reject(err)
            }
        })
    })
  }
}

module.exports = api