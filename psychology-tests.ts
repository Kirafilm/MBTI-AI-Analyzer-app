/*
 * Psychology Tests Module
 * Contains 5 psychology tests with questions and scoring logic
 */

import type { PsychologyAnswer } from "@/shared/types";

export type PsychologyTestType = "anxiety" | "happiness" | "stress" | "emotion" | "confidence";;

export interface PsychologyQuestion {
  id: string;
  text: string;
  textZh: string;
  textZhSimplified: string;
  textEn: string;
  reverse?: boolean; // For reverse-scored items
}

export interface PsychologyTestDef {
  id: PsychologyTestType;
  name: string;
  nameZh: string;
  nameZhSimplified: string;
  nameEn: string;
  description: string;
  descriptionZh: string;
  descriptionZhSimplified: string;
  descriptionEn: string;
  questions: PsychologyQuestion[];
  scale: number; // Max score per question (usually 4 or 5)
}

export interface PsychologyTestResult {
  id?: string;
  testType: PsychologyTestType;
  testName: string;
  totalScore: number; // 總分
  maxScore: number; // 最高分
  percentage: number; // 百分比 (0-100)
  level: "low" | "moderate" | "high" | "very-high"; // 等級
  interpretation: string; // 結果解讀
  recommendations: string[]; // 建議列表
  createdAt: Date;
  answers?: PsychologyAnswer[]; // 可選：保存原始答案
}

// Anxiety Assessment Test (GAD-7 style)
export const ANXIETY_TEST: PsychologyTestDef = {
  id: "anxiety",
  name: "Anxiety Assessment",
  nameZh: "焦慮評估",
  nameZhSimplified: "焦虑评估",
  nameEn: "Anxiety Assessment",
  description: "Assess your anxiety level based on common symptoms",
  descriptionZh: "根據常見症狀評估你的焦慮程度",
  descriptionZhSimplified: "根据常见症状评估你的焦虑程度",
  descriptionEn: "Assess your anxiety level based on common symptoms",
  scale: 4,
  questions: [
    {
      id: "anx1",
      text: "I feel nervous or anxious",
      textZh: "我感到緊張或焦慮",
      textZhSimplified: "我感到紧张或焦虑",
      textEn: "I feel nervous or anxious",
    },
    {
      id: "anx2",
      text: "I cannot stop worrying",
      textZh: "我無法停止擔憂",
      textZhSimplified: "我无法停止担忧",
      textEn: "I cannot stop worrying",
    },
    {
      id: "anx3",
      text: "I worry about many things",
      textZh: "我擔憂許多事情",
      textZhSimplified: "我担忧许多事情",
      textEn: "I worry about many things",
    },
    {
      id: "anx4",
      text: "I have trouble relaxing",
      textZh: "我難以放鬆",
      textZhSimplified: "我难以放松",
      textEn: "I have trouble relaxing",
    },
    {
      id: "anx5",
      text: "I am restless or on edge",
      textZh: "我感到不安或緊張",
      textZhSimplified: "我感到不安或紧张",
      textEn: "I am restless or on edge",
    },
    {
      id: "anx6",
      text: "I feel irritable easily",
      textZh: "我容易感到煩躁",
      textZhSimplified: "我容易感到烦躁",
      textEn: "I feel irritable easily",
    },
    {
      id: "anx7",
      text: "I fear something bad will happen",
      textZh: "我害怕會發生不好的事",
      textZhSimplified: "我害怕会发生不好的事",
      textEn: "I fear something bad will happen",
    },
  ],
};

// Happiness Test (Life Satisfaction Scale style)
export const HAPPINESS_TEST: PsychologyTestDef = {
  id: "happiness",
  name: "Happiness Assessment",
  nameZh: "幸福度測試",
  nameZhSimplified: "幸福度测试",
  nameEn: "Happiness Assessment",
  description: "Measure your overall life satisfaction and happiness",
  descriptionZh: "測量你的整體生活滿意度和幸福感",
  descriptionZhSimplified: "测量你的整体生活满意度和幸福感",
  descriptionEn: "Measure your overall life satisfaction and happiness",
  scale: 5,
  questions: [
    {
      id: "hap1",
      text: "I am satisfied with my life",
      textZh: "我對我的生活感到滿意",
      textZhSimplified: "我对我的生活感到满意",
      textEn: "I am satisfied with my life",
    },
    {
      id: "hap2",
      text: "My life is fulfilling",
      textZh: "我的生活很充實",
      textZhSimplified: "我的生活很充实",
      textEn: "My life is fulfilling",
    },
    {
      id: "hap3",
      text: "I have achieved my important goals",
      textZh: "我已達成重要目標",
      textZhSimplified: "我已达成重要目标",
      textEn: "I have achieved my important goals",
    },
    {
      id: "hap4",
      text: "I feel happy most of the time",
      textZh: "我大部分時間感到快樂",
      textZhSimplified: "我大部分时间感到快乐",
      textEn: "I feel happy most of the time",
    },
    {
      id: "hap5",
      text: "I have meaningful relationships",
      textZh: "我有有意義的人際關係",
      textZhSimplified: "我有有意义的人际关系",
      textEn: "I have meaningful relationships",
    },
  ],
};

// Stress Assessment Test (Perceived Stress Scale style)
export const STRESS_TEST: PsychologyTestDef = {
  id: "stress",
  name: "Stress Assessment",
  nameZh: "壓力指數測驗",
  nameZhSimplified: "压力指数测验",
  nameEn: "Stress Assessment",
  description: "Evaluate your current stress level",
  descriptionZh: "評估你目前的壓力水平",
  descriptionZhSimplified: "评估你目前的压力水平",
  descriptionEn: "Evaluate your current stress level",
  scale: 4,
  questions: [
    {
      id: "str1",
      text: "I feel overwhelmed by tasks",
      textZh: "我感到被任務淹沒",
      textZhSimplified: "我感到被任务淹没",
      textEn: "I feel overwhelmed by tasks",
    },
    {
      id: "str2",
      text: "I have difficulty managing my workload",
      textZh: "我難以管理工作量",
      textZhSimplified: "我难以管理工作量",
      textEn: "I have difficulty managing my workload",
    },
    {
      id: "str3",
      text: "I feel time pressure",
      textZh: "我感到時間壓力",
      textZhSimplified: "我感到时间压力",
      textEn: "I feel time pressure",
    },
    {
      id: "str4",
      text: "I have physical symptoms from stress",
      textZh: "我因壓力出現身體症狀",
      textZhSimplified: "我因压力出现身体症状",
      textEn: "I have physical symptoms from stress",
    },
    {
      id: "str5",
      text: "I feel unable to cope",
      textZh: "我感到無法應對",
      textZhSimplified: "我感到无法应对",
      textEn: "I feel unable to cope",
    },
  ],
};

// Emotion Management Assessment
export const EMOTION_TEST: PsychologyTestDef = {
  id: "emotion",
  name: "Emotion Management",
  nameZh: "情緒管理評估",
  nameZhSimplified: "情绪管理评估",
  nameEn: "Emotion Management",
  description: "Assess your emotional regulation and management skills",
  descriptionZh: "評估你的情緒調節和管理能力",
  descriptionZhSimplified: "评估你的情绪调节和管理能力",
  descriptionEn: "Assess your emotional regulation and management skills",
  scale: 4,
  questions: [
    {
      id: "emo1",
      text: "I can identify my emotions",
      textZh: "我能識別我的情緒",
      textZhSimplified: "我能识别我的情绪",
      textEn: "I can identify my emotions",
    },
    {
      id: "emo2",
      text: "I can control my emotional reactions",
      textZh: "我能控制我的情緒反應",
      textZhSimplified: "我能控制我的情绪反应",
      textEn: "I can control my emotional reactions",
    },
    {
      id: "emo3",
      text: "I understand why I feel certain emotions",
      textZh: "我理解我為什麼感到某些情緒",
      textZhSimplified: "我理解我为什么感到某些情绪",
      textEn: "I understand why I feel certain emotions",
    },
    {
      id: "emo4",
      text: "I can express my emotions appropriately",
      textZh: "我能適當地表達我的情緒",
      textZhSimplified: "我能适当地表达我的情绪",
      textEn: "I can express my emotions appropriately",
    },
    {
      id: "emo5",
      text: "I recover quickly from negative emotions",
      textZh: "我能快速從負面情緒中恢復",
      textZhSimplified: "我能快速从负面情绪中恢复",
      textEn: "I recover quickly from negative emotions",
    },
  ],
};

// Confidence Assessment
export const CONFIDENCE_TEST: PsychologyTestDef = {
  id: "confidence",
  name: "Confidence Assessment",
  nameZh: "自信心測試",
  nameZhSimplified: "自信心测试",
  nameEn: "Confidence Assessment",
  description: "Evaluate your self-confidence and self-esteem",
  descriptionZh: "評估你的自信心和自尊",
  descriptionZhSimplified: "评估你的自信心和自尊",
  descriptionEn: "Evaluate your self-confidence and self-esteem",
  scale: 4,
  questions: [
    {
      id: "conf1",
      text: "I believe in my abilities",
      textZh: "我相信我的能力",
      textZhSimplified: "我相信我的能力",
      textEn: "I believe in my abilities",
    },
    {
      id: "conf2",
      text: "I am confident in social situations",
      textZh: "我在社交場合感到自信",
      textZhSimplified: "我在社交场合感到自信",
      textEn: "I am confident in social situations",
    },
    {
      id: "conf3",
      text: "I have a positive self-image",
      textZh: "我有積極的自我形象",
      textZhSimplified: "我有积极的自我形象",
      textEn: "I have a positive self-image",
    },
    {
      id: "conf4",
      text: "I can handle challenges",
      textZh: "我能應對挑戰",
      textZhSimplified: "我能应对挑战",
      textEn: "I can handle challenges",
    },
    {
      id: "conf5",
      text: "I am proud of my achievements",
      textZh: "我為我的成就感到自豪",
      textZhSimplified: "我为我的成就感到自豪",
      textEn: "I am proud of my achievements",
    },
  ],
};

// All tests
export const ALL_PSYCHOLOGY_TESTS: PsychologyTestDef[] = [
  ANXIETY_TEST,
  HAPPINESS_TEST,
  STRESS_TEST,
  EMOTION_TEST,
  CONFIDENCE_TEST,
];

/**
 * Calculate psychology test result
 */
export function calculatePsychologyTestResult(
  testType: PsychologyTestType,
  answers: number[]
): PsychologyTestResult {
  const test = ALL_PSYCHOLOGY_TESTS.find((t) => t.id === testType);
  if (!test) {
    throw new Error(`Unknown test type: ${testType}`);
  }

  const score = answers.reduce((sum, answer) => sum + answer, 0);
  const maxScore = test.questions.length * test.scale;
  const percentile = Math.round((score / maxScore) * 100);

  // Determine level based on percentile
  let level: "low" | "moderate" | "high" | "very-high";
  if (testType === "happiness") {
    // For happiness, higher is better
    if (percentile >= 75) level = "very-high";
    else if (percentile >= 50) level = "high";
    else if (percentile >= 25) level = "moderate";
    else level = "low";
  } else {
    // For anxiety, stress, etc., lower is better
    if (percentile <= 25) level = "very-high";
    else if (percentile <= 50) level = "high";
    else if (percentile <= 75) level = "moderate";
    else level = "low";
  }

  const interpretation = generateInterpretation(testType, percentile, level);

  return {
    id: `${testType}-${Date.now()}`,
    testType,
    testName: getTestById(testType)?.nameZh || testType,
    totalScore: score,
    maxScore,
    percentage: percentile,
    level,
    interpretation,
    recommendations: [],
    createdAt: new Date(),
  };
}

/**
 * Generate interpretation based on test type and score
 */
function generateInterpretation(
  testType: PsychologyTestType,
  percentile: number,
  level: string
): string {
  const interpretations: Record<PsychologyTestType, Record<string, string>> = {
    anxiety: {
      low: "Your anxiety level is low. You generally manage stress well.",
      moderate: "Your anxiety level is moderate. Consider stress management techniques.",
      high: "Your anxiety level is high. Consider seeking professional support.",
      "very-high": "Your anxiety level is very high. Professional help is recommended.",
    },
    happiness: {
      low: "Your happiness level is low. Consider activities that bring joy.",
      moderate: "Your happiness level is moderate. There's room for more satisfaction.",
      high: "Your happiness level is high. You're generally satisfied with life.",
      "very-high": "Your happiness level is very high. You have strong life satisfaction.",
    },
    stress: {
      low: "Your stress level is low. You're managing well.",
      moderate: "Your stress level is moderate. Consider relaxation techniques.",
      high: "Your stress level is high. Take steps to reduce stress.",
      "very-high": "Your stress level is very high. Professional support may help.",
    },
    emotion: {
      low: "Your emotion management skills need development.",
      moderate: "Your emotion management skills are developing well.",
      high: "Your emotion management skills are strong.",
      "very-high": "Your emotion management skills are excellent.",
    },
    confidence: {
      low: "Your confidence level is low. Work on building self-esteem.",
      moderate: "Your confidence level is moderate. Continue building on it.",
      high: "Your confidence level is high. You believe in yourself.",
      "very-high": "Your confidence level is very high. Strong self-belief.",
    },
  };

  return interpretations[testType][level] || "Assessment complete.";
}

/**
 * Get test by ID
 */
export function getTestById(testType: PsychologyTestType): PsychologyTestDef | undefined {
  return ALL_PSYCHOLOGY_TESTS.find((t) => t.id === testType);
}
