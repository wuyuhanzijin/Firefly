---
title: NotionNext更新冲突手动解决方案
published: 2024-06-29
tags: [实用教程, 建站, 开发, 网络]
category: 技术分享
description: NotionNext更新冲突？网上教程还要VS code和git?通通不需要，马上解决冲突！
slug: 240629
image: https://image.linyunlink.top/b/240629.jpg
---


正常情况下，如果你要更新NotionNext，在你`frok`的项目里点击`Sync Fork`，如果有更新就是像下面一样，可以直接更新，直接点击`Update branch`即可，不要点击`Discard XX commits`，这样的话你的修改就全部没了。

![01.jg](https://image.linyunlink.top/240629/01.jpg)

但是有的时候如果哪一天出现了下面的提示，那一定是勤劳的tangly1024又更新了配置文件，Github无法理解差异，没办法直接更新了。

![02.jpg](https://image.linyunlink.top/240629/02.jpg)

根据tangly1024的教程，我们需要放弃所有的配置文件，重头再来，这肯定不是我们想要的，也有使用Git来解决的，但是我们需要让技术小白也能学会——直接在Github网页端进行解决冲突。

### 解决步骤

先打开`Pull requests`，点击`New pull request`新建一个合并请求；

![03.jpg](https://image.linyunlink.top/240629/03.jpg)

点击`Create pull request`建立合并请求；

![04.jpg](https://image.linyunlink.top/240629/04.jpg)

在`Add a title`里面随便设置一个标题，点击`Create pull request`，创建合并请求；

![05.jpg](https://image.linyunlink.top/240629/05.jpg)

拉到最底下，点击`Resolve conflicts`，手动解决冲突；

![06.jpg](https://image.linyunlink.top/240629/06.jpg)

修改冲突的代码，修改好之后点击`Mark as resolved`，标记为已经解决；

![07.jpg](https://image.linyunlink.top/240629/07.jpg)

再点击`Commit merge`，提交更新；

![08.jpg](https://image.linyunlink.top/240629/08.jpg)

如果你调试之后一切正常了，更新也完成了，记得去tangly1024的NotionNext仓库，打开`Pull requests`，找到自己的合并请求，然后把它关闭掉。