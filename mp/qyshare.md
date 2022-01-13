# 企业微信小程序 分享相关问题梳理
* 使用前务必 配置了客户联系功能的用户可调用 否则会报“no permission”错误
* 客户联系功能配置[查看](https://work.weixin.qq.com/api/doc/90000/90135/92109#%E9%85%8D%E7%BD%AE%E5%8F%AF%E4%BD%BF%E7%94%A8%E5%AE%A2%E6%88%B7%E8%81%94%E7%B3%BB%E5%8A%9F%E8%83%BD%E7%9A%84%E6%88%90%E5%91%98)


## 分享群
* api 名称：wx.qy.shareToExternalChat
* 同一个成员每日向一个客户群最多可群发一条消息
* 官方文档[查看](https://work.weixin.qq.com/api/doc/90000/90136/93572)
 
### 分享图片到客户群
*  支持https的图片链接，如果是本地图片，需要进行上传到服务器
*  示例：
```
wx.qy.shareToExternalChat({
          attachments:[
            {
              msgtype: "image", 
              image:{
                 imgUrl:url
              },
            }
           ]
         })
```

### 分享小程序到客户群
* 路径是 / 开头的 如：/xxxx/xxx.html?xx=xxx 否则在微信端打开会提示找不到页面
* 示例：
  ```
   wx.qy.shareToExternalChat({
      attachments:[
        {
          msgtype: "miniprogram", 
          miniprogram:{
            appid: accountInfo.miniProgram.appId,    // 小程序的appid
            title: params.title,        // 小程序消息的title
            imgUrl: params.imgUrl,    //小程序消息的封面图。
            page,        //小程序消息打开后的路径，注意要以.html作为后缀，否则在微信端打开会提示找不到页面
          },
        }
       ]
    })
  ```

## 分享好友
* api名称：wx.qy.shareToExternalContact
* 同一个成员每日向一个客户最多可群发一条消息
* 需要配置客户联系功能，通分享群类似
* 官方文档[查看](https://work.weixin.qq.com/api/doc/90000/90136/93571)

### 分享图片给客户
* 图片是https类型
* 示例：
  ```
  wx.qy.shareToExternalContact({
          attachments:[
            {
              msgtype: "image", 
              image:{
                 imgUrl:url
              },
            }
           ]
         })
  ```
 ### 分享小程序给客户 
 * 和分享群类似
 * 示例：
  ```
    wx.qy.shareToExternalContact({
      attachments:[
        {
          msgtype: "miniprogram", 
          miniprogram:{
            appid: accountInfo.miniProgram.appId,    // 小程序的appid
            title: params.title,        // 小程序消息的title
            imgUrl: params.imgUrl,    //小程序消息的封面图。
            page,        //小程序消息打开后的路径，注意要以.html作为后缀，否则在微信端打开会提示找不到页面
          },
        }
       ]
    })
  ```
## 分享好友无限制
* api名称：wx.qy.shareAppMessageEx
* 未开放api,只能分享小程序
* 参数说明：title，imageUrl(https类型) path(/xxx/xxx.html?xx=xxx) selectedExternalUserIds(分享好友的企微id)
* 示例：
  ```
   return new Promise((revose,reject)=>{
      wx.qy.shareAppMessageEx({
        title:parasm.title,
        imageUrl: parasm.imageUrl,
        path: parasm.path,
        selectedExternalUserIds: parasm.selectedExternalUserIds || [],
        success: (res) => {
          console.log('res:',res)
          revose(res)
        },
        fail: (e) => {
          if(e.errMsg.includes('no permission')){
            wx.showToast({
              title:'请配置客户联系功能权限',
              icon:'none'
            })
          }
          reject(e)
        }
      })

     })
  ```

 ### 关于 分享的路径，务必要做一个 page容错处理 
 * 达到路径如下目的：/xxx/xxx.html?xx=xxx
 ```
 /**
 * page 容错
 * @param {*} page 
 */
const getTryParamsPage = (page) =>{
  let htmlPath = ''
  if(page){
    const sharePathArray = page.split('?')
    let newPage = sharePathArray[0]
    newPage = newPage.startsWith('/') ? newPage : `/${newPage}`
    const scene = sharePathArray.length === 2 ? sharePathArray[1] : ''
    htmlPath = `${newPage}.html?${scene}`
  }

  return htmlPath

}

 ```

 ### 关于本地图片，生成https 取巧方法
 * 可以借助 wx.getImageInfo 得到一个https的临时路径
  ```
  wx.getImageInfo({
  src: 'images/a.jpg',
  success (res) {
    console.log(res.width)
    console.log(res.height)
  }
})
  ```