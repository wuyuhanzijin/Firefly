---
title: 使用LaTex公式解决博客内的公式与化学方程式
published: 2024-07-06
slug: 240706
description: 不得不说LaTex解决了化学方程式的输入，太好用啦！
tags: [LaTex, 化学, 实用教程, 数学]
category: 技术分享
image: https://image.linyunlink.top/b/240706.jpg
---


如果你是一个热爱分享知识的博主，那么你在分享化学、物理或者化学知识的时候，你也许会对公式感到抓狂，但是LaTex可以帮你解决这一点，让公式不再是图片！

# 数学篇

我们这里简单介绍一下部分基础的LaTex语法，更多高级语法大家可以自行搜索。

## 指数&下标

Latex的指数表达式：`x^9`(单个字符) / `x^{10}`(多个字符,花括号内包裹指数)

效果分别是：$x^9$ / $x^{10}$

Latex的下标表达式：`x_a`(单个字符) / `x_{max}`(多个字符,花括号内包裹下标)

效果分别是：$x_a$ / $x_{max}$

## 分数&分式

LaTex的表达式：`\frac{分子}{分母}`

E.X.

| 表达式 | 效果 |
| --- | --- |
| `\frac{1}{3}` | $\frac{1}{3}$ |
| `\frac{x}{x^2-4x+9}` | $\frac{x}{x^2-4x+9}$ |

## 公式举例

勾股定理：`a^2+b^2=c^2`

$$
a^2+b^2=c^2
$$

海伦公式：`S=\sqrt{p(p-a)(p-b)(p-c)},p=\frac{1}{2}(a+b+c)`

$$
S=\sqrt{p(p-a)(p-b)(p-c)},p=\frac{1}{2}(a+b+c)
$$

扇形的面积公式：`S=\frac{\theta}{360\degree}\pi r^2`

$$
S=\frac{\theta}{360\degree}\pi r^2
$$

# 物理篇

## 公式举例

重力公式：`G=mg`

$$
G=mg
$$

比热容：`c=\frac{Q}{m\Delta t}`

$$
c=\frac{Q}{m\Delta t}
$$

比热容导出公式：`Q=cm\Delta t`

$$
Q=cm\Delta t
$$

质能方程式：`E=mc^2`

$$
E=mc^2
$$

并联电路电阻规律：`\frac{1}{R}=\frac{1}{R_1}+\frac{1}{R_2}+…+\frac{1}{R_n}`

$$
\frac{1}{R}=\frac{1}{R_1}+\frac{1}{R_2}+…+\frac{1}{R_n}
$$

# 化学篇

对于化学我们需要解决的东西就不同于物理和数学了，他需要解决长等号以及可逆符号，还有反应条件。

## 核素&离子

对于氚这样的核素我们不仅仅可以表示为T，还可以用下面这种方式来表达：`^3_1H`

$$
^3_1H
$$

对于铀-235，我们应该这样表达：`^{235}_{\ \ 92}U`(`\` 表示空格)

$$
^{235}_{\ \ 92}U
$$

而离子的表达就更简单了，只涉及到了上标和下标的问题，比如氢离子是`H^+`，硫酸根离子是`SO_4^{2-}`，四氨合铜离子是`Cu(NH_3)_4]^+`

$$
H^+,SO_4^{2-},[Cu(NH_3)_4]^+
$$

## 反应方程式

长等号：`\xlongequal[\quad\quad]{}`

$$
\xlongequal[\quad\quad]{}
$$

加上反应条件：`\xlongequal[\quad\quad]{\Delta}`

$$
\xlongequal[\quad\quad]{\Delta}
$$

多个反应条件：`\xlongequal[\Delta]{MnO_2}`

$$
\xlongequal[\Delta]{MnO_2}
$$

可逆符号：`\xrightleftharpoons[\quad\quad]{}`

$$
\xrightleftharpoons[\quad\quad]{}
$$

加上反应条件：`\xrightleftharpoons[\quad\quad]{\Delta}`

$$
\xrightleftharpoons[\quad\quad]{\Delta}
$$

多个反应条件：`\xrightleftharpoons[条件B]{条件A}`

$$
\xrightleftharpoons[条件B]{条件A}
$$

气体符号：`\uparrow`，$\uparrow$

沉淀符号：`\downarrow`，$\downarrow$

## 方程式举例

一水合氨的电离：`NH_3\sdot H_2O\xrightleftharpoons[\quad\quad]{} NH_4^++OH^-`

$$
NH_3\sdot H_2O\xrightleftharpoons[\quad\quad]{} NH_4^++OH^-
$$

氯酸钾制氧气：`2KClO_3\xlongequal[\Delta]{MnO_2}2KCl+3O_2\uparrow`

$$
2KClO_3\xlongequal[\Delta]{MnO_2}2KCl+3O_2\uparrow
$$

氢氧化铜的生成：`Cu^{2+}+2OH^-\xlongequal[\quad\quad]{}Cu(OH)_2\downarrow`

$$
Cu^{2+}+2OH^-\xlongequal[\quad\quad]{}Cu(OH)_2\downarrow
$$