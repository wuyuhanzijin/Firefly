---
title: 什么？你说你的Cloudflare Works无法访问？
published: 2023-07-23
slug: 230723
description: 想要知道怎么解决？看了这篇文章你就会了！如果你没有域名的话请回避。
tags: [实用教程, 建站, 开发, 网络]
category: 技术分享
image: https://image.linyunlink.top/b/230723.jpg
---


也许你已经看过了我关于搭建Github加速站的文章，可是你搭建完兴冲冲地打开Cloudflare提供的二级域名时，浏览器却给你一个无法连接的错误。这个时候不要慌，按照我下面的步骤就可以解决！

## 解决方案

1.登录到你的Cloudflare并绑定一个域名，绑定好了就像这样：

![Untitled](https://image.linyunlink.top/230723/01.jpg)

2.紧接着我们进入到域名的管理界面，随后点击左侧的Workers路由;

![Untitled](https://image.linyunlink.top/230723/02.jpg)

3.然后点击“添加路由”按钮，假设你的Cloudflare Workers叫做github，想要绑定到github.linyunlink.top，那么就按照下图来设置，设置好了点击保存。其他的以此类推：

![Untitled](https://image.linyunlink.top/230723/03.jpg)

注意：路由一定要在结尾加上“/*”表示该域名下的其他地址都允许被访问。

4.随后添加一条DNS记录，可以借鉴下面的配置，只是当作占位用的，让Cloudflare DNS知道github这个子域可以被访问，设置好了点击保存；

![Untitled](https://image.linyunlink.top/230723/04.jpg)

注意：一定要把代理状态调到已代理，就是把小云朵点亮。

到此为止，配置就完成了，打开配置好的域名，就可以访问了！是不是脑子会了手还不会，那就按照方法一步一步操作，相信你可以完成的。