//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  Ajax: function (url, type, data, callback) {
    wx.showLoading({
      title: '加载中'
    });
    var date = new Date();

    var newdata = {
      token: 'd2bef0c66a227668b27ee90bda56846c',
      version: 2.0,
      timefresh: date.getTime()
    };
    var data = this.Json(data, newdata);

    wx.request({
      url: 'https://wxapp.llwell.net/' + url,
      data: data,
      method: type, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json' // 默认值
      }, // 设置请求的 header
      success: function (res) {
        // 发送请求成功执行的函数
        wx.hideLoading();
        if (typeof callback === 'function') {
          callback(res.data);
        }
      },
      fail: function (res) {
        wx.hideLoading();
      },
      complete: function () {

      }
    })
  },
  Json: function (one, two) { //合并两个json为一个新的json
    var newJson = {};
    for (var attr in one) {
      newJson[attr] = one[attr];
    }
    for (var attr in two) {
      newJson[attr] = two[attr];
    }
    return newJson;
  },
})