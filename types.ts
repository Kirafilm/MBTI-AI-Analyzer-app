/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";

// ============================================
// MBTI 相關型別定義
// ============================================

/**
 * MBTI 四個維度的選項
 */
export type MBTIDimension = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

/**
 * MBTI 完整類型（如 "INTJ"）
 */
export type MBTIType =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP";

/**
 * 單道 MBTI 測驗題目
 */
export interface MBTIQuestion {
  id: number;
  question: string;
  dimension: "EI" | "SN" | "TF" | "JP"; // 題目對應的維度
  direction: "positive" | "negative"; // positive: 傾向該維度的第一個字母，negative: 傾向第二個字母
}

/**
 * MBTI 測驗答案
 */
export interface MBTIAnswer {
  questionId: number;
  score: number; // 1-5: 1=完全不同意, 5=完全同意
}

/**
 * MBTI 測驗結果
 */
export interface MBTIResult {
  id?: string;
  type: MBTIType;
  scores: {
    EI: number; // 外向 vs 內向 (0-100, 50=中性)
    SN: number; // 感知 vs 直覺 (0-100, 50=中性)
    TF: number; // 思考 vs 感受 (0-100, 50=中性)
    JP: number; // 判斷 vs 感知 (0-100, 50=中性)
  };
  createdAt: Date;
  answers?: MBTIAnswer[]; // 可選：保存原始答案
}

/**
 * MBTI 類型的詳細信息
 */
export interface MBTITypeInfo {
  type: MBTIType;
  chineseName: string; // 中文名稱（繁體），如 "邏輯學家"
  englishName: string; // 英文名稱，如 "The Logistician"
  description: string; // 簡短描述（繁體中文）
  traits: string[]; // 性格特徵列表（繁體中文）
  englishDescriptionEn?: string; // 英文描述
  englishDescriptionZhCN?: string; // 簡體中文描述
  traitsEn?: string[]; // 英文性格特徵
  traitsZhCN?: string[]; // 簡體中文性格特徵
}

/**
 * AI 生成的性格分析
 */
export interface PersonalityAnalysis {
  resultId: string;
  mbtiType: MBTIType;
  overview: string; // 性格概述
  strengths: string[]; // 優勢列表
  challenges: string[]; // 挑戰/劣勢列表
  personalDevelopment: string; // 個人發展建議
  relationships: string; // 人際關係建議
  workStyle: string; // 工作風格建議
  createdAt: Date;
}

/**
 * 職業指引信息
 */
export interface CareerGuide {
  resultId: string;
  mbtiType: MBTIType;
  recommendedCareers: string[]; // 推薦職業列表
  workEnvironment: string; // 理想工作環境描述
  communicationStyle: string; // 溝通風格
  leadershipStyle: string; // 領導風格
  careerPath: string; // 職業發展路徑
  createdAt: Date;
}

// ============================================
// 心理測驗相關型別定義
// ============================================

/**
 * 心理測驗類型
 */
export type PsychologyTestType =
  | "stress-index"
  | "emotional-stability"
  | "creativity-index"
  | "social-anxiety"
  | "job-satisfaction"
  | "resilience";

/**
 * 單道心理測驗題目
 */
export interface PsychologyQuestion {
  id: number;
  testType: PsychologyTestType;
  question: string;
  options: string[]; // 選項列表
  scores?: number[]; // 對應的分數（可選，用於加權計分）
}

/**
 * 心理測驗答案
 */
export interface PsychologyAnswer {
  questionId: number;
  selectedOptionIndex: number; // 選項索引
}

/**
 * 心理測驗結果
 */
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

/**
 * 心理測驗元數據
 */
export interface PsychologyTestMetadata {
  type: PsychologyTestType;
  name: string;
  description: string;
  estimatedTime: number; // 預計時間（分鐘）
  questionCount: number; // 題目數量
  difficulty: "easy" | "medium" | "hard";
}

// ============================================
// 本地存儲相關型別
// ============================================

/**
 * 應用本地存儲的根結構
 */
export interface AppLocalStorage {
  mbtiResults: MBTIResult[];
  psychologyResults: PsychologyTestResult[];
  personalityAnalyses: PersonalityAnalysis[];
  careerGuides: CareerGuide[];
  settings: AppSettings;
}

/**
 * 應用設定
 */
export interface AppSettings {
  theme: "light" | "dark" | "auto";
  language: "zh-HK" | "zh-CN" | "en";
  notificationsEnabled: boolean;
  lastUpdated: Date;
}
