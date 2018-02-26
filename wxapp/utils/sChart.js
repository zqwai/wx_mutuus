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

class BarChart {
  // 构造方法
  constructor(canvasId, chartData, canvasOption) {
    this.ctx = wx.createCanvasContext(canvasId);
    this.chartData = chartData;                   // 存放图表数据
    this.dataLength = this.chartData.length;      // 图表数据的长度
    this.canvasWidth = canvasOption.canvasWidth;        // canvas 宽度
    this.canvasHeight = canvasOption.canvasHeight;      // canvas 高度
    this.canvasPadding = canvasOption.canvasPadding;    // canvas 内边距
    this.yEqual = canvasOption.yEqual;              // y轴分成5等分
    this.yLength = canvasOption.yLength;            // y轴坐标点之间的真实长度
    this.xLength = canvasOption.xLength;            // x轴坐标点之间的真实长度
    this.yFictitious = canvasOption.yFictitious;    // y轴坐标点之间显示的间距
    this.yRatio = canvasOption.yRatio;              // y轴坐标真实长度和坐标间距
    this.bgColor = canvasOption.bgColor;                   // 默认背景颜色
    this.fillColor = canvasOption.fillColor;               // 默认填充颜色
    this.axisColor = canvasOption.axisColor;               // 坐标轴颜色
    this.contentColor = canvasOption.contentColor;         // 内容横线颜色
    this.titleColor = canvasOption.titleColor;             // 图表标题颜色
    this.title = canvasOption.title;                       // 图表标题
    this.titlePosition = canvasOption.titlePosition;       // 图表标题位置: top / bottom
    this.looped = canvasOption.looped;                     // 是否循环
    this.current = canvasOption.current;                   // 当前加载柱状图高度的百分数
    this.currentIndex = canvasOption.currentIndex;
    this.onceMove = canvasOption.onceMove;
  };
  // 
  init() {
    this.yLength = Math.floor((this.canvasHeight - this.canvasPadding * 2 - 10) / this.yEqual);
    this.xLength = Math.floor((this.canvasWidth - this.canvasPadding * 1.5 - 10) / this.dataLength);
    this.yFictitious = this.getYFictitious(this.chartData);
    this.yRatio = this.yLength / this.yFictitious;

    // this.yLength = this.canvasHeight - this.canvasPadding * 2;
    // this.xLength = this.canvasWidth - this.canvasPadding * 2;
    // this.yFictitious = Math.floor((this.canvasHeight - this.canvasPadding * 2) / this.yEqual);
    // this.yRatio = this.yLength / this.yFictitious;

    // 输出
    // console.log(this.ctx);
    // console.log(this.chartData, this.dataLength);
    // console.log(this.canvasWidth, this.canvasHeight, this.canvasPadding);
    // console.log(this.yLength, this.xLength, this.yFictitious, this.yRatio);
    // console.log(this.bgColor, this.fillColor, this.axisColor, this.contentColor);
    // console.log(this.titleColor, this.title, this.titlePosition);
    // console.log(this.looped, this.current, this.currentIndex, this.onceMove);


    this.looping();
  };
  looping() {
    this.looped = animationFrame(this.looping.bind(this));
    if (this.current < 100) {
      this.current = (this.current + 3) > 100 ? 100 : (this.current + 3);
      this.drawAnimation();
    } else {
      // cancelAnimationFrame(this.looped);
      this.looped = null;
      // this.watchHover();
    }
  };
  drawAnimation() {

    for (var i = 0; i < this.dataLength; i++) {
      var x = Math.ceil(this.chartData[i].value * this.current / 100 * this.yRatio);
      var y = this.canvasHeight - this.canvasPadding - x;

      this.chartData[i].left = this.canvasPadding + this.xLength * (i + 0.25);
      this.chartData[i].top = y;
      this.chartData[i].right = this.canvasPadding + this.xLength * (i + 0.75);
      this.chartData[i].bottom = this.canvasHeight - this.canvasPadding;
      this.drawUpdate();
    }
  };
  drawUpdate() {
    this.ctx.setFillStyle(this.bgColor);
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawAxis();
    this.drawPoint();
    this.drawTitle();
    this.drawChart();
    this.ctx.draw();
    // wx.drawCanvas({
    //   canvasId: this.ctx,
    //   // actions: this.ctx.getActions() // 获取绘图动作数组
    // })
  };
  drawChart() {
    this.ctx.setFillStyle(this.fillColor);
    for (var i = 0; i < this.dataLength; i++) {
      this.ctx.fillRect(
        this.chartData[i].left,
        this.chartData[i].top,
        this.chartData[i].right - this.chartData[i].left,
        this.chartData[i].bottom - this.chartData[i].top
      );
      // this.ctx.font = '12px Arial'
      this.ctx.setFontSize(12);
      this.ctx.fillText(
        this.chartData[i].value * this.current / 100,
        this.chartData[i].left + this.xLength / 4,
        this.chartData[i].top - 5
      );
    }
  };
  drawAxis() {
    this.ctx.beginPath();
    this.ctx.setStrokeStyle(this.axisColor);
    // y轴线, +0.5是为了解决canvas画1像素会显示成2像素的问题
    this.ctx.moveTo(this.canvasPadding + 0.5, this.canvasHeight - this.canvasPadding + 0.5);
    this.ctx.lineTo(this.canvasPadding + 0.5, this.canvasPadding + 0.5);
    // x轴线
    this.ctx.moveTo(this.canvasPadding + 0.5, this.canvasHeight - this.canvasPadding + 0.5);
    this.ctx.lineTo(this.canvasWidth - this.canvasPadding / 2 + 0.5, this.canvasHeight - this.canvasPadding + 0.5);
    
    this.ctx.stroke();
  };
  drawPoint() {
    // x轴坐标点
    this.ctx.beginPath();
    // this.ctx.font = '12px Microsoft YaHei';
    this.ctx.setFontSize(12);
    this.ctx.setTextAlign('center');
    this.ctx.setFillStyle(this.axisColor);

    for (let i = 0; i < this.dataLength; i++) {
      let xAxis = this.chartData[i].xAxis; //年份
      let xlen = this.xLength * (i + 1);
      // console.log(this.xLength)
      this.ctx.moveTo(this.canvasPadding + xlen + 0.5, this.canvasHeight - this.canvasPadding + 0.5);
      this.ctx.lineTo(this.canvasPadding + xlen + 0.5, this.canvasHeight - this.canvasPadding + 5.5);
      this.ctx.fillText(xAxis, this.canvasPadding + xlen - this.xLength / 2, this.canvasHeight - this.canvasPadding + 15);
    }
    this.ctx.stroke();

    // y轴坐标点
    this.ctx.beginPath();
    // this.ctx.font = '12px Microsoft YaHei';
    this.ctx.setFontSize(12);
    this.ctx.setTextAlign('right');
    this.ctx.setFillStyle(this.axisColor);
    this.ctx.moveTo(this.canvasPadding + 0.5, this.canvasHeight - this.canvasPadding + 0.5);
    this.ctx.lineTo(this.canvasPadding - 4.5, this.canvasHeight - this.canvasPadding + 0.5);
    this.ctx.fillText(0, this.canvasPadding - 10, this.canvasHeight - this.canvasPadding + 5);
    for (var i = 0; i < this.yEqual; i++) {
      var y = this.yFictitious * (i + 1);
      var ylen = this.yLength * (i + 1);
      this.ctx.beginPath();
      this.ctx.setStrokeStyle(this.axisColor);
      this.ctx.moveTo(this.canvasPadding + 0.5, this.canvasHeight - this.canvasPadding - ylen + 0.5);
      this.ctx.lineTo(this.canvasPadding - 4.5, this.canvasHeight - this.canvasPadding - ylen + 0.5);
      this.ctx.stroke();
      this.ctx.fillText(y, this.canvasPadding - 10, this.canvasHeight - this.canvasPadding - ylen + 5);
      this.ctx.beginPath();
      this.ctx.setStrokeStyle(this.contentColor);
      this.ctx.moveTo(this.canvasPadding + 0.5, this.canvasHeight - this.canvasPadding - ylen + 0.5)
      this.ctx.lineTo(this.canvasWidth - this.canvasPadding / 2 + 0.5, this.canvasHeight - this.canvasPadding - ylen + 0.5);
      this.ctx.stroke();
    }
  };
  drawTitle() {
    if (this.title) {
      this.ctx.beginPath();
      this.ctx.setFontSize(16);
      this.ctx.setTextAlign('center');
      this.ctx.setFillStyle (this.titleColor);
      // this.ctx.font = '16px Microsoft YaHei';
      if (this.titlePosition === 'bottom' && this.padding >= 40) {
        this.ctx.fillText(this.title, this.canvasWidth / 2, this.canvasHeight - 5)
      } else {
        this.ctx.fillText(this.title, this.canvasWidth / 2, this.canvasPadding / 2)
      }
    }
  };
  /**
    * 监听事件
  */
  ctxTouchstart(e){
    var e = e || event; 
    console.log(e);

    var self = this;
    var pX = e.touches[0].pageX, pY = e.touches[0].pageY,
    cX = e.touches[0].clientX, cY = e.touches[0].clientY;
    console.log(pX, pY);
    console.log(cX, cY);

    for (var i = 0; i < self.chartData.length; i++) {
      // console.log(self.chartData[i].left);
      self.ctx.beginPath();
      self.ctx.fillRect(
        self.chartData[i].left,
        self.chartData[i].top,
        self.chartData[i].right - self.chartData[i].left,
        self.chartData[i].bottom - self.chartData[i].top
      );
      if (this.ctx.isPointInPath(pX, pY)) {
        this.ctx.setFillStyle("red");
        this.cxt.fill();
        this.cxt.draw();
      }
    }

    // self.currentIndex = -1;
    //   for (var i = 0; i < self.chartData.length; i++) {
    //     if (
    //       e.pageX > self.chartData[i].left &&
    //       e.pageX < self.chartData[i].right &&
    //       e.pageY > self.chartData[i].top &&
    //       e.pageY < self.chartData[i].bottom
    //       ) {
    //       self.currentIndex = i;
    //     }
    //   }
    //   self.drawHover();
  }
  
  // drawHover() {
  //   if (this.currentIndex !== -1) {
  //     if (this.onceMove === -1) {
  //       this.onceMove = this.currentIndex;
  //       this.canvas.style.cursor = 'pointer';
  //     }
  //   } else {
  //     if (this.onceMove !== -1) {
  //       this.onceMove = -1;
  //       this.canvas.style.cursor = 'inherit';
  //     }
  //   }
  // };
  /**
   * y轴坐标点之间显示的间距
   * @param data 
   * @return y轴坐标间距
   */
  getYFictitious(data) {
    var arr = data.slice(0);
    arr.sort(function (a, b) {
      return -(a.value - b.value);
    });
    var len = Math.ceil(arr[0].value / this.yEqual);
    var pow = len.toString().length - 1;
    pow = pow > 2 ? 2 : pow;
    return Math.ceil(len / Math.pow(10, pow)) * Math.pow(10, pow);
  }
}

export { BarChart};