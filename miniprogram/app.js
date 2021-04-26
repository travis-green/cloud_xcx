//app.js
import { initHooks } from "./utils/hook.js"
initHooks() //初始化hooks
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'prod-dcvat',
        traceUser: true,
      })
    }
    const performance = wx.getPerformance()
    const observer = performance.createObserver((entryList) => {
      //返回的是list
      console.log('性能\n', entryList.getEntries())
      // console.log('route: 路由性能；appLaunch: 小程序启动耗时\n', entryList.getEntriesByName("appLaunch", "navigation")[0])
      // console.log('firstRender: 页面首次渲染耗时\n', entryList.getEntriesByName("firstRender", "render")[0])
      // console.log('evaluateScript: 注入脚本耗时\n', entryList.getEntriesByName("evaluateScript", "script")[0])
    })
    observer.observe({
      entryTypes: ['render', 'script', 'navigation']
    })
    // this.globalData = {}
  },
  globalData: {
    username: '1111'
  }
})