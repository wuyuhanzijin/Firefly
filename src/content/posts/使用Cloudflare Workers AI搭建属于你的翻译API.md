---
title: 使用Cloudflare Workers AI搭建属于你的翻译API
published: 2024-07-02
slug: 240702
description: 试试吧，搭建过程并不困难，但是你需要一个托管在Cloudflare的域名。或许你可以找一个免费的域名?
tags: [实用教程, 工具, 开发, 网络]
category: 技术分享
image: https://image.linyunlink.top/b/240702.jpg
---


我们都知道，有这样一个公司，提供免费CDN、免费域名托管、免费边缘函数计算、免费对象存储、免费内网穿透、免费部署Pages、免费KV、免费SSL证书……他就是Cloudflare！

就在前不久Cloudflare推出了免费的Workers AI，这就允许我们使用AI模型搭建一个翻译API，这相当简单，请看下面的教程。

## 搭建教程

在`Cloudflare dashboard`找到`AI - Workers AI`，找到下面这个模型（`@cf/meta/m2m100-1.2b`），这就是我们要使用的模型。

![Untitled](https://image.linyunlink.top/240702/01.jpg)

然后我们找到`使用WOrkers模板`创建，然后在里面找到`Translation AI`，点击创建，根据提示自行创建。

创建完之后点击Workers内的`编辑代码`，将`index.js`的代码替换成我的：

```jsx
export default {
  async fetch(request, env) {
    const urlStr = request.url
    const urlObj = new URL(urlStr)
    let text =  urlObj.searchParams.get('text')
    let source_language = urlObj.searchParams.get('source_language')
    let target_language = urlObj.searchParams.get('target_language')
    const inputs = {
      text: text,
      source_lang: source_language,
      target_lang: target_language
    };
    if(text==null){
      return Response.json({ inputs, response:{
        translated_text: "ERROR: value 'text' is missing"
      } } );
    }
    if(source_language==null){
      return Response.json({ inputs, response: {
        translated_text: "ERROR: value 'source_language' is missing"
      }} );
    }
    if(target_language==null){
      return Response.json({ inputs, response: {
        translated_text: "ERROR: value 'target_language' is missing"
      }} );
    }
    else {
      const response = await env.AI.run('@cf/meta/m2m100-1.2b', inputs);
      return Response.json({ inputs, response });
    }
  },
};
```

这是最基础的版本，如果你需要一个访问密钥的话可以使用下面的代码：

```jsx
export default {
  async fetch(request, env) {
    const urlStr = request.url
    const urlObj = new URL(urlStr)
    let text =  urlObj.searchParams.get('text')
    let source_language = urlObj.searchParams.get('source_language')
    let target_language = urlObj.searchParams.get('target_language')
    let key = urlObj.searchParams.get('key')
    const inputs = {
      text: text,
      source_lang: source_language,
      target_lang: target_language
    };
    if (key !=="设置你想要的密钥"){
      return Response.json({ inputs, response:"ERROR: wrong key"} );
    }
    else{
      if(text==null){
        return Response.json({ inputs, response:{
          translated_text: "ERROR: value 'text' is missing"
        } } );
      }
      if(source_language==null){
        return Response.json({ inputs, response: {
          translated_text: "ERROR: value 'source_language' is missing"
        }} );
      }
      if(target_language==null){
        return Response.json({ inputs, response: {
          translated_text: "ERROR: value 'target_language' is missing"
        }} );
      }
      else {
        const response = await env.AI.run('@cf/meta/m2m100-1.2b', inputs);
        return Response.json({ inputs, response });
      }
    }
  },
};
```

编辑好代码后，点击部署即可，参照下图配置自定义域：

![Untitled](https://image.linyunlink.top/240702/02.jpg)

## 如何使用

对于第一个代码你需要传入一组数据，包含三个参数，键分别为`text`,`source_language`和`target_language`：

```json
// 传入参数
{
	"text": "你好啊",
	"source_language": "zh",
	"target_language": "en"
}
```

https://xx.xxxxx.xxx/?text=你好啊&source_language=zh&target_language=en

这个链接就可以查询到结果，不出意外返回的JSON应该是这样的：

```json
{
    "inputs": {
        "text": "你好啊",
        "source_lang": "zh",
        "target_lang": "en"
    },
    "response": {
        "translated_text": "Hello to you."
    }
}
```

不同于传入的参数，传出的参数中`*_language`都变成了`*_lang`，开发者需要注意。

对于使用了带有密钥的方案，只需额外传入参数`key`即可，返回的JSON也会在`inputs`中多一个`key`的参数，其他不变动，URL也只需要加上`&key=你自己设置的key`即可。

## 限制

虽然Cloudflare允许并且鼓励我们白嫖，但是绝对不会没有限制，限制如下：

**Cloudflare Workers and Pages 免费计划 Limit**

**Workers 和 Pages Functions**

> 每个请求最多占用 10 毫秒 CPU 时间
> 
> 
> 每天最多 100,000 (UTC+0)
> 

**Workers AI**

> 访问我们目录中的所有 AI 模型
> 
> 
> 每天最多 10,000 个神经元
>