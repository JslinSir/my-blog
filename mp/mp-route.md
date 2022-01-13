# 小程序 路由跳转 传参 思考🤔

### 问题来由：
 由于微信小程序的路由跳转，传参写法不太友好，如果想直接传个对象过去还要转成字符串的形式，而且大小也有限制

### 目的：
* 支持原生小程序方式跳转
* 支持对象形式传参

### 用法：
* 路由跳转传参：
Route.navigateTo('../page/page',{name:'jslin',sex:'man',age:'18'})

* 获取参数：const params =  Route.getParams() （阅后即焚，使用完将清空 params）


相关代码：
```
/**
 * 路由工具,解决传参过多，支持对象形式传参
 * 用法：
 * 路由跳转
 * import Route from '../../utils/route'
 * Route.navigateTo('../page/page',{name:'jslin',sex:'man',age:'18'})
 * 
 * 路由参数获取
 * 阅后即焚 使用完，将清空 Route.params[name]
 *  const params =  Route.getParams()
 */

const _DEFAULT_KEY_ = '_PARAMSKEY_KEYS_NAME_DEFAULT_IF_NAME_UNDEFINED_OR_NULL_'


class Route {


  constructor() {

    this.params = {}

  }


  navigateTo(url, params,name) {
    return this.wxRouteUtil('navigateTo',{
      url
    },params)
  }



  redirectTo(url, params,name) {
    return this.wxRouteUtil('redirectTo',{
      url
    },params)
  }


  reLaunch(url, params,name) {
    return this.wxRouteUtil('reLaunch',{
      url
    },params)
  }



  navigateBack(delta = 0) {
    return this.wxRouteUtil('navigateBack',{
      delta
    },params)
  }


  switchTab(url,params,name){
    return this.wxRouteUtil('switchTab',{
      url
    },params,name)
  }

  wxRouteUtil(key,route,params,name=_DEFAULT_KEY_){
    return new Promise((revose, reject) => {
      this.params[`${name.toString()}`] = params
      wx[key]({
        ...route,
        success: () => revose(),
        fail: (error) => reject(error)
      })
    })
  }


  getParams(name=_DEFAULT_KEY_){
    const params = this.params[name+'']
    this.removeParams(name)
    return params
  }


  removeParams(name) {
    delete this.params[name]
 
  }


}


export default new Route()

```