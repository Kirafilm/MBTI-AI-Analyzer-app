# MBTI AI Analyzer — 上架部署指南

## ✅ 已完成配置

| 项目 | 状态 |
|------|------|
| EAS CLI 安装 | ✅ eas-cli@20.2.0 |
| EAS 账号登入 | ✅ kirafilm / kirac3328@gmail.com |
| EAS 项目初始化 | ✅ 41e6221f-aaa4-46b3-86cf-32f847f26dfd |
| eas.json 配置 | ✅ 含 production/preview/development 三个 profile |
| app.config.ts | ✅ 已写入 projectId |
| AdMob 广告 | ✅ 插屏广告正常 |
| 横幅广告 | ❌ 已移除 |

---

## 📋 你需要手动完成的步骤

### 🔑 第一步：RevenueCat — 获取真实 API Key

当前 `.env` 中的 RevenueCat 密钥是占位符，必须替换：

```
EXPO_PUBLIC_RC_IOS_API_KEY=appl_your_revenuecat_ios_key      ← 假的！
EXPO_PUBLIC_RC_ANDROID_API_KEY=goog_your_revenuecat_android_key  ← 假的！
```

**操作**：
1. 前往 https://app.revenuecat.com 登入
2. 创建或选择项目，进入 **Settings → API Keys**
3. 复制 **iOS** 和 **Android** 的 API Key
4. 更新 `.env` 和 `eas.json`（两个文件都需要！）中的对应值

---

### 💰 第二步：RevenueCat — 设定产品与价钱

在 RevenueCat 控制台设定：

1. **Entitlements** → 创建 `psychology_premium`（Lifetime 类型）
2. **Products** → 创建 iOS 产品：
   - 类型：**Lifetime**（一次性买断）
   - Store：**App Store**
   - 填写 App Store Connect 中对应的 IAP Product ID
3. **Offerings** → 创建 `default` offering，将上述 Product 加入
4. 价格在 **App Store Connect** 中设定，建议 **$4.99 USD**（约 NT$150）

定价建议：
- $3.99 — 低价策略，冲下载量
- $4.99 — 均衡策略（推荐）
- $6.99 — 适中偏高
- $9.99 — 偏高，需要强内容支撑

---

### 🏪 第三步：App Store Connect — 创建 App

1. 前往 https://appstoreconnect.apple.com
2. **My Apps → + → New App**
3. 填入：
   - Platform: **iOS**
   - Name: **MBTI AI Analyzer**
   - Primary Language: **Traditional Chinese (zh-Hant)**
   - Bundle ID: **space.manus.mbti.ai.app.t20260426023245**
   - SKU: `mbti-ai-app-001`
   - User Access: **Full Access**

---

### 🛒 第四步：App Store Connect — 创建 In-App Purchase

1. 进入刚创建的 App → **In-App Purchases → +**
2. 类型选择：**Non-Consumable**（非消耗型，一次购买永久使用）
3. Reference Name: `Psychology Premium Lifetime`
4. Product ID: `psychology_premium_lifetime`
5. Price: 选择价格档位（如 Tier 5 = $4.99）
6. 保存后，记下 Product ID，回 RevenueCat 填入 Product 设置

---

### 📱 第五步：App Store Connect — 填写 App 信息

上架前需完成的清单：
- [ ] App 截图（6.7" iPhone 至少 3 张）
- [ ] App 描述（中英文）
- [ ] 关键词
- [ ] 隐私政策 URL
- [ ] 年龄分级
- [ ] App 审核信息（联络方式）
- [ ] 版本发布方式选择

---

### 🚀 第六步：更新密钥后触发生产构建

更新 `.env` 和 `eas.json` 中的 RevenueCat API Key 后：

```bash
# iOS 生产构建
eas build --platform ios --profile production

# 构建完成后自动提交
eas submit --platform ios
```

---

## ⚠️ 重要提醒

- **RevenueCat API Key** 必须在构建前填入真实值，否则付费功能无法使用
- `eas.json` 中 `production.env` 的 Key 也需要同步更新
- iOS 构建需要 Apple Developer 付费账号（$99/年）
- App Store 审核通常 1-3 天
