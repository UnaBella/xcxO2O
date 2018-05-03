//index.js
//获取应用实例
var app = getApp()
Page({
  data: {},
  //事件处理函数
  scanCodeShop: function () {
    wx.scanCode({
      success: (res) => {
        // console.log(res);
        // console.log('↑');
        if (res.path !== undefined) {
          
          // console.log(res.path.split('=')[1]);
            wx.setStorageSync('shop', res.path.split('=')[1]);
          wx.switchTab({
            url: '../../' + res.path,
          })
          // console.log('kaka')
        }else{
          console.log('重新扫码')
        }
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')    
  }
})
