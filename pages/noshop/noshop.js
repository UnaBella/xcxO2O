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
          wx.showModal({
            title: "哎呀",
            content: "请重新扫描门店二维码",
            showCancel: false,
            confirmText: "确定"
          })
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
