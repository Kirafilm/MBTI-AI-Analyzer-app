# MBTI AI Analyzer — 項目備忘

## 技術棧
- Expo SDK 54 + React Native + Expo Router
- NativeWind (Tailwind CSS for RN)
- 後端: Express + tRPC + Drizzle ORM + MySQL (localhost:3000)
- 認證: Supabase Auth (session token) + 後端 API驗證
- 付費: RevenueCat (react-native-purchases)
- 廣告: Google Mobile Ads (AdMob)
- 數據庫: Supabase (auth) + 自建後端 (API)

## 關鍵路徑
- `app/auth/login.tsx` — 登入頁，含測試帳號 fast path
- `hooks/use-auth.ts` — Auth hook，含 fallback user 邏輯
- `lib/premium-access.tsx` — Premium Provider + RevenueCat 整合
- `lib/_core/api.ts` — API 層，`getMe()` 有 try-catch 保護
- `app/(tabs)/psychology-list.tsx` — 心理測驗列表 + 付費牆

## 死代碼
- `psychology-tests-list.tsx` (root) — 未被任何 route 引用

## 測試帳號
- 設定在 .env: EXPO_PUBLIC_TEST_LOGIN_EMAIL / EXPO_PUBLIC_TEST_LOGIN_PASSWORD
- 登入時跳過 Supabase，用 fake token + premium override
- useAuth 偵測到 override 時建 fallback user，不依賴後端
