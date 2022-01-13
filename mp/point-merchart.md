# 关于微信小程序 商圈积分插件 需要知道的一些事项

## 商圈积分插件介绍
微信支付为商圈小程序提供官方小程序快速积分插件，商圈会员通过商圈小程序快速积分插件完成消费记录及位置信息授权，从而获得微信支付提供的商圈会员在商圈内使用微信支付消费的快速积分服务。

## 前置条件
使用插件前，商圈小程序需先判断登录小程序的用户是否是商圈会员。如用户未登录，或用户未注册会员，商圈小程序需先完成会员身份确认流程，再引用插件

## 开发前准备

1. 申请插件使用权限
* 发送邮件申请至zhsq@tencent.com
邮件要求：主题：申请接入插件名称
正文内容：商圈商户号，商圈名称，（如为服务商代替商圈申请需包含服务商商户号，服务商名称），调用插件小程序appid，技术联络员姓名，技术联络员手机号以及积分受理回调地址（重要，用于接收消费记录推送）。
* 以小程序账号登录微信公众平台（mp.weixin.qq.com)，选择【设置—>第三方服务—>添加插件】，进入添加插件操作页面。
* 搜索插件名 “商圈快速积分” 并添加
* 提交审核申请后，商圈可通过微信公众平台查看审核进度
* 审核通过后，小程序开发者即可在小程序内使用该插件


2. 插件集成
   
 如果是分包，可以把插件引入到分包，代码示例如下：

 ```
   {
      "root": "pages/customer/points",
      "pages": [
        "pages/index/index",
        "pages/list/list",
        "pages/mall/mall"
      ],
      "plugins": {
        "shopping-integration-plugin": {
          "version": "1.3.0",
          "provider": "wxfab2bf944bfc4da6"
        }
      }
    },
 ```  

 3. 插件使用
   
   1. 判断是否是会员，是否打开地理位置授权 ，如果进来该页面 未注册成会员跳转到注册会员页，未打开地理位置授权跳转授权位置页
   2. 获取该商圈插件状态，需要传参：openId 和商户号
   ```
    const pointPlugin = requirePlugin('shopping-integration-plugin')
    const pluginResult = await pointPlugin.getAuthStatus(openId, wechatKeyNo)
    if(pluginResult.status != undefined){
        // status 如果为1 则已授权 0 则未授权 ，这里最好不要用全等去判断状态，因为这个类型不一定是 string  或者number

    }else{
        //这个商户下还不支持快速积分
    }
   ```
 
 ## [官方文档](https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wxfab2bf944bfc4da6&token=76961061&lang=zh_CN#-beta-)

 ## 报错问题及解决方案

 [问题及解决方案](https://docs.qq.com/sheet/DTm9VVHdsYWJwUWN4?_t=1634005149504&tab=BB08J2)

 
