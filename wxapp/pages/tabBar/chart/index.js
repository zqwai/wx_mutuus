Page({
  data: {
    latitude: 30.275090,
    longitude: 120.021040,
    markers: [{
      latitude: 30.275090,
      longitude: 120.021040,
      title: 'mutuus',
      iconPath: './../../pic/map/location.png',
      // rotate: '30deg',
      // alpha:'',
      width: '30',
      height: '30',
    }],
    
    msnuiforesight:'我的位置',
    dingwei: '公司位置',
    location: '其他',
  },
  onLoad: function () {
    this.mutuusMapCtx = wx.createMapContext('mutuusMap');
    // console.log(this.mutuusMapCtx);
    console.log();
  },
  onReady: function () {
  },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },
  onPageScroll: function () { },

  // 自定义
  moveToLocation: function(res){
    this.mutuusMapCtx.moveToLocation();
  },
  getCenterLocation: function () {
    this.mutuusMapCtx.getCenterLocation({
      success: function (res) {
        let aa = `[${res.longitude} - ${res.latitude}]`;
        console.log(aa)
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
})





  // onReady: function(e){
  //   this.mutuusMapCtx = wx.createMapContext('mutuusMap');
  //   // console.log(mutuusMapCtx); 
  //   // this.mutuusMapCtx.moveToLocation();
  // },
  // getCenterLocation: function () {
  //   this.mutuusMapCtx.getCenterLocation({
  //     success: function (res) {
  //       console.log(res.longitude)
  //       console.log(res.latitude)
  //     }
  //   })
  // },
  // moveToLocation: function () {
  //   this.mutuusMapCtx.moveToLocation();
  //   console.log();
  // },
  // translateMarker: function () {
  //   this.mutuusMapCtx.translateMarker({
  //     markerId: 0,
  //     autoRotate: true,
  //     duration: 1000,
  //     destination: {
  //       latitude: 30.275090,
  //       longitude: 120.021040,
  //     },
  //     animationEnd() {
  //       console.log('animation end')
  //     }
  //   })
  // },



// var _this = this;
// wx.getLocation({
//   type: 'gcj02',
//   altitude: true,
//   success: function (res) {
//     console.log(res);
//     let latitude = res.latitude;
//     let longitude = res.longitude;
//     let speed = res.speed;
//     let accuracy = res.accuracy;
//     let altitude = res.altitude;
//     let verticalAccuracy = res.verticalAccuracy;
//     let horizontalAccuracy = res.horizontalAccuracy;
//     let postionData = `[经度: ${longitude} 纬度: ${latitude}] [速度: ${speed}] [位置的精确度: ${accuracy}] [高度: ${altitude}m] [垂直精度: ${verticalAccuracy}m] [水平精度:${horizontalAccuracy}m]`;
//     console.log(postionData);
//     // _this.setData({
//     //   longitude: longitude,
//     //   latitude: latitude,
//     //   speed: speed,
//     //   accuracy: accuracy,
//     //   altitude: altitude,
//     //   verticalAccuracy: verticalAccuracy,
//     //   horizontalAccuracy: horizontalAccuracy
//     // })  
//   },
//   fail: function (res) {
//     alert('地图加载失败');
//   },
//   complete: function (res) {

//   }
// })



// covers: [{
    //   latitude: 30.275090,
    //   longitude: 120.021040,
    //   iconPath: './../../pic/map/others.png',
    //   rotate: 90,
    //   width: '30',
    //   height: '30',
    // }],
    // callout:[{
    //   content: 'mutuus成长追踪系统',
    //   color: '#666',
    //   fontSize: '30rpx',
    //   borderRadius: '20rpx',
    //   bgColor: '#f2f2f2',
    //   padding: '10rpx',
    //   display: 'BYCLICK',
    //   textAlign: 'left',
    // }],
    // polyline: [{
    //   points: '',
    //   color: '',
    //   width: '',
    //   dottedLine: '',
    //   arrowLine: '',
    //   arrowIconPath: '',
    //   borderColor: '',
    //   borderWidth: '',
    // }],
    // circles:[{
    //   latitude: '',
    //   longitude: '',
    //   color: '',
    //   fillColor: '',
    //   radius: '',
    //   strokeWidth: '',
    // }],
    // controls: [{
    //   id: '',
    //   position: '',
    //   iconPath: '',
    //   clickable: '',
    // }],
    // position: [{
    //   left: '',
    //   top: '',
    //   width: '',
    //   height: '',
    // }]