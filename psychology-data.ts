// 心理測驗題庫和計算邏輯

export interface PsychologyQuestion {
  id: string;
  text: string;
  textZh: string;
  textZhSimplified: string;
}

export interface PsychologyTestDef {
  id: string;
  name: string;
  nameZh: string;
  nameZhSimplified: string;
  description: string;
  descriptionZh: string;
  descriptionZhSimplified: string;
  questions: PsychologyQuestion[];
}

export interface PsychologyTestResultData {
  id: string;
  testId: string;
  score: number;
  level: "very-low" | "low" | "medium" | "high" | "very-high";
  interpretation: string;
  interpretationZh: string;
  interpretationZhSimplified: string;
  suggestions: string[];
  suggestionsZh: string[];
  suggestionsZhSimplified: string[];
  createdAt: number;
}

export interface PsychologySuggestions {
  [key: string]: {
    "very-low": { en: string[]; zh: string[]; zhSimplified: string[] };
    low: { en: string[]; zh: string[]; zhSimplified: string[] };
    medium: { en: string[]; zh: string[]; zhSimplified: string[] };
    high: { en: string[]; zh: string[]; zhSimplified: string[] };
    "very-high": { en: string[]; zh: string[]; zhSimplified: string[] };
  };
}

// 焦慮評估測驗
export const ANXIETY_TEST: PsychologyTestDef = {
  id: "anxiety",
  name: "Anxiety Assessment",
  nameZh: "焦慮評估",
  nameZhSimplified: "焦虑评估",
  description: "Assess your anxiety levels with 10 carefully designed questions",
  descriptionZh: "通過 10 道精心設計的問題評估你的焦慮程度",
  descriptionZhSimplified: "通过 10 道精心设计的问题评估你的焦虑程度",
  questions: [
    {
      id: "a1",
      text: "I feel nervous or anxious",
      textZh: "我感到緊張或焦慮",
      textZhSimplified: "我感到紧张或焦虑",
    },
    {
      id: "a2",
      text: "I worry about future events",
      textZh: "我擔心未來的事件",
      textZhSimplified: "我担心未来的事件",
    },
    {
      id: "a3",
      text: "I have difficulty concentrating",
      textZh: "我難以集中注意力",
      textZhSimplified: "我难以集中注意力",
    },
    {
      id: "a4",
      text: "I experience physical tension",
      textZh: "我經歷身體緊張",
      textZhSimplified: "我经历身体紧张",
    },
    {
      id: "a5",
      text: "I feel restless or irritable",
      textZh: "我感到不安或易怒",
      textZhSimplified: "我感到不安或易怒",
    },
    {
      id: "a6",
      text: "I have sleep disturbances",
      textZh: "我有睡眠障礙",
      textZhSimplified: "我有睡眠障碍",
    },
    {
      id: "a7",
      text: "I experience panic-like symptoms",
      textZh: "我經歷類似恐慌的症狀",
      textZhSimplified: "我经历类似恐慌的症状",
    },
    {
      id: "a8",
      text: "I avoid situations due to anxiety",
      textZh: "我因焦慮而避免某些情況",
      textZhSimplified: "我因焦虑而避免某些情况",
    },
    {
      id: "a9",
      text: "I feel overwhelmed by daily tasks",
      textZh: "我感到被日常任務所淹沒",
      textZhSimplified: "我感到被日常任务所淹没",
    },
    {
      id: "a10",
      text: "I have difficulty relaxing",
      textZh: "我難以放鬆",
      textZhSimplified: "我难以放松",
    },
  ],
};

// 幸福度測驗
export const HAPPINESS_TEST: PsychologyTestDef = {
  id: "happiness",
  name: "Happiness Scale",
  nameZh: "幸福度測試",
  nameZhSimplified: "幸福度测试",
  description: "Measure your overall happiness and life satisfaction",
  descriptionZh: "測量你的整體幸福感和生活滿意度",
  descriptionZhSimplified: "测量你的整体幸福感和生活满意度",
  questions: [
    {
      id: "h1",
      text: "I feel satisfied with my life",
      textZh: "我對我的生活感到滿意",
      textZhSimplified: "我对我的生活感到满意",
    },
    {
      id: "h2",
      text: "I have meaningful relationships",
      textZh: "我有有意義的人際關係",
      textZhSimplified: "我有有意义的人际关系",
    },
    {
      id: "h3",
      text: "I feel purposeful in my work",
      textZh: "我在工作中感到有目標",
      textZhSimplified: "我在工作中感到有目标",
    },
    {
      id: "h4",
      text: "I experience joy regularly",
      textZh: "我經常感到快樂",
      textZhSimplified: "我经常感到快乐",
    },
    {
      id: "h5",
      text: "I feel grateful for what I have",
      textZh: "我對我擁有的感到感謝",
      textZhSimplified: "我对我拥有的感到感谢",
    },
    {
      id: "h6",
      text: "I have good health",
      textZh: "我有良好的健康",
      textZhSimplified: "我有良好的健康",
    },
    {
      id: "h7",
      text: "I feel optimistic about the future",
      textZh: "我對未來感到樂觀",
      textZhSimplified: "我对未来感到乐观",
    },
    {
      id: "h8",
      text: "I have financial security",
      textZh: "我有財務安全感",
      textZhSimplified: "我有财务安全感",
    },
    {
      id: "h9",
      text: "I feel connected to my community",
      textZh: "我感到與社區的聯繫",
      textZhSimplified: "我感到与社区的联系",
    },
    {
      id: "h10",
      text: "I am living according to my values",
      textZh: "我按照我的價值觀生活",
      textZhSimplified: "我按照我的价值观生活",
    },
  ],
};

// 壓力指數測驗
export const STRESS_TEST: PsychologyTestDef = {
  id: "stress",
  name: "Stress Index",
  nameZh: "壓力指數",
  nameZhSimplified: "压力指数",
  description: "Evaluate your current stress levels and coping mechanisms",
  descriptionZh: "評估你當前的壓力水平和應對機制",
  descriptionZhSimplified: "评估你当前的压力水平和应对机制",
  questions: [
    {
      id: "s1",
      text: "I feel overwhelmed by responsibilities",
      textZh: "我感到被責任所淹沒",
      textZhSimplified: "我感到被责任所淹没",
    },
    {
      id: "s2",
      text: "I have time management difficulties",
      textZh: "我有時間管理困難",
      textZhSimplified: "我有时间管理困难",
    },
    {
      id: "s3",
      text: "I experience work-related stress",
      textZh: "我經歷與工作相關的壓力",
      textZhSimplified: "我经历与工作相关的压力",
    },
    {
      id: "s4",
      text: "I have relationship conflicts",
      textZh: "我有人際關係衝突",
      textZhSimplified: "我有人际关系冲突",
    },
    {
      id: "s5",
      text: "I worry about finances",
      textZh: "我擔心財務",
      textZhSimplified: "我担心财务",
    },
    {
      id: "s6",
      text: "I feel emotionally drained",
      textZh: "我感到情感疲憊",
      textZhSimplified: "我感到情感疲惫",
    },
    {
      id: "s7",
      text: "I have difficulty making decisions",
      textZh: "我難以做出決定",
      textZhSimplified: "我难以做出决定",
    },
    {
      id: "s8",
      text: "I experience physical symptoms of stress",
      textZh: "我經歷壓力的身體症狀",
      textZhSimplified: "我经历压力的身体症状",
    },
    {
      id: "s9",
      text: "I have limited support systems",
      textZh: "我的支持系統有限",
      textZhSimplified: "我的支持系统有限",
    },
    {
      id: "s10",
      text: "I struggle with work-life balance",
      textZh: "我難以平衡工作和生活",
      textZhSimplified: "我难以平衡工作和生活",
    },
  ],
};

export const ALL_PSYCHOLOGY_TESTS = [ANXIETY_TEST, HAPPINESS_TEST, STRESS_TEST];

// 建議數據
const PSYCHOLOGY_SUGGESTIONS: PsychologySuggestions = {
  anxiety: {
    "very-low": {
      en: [
        "Continue practicing your current stress management techniques",
        "Maintain regular exercise and healthy sleep habits",
        "Keep nurturing your support network",
        "Practice mindfulness or meditation regularly",
      ],
      zh: [
        "繼續練習你目前的壓力管理技巧",
        "保持定期運動和健康的睡眠習慣",
        "繼續培養你的支持網絡",
        "定期練習正念或冥想",
      ],
      zhSimplified: [
        "继续练习你目前的压力管理技巧",
        "保持定期运动和健康的睡眠习惯",
        "继续培养你的支持网络",
        "定期练习正念或冥想",
      ],
    },
    low: {
      en: [
        "Maintain your current healthy lifestyle",
        "Practice relaxation techniques like deep breathing",
        "Stay connected with friends and family",
        "Engage in activities you enjoy",
      ],
      zh: [
        "保持你目前的健康生活方式",
        "練習深呼吸等放鬆技巧",
        "與朋友和家人保持聯繫",
        "參與你喜歡的活動",
      ],
      zhSimplified: [
        "保持你目前的健康生活方式",
        "练习深呼吸等放松技巧",
        "与朋友和家人保持联系",
        "参与你喜欢的活动",
      ],
    },
    medium: {
      en: [
        "Try progressive muscle relaxation techniques",
        "Establish a regular exercise routine",
        "Practice time management and prioritization",
        "Consider journaling to process your thoughts",
        "Ensure you're getting 7-9 hours of sleep",
      ],
      zh: [
        "嘗試漸進式肌肉放鬆技巧",
        "建立定期運動習慣",
        "練習時間管理和優先排序",
        "考慮寫日記來處理你的想法",
        "確保你每晚睡眠 7-9 小時",
      ],
      zhSimplified: [
        "尝试渐进式肌肉放松技巧",
        "建立定期运动习惯",
        "练习时间管理和优先排序",
        "考虑写日记来处理你的想法",
        "确保你每晚睡眠 7-9 小时",
      ],
    },
    high: {
      en: [
        "Seek support from a mental health professional",
        "Practice daily meditation or mindfulness",
        "Reduce caffeine and increase water intake",
        "Establish a consistent sleep schedule",
        "Engage in regular physical activity",
        "Consider cognitive behavioral therapy (CBT)",
      ],
      zh: [
        "尋求心理健康專業人士的幫助",
        "每日練習冥想或正念",
        "減少咖啡因攝入，增加飲水量",
        "建立一致的睡眠時間表",
        "進行定期體育活動",
        "考慮認知行為療法 (CBT)",
      ],
      zhSimplified: [
        "寻求心理健康专业人士的帮助",
        "每日练习冥想或正念",
        "减少咖啡因摄入，增加饮水量",
        "建立一致的睡眠时间表",
        "进行定期体育活动",
        "考虑认知行为疗法 (CBT)",
      ],
    },
    "very-high": {
      en: [
        "Consult with a mental health professional immediately",
        "Consider professional therapy or counseling",
        "Speak with your doctor about anxiety management options",
        "Practice grounding techniques when feeling overwhelmed",
        "Avoid alcohol and recreational drugs",
        "Build a strong support system",
        "Consider anxiety management apps or hotlines",
      ],
      zh: [
        "立即咨詢心理健康專業人士",
        "考慮專業治療或諮詢",
        "與你的醫生談論焦慮管理選項",
        "當感到不知所措時練習接地技巧",
        "避免酒精和娛樂性藥物",
        "建立強大的支持系統",
        "考慮使用焦慮管理應用程序或熱線",
      ],
      zhSimplified: [
        "立即咨询心理健康专业人士",
        "考虑专业治疗或咨询",
        "与你的医生谈论焦虑管理选项",
        "当感到不知所措时练习接地技巧",
        "避免酒精和娱乐性药物",
        "建立强大的支持系统",
        "考虑使用焦虑管理应用程序或热线",
      ],
    },
  },
  happiness: {
    "very-low": {
      en: [
        "Reach out to a mental health professional or therapist",
        "Connect with trusted friends or family members",
        "Engage in activities that bring you joy",
        "Consider joining a support group",
        "Practice self-compassion and kindness",
        "Establish a daily routine with small positive goals",
      ],
      zh: [
        "聯繫心理健康專業人士或治療師",
        "與信任的朋友或家庭成員聯繫",
        "參與能帶給你快樂的活動",
        "考慮加入支持小組",
        "練習自我同情和善待自己",
        "建立包含小正面目標的日常例程",
      ],
      zhSimplified: [
        "联系心理健康专业人士或治疗师",
        "与信任的朋友或家庭成员联系",
        "参与能带给你快乐的活动",
        "考虑加入支持小组",
        "练习自我同情和善待自己",
        "建立包含小正面目标的日常例程",
      ],
    },
    low: {
      en: [
        "Spend quality time with loved ones",
        "Pursue hobbies and interests you enjoy",
        "Practice gratitude daily",
        "Engage in regular physical activity",
        "Set achievable personal goals",
        "Explore new activities or experiences",
      ],
      zh: [
        "與親愛的人共度美好時光",
        "追求你喜歡的愛好和興趣",
        "每日練習感恩",
        "進行定期體育活動",
        "設定可實現的個人目標",
        "探索新的活動或體驗",
      ],
      zhSimplified: [
        "与亲爱的人共度美好时光",
        "追求你喜欢的爱好和兴趣",
        "每日练习感恩",
        "进行定期体育活动",
        "设定可实现的个人目标",
        "探索新的活动或体验",
      ],
    },
    medium: {
      en: [
        "Cultivate meaningful relationships",
        "Pursue activities aligned with your values",
        "Practice mindfulness and self-reflection",
        "Set and achieve personal milestones",
        "Spend time in nature",
        "Volunteer or help others",
        "Maintain a healthy work-life balance",
      ],
      zh: [
        "培養有意義的人際關係",
        "追求與你的價值觀一致的活動",
        "練習正念和自我反思",
        "設定並實現個人里程碑",
        "花時間在大自然中",
        "志願服務或幫助他人",
        "保持健康的工作與生活平衡",
      ],
      zhSimplified: [
        "培养有意义的人际关系",
        "追求与你的价值观一致的活动",
        "练习正念和自我反思",
        "设定并实现个人里程碑",
        "花时间在大自然中",
        "志愿服务或帮助他人",
        "保持健康的工作与生活平衡",
      ],
    },
    high: {
      en: [
        "Share your happiness with others",
        "Continue nurturing your relationships",
        "Maintain your current positive habits",
        "Help others achieve their goals",
        "Explore new challenges and growth opportunities",
        "Practice gratitude and reflection regularly",
      ],
      zh: [
        "與他人分享你的快樂",
        "繼續培養你的人際關係",
        "保持你目前的積極習慣",
        "幫助他人實現他們的目標",
        "探索新的挑戰和成長機會",
        "定期練習感恩和反思",
      ],
      zhSimplified: [
        "与他人分享你的快乐",
        "继续培养你的人际关系",
        "保持你目前的积极习惯",
        "帮助他人实现他们的目标",
        "探索新的挑战和成长机会",
        "定期练习感恩和反思",
      ],
    },
    "very-high": {
      en: [
        "Inspire others with your positive energy",
        "Mentor or guide those seeking happiness",
        "Continue your meaningful pursuits",
        "Maintain strong connections with your community",
        "Share your success strategies with others",
        "Keep exploring new sources of fulfillment",
      ],
      zh: [
        "用你的積極能量激勵他人",
        "指導或幫助尋求幸福的人",
        "繼續你有意義的追求",
        "與你的社區保持牢固的聯繫",
        "與他人分享你的成功策略",
        "繼續探索新的成就感來源",
      ],
      zhSimplified: [
        "用你的积极能量激励他人",
        "指导或帮助寻求幸福的人",
        "继续你有意义的追求",
        "与你的社区保持牢固的联系",
        "与他人分享你的成功策略",
        "继续探索新的成就感来源",
      ],
    },
  },
  stress: {
    "very-low": {
      en: [
        "Maintain your current stress management practices",
        "Continue your healthy lifestyle habits",
        "Keep your support network strong",
        "Practice regular relaxation techniques",
        "Stay engaged in activities you enjoy",
      ],
      zh: [
        "保持你目前的壓力管理實踐",
        "繼續你健康的生活方式習慣",
        "保持你的支持網絡牢固",
        "定期練習放鬆技巧",
        "保持參與你喜歡的活動",
      ],
      zhSimplified: [
        "保持你目前的压力管理实践",
        "继续你健康的生活方式习惯",
        "保持你的支持网络牢固",
        "定期练习放松技巧",
        "保持参与你喜欢的活动",
      ],
    },
    low: {
      en: [
        "Maintain your current coping strategies",
        "Continue regular exercise and healthy eating",
        "Ensure adequate sleep and rest",
        "Stay connected with your support system",
        "Practice hobbies and leisure activities",
      ],
      zh: [
        "保持你目前的應對策略",
        "繼續定期運動和健康飲食",
        "確保充足的睡眠和休息",
        "與你的支持系統保持聯繫",
        "練習愛好和休閒活動",
      ],
      zhSimplified: [
        "保持你目前的应对策略",
        "继续定期运动和健康饮食",
        "确保充足的睡眠和休息",
        "与你的支持系统保持联系",
        "练习爱好和休闲活动",
      ],
    },
    medium: {
      en: [
        "Implement time management strategies",
        "Practice relaxation techniques like yoga or tai chi",
        "Break tasks into smaller, manageable steps",
        "Delegate responsibilities when possible",
        "Schedule regular breaks and downtime",
        "Maintain open communication with others",
      ],
      zh: [
        "實施時間管理策略",
        "練習瑜伽或太極等放鬆技巧",
        "將任務分解為較小、可管理的步驟",
        "在可能的情況下委派責任",
        "安排定期休息和停機時間",
        "與他人保持開放的溝通",
      ],
      zhSimplified: [
        "实施时间管理策略",
        "练习瑜伽或太极等放松技巧",
        "将任务分解为较小、可管理的步骤",
        "在可能的情况下委派责任",
        "安排定期休息和停机时间",
        "与他人保持开放的沟通",
      ],
    },
    high: {
      en: [
        "Seek professional counseling or therapy",
        "Develop a structured daily routine",
        "Practice mindfulness and meditation",
        "Increase physical activity gradually",
        "Reduce caffeine and improve sleep hygiene",
        "Consider stress management workshops",
        "Build a stronger support network",
      ],
      zh: [
        "尋求專業諮詢或治療",
        "制定結構化的日常例程",
        "練習正念和冥想",
        "逐漸增加體育活動",
        "減少咖啡因並改善睡眠衛生",
        "考慮參加壓力管理工作坊",
        "建立更強大的支持網絡",
      ],
      zhSimplified: [
        "寻求专业咨询或治疗",
        "制定结构化的日常例程",
        "练习正念和冥想",
        "逐渐增加体育活动",
        "减少咖啡因并改善睡眠卫生",
        "考虑参加压力管理工作坊",
        "建立更强大的支持网络",
      ],
    },
    "very-high": {
      en: [
        "Consult with a mental health professional immediately",
        "Consider taking time off work or adjusting responsibilities",
        "Seek emergency support if experiencing crisis",
        "Practice daily meditation and grounding techniques",
        "Establish clear boundaries with work and others",
        "Develop a comprehensive stress management plan",
        "Consider professional stress management programs",
      ],
      zh: [
        "立即咨詢心理健康專業人士",
        "考慮休假或調整責任",
        "如遇危機，尋求緊急支持",
        "每日練習冥想和接地技巧",
        "與工作和他人建立明確的界限",
        "制定全面的壓力管理計劃",
        "考慮參加專業壓力管理計劃",
      ],
      zhSimplified: [
        "立即咨询心理健康专业人士",
        "考虑休假或调整责任",
        "如遇危机，寻求紧急支持",
        "每日练习冥想和接地技巧",
        "与工作和他人建立明确的界限",
        "制定全面的压力管理计划",
        "考虑参加专业压力管理计划",
      ],
    },
  },
};

// 計算測驗結果
export function calculatePsychologyResult(
  testId: string,
  answers: number[]
): PsychologyTestResultData {
  const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
  const maxScore = answers.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: "very-low" | "low" | "medium" | "high" | "very-high";
  if (percentage <= 20) level = "very-low";
  else if (percentage <= 40) level = "low";
  else if (percentage <= 60) level = "medium";
  else if (percentage <= 80) level = "high";
  else level = "very-high";

  const suggestions = getSuggestions(testId, level, "en");
  const suggestionsZh = getSuggestions(testId, level, "zh-TW");
  const suggestionsZhSimplified = getSuggestions(testId, level, "zh-CN");

  return {
    id: `${testId}-${Date.now()}`,
    testId,
    score: totalScore,
    level,
    interpretation: getInterpretation(testId, level, "en"),
    interpretationZh: getInterpretation(testId, level, "zh-TW"),
    interpretationZhSimplified: getInterpretation(testId, level, "zh-CN"),
    suggestions,
    suggestionsZh,
    suggestionsZhSimplified,
    createdAt: Date.now(),
  };
}

function getSuggestions(
  testId: string,
  level: string,
  language: string
): string[] {
  const testSuggestions = PSYCHOLOGY_SUGGESTIONS[testId];
  if (!testSuggestions) return [];

  const levelSuggestions = testSuggestions[level as keyof typeof testSuggestions];
  if (!levelSuggestions) return [];

  if (language === "zh-TW") {
    return levelSuggestions.zh;
  } else if (language === "zh-CN") {
    return levelSuggestions.zhSimplified;
  }
  return levelSuggestions.en;
}

function getInterpretation(
  testId: string,
  level: string,
  language: string
): string {
  const interpretations: Record<string, Record<string, Record<string, string>>> = {
    anxiety: {
      "very-low": {
        en: "You have very low anxiety levels. You manage stress well.",
        "zh-TW": "你的焦慮水平非常低。你能很好地管理壓力。",
        "zh-CN": "你的焦虑水平非常低。你能很好地管理压力。",
      },
      low: {
        en: "You have low anxiety levels. You handle challenges calmly.",
        "zh-TW": "你的焦慮水平低。你能冷靜地應對挑戰。",
        "zh-CN": "你的焦虑水平低。你能冷静地应对挑战。",
      },
      medium: {
        en: "You have moderate anxiety. Consider stress management techniques.",
        "zh-TW": "你有中等焦慮。考慮使用壓力管理技巧。",
        "zh-CN": "你有中等焦虑。考虑使用压力管理技巧。",
      },
      high: {
        en: "You have high anxiety. Seek professional support if needed.",
        "zh-TW": "你有高焦慮。如需要，請尋求專業幫助。",
        "zh-CN": "你有高焦虑。如需要，请寻求专业帮助。",
      },
      "very-high": {
        en: "You have very high anxiety. Professional help is recommended.",
        "zh-TW": "你有非常高的焦慮。建議尋求專業幫助。",
        "zh-CN": "你有非常高的焦虑。建议寻求专业帮助。",
      },
    },
    happiness: {
      "very-low": {
        en: "Your happiness levels are very low. Consider seeking support.",
        "zh-TW": "你的幸福感非常低。考慮尋求幫助。",
        "zh-CN": "你的幸福感非常低。考虑寻求帮助。",
      },
      low: {
        en: "Your happiness levels are low. Focus on positive activities.",
        "zh-TW": "你的幸福感低。專注於積極的活動。",
        "zh-CN": "你的幸福感低。专注于积极的活动。",
      },
      medium: {
        en: "Your happiness levels are moderate. There's room for improvement.",
        "zh-TW": "你的幸福感中等。有改進的空間。",
        "zh-CN": "你的幸福感中等。有改进的空间。",
      },
      high: {
        en: "Your happiness levels are high. Keep nurturing positive relationships.",
        "zh-TW": "你的幸福感高。繼續培養積極的人際關係。",
        "zh-CN": "你的幸福感高。继续培养积极的人际关系。",
      },
      "very-high": {
        en: "Your happiness levels are very high. You're living a fulfilling life!",
        "zh-TW": "你的幸福感非常高。你正在過著充實的生活！",
        "zh-CN": "你的幸福感非常高。你正在过着充实的生活！",
      },
    },
    stress: {
      "very-low": {
        en: "Your stress levels are very low. You're managing well.",
        "zh-TW": "你的壓力水平非常低。你管理得很好。",
        "zh-CN": "你的压力水平非常低。你管理得很好。",
      },
      low: {
        en: "Your stress levels are low. Maintain your current coping strategies.",
        "zh-TW": "你的壓力水平低。保持你目前的應對策略。",
        "zh-CN": "你的压力水平低。保持你目前的应对策略。",
      },
      medium: {
        en: "Your stress levels are moderate. Consider relaxation techniques.",
        "zh-TW": "你的壓力水平中等。考慮放鬆技巧。",
        "zh-CN": "你的压力水平中等。考虑放松技巧。",
      },
      high: {
        en: "Your stress levels are high. Prioritize self-care and support.",
        "zh-TW": "你的壓力水平高。優先考慮自我照顧和支持。",
        "zh-CN": "你的压力水平高。优先考虑自我照顾和支持。",
      },
      "very-high": {
        en: "Your stress levels are very high. Seek professional guidance.",
        "zh-TW": "你的壓力水平非常高。尋求專業指導。",
        "zh-CN": "你的压力水平非常高。寻求专业指导。",
      },
    },
  };

  return interpretations[testId]?.[level]?.[language] || "No interpretation available";
}
