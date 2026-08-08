import type { Language } from "@/shared/i18n";

export interface TosSection {
  title: string;
  body?: string[];
  bullets?: string[];
  subSections?: { title: string; bullets: string[] }[];
}

export interface TosContent {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: TosSection[];
  contactEmail: string;
  footer: string;
}

const zhTW: TosContent = {
  title: "服務條款",
  lastUpdated: "最後更新日期：2026 年 6 月 16 日",
  intro:
    "歡迎使用 MBTI AI Analyzer（以下簡稱「本應用」）。使用本應用即表示您同意遵守以下服務條款（以下簡稱「本條款」）。如您不同意本條款，請停止使用本應用。",
  sections: [
    {
      title: "一、服務說明",
      body: [
        "MBTI AI Analyzer 是一款性格分析及心理測驗應用程式，提供以下核心功能：",
        "本應用提供性格分析及心理測驗服務，並可能透過 Adsterra（網頁版）展示廣告。",
      ],
      bullets: [
        "MBTI 性格類型測驗與分析",
        "多種心理測驗",
        "測驗歷史記錄保存與回顧",
        "測驗結果的詳細維度分析",
      ],
    },
    {
      title: "二、賬號註冊與使用",
      bullets: [
        "您可通過電子郵件註冊或第三方平台（如 Google、Apple）登入本應用。",
        "您有責任保護您的賬號憑證，不得與他人共用。您對賬號下的所有活動負責。",
        "您必須年滿 13 歲方可使用本應用。未滿 13 歲者請在監護人陪同下使用。",
        "您提供的資料必須真實、準確。如資料有變更，請及時更新。",
      ],
    },
    {
      title: "三、廣告服務",
      bullets: [
        "本應用透過 Adsterra 展示廣告以支持營運。",
        "網頁版使用 Adsterra 展示廣告。",
        "開始心理測驗前，應用程式可能會顯示贊助內容。",
        "廣告內容由 Google 提供，受其廣告政策約束。",
      ],
    },
    {
      title: "四、用戶行為規範",
      body: ["使用本應用時，您同意不從事以下行為："],
      bullets: [
        "違反任何適用的法律或法規",
        "干擾或破壞本應用的正常運作",
        "未經授權存取其他用戶的賬號或資料",
        "利用自動化工具（機器人、爬蟲等）大量存取或擷取本應用的內容",
        "上傳或散佈惡意程式碼、病毒或其他有害內容",
        "以任何方式侵害他人知識產權或其他權利",
        "冒充他人或提供虛假身份資料",
      ],
    },
    {
      title: "五、知識產權",
      bullets: [
        "本應用的所有內容，包括但不限於文字、圖形、標誌、圖標、音頻、軟件及程式碼，均屬本應用或其授權方所有，受版權、商標及其他知識產權法律保護。",
        "未經明確書面授權，您不得複製、修改、散佈、出售或租賃本應用的任何部分。",
        "您創建的測驗結果及數據歸您所有。您授予本應用非排他性、全球性、免版稅的許可，以提供及改善服務。",
      ],
    },
    {
      title: "六、免責聲明",
      bullets: [
        "本應用提供的 MBTI 及心理測驗結果僅供參考及娛樂目的，不構成任何形式的心理學診斷、醫療建議或專業諮詢。",
        "MBTI 類型分類為性格傾向參考，並非絕對的科學分類。請勿將測驗結果作為重大人生決策的唯一依據。",
        "本應用按「現狀」提供，不提供任何明示或暗示的保證，包括但不限於適銷性、特定用途適用性及不侵權的保證。",
        "本應用不保證服務不中斷、及時、安全或無錯誤。我們不對因使用或無法使用本應用而導致的任何損失負責。",
      ],
    },
    {
      title: "七、責任限制",
      body: [
        "在法律允許的最大範圍內，MBTI AI Analyzer 及其開發者對於因使用或無法使用本應用而引起的任何直接、間接、附帶、特殊、懲戒性或後果性損害（包括但不限於數據丟失、收入損失或利潤損失）概不負責，即使我們已被告知此類損害的可能性。",
        "在任何情況下，本應用對您的總責任以法律允許的最大範圍為限。",
      ],
    },
    {
      title: "八、第三方服務",
      body: [
        "本應用整合了第三方服務，包括但不限於：",
        "這些第三方服務受其各自的服務條款及隱私政策約束。本應用對第三方服務的行為、內容或數據處理概不負責。",
      ],
      bullets: [
        "Supabase — 用戶認證及數據儲存",
        "Adsterra — 網頁版廣告服務",
      ],
    },
    {
      title: "九、終止",
      bullets: [
        "您可隨時停止使用本應用。如需刪除賬號，請通過應用內「個人頁面 → 刪除賬號」提交請求。",
        "本應用保留因違反本條款或其他合理原因暫停或終止您使用本應用之權利，恕不另行通知。",
        "賬號終止後，本條款中依其性質應繼續有效之條款（包括免責聲明、責任限制及知識產權）將繼續適用。",
      ],
    },
    {
      title: "十、條款變更",
      body: [
        "我們可能會不時更新本服務條款。重大變更時，我們將通過應用程式通知您。繼續使用本應用即表示您接受修訂後的條款。建議您定期查閱本頁面。",
      ],
    },
    {
      title: "十一、管轄法律",
      body: [
        "本條款受中華人民共和國香港特別行政區（中國香港）法律管轄，並按其解釋。因本條款產生的任何爭議，應提交中國香港法院的專屬管轄。",
      ],
    },
    {
      title: "十二、聯絡我們",
      body: ["如對本服務條款有任何疑問，請通過以下方式聯絡我們："],
    },
  ],
  contactEmail: "hyphe.office@gmail.com",
  footer: "© 2026 MBTI AI Analyzer. All rights reserved.",
};

const zhCN: TosContent = {
  title: "服务条款",
  lastUpdated: "最后更新日期：2026 年 6 月 16 日",
  intro:
    "欢迎使用 MBTI AI Analyzer（以下简称「本应用」）。使用本应用即表示您同意遵守以下服务条款（以下简称「本条款」）。如您不同意本条款，请停止使用本应用。",
  sections: [
    {
      title: "一、服务说明",
      body: [
        "MBTI AI Analyzer 是一款性格分析及心理测验应用程序，提供以下核心功能：",
        "本应用提供性格分析及心理测验服务，并可能通过 Adsterra（网页版）展示广告。",
      ],
      bullets: [
        "MBTI 性格类型测验与分析",
        "多种心理测验",
        "测验历史记录保存与回顾",
        "测验结果的详细维度分析",
      ],
    },
    {
      title: "二、账号注册与使用",
      bullets: [
        "您可通过电子邮件注册或第三方平台（如 Google、Apple）登录本应用。",
        "您有责任保护您的账号凭证，不得与他人共用。您对账号下的所有活动负责。",
        "您必须年满 13 岁方可使用本应用。未满 13 岁者请在监护人陪同下使用。",
        "您提供的资料必须真实、准确。如资料有变更，请及时更新。",
      ],
    },
    {
      title: "三、广告服务",
      bullets: [
        "本应用通过 Adsterra 展示广告以支持营运。",
        "网页版使用 Adsterra 展示广告。",
        "开始心理测验前，应用程序可能会显示赞助内容。",
        "广告内容由 Google 提供，受其广告政策约束。",
      ],
    },
    {
      title: "四、用户行为规范",
      body: ["使用本应用时，您同意不从事以下行为："],
      bullets: [
        "违反任何适用的法律或法规",
        "干扰或破坏本应用的正常运作",
        "未经授权存取其他用户的账号或资料",
        "利用自动化工具（机器人、爬虫等）大量存取或撷取本应用的内容",
        "上传或散布恶意代码、病毒或其他有害内容",
        "以任何方式侵害他人知识产权或其他权利",
        "冒充他人或提供虚假身份资料",
      ],
    },
    {
      title: "五、知识产权",
      bullets: [
        "本应用的所有内容，包括但不限于文字、图形、标志、图标、音频、软件及代码，均属本应用或其授权方所有，受版权、商标及其他知识产权法律保护。",
        "未经明确书面授权，您不得复制、修改、散布、出售或租赁本应用的任何部分。",
        "您创建的测验结果及数据归您所有。您授予本应用非排他性、全球性、免版税的许可，以提供及改善服务。",
      ],
    },
    {
      title: "六、免责声明",
      bullets: [
        "本应用提供的 MBTI 及心理测验结果仅供参考及娱乐目的，不构成任何形式的心理学诊断、医疗建议或专业咨询。",
        "MBTI 类型分类为性格倾向参考，并非绝对的科学分类。请勿将测验结果作为重大人生决策的唯一依据。",
        "本应用按「现状」提供，不提供任何明示或暗示的保证，包括但不限于适销性、特定用途适用性及不侵权的保证。",
        "本应用不保证服务不中断、及时、安全或无错误。我们不对因使用或无法使用本应用而导致的任何损失负责。",
      ],
    },
    {
      title: "七、责任限制",
      body: [
        "在法律允许的最大范围内，MBTI AI Analyzer 及其开发者对于因使用或无法使用本应用而引起的任何直接、间接、附带、特殊、惩戒性或后果性损害（包括但不限于数据丢失、收入损失或利润损失）概不负责，即使我们已被告知此类损害的可能性。",
        "在任何情况下，本应用对您的总责任以法律允许的最大范围为限。",
      ],
    },
    {
      title: "八、第三方服务",
      body: [
        "本应用整合了第三方服务，包括但不限于：",
        "这些第三方服务受其各自的服务条款及隐私政策约束。本应用对第三方服务的行为、内容或数据处理概不负责。",
      ],
      bullets: [
        "Supabase — 用户认证及数据储存",
        "Adsterra — 网页版广告服务",
      ],
    },
    {
      title: "九、终止",
      bullets: [
        "您可随时停止使用本应用。如需删除账号，请通过应用内「个人页面 → 删除账号」提交请求。",
        "本应用保留因违反本条款或其他合理原因暂停或终止您使用本应用之权利，恕不另行通知。",
        "账号终止后，本条款中依其性质应继续有效之条款（包括免责声明、责任限制及知识产权）将继续适用。",
      ],
    },
    {
      title: "十、条款变更",
      body: [
        "我们可能会不时更新本服务条款。重大变更时，我们将通过应用程序通知您。继续使用本应用即表示您接受修订后的条款。建议您定期查阅本页面。",
      ],
    },
    {
      title: "十一、管辖法律",
      body: [
        "本条款受中华人民共和国香港特别行政区（中国香港）法律管辖，并按其解释。因本条款产生的任何争议，应提交中国香港法院的专属管辖。",
      ],
    },
    {
      title: "十二、联络我们",
      body: ["如对本服务条款有任何疑问，请通过以下方式联络我们："],
    },
  ],
  contactEmail: "hyphe.office@gmail.com",
  footer: "© 2026 MBTI AI Analyzer. All rights reserved.",
};

const en: TosContent = {
  title: "Terms of Service",
  lastUpdated: "Last updated: June 16, 2026",
  intro:
    'Welcome to MBTI AI Analyzer ("the App"). By using the App, you agree to comply with the following Terms of Service ("Terms"). If you do not agree to these Terms, please discontinue use of the App.',
  sections: [
    {
      title: "1. Service Description",
      body: [
        "MBTI AI Analyzer is a personality analysis and psychology test application offering the following core features:",
        "The App provides personality analysis and psychology tests and may display ads via Adsterra on the website.",
      ],
      bullets: [
        "MBTI personality type assessment and analysis",
        "Multiple psychology tests",
        "Test history storage and review",
        "Detailed dimensional analysis of test results",
      ],
    },
    {
      title: "2. Account Registration & Use",
      bullets: [
        "You may register via email or sign in through third-party platforms (e.g., Google, Apple).",
        "You are responsible for safeguarding your account credentials and must not share them. You are responsible for all activities under your account.",
        "You must be at least 13 years old to use the App. Users under 13 must use the App under parental supervision.",
        "The information you provide must be truthful and accurate. Please update your information promptly if it changes.",
      ],
    },
    {
      title: "3. Advertising",
      bullets: [
        "The App is supported by advertising through Adsterra on the website.",
        "The website uses Adsterra for advertising.",
        "Sponsored content may be shown before starting a psychology test.",
        "Ad content is served by Google and subject to Google's advertising policies.",
      ],
    },
    {
      title: "4. User Conduct",
      body: ["When using the App, you agree not to:"],
      bullets: [
        "Violate any applicable laws or regulations",
        "Interfere with or disrupt the normal operation of the App",
        "Access other users' accounts or data without authorization",
        "Use automated tools (bots, crawlers, etc.) to bulk-access or scrape the App's content",
        "Upload or distribute malicious code, viruses, or other harmful content",
        "Infringe upon others' intellectual property or other rights in any way",
        "Impersonate others or provide false identity information",
      ],
    },
    {
      title: "5. Intellectual Property",
      bullets: [
        "All content in the App, including but not limited to text, graphics, logos, icons, audio, software, and code, is owned by the App or its licensors and is protected by copyright, trademark, and other intellectual property laws.",
        "You may not reproduce, modify, distribute, sell, or lease any part of the App without explicit written authorization.",
        "Test results and data you create belong to you. You grant the App a non-exclusive, worldwide, royalty-free license to provide and improve the service.",
      ],
    },
    {
      title: "6. Disclaimer",
      bullets: [
        "MBTI and psychology test results provided by the App are for reference and entertainment purposes only and do not constitute any form of psychological diagnosis, medical advice, or professional consultation.",
        "MBTI type classification is a personality tendency reference and is not an absolute scientific classification. Do not use test results as the sole basis for major life decisions.",
        'The App is provided "as is" without any express or implied warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.',
        "We do not guarantee that the service will be uninterrupted, timely, secure, or error-free. We are not liable for any loss arising from the use or inability to use the App.",
      ],
    },
    {
      title: "7. Limitation of Liability",
      body: [
        "To the fullest extent permitted by law, MBTI AI Analyzer and its developers shall not be liable for any direct, indirect, incidental, special, punitive, or consequential damages (including but not limited to data loss, loss of revenue, or loss of profits) arising from the use or inability to use the App, even if advised of the possibility of such damages.",
        "In no event shall our total liability to you exceed the maximum extent permitted by law.",
      ],
    },
    {
      title: "8. Third-Party Services",
      body: [
        "The App integrates third-party services, including but not limited to:",
        "These third-party services are governed by their respective terms of service and privacy policies. We are not responsible for the conduct, content, or data processing of third-party services.",
      ],
      bullets: [
        "Supabase — User authentication and data storage",
        "Adsterra — Website advertising",
      ],
    },
    {
      title: "9. Termination",
      bullets: [
        'You may stop using the App at any time. To delete your account, submit a request through "Profile → Delete Account" within the App.',
        "We reserve the right to suspend or terminate your access to the App for violation of these Terms or other reasonable grounds without prior notice.",
        "Upon termination, provisions of these Terms that by their nature should survive (including disclaimers, limitations of liability, and intellectual property) shall continue to apply.",
      ],
    },
    {
      title: "10. Changes to Terms",
      body: [
        "We may update these Terms of Service from time to time. For material changes, we will notify you through the App. Continued use of the App constitutes acceptance of the revised terms. We encourage you to review this page periodically.",
      ],
    },
    {
      title: "11. Governing Law",
      body: [
        "These Terms are governed by and construed in accordance with the laws of the Hong Kong Special Administrative Region of the People's Republic of China (Hong Kong, China). Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Hong Kong, China.",
      ],
    },
    {
      title: "12. Contact Us",
      body: ["If you have any questions about these Terms of Service, please contact us at:"],
    },
  ],
  contactEmail: "hyphe.office@gmail.com",
  footer: "© 2026 MBTI AI Analyzer. All rights reserved.",
};

export const tosContent: Record<Language, TosContent> = {
  "zh-TW": zhTW,
  "zh-CN": zhCN,
  en,
};
