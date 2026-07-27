---
title: 使用CF Works搭建GitHub加速站
published: 2023-07-16
slug: 230716
description: 拒绝KB级别的下载速度，优雅地使用Github，重点是这完全免费，且有手就会！
tags: [实用教程, 建站, 开发, 网络]
category: 技术分享
image: https://image.linyunlink.top/b/230716.jpg
---


# I.背景介绍

Github作为世界上最大的代码托管平台，这无异于是开发者的天堂，但是对于中国的开发者而言这却像是地狱，时不时一个Time Out（连接超时），要不然直接无法访问，令人十分抓狂。这个时候一个自己专用的加速站的出现就可以帮你解脱出来，甚至下载速度可以达到5MB/s的下载速度，拒绝KB级别的下载！下面是搭建教程

# II.搭建方法

Step 1：你需要注册一个Cloudflare账号（如有跳过此步骤）；

Step 2：创建一个Cloudflare Worker；

Step 3：对Worker的main.js进行编辑，使用如下代码；

```jsx
// 你要镜像的网站.
const upstream = 'github.com'

// 镜像网站的目录，比如你想镜像某个网站的二级目录则填写二级目录的目录名，镜像 google 用不到，默认即可.
const upstream_path = '/'

// 镜像站是否有手机访问专用网址，没有则填一样的.
const upstream_mobile = 'github.com'

// 屏蔽国家和地区.
const blocked_region = ['KP', 'SY', 'PK', 'CU']

// 屏蔽 IP 地址.
const blocked_ip_address = ['0.0.0.0', '127.0.0.1']

// 镜像站是否开启 HTTPS.
const https = true

// 文本替换.
const replace_dict = {
    '$upstream': '$custom_domain',
    '//github.com': ''
}

// 以下保持默认，不要动
addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request));
})

async function fetchAndApply(request) {

    const region = request.headers.get('cf-ipcountry').toUpperCase();
    const ip_address = request.headers.get('cf-connecting-ip');
    const user_agent = request.headers.get('user-agent');

    let response = null;
    let url = new URL(request.url);
    let url_hostname = url.hostname;

    if (https == true) {
        url.protocol = 'https:';
    } else {
        url.protocol = 'http:';
    }

    if (await device_status(user_agent)) {
        var upstream_domain = upstream;
    } else {
        var upstream_domain = upstream_mobile;
    }

    url.host = upstream_domain;
    if (url.pathname == '/') {
        url.pathname = upstream_path;
    } else {
        url.pathname = upstream_path + url.pathname;
    }

    if (blocked_region.includes(region)) {
        response = new Response('Access denied: WorkersProxy is not available in your region yet.', {
            status: 403
        });
    } else if (blocked_ip_address.includes(ip_address)) {
        response = new Response('Access denied: Your IP address is blocked by WorkersProxy.', {
            status: 403
        });
    } else {
        let method = request.method;
        let request_headers = request.headers;
        let new_request_headers = new Headers(request_headers);

        new_request_headers.set('Host', url.hostname);
        new_request_headers.set('Referer', url.hostname);

        let original_response = await fetch(url.href, {
            method: method,
            headers: new_request_headers
        })

        let original_response_clone = original_response.clone();
        let original_text = null;
        let response_headers = original_response.headers;
        let new_response_headers = new Headers(response_headers);
        let status = original_response.status;

        new_response_headers.set('access-control-allow-origin', '*');
        new_response_headers.set('access-control-allow-credentials', true);
        new_response_headers.delete('content-security-policy');
        new_response_headers.delete('content-security-policy-report-only');
        new_response_headers.delete('clear-site-data');

        const content_type = new_response_headers.get('content-type');
        if (content_type.includes('text/html') && content_type.includes('UTF-8')) {
            original_text = await replace_response_text(original_response_clone, upstream_domain, url_hostname);
        } else {
            original_text = original_response_clone.body
        }

        response = new Response(original_text, {
            status,
            headers: new_response_headers
        })
    }
    return response;
}

async function replace_response_text(response, upstream_domain, host_name) {
    let text = await response.text()

    var i, j;
    for (i in replace_dict) {
        j = replace_dict[i]
        if (i == '$upstream') {
            i = upstream_domain
        } else if (i == '$custom_domain') {
            i = host_name
        }

        if (j == '$upstream') {
            j = upstream_domain
        } else if (j == '$custom_domain') {
            j = host_name
        }

        let re = new RegExp(i, 'g')
        text = text.replace(re, j);
    }
    return text;
}

async function device_status(user_agent_info) {
    var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < agents.length; v++) {
        if (user_agent_info.indexOf(agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
```

Step 4：自行修改调试后，保存配置；

Step 5：进入Worker提供的链接即可享用！

# III.其他问题

- Q: CF Worker的链接无法访问怎么解决?
    
    由于中国大陆的DNS污染.work均无法正常访问，最简单的方法就是在Cloudflare上套一个自己的域名，然后绑定Worker路由，然后再创建一个随意解析的CNAME记录与Worker路由的二级域名相同来使其生效。
    

- Q: 项目的原理是什么？
    
    其实就是反代，这里使用了Cloudflare免费的Woker来处理，走了Cloudflare的国外服务器的流量，然后发送到自己的主机上，理论上就可以加速所有国外网站，比如Google。但是这样的话是无法登录账号的。
    

- Q: 使用CF Worker免费吗？
    
    免费的，但是中国大陆使用还需要准备一个域名。
    

- Q: 使用CF Worker有什么限制吗？
    
    当然，天下没有免费的午餐，Cloudflare Worker免费计划只能每天每个账户10,000次请求，还限制了CPU时间，但是个人使用这些额度可以说是绰绰有余了。
    

好了，以上就是本文的全部内容了。但是有一句话希望大家牢记：技术不用用在违法的事情上。