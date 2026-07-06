import type { Language } from "@/shared/i18n";

export interface PolicySection {
  title: string;
  body?: string[];
  bullets?: string[];
  table?: { label: string; value: string }[];
  subSections?: { title: string; bullets: string[] }[];
}

export interface PrivacyPolicyContent {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: PolicySection[];
  contactEmail: string;
  footer: string;
}

const zhTW: PrivacyPolicyContent = {
  title: "隱私政策",
  lastUpdated: "最後更新日期：2026 年 6 月 16 日",
  intro:
    "MBTI AI Analyzer（以下簡稱「本應用」）重視您的隱私。本隱私政策說明我們如何收集、使用、披露及保護您的個人資料。",
  sections: [
    {
      title: "一、我們收集的資料",
      subSections: [
        {
          title: "1.1 您主動提供的資料",
          bullets: [
            "賬號資料：當您註冊或登入時，我們通過 Supabase Auth 收集您的電子郵件地址。若使用第三方登入（如 Google、Apple），我們會接收該平台提供的識別碼及基本資料。",
            "MBTI 測驗結果：您完成性格測驗後產生的 MBTI 類型、各維度分數及測驗日期。",
            "心理測驗結果：您完成心理測驗後的回答及結果數據。",
          ],
        },
        {
          title: "1.2 自動收集的資料",
          bullets: [
            "使用數據：我們可能收集應用程式的使用情況，包括頁面瀏覽次數、功能使用頻率等匿名統計數據。",
            "裝置資料：操作系統版本、裝置型號等基本技術資訊（僅用於適配及除錯）。",
          ],
        },
        {
          title: "1.3 我們不收集的資料",
          bullets: [
            "我們不收集您的精確地理位置、通訊錄、相簿、麥克風或相機資料。",
            "我們不收集您的付款資訊（本應用不提供付費功能）。",
          ],
        },
      ],
    },
    {
      title: "二、資料的使用方式",
      body: ["我們使用您的資料用於以下目的："],
      table: [
        { label: "提供服務", value: "儲存您的測驗結果，讓您可以隨時回顧歷史記錄" },
        { label: "賬號管理", value: "驗證您的身份，管理登入狀態" },
        { label: "改善產品", value: "分析使用趨勢以優化應用程式體驗" },
        { label: "客戶支援", value: "回應您的查詢及技術支援請求" },
        { label: "廣告展示", value: "透過 Google AdMob（行動版）及 Google AdSense（網頁版）展示廣告" },
      ],
    },
    {
      title: "三、第三方服務",
      body: [
        "本應用使用以下第三方服務，它們各自有其隱私政策：",
        "這些第三方服務僅接收為履行其功能所必需的資料。",
      ],
      table: [
        { label: "Supabase", value: "用戶認證及賬號管理" },
        { label: "Google AdMob", value: "行動應用廣告展示" },
        { label: "Google AdSense", value: "網頁版廣告展示" },
      ],
    },
    {
      title: "四、廣告與追蹤",
      bullets: [
        "行動應用通過 Google AdMob 展示廣告，AdMob 可能使用裝置廣告識別碼（IDFA）來提供個人化廣告。",
        "網頁版通過 Google AdSense 展示廣告，AdSense 可能使用 Cookie 及類似技術來提供相關廣告。",
        "您可以在裝置設定中重設廣告識別碼或限制廣告追蹤（iOS：設定 → 隱私與安全性 → 追蹤）。",
      ],
    },
    {
      title: "五、資料儲存與安全",
      bullets: [
        "您的賬號資料及測驗結果儲存在安全的伺服器上。",
        "我們採取合理的技術和管理措施保護您的資料，包括傳輸加密（TLS/SSL）。",
        "請注意，互聯網上的資料傳輸無法保證 100% 安全。",
      ],
    },
    {
      title: "六、資料保留與刪除",
      bullets: [
        "您的測驗結果及賬號資料將保留至您主動刪除為止。",
        "您可以在應用程式內「個人頁面 → 刪除賬號」中提交刪除請求。",
        "賬號刪除後，所有相關資料將在合理時間內從伺服器移除。",
      ],
    },
    {
      title: "七、您的權利",
      body: [
        "根據適用法律，您有權：",
        "如需行使上述權利，請通過下方聯絡方式與我們聯繫。",
      ],
      bullets: [
        "查閱：要求查閱我們持有的您的個人資料副本",
        "更正：要求更正不準確的個人資料",
        "刪除：要求刪除您的個人資料",
        "撤回同意：撤回對資料處理的同意（不影響撤回前已進行的處理之合法性）",
      ],
    },
    {
      title: "八、兒童隱私",
      body: [
        "本應用不針對 13 歲以下兒童。我們不會故意收集 13 歲以下兒童的個人資料。如發現此類情況，我們將立即刪除相關資料。",
      ],
    },
    {
      title: "九、政策更新",
      body: [
        "我們可能會不時更新本隱私政策。更新後，我們會在應用程式內通知您，並更新本頁面的「最後更新日期」。建議您定期查閱本政策。",
      ],
    },
    {
      title: "十、聯絡我們",
      body: ["如對本隱私政策有任何疑問或顧慮，請通過以下方式聯絡我們："],
    },
  ],
  contactEmail: "hyphe.office@gmail.com",
  footer: "© 2026 MBTI AI Analyzer. All rights reserved.",
};

const zhCN: PrivacyPolicyContent = {
  title: "隐私政策",
  lastUpdated: "最后更新日期：2026 年 6 月 16 日",
  intro:
    "MBTI AI Analyzer（以下简称「本应用」）重视您的隐私。本隐私政策说明我们如何收集、使用、披露及保护您的个人资料。",
  sections: [
    {
      title: "一、我们收集的资料",
      subSections: [
        {
          title: "1.1 您主动提供的资料",
          bullets: [
            "账号资料：当您注册或登录时，我们通过 Supabase Auth 收集您的电子邮件地址。若使用第三方登录（如 Google、Apple），我们会接收该平台提供的识别码及基本资料。",
            "MBTI 测验结果：您完成性格测验后产生的 MBTI 类型、各维度分数及测验日期。",
            "心理测验结果：您完成心理测验后的回答及结果数据。",
          ],
        },
        {
          title: "1.2 自动收集的资料",
          bullets: [
            "使用数据：我们可能收集应用程序的使用情况，包括页面浏览次数、功能使用频率等匿名统计数据。",
            "装置资料：操作系统版本、装置型号等基本技术信息（仅用于适配及除错）。",
          ],
        },
        {
          title: "1.3 我们不收集的资料",
          bullets: [
            "我们不收集您的精确地理位置、通讯录、相册、麦克风或相机资料。",
            "我们不收集您的付款信息（本应用不提供付费功能）。",
          ],
        },
      ],
    },
    {
      title: "二、资料的使用方式",
      body: ["我们使用您的资料用于以下目的："],
      table: [
        { label: "提供服务", value: "储存您的测验结果，让您可以随时回顾历史记录" },
        { label: "账号管理", value: "验证您的身份，管理登录状态" },
        { label: "改善产品", value: "分析使用趋势以优化应用程序体验" },
        { label: "客户支持", value: "回应您的查询及技术支持请求" },
        { label: "广告展示", value: "通过 Google AdMob（移动版）及 Google AdSense（网页版）展示广告" },
      ],
    },
    {
      title: "三、第三方服务",
      body: [
        "本应用使用以下第三方服务，它们各自有其隐私政策：",
        "这些第三方服务仅接收为履行其功能所必需的资料。",
      ],
      table: [
        { label: "Supabase", value: "用户认证及账号管理" },
        { label: "Google AdMob", value: "移动应用广告展示" },
        { label: "Google AdSense", value: "网页版广告展示" },
      ],
    },
    {
      title: "四、广告与追踪",
      bullets: [
        "移动应用通过 Google AdMob 展示广告，AdMob 可能使用设备广告标识符（IDFA）来提供个性化广告。",
        "网页版通过 Google AdSense 展示广告，AdSense 可能使用 Cookie 及类似技术来提供相关广告。",
        "您可以在设备设置中重置广告标识符或限制广告追踪（iOS：设置 → 隐私与安全性 → 追踪）。",
      ],
    },
    {
      title: "五、资料储存与安全",
      bullets: [
        "您的账号资料及测验结果储存在安全的服务器上。",
        "我们采取合理的技术和管理措施保护您的资料，包括传输加密（TLS/SSL）。",
        "请注意，互联网上的资料传输无法保证 100% 安全。",
      ],
    },
    {
      title: "六、资料保留与删除",
      bullets: [
        "您的测验结果及账号资料将保留至您主动删除为止。",
        "您可以在应用程序内「个人页面 → 删除账号」中提交删除请求。",
        "账号删除后，所有相关资料将在合理时间内从服务器移除。",
      ],
    },
    {
      title: "七、您的权利",
      body: [
        "根据适用法律，您有权：",
        "如需行使上述权利，请通过下方联络方式与我们联系。",
      ],
      bullets: [
        "查阅：要求查阅我们持有的您的个人资料副本",
        "更正：要求更正不准确的个人资料",
        "删除：要求删除您的个人资料",
        "撤回同意：撤回对资料处理的同意（不影响撤回前已进行的处理之合法性）",
      ],
    },
    {
      title: "八、儿童隐私",
      body: [
        "本应用不针对 13 岁以下儿童。我们不会故意收集 13 岁以下儿童的个人资料。如发现此类情况，我们将立即删除相关资料。",
      ],
    },
    {
      title: "九、政策更新",
      body: [
        "我们可能会不时更新本隐私政策。更新后，我们会在应用程序内通知您，并更新本页面的「最后更新日期」。建议您定期查阅本政策。",
      ],
    },
    {
      title: "十、联络我们",
      body: ["如对本隐私政策有任何疑问或顾虑，请通过以下方式联络我们："],
    },
  ],
  contactEmail: "hyphe.office@gmail.com",
  footer: "© 2026 MBTI AI Analyzer. All rights reserved.",
};

const en: PrivacyPolicyContent = {
  title: "Privacy Policy",
  lastUpdated: "Last updated: June 16, 2026",
  intro:
    'MBTI AI Analyzer ("the App") values your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information.',
  sections: [
    {
      title: "1. Information We Collect",
      subSections: [
        {
          title: "1.1 Information You Provide",
          bullets: [
            "Account Information: When you register or sign in, we collect your email address through Supabase Auth. If you use third-party sign-in (e.g., Google, Apple), we receive identifiers and basic profile information from that platform.",
            "MBTI Test Results: Your MBTI type, dimension scores, and test date generated after completing personality assessments.",
            "Psychology Test Results: Your answers and result data from psychology tests.",
          ],
        },
        {
          title: "1.2 Automatically Collected Information",
          bullets: [
            "Usage Data: We may collect anonymous usage statistics, including page views and feature usage frequency.",
            "Device Information: Operating system version, device model, and other basic technical information (used solely for compatibility and debugging).",
          ],
        },
        {
          title: "1.3 Information We Do Not Collect",
          bullets: [
            "We do not collect your precise location, contacts, photo library, microphone, or camera data.",
            "We do not collect your payment information (the App does not offer paid features).",
          ],
        },
      ],
    },
    {
      title: "2. How We Use Your Information",
      body: ["We use your information for the following purposes:"],
      table: [
        { label: "Service Delivery", value: "Store your test results so you can review your history at any time" },
        { label: "Account Management", value: "Verify your identity and manage sign-in sessions" },
        { label: "Product Improvement", value: "Analyze usage trends to enhance the app experience" },
        { label: "Customer Support", value: "Respond to your inquiries and technical support requests" },
        { label: "Advertising", value: "Display ads via Google AdMob (mobile) and Google AdSense (web)" },
      ],
    },
    {
      title: "3. Third-Party Services",
      body: [
        "The App uses the following third-party services, each with its own privacy policy:",
        "These third parties receive only the data necessary to perform their functions.",
      ],
      table: [
        { label: "Supabase", value: "User authentication and account management" },
        { label: "Google AdMob", value: "Mobile app ad serving" },
        { label: "Google AdSense", value: "Website ad serving" },
      ],
    },
    {
      title: "4. Advertising & Tracking",
      bullets: [
        "The mobile app displays ads via Google AdMob. AdMob may use your device advertising identifier (IDFA) to serve personalized ads.",
        "The website displays ads via Google AdSense. AdSense may use cookies and similar technologies to serve relevant ads.",
        "You can reset your advertising identifier or limit ad tracking in your device settings (iOS: Settings → Privacy & Security → Tracking).",
      ],
    },
    {
      title: "5. Data Storage & Security",
      bullets: [
        "Your account information and test results are stored on secure servers.",
        "We implement reasonable technical and administrative measures to protect your data, including transport encryption (TLS/SSL).",
        "Please note that no method of transmission over the Internet is 100% secure.",
      ],
    },
    {
      title: "6. Data Retention & Deletion",
      bullets: [
        "Your test results and account data are retained until you actively delete them.",
        'You can submit a deletion request through "Profile → Delete Account" within the App.',
        "Upon account deletion, all related data will be removed from our servers within a reasonable timeframe.",
      ],
    },
    {
      title: "7. Your Rights",
      body: [
        "Under applicable law, you have the right to:",
        "To exercise these rights, please contact us using the information below.",
      ],
      bullets: [
        "Access: Request a copy of your personal data we hold",
        "Rectification: Request correction of inaccurate personal data",
        "Erasure: Request deletion of your personal data",
        "Withdraw Consent: Withdraw your consent to data processing (without affecting the lawfulness of prior processing)",
      ],
    },
    {
      title: "8. Children's Privacy",
      body: [
        "The App is not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will promptly delete the data.",
      ],
    },
    {
      title: "9. Policy Updates",
      body: [
        'We may update this Privacy Policy from time to time. When we do, we will notify you within the App and update the "Last Updated" date on this page. We encourage you to review this policy periodically.',
      ],
    },
    {
      title: "10. Contact Us",
      body: ["If you have any questions or concerns about this Privacy Policy, please contact us at:"],
    },
  ],
  contactEmail: "hyphe.office@gmail.com",
  footer: "© 2026 MBTI AI Analyzer. All rights reserved.",
};

export const privacyPolicyContent: Record<Language, PrivacyPolicyContent> = {
  "zh-TW": zhTW,
  "zh-CN": zhCN,
  en,
};
