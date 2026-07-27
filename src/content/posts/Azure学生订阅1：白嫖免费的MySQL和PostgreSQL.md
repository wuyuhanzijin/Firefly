---
title: Azure学生订阅1：白嫖免费的MySQL和PostgreSQL
published: 2025-06-22
description: 领完了Azure的虚拟机，账号不会放着吃灰吧？没事，再薅一点！
tags: [Azure, 云服务, 开发, 白嫖]
category: 技术分享
image: https://image.linyunlink.top/b/250622.jpg
slug: 250622
---


最近不知道怎么的，GitHub的学生包申请好像变简单了，一次就过了，那肯定得狠狠地利用一下，这诱惑最大的就是Azure的这100$赠金和免费服务了。服务器都是上千兆的带宽，免费的虚拟机、数据库、115GiB/月的出站流量，真是赛博善人（善人+1）。

然而网上似乎大部分都是虚拟机的开通教程，然后数据库就很少，而且Azure的计费也是出了名的阴，你也算不准什么时候扣费，这篇教程也是1.8$买的教训，分享给大家，特别是Azure即用即付账户的使用者，避免信用卡扣费（这可不像学生订阅扣储值的）。

# 配置介绍

| 项目 | MySQL | PostgreSQL |
| --- | --- | --- |
| 免费使用时长 | 750小时/月 | 750小时/月 |
| 免费存储 | 32GB | 32GB |
| 免费备份存储 | 32GB | 32GB |
| 性能配置 | 可突发B1ms,1 vCUP,2G RAM | 可突发B1ms,1 vCUP,2G RAM |
| 数据库IOPS | 396 IOPS | 120 IOPS |
| 支持的数据库版本 | MySQL 5.7(已停用)/ 8.0/ 8.4(公共预览版) /9.3(公共预览版) | Postgre 11/ 12/ 13/ 14/ 15/ 16/ 17(预览) |

# 创建教程&避坑指南

## MySQL的创建

1.进入这个网址（[https://portal.azure.com/#create/Microsoft.MySQLServer](https://portal.azure.com/#create/Microsoft.MySQLServer)），点击`高级创建`（注意）。

2.填写相关配置，如`资源组`、`服务器名称`、`身份认证信息`等，不要`启用高可用性配置`。

3.随后配置以下内容，注意这里有很多坑，首先，区域的选择，我建议选韩国中部，这个是可以进行IOPS预配的区域，实测East US、East US 2、East Asia、Japan East都不能创建成功，错误原因是该区域不支持预配。如果尝试了其他区域可以的话可用文末留言告诉我。然后点击`配置服务器`。

![1.jpg](https://image.linyunlink.top/250622/1.jpg)

然后进入到下面这个页面，我们主要修改存储大小为32GB，预配IOPS为396，取消存储自动增长，然后保存即可。参考下图填写配置即可：

![2.jpg](https://image.linyunlink.top/250622/2.jpg)

4.最好一路继续就创建成功啦！

## PostgreSQL的创建

其实这个和MySQL的创建大差不差，我列出几个要点即可，这里的坑比MySQL少得多，创建链接是[https://portal.azure.com/#create/Microsoft.PostgreSQLServer](https://portal.azure.com/#create/Microsoft.PostgreSQLServer)。

进去之后大体流程同上，配置完其他的内容之后，还是点击`配置服务器`，里面修改成下面图片的样子就好啦！

![3.jpg](https://image.linyunlink.top/250622/3.jpg)

然保存之后也是一路继续就配置好啦！

## 绑定域名相关

这个我们只需要进入相对应的数据库的资源里面，在概述里面有一个`服务器名称`（MySQL）或者`终结点`（PostgreSQL），一般格式就是`<服务器名称>.<mysql/postgre>.database.azure.com`，只需要拿着这个去域名里面做一个CNAME记录就好了，但是不要套CDN（就是Cloudflare的小橙云的按钮）。

# 最后

今天的白嫖列出也到站休息，如果各位在实际操作或者使用的时候遇到了什么问题，也可用邮箱或者下方评论与我联系，我会竭尽所能为你提供帮助。这篇文章写于2025年6月22日，Azure可能会更新创建的流程或者页面，如果有什么不懂的欢迎联系我哦~