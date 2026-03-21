---
title: OpenClaw 安装图文教程（Windows）
published: 2026-03-09
description: "openclaw安装与使用."
image: "./openclaw.jpg"
tags: ["Blogging", "Customization"]
category: Guides
draft: false
---

**什么是 OpenClaw？** OpenClaw 是一个可自托管的个人 AI 助手。 它可以运行在你自己的电脑上并通过 Telegram 等聊天渠道接收消息 再调用执行、网页、浏览器等能力，帮你完成各种自动化操作 这篇教程适合零基础新手，跟着步骤一步步操作即可完成安装 

**开始前需要准备什么？** 在正式开始之前，请先准备好以下内容： ●一台闲置的电脑 ●注册一个Telegram机器人，并保存Bot Token 同时获取自己的Telegram用户ID（后续配置白名单会用到） ●注册一个大模型API平台账号，并先充值少量余额

## 一、注册Telegram机器人教程：

1.打开Telegram，搜索并进入 [@BotFather](https://x.com/@BotFather) 2.给[@BotFather](https://x.com/@BotFather) 发送命令：

```plaintext
/newbot
```

3.按提示依次输入两项信息：
•机器人显示名：用户看到的名字 
•机器人用户名：用于搜索 机器人用户名规则：只能使用 英文字母、数字、下划线，必须以 bot 结尾 例如：my\_xiaoc752\_bot 或 Myxiaoc752Bot 4.创建成功后，会发你一串Token，格式类似：123456789:AA...... 这串 Token 一定要保存好，后面配置Telegram时会用到

![图片](https://pbs.twimg.com/media/HCzpi8WbIAAWhSV?format=png&name=large)

注册Telegram机器人教程

## 二、获取自己的Telegram用户ID

1.打开 Telegram搜索并进入以下任意一个机器人：[@userinfobot](https://x.com/@userinfobot) 或 [@GetMyID\_bot](https://x.com/@GetMyID_bot) 
2.点击 **开始 / Start** 
3.机器人会自动回复你的账号信息，其中会显示你的 Telegram 用户 ID 
4.把这串纯数字复制并保存，后面配置白名单时会用到

![Image](https://pbs.twimg.com/media/HCzpxzQbUAAobNg?format=png&name=large)

获取自己的 Telegram 用户 ID

## 三、注册一个大模型API平台账号

这里推荐使用OpenRouter，它支持用一个API key接入多种模型，比较适合新手使用。

1.打开网站：[https://openrouter.ai/](https://openrouter.ai/) 2.注册一个账户并登录，然后创建一个API，先充值少量余额，创建的key要保存下来

![Image](https://pbs.twimg.com/media/HCzqUckbEAAY7Az?format=jpg&name=large)

创建API教程

# 正式开始安装

## 第一步：安装 WSL2+Ubuntu

1.开始菜单搜索 **PowerShell → 以管理员身份运行** 2.在 PowerShell 中输入以下命令安装

```bash
wsl --install
```

![Image](https://pbs.twimg.com/media/HCzqqCea0AAzvDH?format=png&name=large)

搜索 PowerShell → 以管理员身份运行

![Image](https://pbs.twimg.com/media/HCzqs6lboAAOGfZ?format=png&name=large)

输入以下命令安装

wsl --install

## 第二步：在开始菜单打开 Ubuntu

首次打开时，系统会提示你设置： Linux 用户名（可自行设置） Linux 密码（输入密码时不会显示字符，正常情况，输完后按回车）

![Image](https://pbs.twimg.com/media/HCzrDtab0AADtAV?format=png&name=large)

## 第三步：在 Ubuntu 里安装 OpenClaw

注意：下面这条命令需要在 **Ubuntu 终端** 中执行，不是在 PowerShell 中执行

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

输入后等待安装完成，一般需要几分钟

![Image](https://pbs.twimg.com/media/HCzrX0WbsAAFW9K?format=png&name=large)

## 第四步：安装完成后，进入新手向导

**1\. 确认安装方式** 出现下面这句提示时： I understand this is personal-by-default and shared/multi-user use requires lock-down. Continue? **这里选择 YES，然后按回车，可以使用键盘方向键进行选择。**

![Image](https://pbs.twimg.com/media/HCzrrUGbAAACJQz?format=png&name=large)

选择 YES

**2\. 选择安装模式：QuickStart**

**3\. 选择模型提供商：OpenRouter** 接着选择：**Paste API key now** 然后粘贴你前面准备好的 **OpenRouter API Key** 模型选择，这里我选择的是：**DeepSeek V3.1**

![Image](https://pbs.twimg.com/media/HCzsBIVbsAA6gew?format=png&name=large)

选择：OpenRouter

![Image](https://pbs.twimg.com/media/HCzsDH2bAAAguxt?format=png&name=large)

接着选择：Paste API key now

![Image](https://pbs.twimg.com/media/HCzsFUkbQAAGr0h?format=png&name=large)

粘贴你前面准备好的 OpenRouter API Key

![Image](https://pbs.twimg.com/media/HCzsJcja4AALXo-?format=png&name=large)

模型可以按自己的需求选择

**4\. 配置聊天渠** 聊天渠道这里选择：**Telegram** 然后选择：**Enter Telegram bot token** 接着输入你前面保存好的 Telegram Bot Token

![Image](https://pbs.twimg.com/media/HCzsvbHaAAAUG36?format=png&name=large)

选择：Telegram

![Image](https://pbs.twimg.com/media/HCzsxzFacAA44SW?format=png&name=large)

选择：Enter Telegram bot token

![Image](https://pbs.twimg.com/media/HCzszvca4AAOed1?format=png&name=large)

接着输入你前面保存好的 Telegram Bot Token

**5\. Skills 配置** 出现下面这个选项时：Configure skills now? 这里建议先选择：NO 后面有需要再安装即可。 **注意：这一项通常需要先按空格选中，再按回车确认**

**6\. 其他配置项** 后续如果出现需要填写额外 API Key 的地方，先全部选择：NO

![Image](https://pbs.twimg.com/media/HCzt_B6b0AA2_IF?format=png&name=large)

全部选择：NO

**7.安装完成后，可以在 Ubuntu 中输入：**

```bash
openclaw dashboard
```

这会打开 OpenClaw 的控制面板。

## 第五步：给 OpenClaw 开启完整权限+设置白名单

**1.打开网页版控制台**，如果之前没有打开，可以在 Ubuntu 中输入： openclaw dashboard

**2\. 进入配置页面** 进入控制台后：选择 **配置** 点击 **All Settings** 在下方选择 **Raw**

![Image](https://pbs.twimg.com/media/HCzuxj_bAAAkmoR?format=jpg&name=large)

点击红框标注的地方

**3\. 修改工具权限** 把原来的：

```json
"tools": {
  "profile": "messaging"
}
```

替换为：

```json
"tools": {
  "profile": "full",
  "exec": {
    "host": "gateway",
    "security": "full",
    "ask": "off"
  },
  "web": {
    "fetch": {
      "enabled": true
    }
  }
},
```

保存后即可生效。

![Image](https://pbs.twimg.com/media/HCzvzo2aEAA5LtG?format=jpg&name=large)

替换后点Save保存

![Image](https://pbs.twimg.com/media/HCzv7dZbsAA8sn1?format=jpg&name=large)

点击Tools这边出现Full就是设置完成了

这表示把工具配置从仅消息模式改成完整模式，并把本机执行权限开到最高，同时关闭逐次确认。

**4.给 Telegram 机器人设置白名单**

为了防止别人随意使用你的机器人，建议开启白名单功能 开启后，只有被添加到白名单里的 Telegram 用户，才能给机器人发送指令并正常使用 **设置方法** 打开 **OpenClaw 控制台** 点击 **频道** 找到 **Allow From** 点击 **Add** 添加你**自己的 Telegram 用户 ID** 滑到最下方**点Save 保存设置** 设置完成后，只有这个 Telegram ID 对应的账号可以使用该机器人。 注意：这里填写的是 Telegram 用户 ID（纯数字），不是用户名

![Image](https://pbs.twimg.com/media/HCzxKZBaEAA3USm?format=jpg&name=large)

给 Telegram 机器人设置白名单

## 第六步：给 Telegram 配置代理

只有在你发现 Telegram 连不上、收不到消息，再配置这一项 **1\. 查看你的 VPN 代理端口** 先确认你本地代理软件的端口号

![Image](https://pbs.twimg.com/media/HCzxriYbIAE9F-r?format=jpg&name=large)

查看端口号

**2\. 在 Ubuntu 中执行以下命令** 把下面的 你的端口数字 改成你自己的实际端口**（很重要，记得修改你的端口数字）**

```bash
PORT=你的端口数字
HOST_IP=$(ip route show | awk '/default/ {print $3}')
openclaw config set channels.telegram.proxy "http://$HOST_IP:$PORT"
openclaw config set channels.telegram.network.autoSelectFamily false
openclaw gateway restart
openclaw channels status --probe
openclaw logs --follow
```

**3.然后输入代码重启**

```bash
openclaw gateway restart
openclaw logs --follow
```

## 4.打开Telegram，给你的机器人发一条消息，测试是否可以正常聊天 到这里，OpenClaw 就安装完成了。

# OpenClaw 常用操作指令

## 启动与运行

openclaw gateway 启动网关服务（核心，必须运行）

openclaw gateway start 后台启动网关

openclaw gateway stop 停止网关

openclaw gateway restart 重启服务

openclaw gateway status 查看 Gateway 状态

openclaw tui 启动终端

openclaw dashboard 打开控制面板（可视化界面）

## 配置管理

openclaw onboard 首次引导

openclaw setup 初始化

openclaw configure 交互式配置（设置凭据、设备等）

openclaw config get 查看当前配置

openclaw config set 设置配置项

openclaw config validate 校验配置文件

## 渠道管理（连接各种聊天平台）

openclaw channels add 添加渠道

openclaw channels login 登录渠道（WhatsApp、Telegram等）

openclaw channels list 查看已连接的渠道

openclaw channels logout 退出渠道

## 消息发送

openclaw message send 发送消息

openclaw message broadcast 群发消息

## 状态与诊断

openclaw status 查看状态（渠道健康度、最近会话）

openclaw gateway status 查看网关状态

openclaw health 检查网关健康状态

openclaw doctor 诊断问题 + 自动修复

openclaw logs 查看日志

## 技能与插件

openclaw skills 技能管理（安装、更新、删除）

openclaw plugins 插件管理

openclaw skills install <skill> 安装技能

openclaw skills list 列出已安装技能

## 记忆与会话

openclaw sessions 列出历史会话

openclaw memory 搜索记忆内容

openclaw agents 管理独立代理

## 定时任务

openclaw cron 定时任务管理

openclaw cron list 查看定时任务

openclaw cron add 添加定时任务

## 浏览器与节点

openclaw browser 控制浏览器（自动化）

openclaw nodes 管理连接的节点（手机等）

openclaw node 单个节点控制

## 工具类

openclaw update 更新 CLI

openclaw reset 重置配置（保留 CLI）

openclaw uninstall 完全卸载