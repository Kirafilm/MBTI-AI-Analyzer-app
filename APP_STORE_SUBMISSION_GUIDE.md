# App Store 上架指南 - MBTI AI Analyzer

## 📋 上架前檢查清單

### ✅ 已完成項目
- [x] Bundle ID: `space.manus.mbti.ai.app.t20260426023245`
- [x] Version: 1.0.0
- [x] Build: 1
- [x] App Name: MBTI AI Analyzer
- [x] ITSAppUsesNonExemptEncryption: false
- [x] iOS 部署目標: 12.0+
- [ ] Adsterra web ads configured

---

## 🔧 需要處理的代碼問題

### 1. 移除測試帳號 Fast Path
**文件位置：**
- `app/auth/login.tsx` - 測試帳號登入邏輯
- `hooks/use-auth.ts` - fallback user 邏輯
- `.env` - EXPO_PUBLIC_TEST_LOGIN_EMAIL / EXPO_PUBLIC_TEST_LOGIN_PASSWORD

**處理方式：**
上架前需要移除或註釋測試帳號相關代碼，避免審核被拒。

### 2. 隱私政策 URL
**必需：** 在 App Store Connect 中需要提供隱私政策網址

**建議方案：**
- 使用 GitHub Pages 託管隱私政策頁面
- 或使用免費政策生成器（如：https://www.privacypolicygenerator.info/）

### 3. 應用截圖準備
**必需尺寸（iPhone）：**
- 6.5寸 iPhone 14 Pro Max: 1290 x 2796 px
- 6.7寸 iPhone 14 Pro Max: 1290 x 2796 px
- 5.5寸 iPhone 8 Plus: 1242 x 2208 px
- 12.9寸 iPad Pro (如支援): 2048 x 2732 px

**數量：** 每個尺寸至少 3-5 張截圖

---

## 📝 App Store Connect 資料準備

### 應用名稱
```
MBTI AI Analyzer
```

### 副標題（30字元內）
```
Discover your personality type with AI
```

### 描述（4000字元內）
```markdown
MBTI AI Analyzer uses advanced AI to help you discover your true personality type. 

Key Features:
• Professional MBTI personality test with 93 questions
• AI-powered analysis and insights
• Detailed personality reports with career suggestions
• Psychology tests for deeper self-understanding
• Beautiful and intuitive interface

Whether you're exploring personality psychology for the first time or deepening your self-understanding, MBTI AI Analyzer provides accurate, personalized insights.

Download now and start your personality discovery journey!
```

### 關鍵詞（100字元內）
```
MBTI,personality,psychology,test,AI,analyzer,character,16personalities
```

### 支援網址
```
https://your-website.com/support
```

### 行銷網址（選填）
```
https://your-website.com
```

### 隱私政策網址（必需）
```
https://your-website.com/privacy-policy
```

---

## 🏗️ 構建與上傳步驟

### 步驟 1: 清理並構建生產版本

```bash
# 清除舊構建
cd ios
pod deintegrate
pod install
cd ..

# 構建 Release 版本
npx expo run:ios --configuration Release --device
```

### 步驟 2: 使用 Xcode 歸檔 (Archive)

1. 打開 `ios/MBTIAIAnalyzer.xcworkspace`
2. 選擇裝置為 `Any iOS Device (arm64)`
3. 選單：Product → Archive
4. 等待歸檔完成
5. 在 Organizer 中點擊 `Distribute App`
6. 選擇 `App Store Connect`
7. 上傳成功後會收到郵件通知

### 步驟 3: 在 App Store Connect 提交審核

1. 登入 https://appstoreconnect.apple.com
2. 選擇你的 App
3. 填寫所有必填欄位
4. 上傳截圖和預覽影片
5. 設置價格和可用性
6. 提交審核

---

## ⚠️ 常見審核被拒原因與對策

### 1. 崩潰問題
**對策：** 使用 TestFlight 充分測試

### 2. 隱私權限描述不清楚
**對策：** 確保 Info.plist 中所有權限描述都清楚說明用途

### 3. 測試帳號無法登入
**對策：** 提供有效的測試帳號密碼（如果有登入功能）

### 4. 引導用戶離開 App
**對策：** 不要引導用戶到其他購買渠道

### 5. 內容不完整
**對策：** 確保所有功能都可正常使用

---

## 📧 測試帳號資訊（供審核人員使用）

如果 App 有登入功能，需要在 App Store Connect 提供：

```
Username: your_test@email.com
Password: testpassword123
```

**注意：** 測試帳號必須是真實可用的帳號

---

## 🎯 上架時間規劃

- **構建與上傳：** 1 天
- **App Store 審核：** 1-3 天（第一次審核可能更長）
- **準備截圖和資料：** 1-2 天

**建議：** 預留至少一週時間處理可能的審核回饋

---

## 📱 後續維護

- 監控崩潰報告 (Xcode Organizer)
- 回覆用戶評論
- 定期更新版本
- 遵守 App Store 政策變更

---

**最後更新：** 2026-06-18
**準備人員：** Kira
