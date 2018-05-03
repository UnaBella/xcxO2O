//app.js
App({
  onLaunch: function () {
    this.getLogin();
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // console.log(111)
    var isDebug = false;//调试状态使用本地服务器，非调试状态使用远程服务器
    if (!isDebug) {
      //远程域名
      wx.setStorageSync('domainName', "https://wxapp.llwell.net/api/O2O/")
    }
    else {
      //本地测试域名
      wx.setStorageSync('domainName', "http://172.16.10.11:5000/api/O2O/")
    }
  },
  getLogin: function (resolve){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.Ajax(
          'Users',
          'POST',
          'Login',
          { code: res.code },
          function (json) {
            console.log(json);
            if (json.success) {
              wx.setStorageSync('token', json.data.sessionId);
              console.log(json.data.sessionId);
              if (resolve){
                resolve();
              }
            } else {
              
              console.log(json.msg.code);
              console.log(json.msg.msg);
            }

          }
        );
      }
    })

  },
  globalData: {
    userInfo: null
  },
  Ajax: function (url, type, method, data, callback) {
    wx.showLoading({
      title: '加载中'
    });
    var send = {
      token: wx.getStorageSync('token'),
      method: method,
      param: data,
    };
    wx.request({
      url: wx.getStorageSync('domainName') + url,
      data: send,
      method: type, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json' // 默认值
      }, // 设置请求的 header
      success: function (res) {
        // 发送请求成功执行的函数
        if (typeof callback === 'function') {
          callback(res.data);
        }
      },
      fail: function (res) {
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  // Json: function (one, two) { //合并两个json为一个新的json
  //   var newJson = {};
  //   for (var attr in one) {
  //     newJson[attr] = one[attr];
  //   }
  //   for (var attr in two) {
  //     newJson[attr] = two[attr];
  //   }
  //   return newJson;
  // },
})