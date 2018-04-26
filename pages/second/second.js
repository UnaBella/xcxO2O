//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    second_content_detail_title:'资生堂 UNO 吾诺 男士洗面奶',
    radioItems: [
      { value: '1', name: '现场取货', checked: 'true'},
      { value: '2', name: '快递收货' },
    ],
    expressageType: '',
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
  }
 
 
})
