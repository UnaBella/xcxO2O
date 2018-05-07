//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    buyNum:1,
    maxNum:null,
    yesMax:false,
    minNum:null,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    second_content_detail_title:'资生堂 UNO 吾诺 男士洗面奶',
    second_content_detail_price:'10000.00',
    id:'',
    stock:'',
    radioItems: [
      { value: '1', name: '现场取货', checked: 'true'},
      { value: '2', name: '快递收货' },
    ],
    expressageType: '1',

    inputPerson: '',
    inputAddress: '',
    inputPhone: '',
  },
  onLoad: function(obj) {
    // console.log(obj)
    // console.log(JSON.parse(obj.goodsMes))
    var ttt = JSON.parse(obj.goodsMes);
    this.setData({
      second_content_detail_title: ttt.goodsname,
      second_content_detail_price : ttt.price,
      stock: ttt.stock,
      id:ttt.id,
      imgUrls : ttt.slt,
      maxNum:ttt.stock
    })
  },
  
  minus: function(e){
    if (this.data.buyNum > 1) {
      this.data.buyNum -= 1;
      this.setData({
        buyNum: this.data.buyNum
      })
    }
  },
  plus: function(){
    if (this.data.buyNum<this.data.maxNum){
      this.data.buyNum += 1;
      this.setData({
        buyNum: this.data.buyNum
      })
    } else {
      this.setData({
        yesMax: true
      })
    }
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      expressageType: e.detail.value
    });

    var items = this.data.radioItems;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }

    this.setData({
      radioItems: items
    });
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.radio==1){
      this.toSuccessBuy(e.detail.value);
    }else{
      var ccc = e.detail.value;
      if (ccc.inputName && ccc.inputIdCard && ccc.inputPerson && ccc.inputPhone && ccc.inputAddress){
        this.toSuccessBuy(e.detail.value);
      }else{
        console.log("请添必填项")
      }
    }
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  toSuccessBuy: function (needs){
    new Promise(resolve => {
      app.getLogin(resolve);
    }).then(() => {
      var data = {
        product: this.data.second_content_detail_title,
        goodsId: this.data.id,
        shop: wx.getStorageSync('shop'),
        token: wx.getStorageSync('token'),
        ...needs
      }
      // console.log('needs',data)
      this.testPayment(data);
    })
  },
  getAddress: function(){
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success() {
              wx.chooseAddress({
                success: function (res) {
                  that.setData({
                    inputPerson: res.userName,
                    inputAddress: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                    inputPhone: res.telNumber,
                  });
                }
              })
            }
          })
        } else {
          wx.chooseAddress({
            success: function (res) {
              that.setData({
                inputPerson: res.userName,
                inputAddress: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                inputPhone: res.telNumber,
              });
            }
          })
        }
      }
    })
  },
  
  testPayment: function (data) {
    var that = this;
    app.Ajax(
      'Payment',
      'POST',
      'Payment',
       data ,
      function (json) {
        // console.log(json);
        if (json.success) {
          
          
          // var number = json.data.product;
          // var date = that.getNowFormatDate();
          // var buyOrder = wx.getStorageSync('buyOrder')||[]
          // buyOrder.unshift({ number,date})
          // wx.setStorageSync('buyOrder', buyOrder)
          wx.requestPayment({
            'timeStamp': json.data.timeStamp,
            'nonceStr': json.data.nonceStr,
            'package': json.data.package,
            'signType': 'MD5',
            'paySign': json.data.paySign,
            'success': function (res) {
              console.log("ok");
              console.log(res);
              wx.navigateBack({
                url: '../index/index'
              })
            },
            'fail': function (res) {
              console.log("error");
              console.log(res);
            }
          })
        } else {

          console.log(json.msg.code);
          console.log(json.msg.msg);
        }

      }
    );
  },
  
 
})
