/*
 * Weapp charts v1.0
 *
 * https://github.com/zqwai/
 * 2018-2-10
 *
 * Designed and built with zqwai.com
 */

// requestAnimationFrame不支持 setTimeout兼容处理
let createAnimationFrame = function () {
  if (typeof requestAnimationFrame !== 'undefined') {
    return requestAnimationFrame;
  } else if (typeof setTimeout !== 'undefined') {
    return function (step, delay) {
      setTimeout(function () {
        let timeStamp = +new Date();
        step(timeStamp);
      }, delay);
    }
  } else {
    return function (step) {
      step(null);
    }
  }
}
let animationFrame = createAnimationFrame();

class radarChart {
  // 构造方法
  constructor(canvasId, option) {
    // id 背景色
    this.ctx = wx.createCanvasContext(canvasId);
    this.backgroundColor = option.backgroundColor;
    // chart类型
    this.seriesTypes = option.series[0].types;
    this.seriesName = option.series[0].name;
    // 中心位置 缩放半径
    this.seriesRadius = option.series[0].radius;
    this.seriesCenter = option.series[0].center;
    // 数据
    // this.seriesDataValue = option.series[0].data[0].value;
    // this.seriesDataName = option.series[0].data[0].name;
    this.seriesData = option.series[0].data;
    this.seriesDataLength = option.series[0].data.length;
    // 标题
    this.titleText = option.title.text;
    this.titleSubtext = option.title.subtext;
    // 标题 位置 边距
    this.titlePositionLeft = option.title.left;
    this.titlePositionTop = option.title.top;
    this.titlePadding = option.title.padding;
    // 主标题样式
    this.titleTextColor = option.title.textStyle.color;
    this.titleTextFontSize = option.title.textStyle.fontSize;
    this.titleTextAlign = option.title.textStyle.textAlign;
    this.titleTextBaseline = option.title.textStyle.textBaseline;
    // 副标题样式
    this.titleSubTextColor = option.title.subtextStyle.color;
    this.titleSubTextFontSize = option.title.subtextStyle.fontSize;
    this.titleSubTextAlign = option.title.subtextStyle.textAlign;
    this.titleSubTextBaseline = option.title.subtextStyle.textBaseline;


  };
 
  init() {
    // 输出
    // console.log(this.ctx);
    console.log(`背景：${this.backgroundColor}`);
    console.log(`图形种类：${this.seriesTypes}; seriesName：${this.seriesName}`);
    console.log(`中心位置：${this.seriesCenter}; 缩放半径：${this.seriesRadius}`);

    console.log('数据：', this.seriesDataLength, this.seriesData,);
    // console.log(`数据-值：${this.seriesDataValue}; 数据-键名：${this.seriesDataName}`);
    console.log(`主标题：${this.titleText}; 副标题：${this.titleSubtext}`);
    console.log(`left距离：${this.titlePositionLeft}; top距离：${this.titlePositionTop}; 内边距：${this.titlePadding}`);
    console.log(`主标题样式：${this.titleTextColor}; ${this.titleTextFontSize}; ${this.titleTextAlign}; ${this.titleTextBaseline}`);
    console.log(`副标题样式：${this.titleSubTextColor}; ${this.titleSubTextFontSize}; ${this.titleSubTextAlign}; ${this.titleSubTextBaseline}`);

    this.backgroundLines();
  };
  backgroundLines(){
    let ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = mColorPolygon;
    var r = mRadius / mCount; //单位半径
    //画6个圈
    for (var i = 0; i < mCount; i++) {
      ctx.beginPath();
      var currR = r * (i + 1); //当前半径
      //画6条边
      for (var j = 0; j < mCount; j++) {
        var x = mCenter + currR * Math.cos(mAngle * j);
        var y = mCenter + currR * Math.sin(mAngle * j);

        ctx.lineTo(x, y);
      }
      ctx.closePath()
      ctx.stroke();
    }

    ctx.restore();
  }
}

export { radarChart};