# 获取企业微信的 客户端版本号

```
const ua =  navigator.userAgent;
const version = ua.match(/wxwork\/([\d.]+)/)[1]

```

## 官方说明
* [企微的UA](https://open.work.weixin.qq.com/api/doc/90001/90148/90457#%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E7%9A%84UA)

* 其中wxwork是企业微信关键字，2.1.0为用户安装的微信版本号。MicroMessenger是微信的关键字。