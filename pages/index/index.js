//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    codeRecordList:[
      // { number: '12333445566', date: '2018.5.15 15:40'},
      // { number: '12333445566', date: '2018.5.15 15:40' },
      // { number: '12333445566', date: '2018.5.15 15:40' },
      // { number: '12333445566', date: '2018.5.15 15:40' },
      // { number: '12333445566', date: '2018.5.15 15:40' },
      // { number: '12333445566', date: '2018.5.15 15:40' },
      // { number: '12333445566', date: '2018.5.15 15:40' },
      // { number: '12333445566', date: '2018.5.15 15:40' },
      // { number: '12333445566', date: '2018.5.15 15:40' },
      // { number: '12333445566', date: '2018.5.15 15:40' },
      // { number: '12333445566', date: '2018.5.15 15:40' }
    ]
  },
  
  toSweepOrder: function (){
    wx.scanCode({
      success: (res) => {
        
   
    app.Ajax(
      'Goods',
      'POST',
      'GetGoods',
      { barcode: res.result },
      function (json) {
        if (json.success) {
          var ttt = json.data;
          console.log('ttt',ttt)
          wx.navigateTo({
            url: '../second/second?goodsMes=' + JSON.stringify(ttt)
          })
          console.log("以下已经扫码到商品页了")
          var number = json.data.goodsname;
          var date = app.getNowFormatDate();
          var buyOrder = wx.getStorageSync('buyOrder') || []
          buyOrder.unshift({ number, date })
          wx.setStorageSync('buyOrder', buyOrder)
        } else {
          console.log('请重新扫商品码');
        }
      }
    );


        
        
      },
      fail: (res) => {
        console.log(res);
      }
    })

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
  onShow:function(){
    var buyOrder = wx.getStorageSync('buyOrder') || []
    this.setData({
      codeRecordList: buyOrder
    })
  }
})
