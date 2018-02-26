const app = getApp();
import { radarChart } from '../../../utils/radarChart';
Page({
  data: {
    systemInfo: {
      pixelRatio: app.globalData.pixelRatio,
      screenWidth: app.globalData.screenWidth,
      screenHeight: app.globalData.screenHeight,
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
    },
    menuList: [
      {
        text: '七大领域发展频次',
        src: './index?title=redirect'
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
  onLoad(res) {

    let option = {
      backgroundColor: '#fff',

      title: {
        text: '七大领域发展频次',
        subtext: '统计截至：2017-07-20',

        left: 'center',
        top: 20,
        padding: [60, 0, 20, 0],
        textStyle: {
          color: '#666',
          fontSize: '14',
          textAlign:'center',
          textBaseline: 'middle',
        },
        subtextStyle: {
          color: '#999',
          fontSize: '12',
          textAlign: 'center',
          textBaseline: 'middle',
        }
      },

      tooltip: {
        trigger: 'item',
        formatter: "{a}<br/>{b} : {c} 分" // {a} <br/>{b} : {c}({d}%)    {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      },

      visualMap: {
        show: false,
        min: 1,
        max: 100,
        inRange: {
          color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
          colorLightness: [0.4, 0.8]
        }
      },
      series: [
        {
          name: '评估结果',
          types: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 80, name: '阅读' },
            { value: 100, name: '写作' },
            { value: 90, name: '形状、空间和测量' },
            { value: 77, name: '人和社区' },
            { value: 96, name: '世界' },
            { value: 60, name: '技术' },
            { value: 70, name: '探索和使用媒介与材质' },
            { value: 86, name: '富有想象力' }
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(0, 0, 0, 0.3)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(0, 0, 0, 0.3)'
              },
              smooth: 0.2,
              length: 5,
              length2: 10
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 50,
              shadowColor: 'rgba(0, 0, 0, 0.2)'
            }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };

    this.RadarChart = new radarChart('firstCanvas', option);
  },
  onReady() {
    this.RadarChart.init();
  },
})

