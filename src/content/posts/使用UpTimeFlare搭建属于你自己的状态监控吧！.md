---
title: 使用UpTimeFlare搭建属于你自己的状态监控吧！
published: 2024-06-27
slug: 240627
description: 你是否想要为你的各个站点和服务器添加状态监控？又碍于没有资源？现在你可以免费来搭建一个属于你的！
tags: [实用教程, 建站, 开发, 网络]
category: 技术分享
image: https://image.linyunlink.top/b/240627.jpg
---


**项目地址：**[https://github.com/lyc8503/UptimeFlare](https://github.com/lyc8503/UptimeFlare)

# 项目介绍

类似于UpTimeRobot，这个项目允许你使用Cloudflare和Github搭建一个属于你自己的状态监控页面。下面是作者给出的效果展示图：

![Untitled](https://image.linyunlink.top/240627/01.jpg)

# 搭建教程

### 材料准备

1. 一个活人（看到的都有吧）
2. 一台可以进行操作的设备（推荐Windows、MacOS和Linux Desktop）
3. 一个Github账户（没用的去https://github.com注册）
4. 一个Cloudflare账户（没有的去https://www.cloudflare.com注册）
5. 一个域名（可选，建议托管在Cloudflare）

### 前期准备

首先我们先复制一份这个项目仓库，点击项目页面右上角的`Use this template`然后点击`Create a new repository`(不建议直接`Fork`，建议作为私有仓库使用)。然后在创建仓库页面设置一个仓库名，比如就叫`UpTimeFlare`，将`Public`改为`Private`，然后点击`Create repository`，于是就完成了最简单的第一步。这一步比较简单，就不给出操作截图了。

随后我们需要一个Cloudflare账户，注册的过程就跳过了。登录好了之后访问[Cloudflare API Token申请页面](https://dash.cloudflare.com/profile/api-tokens)创建一个令牌，点击使用模板中的`编辑Cloudflare Workers`，点击。

![Untitled](https://image.linyunlink.top/240627/02.jpg)

接着如下图，就修改这两个参数，然后点击`继续以显示摘要`，然后点击`创建令牌`。

![Untitled](https://image.linyunlink.top/240627/03.jpg)

然后点击`Copy`复制API令牌，下面的步骤里要用。

![Untitled](https://image.linyunlink.top/240627/04.jpg)

接着我们回到我们刚刚复制的那个仓库，依次点击`Settings - Secrets and variables - Actions`，点击`New repository secrets`创建一个新的密钥，`Name`设置为`CLOUDFLARE_API_TOKEN`，`Secret`就设置成你刚刚复制的API令牌。

![Untitled](https://image.linyunlink.top/240627/05.jpg)

### 修改配置

然后我们就要开始设置状态监控了。回到仓库的`Code`界面，全程我们只需要修改一个配置文件，就是`uptime.config.ts`，我们点击这个文件，点击右上角的笔`Edit this file`，起初的配置文件是完整版本的，有些功能我们不需要，可以删除，比如下面这个（位于配置文件的第61到74行）：

```tsx
  notification: {
    // [Optional] apprise API server URL
    // if not specified, no notification will be sent
    appriseApiServer: "https://apprise.example.com/notify",
    // [Optional] recipient URL for apprise, refer to https://github.com/caronc/apprise
    // if not specified, no notification will be sent
    recipientUrl: "tgram://bottoken/ChatID",
    // [Optional] timezone used in notification messages, default to "Etc/GMT"
    timeZone: "Asia/Shanghai",
    // [Optional] grace period in minutes before sending a notification
    // notification will be sent only if the monitor is down for N continuous checks after the initial failure
    // if not specified, notification will be sent immediately
    gracePeriod: 5,
  },
```

如果没有需要我们可以直接删掉，如果需要可以参照原仓库中的`Wiki`进行配置，为了节省时间，我把一个精简版本的配置文件放在下面，可以删掉原来的所有内容，复制一下我的，然后自行调试：

```tsx
const pageConfig = {
  // 状态页面的标题，类似于HTML里面的<title></title>
  title: "凌云服务状态",
  // 状态页面右上角的按钮，按顺序从左往右在页面上排列
  links: [
	  // 这个是普通按钮
	  { link: '网址', label: '按钮名称'},
	  // 这个是显示成蓝色按钮的高光按钮
	  { link: '网址', label: '按钮名称', highlight: true },
  ],
}

const workerConfig = {
  // Write KV at most every 3 minutes unless the status changed.
  kvWriteCooldownMinutes: 3,
  // Define all your monitors here
  monitors: [
    // ==========[服务监控]==========
    // 这是一个例子，用于监控一个网页
    // 如果是端口监控，可以参照原作者的Wiki
    {
	    // id必须唯一，使用英文和下划线
      id: 'linyun_blog_monitor',
      // 监控页面展示的监控名称
      name: '凌云·LinYun 博客',
      // 请求形式，HTTP请求一般用GET和POST，分不清就用GET
      method: 'GET',
      // 你监控的网站的地址
      target: 'https://www.linyunlink.top/',
    },
  ],
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any Typescript code here

      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any Typescript code here
    },
  },
}

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig }
```

在上面的代码里，下面的内容可以反复堆叠，达到多个监控的效果，但是`id`一定要不唯一，以防止冲突，其他的按要求自行调整，每个监控的设置还有更多进阶配置，可以参照作者的`Wiki`来设置，这里不过多赘述了。

```tsx
    {
	    // id必须唯一，使用英文和下划线
      id: 'linyun_blog_monitor',
      // 监控页面展示的监控名称
      name: '凌云·LinYun 博客',
      // 请求形式，HTTP请求一般用GET和POST，分不清就用GET
      method: 'GET',
      // 你监控的网站的地址
      target: 'https://www.linyunlink.top/',
    },
```

接着我们保存文件，不出意外进入`Actions`页面，就会发现有一个`Action`在运行了，但是不出意外，肯定会报错，不要慌张，我们如果发现报错发生在`Build Page`并且报错内容和下面一眼，请往后看：

```bash
▲  Linting and checking validity of types ...
▲  Failed to compile.
▲  ./pages/index.tsx:106:25
▲  Type error: Property 'tooltip' does not exist on type '{ id: string; name: string; method: string; target: string; }'.
▲  
▲    104 |       id: monitor.id,
▲    105 |       name: monitor.name,
▲  > 106 |       tooltip: monitor?.tooltip,
▲        |                         ^
▲    107 |       statusPageLink: monitor?.statusPageLink
▲    108 |     }
▲    109 |   })
▲  Error: Command "npm run build" exited with 1
```

我们发现是项目`pages`目录下的`index.tsx`文件报错了，我们先不急着打开这个文件，继续看报错，报错说`tooltip`不存在，其实在最开始设置监控的配置文件里有两个可选的配置分别是`tooltip`和`statusPageLink`，作者的本意是可以不填写的，但是定义的时候没有实现，导致了错误，作者目前已经承认这个是一个Bug（参照原项目的Issues），但是目前还没有被修复，但是我给出了两种解决办法，读者可以自行斟酌，选择合适的方法。

### 方法一：修改`uptime.config.ts`（推荐）

我们还是打开刚刚的配置文件，不需要修改太多内容，只需要修改监控相关的配置就好了，根据下面的代码，添加两个参数：

```tsx
// 原来的配置-------------------->
    {
	    // id必须唯一，使用英文和下划线
      id: 'linyun_blog_monitor',
      // 监控页面展示的监控名称
      name: '凌云·LinYun 博客',
      // 请求形式，HTTP请求一般用GET和POST，分不清就用GET
      method: 'GET',
      // 你监控的网站的地址
      target: 'https://www.linyunlink.top/',
    },
// <--------------------原来的配置

// 修改后的配置-------------------->
    {
	    // id必须唯一，使用英文和下划线
      id: 'linyun_blog_monitor',
      // 监控页面展示的监控名称
      name: '凌云·LinYun 博客',
      // 请求形式，HTTP请求一般用GET和POST，分不清就用GET
      method: 'GET',
      // 你监控的网站的地址
      target: 'https://www.linyunlink.top/',
      // 监控页面悬浮提示
      tooltip: '凌云·LinYun 博客',
      // 监控页面点击监控跳转链接
      statusPageLink: 'https://www.linyunlink.top/',
    },
// <--------------------修改后的配置
```

修改好之后保存，Action会重新运行，就不会产生刚刚的错误了。

这个办法新增了`tooltip`和`statusPageLink`，解决的无法找到这两个参数了错误，但是每一个监控都要添加这两个参数，否则可能还会产生相同的报错。

### 方法二：修改`/pages/index.tsx`

我们进入项目的`pages`目录，打开`index.tsx`，修改下面这两行代码（位于第106和107行）：

```tsx
      tooltip: monitor?.tooltip,
      statusPageLink: monitor?.statusPageLink,
```

修改成下面这两行代码：

```tsx
      tooltip: 'None', //monitor?.tooltip,
      statusPageLink: 'None', //monitor?.statusPageLink,
```

然后再保存，就不会产生刚刚的错误了，但是所有的监控页面悬浮提示都变成了None，点击监控就会跳转到404页面，不是很推荐这个方法。这个方法的原理就是不调用用户设置的参数，直接采用默认值，规避了用户没有定义的问题，但是用户也没法再自定义这两个参数了。

### 访问站点

打开`Cloudflare Dashboard`，点击`Wokers 和 Pages`，如果你和我一样看到了下面两个项目，祝贺你你已经搭建成功了，点击上面的UpTimeFlare的项目就可以查看访问链接啦！

![Untitled](https://image.linyunlink.top/240627/06.jpg)

### 绑定域名

如果你有一个域名的话，你也可以考虑给你的状态页面绑定一个域名，这个操作也很简单，我们只需要添加一条`CNAME`记录就好了，但是如果你的域名托管在Cloudflare上，你只需要打开Pages里面的uptimeflare，然后点击自定义域，按照提示操作就完成了！

记录示例(XXXXXXX.pages.dev修改成自己的链接)：

| 类型 | 记录值 |
| --- | --- |
| CNAME | XXXXXXX.pages.dev |

## 写在最后

到此为止，你就完成了所有的搭建过程，感谢你的阅读。如果你有什么问题，欢迎在下面评论，我会给出答复，尽可能帮助你。awa