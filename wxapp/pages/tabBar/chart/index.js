const app = getApp();
import { BarChart } from '../../../utils/sChart';

Page({
  
  /**
   * 页面的初始数据
   */

  data: {
    systemInfo:{
      // brand: app.globalData.brand,
      // model: app.globalData.model,
      pixelRatio: app.globalData.pixelRatio,
      screenWidth: app.globalData.screenWidth,
      screenHeight: app.globalData.screenHeight,
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
      // statusBarHeight: app.globalData.statusBarHeight,
      // language: app.globalData.language,
      // version: app.globalData.version,
      // system: app.globalData.system,
      // platform: app.globalData.platform,
      // fontSizeSetting: app.globalData.fontSizeSetting,
      // SDKVersion: app.globalData.SDKVersion,
    },
    menuList:[
      {
        text:'七大领域发展频次',
        src:'./index?title=redirect'
      },
      {
        text: '17个早期学习目标发完成度',
        src: '../../logs/logs'
      },
      {
        text: '当月数据报告',
        src: '../../charts/pie/pie'
      },
      {
        text: '成长追踪',
        src: '../../page/chart/three/three'
      },
    ],
    flag: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(res) {
    
    let chartData = [
      { xAxis: '2012', value: 2141 },
      { xAxis: '2013', value: 1499 },
      { xAxis: '2014', value: 3260 },
      { xAxis: '2015', value: 1170 },
      { xAxis: '2016', value: 970 },
      { xAxis: '2017', value: 2350 },
      { xAxis: '2018', value: 2050 }
    ];
    let canvasOption = {
      canvasWidth: app.globalData.windowWidth,
      canvasHeight: app.globalData.windowHeight - 50,
      canvasPadding: 50,
      yEqual: 5,
      yLength: 0,
      xLength: 0,
      yFictitious: 0,
      yRatio: 0,
      bgColor: '#f9f9f9',
      fillColor: '#1E9FFF',
      axisColor: '#666666',
      contentColor: '#eeeeee',
      titleColor: '#000000',
      title: '七大领域发展频次',
      titlePosition: 'top',
      looped: null,
      current: 0,
      currentIndex: -1,
      onceMove: -1
    }
    this.barChart = new BarChart('firstCanvas', chartData, canvasOption); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.barChart.init();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 执行coolsite360交互组件展示

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh(){

  },
  //以下为自定义点击事件
    // this.context = wx.createContext()
    // this.barChart.cavTouchStart();
  cavTouchstart(e){

    // var e = e || event;
    // console.log(e.touches[0].pageX);

    this.barChart.ctxTouchstart(e);
  },
  // canvasTouchMove(){
  //   this.barChart.watchHover();
  // },
})

