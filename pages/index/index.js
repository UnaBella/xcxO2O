//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    codeRecordList:[
      { number: '12333445566', date: '2018.5.15 15:40'},
      { number: '12333445566', date: '2018.5.15 15:40' },
      { number: '12333445566', date: '2018.5.15 15:40' },
      { number: '12333445566', date: '2018.5.15 15:40' },
      { number: '12333445566', date: '2018.5.15 15:40' },
      { number: '12333445566', date: '2018.5.15 15:40' },
      { number: '12333445566', date: '2018.5.15 15:40' },
      { number: '12333445566', date: '2018.5.15 15:40' },
      { number: '12333445566', date: '2018.5.15 15:40' },
      { number: '12333445566', date: '2018.5.15 15:40' },
      { number: '12333445566', date: '2018.5.15 15:40' }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../show/show'
    })
  },
  
  toScan: function (){
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({
          url: '../second/second?code=' + res.result
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
    
    // console.log(111);
    // wx.scanCode({
    //   onlyFromCamera: true,
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
  },



  onLoad: function (options) {
    var scene = decodeURIComponent(options.shop);
    // console.log(scene);
    if (scene ==='undefined'){
      //this.scanCodeShop();
    }else{
      wx.setStorageSync('shop', scene);
    }
  },
  
})
