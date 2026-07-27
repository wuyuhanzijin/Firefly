---
title: 使用Python调用搭建的翻译API
published: 2024-07-07
slug: 240707
description: 我们搭建好了API，下一步就是调用它……
tags: [Python, 工具, 开发, 网络]
category: 技术分享
image: https://image.linyunlink.top/b/240707.jpg
---


API的搭建参考这篇文章

[使用Cloudflare Workers AI搭建属于你的翻译API](%E4%BD%BF%E7%94%A8Cloudflare%20Workers%20AI%E6%90%AD%E5%BB%BA%E5%B1%9E%E4%BA%8E%E4%BD%A0%E7%9A%84%E7%BF%BB%E8%AF%91API%20897d464d50a440a2b661ba4fe8ebd036.md) 

## 获取翻译API的URL

如果我们要翻译“Hello World”（en to zh），那我们就访问一个特定的URL，我们就是要通过Python自动获取这个URL，我们可以使用这个函数：

```python
def get_url(
        api_url: str,
        text: str,
        source_language: str,
        target_language: str
):
    """
    传入参数
    : api_url 翻译api的URL 需要指明HTTP或者HTTPS 结尾加上"/"
      传入示例：https://translate.linyunlink.top/
    : text 你即将翻译的文本
    : source_language 翻译文本源语言
    : target_language 翻译文本靶语言

    返回值
    : url 翻译api的标准URL

    注意
    : 请保证传入参数的准确性，不要浪费api的资源
    """
    url = api_url + "?text={}&source_language={}&target_language={}".format(
        text, source_language, target_language
    )

    return url
```

我们运行这个语句，就可以获得URL：

```python
if __name__ == "__main__":
    print(
        get_url(
            "https://translate.linyunlink.top/",
            "Hello world!",
            "en",
            "zh"
        )
    )
```

## 获取JSON

接着我们需要从得到的URL里面获取JSON，首先我们引入一下`requests`库：

```python
import requests
```

然后定义一个函数：

```python
def get_translated_json(url: str):
    """
    传入参数
    : url 翻译api的标准URL

    返回值
    : translated_json api返回的JSON
    """
    response = requests.get(url)
    translated_json = response.content.decode()
    return translated_json
```

传入刚刚获取的url就可以了，不出意外的，我们打印一下translated_json，结果应该是这样的：

![Untitled](https://image.linyunlink.top/240707/01.jpg)

## 获取翻译结果

我们将JSON转换为字典，然后提取`”response”`对应的字典，然后提取这个字典里面`”translated_text“`对应的字符串。

先引入json库：

```python
import json
```

定义一个函数处理数据：

```python
def get_translated_text(translated_json):
    """
    传入参数
    : translated_json api返回的JSON
    返回值
    : translated_text 翻译结果或者是错误信息
    """
    response_dict = json.loads(translated_json)
    translated_response = response_dict['response']
    translated_text = translated_response['translated_text']

    return translated_text
```

返回值就是我们想要的结果：`您好世界！`

## More?

- UI界面
- 判断传入是否正确
- ……

你可以自己去尝试，这有无数种可能！