// var globalGata = require('../../../utils/global_data.js');  
const app = getApp();

// const systemInfo = {
//   brand: app.globalData.brand,
//   model: app.globalData.model,
//   pixelRatio: app.globalData.pixelRatio,
//   screenWidth: app.globalData.screenWidth,
//   screenHeight: app.globalData.screenHeight,
//   windowWidth: app.globalData.windowWidth,
//   windowHeight: app.globalData.windowHeight,
//   statusBarHeight: app.globalData.statusBarHeight,
//   language: app.globalData.language,
//   version: app.globalData.version,
//   system: app.globalData.system,
//   platform: app.globalData.platform,
//   fontSizeSetting: app.globalData.fontSizeSetting,
//   SDKVersion: app.globalData.SDKVersion,
// }

// console.log(systemInfo.windowWidth)

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    // innerText: {
    //   type: String,
    //   value: 'default value',
    // }
    menuList:{
      type: Map,
      value: [], 
    } 
    
    
  },
  data: {
    // 这里是一些组件内部数据
    showView: true,
    windowWidth: app.globalData.windowWidth,
    windowHeight: app.globalData.windowHeight,
    
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { 
    
  },
  moved: function () { },
  detached: function () {
    onCloseContentTap();
  },

  methods: {
    // 这里是一个自定义方法
    onCloseContentTap:function(){
      console.log("关闭顶部导航");
      var that = this;
      that.setData({
        showView: true
      })
    },
    floatMenuContentState: function() { 
      // console.log('aaa')
      var that = this;
      that.setData({
        showView: (!that.data.showView)
      })
      // console.log(showView)
    },

    onTap(e) {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      // 指定自定义组件的事件名、detail对象和事件选项
      this.triggerEvent("contentStateEvent", myEventDetail, myEventOption);
      // console.log(myEventOption)
    },
  },
})
