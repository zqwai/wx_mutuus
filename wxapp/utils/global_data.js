// 常用全局Data
let globalFun = e =>{
  let globalData = {};
  wx.getSystemInfo({
    success: function (res) {
      const windowWidth = res.windowWidth;
      const windowHeight = res.windowHeight;
      const windowScale = windowHeight / windowWidth;//屏幕高宽比  
      // console.log('windowWidth: ' + windowWidth)
      // console.log('windowHeight: ' + windowHeight)
      globalData.phoneWidth = windowWidth;
      globalData.phoneHeight = windowHeight;
      globalData.phoneScale = windowScale;
    }
  })
  return globalData;
}
module.exports = {
  globalFun: globalFun,
}