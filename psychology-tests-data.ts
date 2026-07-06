// 心理測驗題庫和計算邏輯

export interface PsychologyTest {
  id: string;
  name: string;
  nameZh: string;
  nameZhSimplified: string;
  description: string;
  descriptionZh: string;
  descriptionZhSimplified: string;
  category: "anxiety" | "happiness" | "stress" | "depression" | "sleep" | "focus";
  questions: Array<{
    id: string;
    text: string;
    textZh: string;
    textZhSimplified: string;
  }>;
}

export interface PsychologyTestResult {
  id: string;
  testId: string;
  score: number;
  percentile: number;
  level: "very-low" | "low" | "medium" | "high" | "very-high";
  interpretation: string;
  interpretationZh: string;
  interpretationZhSimplified: string;
  recommendations: string[];
  recommendationsZh: string[];
  recommendationsZhSimplified: string[];
  createdAt: number;
}

// 焦慮評估測驗
export const ANXIETY_TEST: PsychologyTest = {
  id: "anxiety",
  name: "Anxiety Assessment",
  nameZh: "焦慮評估",
  nameZhSimplified: "焦虑评估",
  description: "Assess your anxiety levels with 10 carefully designed questions",
  descriptionZh: "通過 10 道精心設計的問題評估你的焦慮程度",
  descriptionZhSimplified: "通过 10 道精心设计的问题评估你的焦虑程度",
  category: "anxiety",
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
export const HAPPINESS_TEST: PsychologyTest = {
  id: "happiness",
  name: "Happiness Scale",
  nameZh: "幸福度測試",
  nameZhSimplified: "幸福度测试",
  description: "Measure your overall happiness and life satisfaction",
  descriptionZh: "測量你的整體幸福感和生活滿意度",
  descriptionZhSimplified: "测量你的整体幸福感和生活满意度",
  category: "happiness",
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
export const STRESS_TEST: PsychologyTest = {
  id: "stress",
  name: "Stress Index",
  nameZh: "壓力指數",
  nameZhSimplified: "压力指数",
  description: "Evaluate your current stress levels and coping mechanisms",
  descriptionZh: "評估你當前的壓力水平和應對機制",
  descriptionZhSimplified: "评估你当前的压力水平和应对机制",
  category: "stress",
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

// 抑鬱情緒測驗
export const DEPRESSION_TEST: PsychologyTest = {
  id: "depression",
  name: "Depression Screening",
  nameZh: "抑鬱情緒測試",
  nameZhSimplified: "抑郁情绪测试",
  description: "Screen for depression symptoms and emotional well-being",
  descriptionZh: "篩查抑鬱症狀和情緒健康狀況",
  descriptionZhSimplified: "筛查抑郁症状和情绪健康状况",
  category: "depression",
  questions: [
    {
      id: "d1",
      text: "I feel sad or empty most of the time",
      textZh: "我大部分時間感到悲傷或空虛",
      textZhSimplified: "我大部分时间感到悲伤或空虚",
    },
    {
      id: "d2",
      text: "I have lost interest in activities I used to enjoy",
      textZh: "我對以前喜歡的活動失去興趣",
      textZhSimplified: "我对以前喜欢的活动失去兴趣",
    },
    {
      id: "d3",
      text: "I feel tired or have little energy",
      textZh: "我感到疲倦或缺乏活力",
      textZhSimplified: "我感到疲倦或缺乏活力",
    },
    {
      id: "d4",
      text: "I have trouble sleeping or sleep too much",
      textZh: "我有睡眠困難或睡得太多",
      textZhSimplified: "我有睡眠困难或睡得太多",
    },
    {
      id: "d5",
      text: "I feel worthless or guilty",
      textZh: "我感到沒有價值或內疚",
      textZhSimplified: "我感到没有价值或内疚",
    },
    {
      id: "d6",
      text: "I have difficulty concentrating",
      textZh: "我難以集中注意力",
      textZhSimplified: "我难以集中注意力",
    },
    {
      id: "d7",
      text: "I have changes in appetite or weight",
      textZh: "我的食慾或體重有變化",
      textZhSimplified: "我的食欲或体重有变化",
    },
    {
      id: "d8",
      text: "I feel restless or slowed down",
      textZh: "我感到焦躁不安或行動遲緩",
      textZhSimplified: "我感到焦躁不安或行动迟缓",
    },
    {
      id: "d9",
      text: "I have thoughts of hurting myself",
      textZh: "我有傷害自己的想法",
      textZhSimplified: "我有伤害自己的想法",
    },
    {
      id: "d10",
      text: "I find it hard to make decisions",
      textZh: "我發現很難做出決定",
      textZhSimplified: "我发现很难做出决定",
    },
  ],
};

// 睡眠質量測驗
export const SLEEP_TEST: PsychologyTest = {
  id: "sleep",
  name: "Sleep Quality Assessment",
  nameZh: "睡眠質量評估",
  nameZhSimplified: "睡眠质量评估",
  description: "Evaluate your sleep patterns and sleep quality",
  descriptionZh: "評估你的睡眠模式和睡眠質量",
  descriptionZhSimplified: "评估你的睡眠模式和睡眠质量",
  category: "sleep",
  questions: [
    {
      id: "sl1",
      text: "I have difficulty falling asleep",
      textZh: "我難以入睡",
      textZhSimplified: "我难以入睡",
    },
    {
      id: "sl2",
      text: "I wake up frequently during the night",
      textZh: "我夜間經常醒來",
      textZhSimplified: "我夜间经常醒来",
    },
    {
      id: "sl3",
      text: "I wake up too early and can't fall back asleep",
      textZh: "我醒得太早且無法再入睡",
      textZhSimplified: "我醒得太早且无法再入睡",
    },
    {
      id: "sl4",
      text: "I don't feel refreshed after sleeping",
      textZh: "我睡醒後感覺沒有恢復精力",
      textZhSimplified: "我睡醒后感觉没有恢复精力",
    },
    {
      id: "sl5",
      text: "I feel sleepy during the day",
      textZh: "我白天感到困倦",
      textZhSimplified: "我白天感到困倦",
    },
    {
      id: "sl6",
      text: "My sleep is disturbed by worries or stress",
      textZh: "我的睡眠被擔憂或壓力干擾",
      textZhSimplified: "我的睡眠被担忧或压力干扰",
    },
    {
      id: "sl7",
      text: "I use electronic devices before bedtime",
      textZh: "我在睡前使用電子設備",
      textZhSimplified: "我在睡前使用电子设备",
    },
    {
      id: "sl8",
      text: "I have irregular sleep schedules",
      textZh: "我的睡眠時間不規律",
      textZhSimplified: "我的睡眠时间不规律",
    },
    {
      id: "sl9",
      text: "My sleep environment is not comfortable",
      textZh: "我的睡眠環境不舒適",
      textZhSimplified: "我的睡眠环境不舒适",
    },
    {
      id: "sl10",
      text: "I rely on sleep aids or medication",
      textZh: "我依賴助眠產品或藥物",
      textZhSimplified: "我依赖助眠产品或药物",
    },
  ],
};

// 專注力測驗
export const FOCUS_TEST: PsychologyTest = {
  id: "focus",
  name: "Focus & Concentration Test",
  nameZh: "專注力測試",
  nameZhSimplified: "专注力测试",
  description: "Assess your ability to focus and maintain concentration",
  descriptionZh: "評估你的專注力和維持注意力的能力",
  descriptionZhSimplified: "评估你的专注力和维持注意力的能力",
  category: "focus",
  questions: [
    {
      id: "f1",
      text: "I get easily distracted by my surroundings",
      textZh: "我容易被周圍環境分散注意力",
      textZhSimplified: "我容易被周围环境分散注意力",
    },
    {
      id: "f2",
      text: "I have trouble staying focused on one task",
      textZh: "我難以專注於一項任務",
      textZhSimplified: "我难以专注于一项任务",
    },
    {
      id: "f3",
      text: "My mind wanders during conversations",
      textZh: "我交談時會走神",
      textZhSimplified: "我交谈时会走神",
    },
    {
      id: "f4",
      text: "I procrastinate on important tasks",
      textZh: "我會拖延重要任務",
      textZhSimplified: "我会拖延重要任务",
    },
    {
      id: "f5",
      text: "I check my phone frequently during work",
      textZh: "我工作時經常查看手機",
      textZhSimplified: "我工作时经常查看手机",
    },
    {
      id: "f6",
      text: "I have trouble organizing my thoughts",
      textZh: "我難以整理思緒",
      textZhSimplified: "我难以整理思绪",
    },
    {
      id: "f7",
      text: "I start tasks but don't finish them",
      textZh: "我開始任務但無法完成",
      textZhSimplified: "我开始任务但无法完成",
    },
    {
      id: "f8",
      text: "I forget what I was doing after interruptions",
      textZh: "被打斷後我會忘記剛才在做什麼",
      textZhSimplified: "被打断后我会忘记刚才在做什么",
    },
    {
      id: "f9",
      text: "I feel overwhelmed by multiple tasks",
      textZh: "多重任務讓我感到不知所措",
      textZhSimplified: "多重任务让我感到不知所措",
    },
    {
      id: "f10",
      text: "I struggle to meet deadlines",
      textZh: "我難以在期限前完成工作",
      textZhSimplified: "我难以在期限前完成工作",
    },
  ],
};

// 計算測驗結果
export function calculatePsychologyTestResult(
  testId: string,
  answers: number[]
): PsychologyTestResult {
  const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
  const maxScore = answers.length * 4;
  const percentile = Math.round((totalScore / maxScore) * 100);

  let level: "very-low" | "low" | "medium" | "high" | "very-high";
  if (percentile <= 20) level = "very-low";
  else if (percentile <= 40) level = "low";
  else if (percentile <= 60) level = "medium";
  else if (percentile <= 80) level = "high";
  else level = "very-high";

  return {
    id: `${testId}-${Date.now()}`,
    testId: testId as any,
    score: totalScore,
    percentile,
    level,
    interpretation: getInterpretation(testId, level, "en"),
    interpretationZh: getInterpretation(testId, level, "zh-TW"),
    interpretationZhSimplified: getInterpretation(testId, level, "zh-CN"),
    recommendations: getRecommendations(testId, level, "en"),
    recommendationsZh: getRecommendations(testId, level, "zh-TW"),
    recommendationsZhSimplified: getRecommendations(testId, level, "zh-CN"),
    createdAt: Date.now(),
  };
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
    depression: {
      "very-low": {
        en: "You show no signs of depression. Your mood is stable and positive.",
        "zh-TW": "你沒有抑鬱跡象。你的情緒穩定且積極。",
        "zh-CN": "你没有抑郁迹象。你的情绪稳定且积极。",
      },
      low: {
        en: "You have minimal depression symptoms. Continue your healthy lifestyle.",
        "zh-TW": "你有輕微抑鬱症狀。繼續保持健康的生活方式。",
        "zh-CN": "你有轻微抑郁症状。继续保持健康的生活方式。",
      },
      medium: {
        en: "You show moderate depression signs. Consider talking to someone.",
        "zh-TW": "你有中等抑鬱跡象。考慮與人傾訴。",
        "zh-CN": "你有中等抑郁迹象。考虑与人倾诉。",
      },
      high: {
        en: "You show significant depression symptoms. Professional support may help.",
        "zh-TW": "你有明顯抑鬱症狀。專業支持可能有幫助。",
        "zh-CN": "你有明显抑郁症状。专业支持可能有帮助。",
      },
      "very-high": {
        en: "You show severe depression signs. Please seek professional help promptly.",
        "zh-TW": "你有嚴重抑鬱跡象。請盡快尋求專業幫助。",
        "zh-CN": "你有严重抑郁迹象。请尽快寻求专业帮助。",
      },
    },
    sleep: {
      "very-low": {
        en: "Your sleep quality is excellent. You have healthy sleep habits.",
        "zh-TW": "你的睡眠質量非常好。你有健康的睡眠習慣。",
        "zh-CN": "你的睡眠质量非常好。你有健康的睡眠习惯。",
      },
      low: {
        en: "Your sleep quality is good. Minor improvements could be beneficial.",
        "zh-TW": "你的睡眠質量良好。小幅改善會有幫助。",
        "zh-CN": "你的睡眠质量良好。小幅改善会有帮助。",
      },
      medium: {
        en: "Your sleep quality is fair. Consider improving your sleep routine.",
        "zh-TW": "你的睡眠質量一般。考慮改善睡眠習慣。",
        "zh-CN": "你的睡眠质量一般。考虑改善睡眠习惯。",
      },
      high: {
        en: "Your sleep quality is poor. Sleep hygiene changes are recommended.",
        "zh-TW": "你的睡眠質量較差。建議改善睡眠衛生。",
        "zh-CN": "你的睡眠质量较差。建议改善睡眠卫生。",
      },
      "very-high": {
        en: "Your sleep quality is very poor. Please consult a sleep specialist.",
        "zh-TW": "你的睡眠質量非常差。請諮詢睡眠專家。",
        "zh-CN": "你的睡眠质量非常差。请咨询睡眠专家。",
      },
    },
    focus: {
      "very-low": {
        en: "Your focus ability is excellent. You maintain concentration well.",
        "zh-TW": "你的專注力非常好。你能很好地保持注意力。",
        "zh-CN": "你的专注力非常好。你能很好地保持注意力。",
      },
      low: {
        en: "Your focus is good. You manage distractions effectively.",
        "zh-TW": "你的專注力良好。你能有效管理干擾。",
        "zh-CN": "你的专注力良好。你能有效管理干扰。",
      },
      medium: {
        en: "Your focus is moderate. Some concentration techniques may help.",
        "zh-TW": "你的專注力中等。一些專注技巧可能有幫助。",
        "zh-CN": "你的专注力中等。一些专注技巧可能有帮助。",
      },
      high: {
        en: "Your focus needs improvement. Consider reducing distractions.",
        "zh-TW": "你的專注力需要改善。考慮減少干擾。",
        "zh-CN": "你的专注力需要改善。考虑减少干扰。",
      },
      "very-high": {
        en: "You have significant focus difficulties. Professional guidance may help.",
        "zh-TW": "你有明顯的專注力困難。專業指導可能有幫助。",
        "zh-CN": "你有明显的专注力困难。专业指导可能有帮助。",
      },
    },
  };

  return interpretations[testId]?.[level]?.[language] || "No interpretation available";
}

function getRecommendations(
  testId: string,
  level: string,
  language: string
): string[] {
  const recommendations: Record<string, Record<string, Record<string, string[]>>> = {
    anxiety: {
      high: {
        en: [
          "Practice deep breathing exercises daily",
          "Try meditation or mindfulness",
          "Exercise regularly",
          "Limit caffeine intake",
          "Consider professional therapy",
        ],
        "zh-TW": [
          "每天練習深呼吸",
          "嘗試冥想或正念",
          "定期運動",
          "限制咖啡因攝入",
          "考慮專業治療",
        ],
        "zh-CN": [
          "每天练习深呼吸",
          "尝试冥想或正念",
          "定期运动",
          "限制咖啡因摄入",
          "考虑专业治疗",
        ],
      },
      medium: {
        en: [
          "Practice relaxation techniques",
          "Maintain regular exercise",
          "Get adequate sleep",
          "Connect with friends",
        ],
        "zh-TW": [
          "練習放鬆技巧",
          "保持定期運動",
          "獲得充足睡眠",
          "與朋友聯繫",
        ],
        "zh-CN": [
          "练习放松技巧",
          "保持定期运动",
          "获得充足睡眠",
          "与朋友联系",
        ],
      },
      low: {
        en: [
          "Continue your healthy habits",
          "Stay active and engaged",
          "Maintain social connections",
        ],
        "zh-TW": [
          "繼續你的健康習慣",
          "保持活躍和投入",
          "保持社交聯繫",
        ],
        "zh-CN": [
          "继续你的健康习惯",
          "保持活跃和投入",
          "保持社交联系",
        ],
      },
    },
    happiness: {
      low: {
        en: [
          "Spend time with loved ones",
          "Pursue meaningful activities",
          "Practice gratitude",
          "Set achievable goals",
          "Consider professional support",
        ],
        "zh-TW": [
          "與親愛的人共度時光",
          "追求有意義的活動",
          "練習感謝",
          "設定可達成的目標",
          "考慮專業支持",
        ],
        "zh-CN": [
          "与亲爱的人共度时光",
          "追求有意义的活动",
          "练习感谢",
          "设定可达成的目标",
          "考虑专业支持",
        ],
      },
      high: {
        en: [
          "Maintain your positive relationships",
          "Continue pursuing your passions",
          "Share your happiness with others",
          "Practice self-care regularly",
        ],
        "zh-TW": [
          "保持你的積極人際關係",
          "繼續追求你的熱情",
          "與他人分享你的幸福",
          "定期練習自我照顧",
        ],
        "zh-CN": [
          "保持你的积极人际关系",
          "继续追求你的热情",
          "与他人分享你的幸福",
          "定期练习自我照顾",
        ],
      },
    },
    stress: {
      high: {
        en: [
          "Identify stress sources",
          "Practice time management",
          "Delegate tasks when possible",
          "Take regular breaks",
          "Seek professional help",
        ],
        "zh-TW": [
          "識別壓力來源",
          "練習時間管理",
          "盡可能委派任務",
          "定期休息",
          "尋求專業幫助",
        ],
        "zh-CN": [
          "识别压力来源",
          "练习时间管理",
          "尽可能委派任务",
          "定期休息",
          "寻求专业帮助",
        ],
      },
      medium: {
        en: [
          "Improve work-life balance",
          "Exercise regularly",
          "Practice relaxation",
          "Build support network",
        ],
        "zh-TW": [
          "改善工作與生活的平衡",
          "定期運動",
          "練習放鬆",
          "建立支持網絡",
        ],
        "zh-CN": [
          "改善工作与生活的平衡",
          "定期运动",
          "练习放松",
          "建立支持网络",
        ],
      },
    },
    depression: {
      high: {
        en: [
          "Talk to a trusted friend or family member",
          "Consider professional counseling",
          "Maintain regular sleep schedule",
          "Engage in physical activity",
          "Practice self-compassion",
        ],
        "zh-TW": [
          "與信任的朋友或家人傾訴",
          "考慮專業輔導",
          "保持規律的睡眠時間",
          "參與體育活動",
          "練習自我關懷",
        ],
        "zh-CN": [
          "与信任的朋友或家人倾诉",
          "考虑专业辅导",
          "保持规律的睡眠时间",
          "参与体育活动",
          "练习自我关怀",
        ],
      },
      medium: {
        en: [
          "Spend time in nature",
          "Practice gratitude journaling",
          "Set small achievable goals",
          "Connect with supportive people",
        ],
        "zh-TW": [
          "花時間親近大自然",
          "練習感恩日記",
          "設定小且可達成的目標",
          "與支持你的人聯繫",
        ],
        "zh-CN": [
          "花时间亲近大自然",
          "练习感恩日记",
          "设定小且可达成的目标",
          "与支持你的人联系",
        ],
      },
      low: {
        en: [
          "Continue your positive activities",
          "Help others when possible",
          "Maintain your social connections",
        ],
        "zh-TW": [
          "繼續你的積極活動",
          "盡可能幫助他人",
          "保持社交聯繫",
        ],
        "zh-CN": [
          "继续你的积极活动",
          "尽可能帮助他人",
          "保持社交联系",
        ],
      },
    },
    sleep: {
      high: {
        en: [
          "Establish a consistent sleep schedule",
          "Create a relaxing bedtime routine",
          "Avoid screens 1 hour before bed",
          "Keep your bedroom cool and dark",
          "Consider consulting a sleep specialist",
        ],
        "zh-TW": [
          "建立規律的睡眠時間表",
          "創建放鬆的睡前習慣",
          "睡前1小時避免使用屏幕",
          "保持臥室涼爽和黑暗",
          "考慮諮詢睡眠專家",
        ],
        "zh-CN": [
          "建立规律的睡眠时间表",
          "创建放松的睡前习惯",
          "睡前1小时避免使用屏幕",
          "保持卧室凉爽和黑暗",
          "考虑咨询睡眠专家",
        ],
      },
      medium: {
        en: [
          "Limit caffeine intake after noon",
          "Exercise regularly but not before bed",
          "Create a comfortable sleep environment",
          "Practice relaxation techniques",
        ],
        "zh-TW": [
          "中午後限制咖啡因攝入",
          "定期運動但不要在睡前",
          "創造舒適的睡眠環境",
          "練習放鬆技巧",
        ],
        "zh-CN": [
          "中午后限制咖啡因摄入",
          "定期运动但不要在睡前",
          "创造舒适的睡眠环境",
          "练习放松技巧",
        ],
      },
      low: {
        en: [
          "Maintain your good sleep habits",
          "Share your sleep tips with others",
          "Monitor your sleep quality regularly",
        ],
        "zh-TW": [
          "保持良好的睡眠習慣",
          "與他人分享你的睡眠技巧",
          "定期監測你的睡眠質量",
        ],
        "zh-CN": [
          "保持良好的睡眠习惯",
          "与他人分享你的睡眠技巧",
          "定期监测你的睡眠质量",
        ],
      },
    },
    focus: {
      high: {
        en: [
          "Use the Pomodoro technique",
          "Turn off phone notifications",
          "Create a dedicated workspace",
          "Break tasks into smaller chunks",
          "Consider professional assessment",
        ],
        "zh-TW": [
          "使用番茄工作法",
          "關閉手機通知",
          "創建專屬工作空間",
          "將任務分成小部分",
          "考慮專業評估",
        ],
        "zh-CN": [
          "使用番茄工作法",
          "关闭手机通知",
          "创建专属工作空间",
          "将任务分成小部分",
          "考虑专业评估",
        ],
      },
      medium: {
        en: [
          "Set clear daily priorities",
          "Take regular breaks",
          "Minimize multitasking",
          "Practice mindfulness meditation",
        ],
        "zh-TW": [
          "設定明確的每日優先事項",
          "定期休息",
          "減少多任務處理",
          "練習正念冥想",
        ],
        "zh-CN": [
          "设定明确的每日优先事项",
          "定期休息",
          "减少多任务处理",
          "练习正念冥想",
        ],
      },
      low: {
        en: [
          "Continue your effective focus habits",
          "Help others improve their concentration",
          "Challenge yourself with complex tasks",
        ],
        "zh-TW": [
          "繼續你有效的專注習慣",
          "幫助他人改善專注力",
          "用複雜任務挑戰自己",
        ],
        "zh-CN": [
          "继续你有效的专注习惯",
          "帮助他人改善专注力",
          "用复杂任务挑战自己",
        ],
      },
    },
  };

  return (
    recommendations[testId]?.[level]?.[language] || [
      "Focus on self-care",
      "Maintain healthy habits",
    ]
  );
}

export const ALL_PSYCHOLOGY_TESTS = [ANXIETY_TEST, HAPPINESS_TEST, STRESS_TEST, DEPRESSION_TEST, SLEEP_TEST, FOCUS_TEST];
