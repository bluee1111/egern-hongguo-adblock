# 红果短剧・红果漫剧去广告（Egern）

适用于 iOS 的：

- 红果短剧（`com.phoenix.readnew`）
- 红果漫剧（`com.kylin.readnew`）

## 安装

在 Egern 中添加模块订阅：

```text
https://raw.githubusercontent.com/bluee1111/egern-hongguo-adblock/main/hongguo-adblock.yaml
```

启用模块后：

1. 安装并信任 Egern CA 证书。
2. 完全退出红果短剧、红果漫剧。
3. 清理应用内已有广告缓存后重新打开。

## 功能

- 拦截穿山甲广告请求与素材。
- 拦截开屏、剧集间广告和部分电商/小游戏推广。
- 精准匹配 `reading-ad`，不拦截 `reading-video` 正片。
- 不拦截漫画/封面图片、登录、评论及核心内容接口。

## 说明

- 规则基于红果/番茄系真实流量规则和公开模块整理，优先保证正片与图片正常。
- 红果部分广告域名存在证书固定；即使 MITM 解密失败，模块内的域名 `REJECT` 规则仍可拦截。
- 纯网络规则无法模拟“看完激励广告”的服务端发奖。如果某集必须看广告解锁，拦截后可能需要等待免费解锁，不能伪造奖励。
- 应用升级后若广告域名变化，请提交 Egern 请求日志（隐藏账号、Cookie、设备标识）。

## 参考

- [Egern URL 重写文档](https://egernapp.com/zh-CN/docs/configuration/url_rewrites/)
- [Egern 规则文档](https://egernapp.com/zh-CN/docs/configuration/rules/)
- [LOWERTOP 红果短剧规则](https://github.com/LOWERTOP/Shadowrocket-First)
- [番茄/红果真实流量 AdGuard 规则](https://github.com/gitlawyercan/fanqienovel-adguardhome-rules)

## 许可

MIT
