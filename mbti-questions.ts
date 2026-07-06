import type { MBTIQuestion, MBTITypeInfo } from "./types";

/**
 * MBTI 測驗題庫 - 70 道題目
 * 每個維度 (EI, SN, TF, JP) 各 17-18 道題目
 * direction: "positive" 表示傾向該維度的第一個字母 (E, S, T, J)
 * direction: "negative" 表示傾向該維度的第二個字母 (I, N, F, P)
 */
export const MBTI_QUESTIONS: MBTIQuestion[] = [
  // EI 維度 (外向 vs 內向) - 18 題
  { id: 1, question: "在社交活動中，你通常感到充滿能量。", dimension: "EI", direction: "positive" },
  { id: 2, question: "你傾向於在獨處時恢復精力。", dimension: "EI", direction: "negative" },
  { id: 3, question: "你喜歡參加派對和社交聚會。", dimension: "EI", direction: "positive" },
  { id: 4, question: "你寧願在家裡安靜地度過週末。", dimension: "EI", direction: "negative" },
  { id: 5, question: "你經常主動與陌生人開始對話。", dimension: "EI", direction: "positive" },
  { id: 6, question: "在陌生人面前，你感到有些害羞。", dimension: "EI", direction: "negative" },
  { id: 7, question: "你喜歡成為團隊中的中心人物。", dimension: "EI", direction: "positive" },
  { id: 8, question: "你更喜歡在幕後工作而不是成為焦點。", dimension: "EI", direction: "negative" },
  { id: 9, question: "你有很多朋友，經常與他們聯絡。", dimension: "EI", direction: "positive" },
  { id: 10, question: "你只有少數親密的朋友。", dimension: "EI", direction: "negative" },
  { id: 11, question: "你喜歡邊做事邊思考。", dimension: "EI", direction: "positive" },
  { id: 12, question: "你喜歡在行動前充分思考。", dimension: "EI", direction: "negative" },
  { id: 13, question: "你經常尋求新的經歷和冒險。", dimension: "EI", direction: "positive" },
  { id: 14, question: "你傾向於堅持已知的和舒適的事物。", dimension: "EI", direction: "negative" },
  { id: 15, question: "你在群體中表達自己的想法很自然。", dimension: "EI", direction: "positive" },
  { id: 16, question: "你更傾向於寫下你的想法而不是說出來。", dimension: "EI", direction: "negative" },
  { id: 17, question: "你喜歡忙碌的日程表和多項活動。", dimension: "EI", direction: "positive" },
  { id: 18, question: "你喜歡有充足的時間進行深度思考。", dimension: "EI", direction: "negative" },

  // SN 維度 (感知 vs 直覺) - 18 題
  { id: 19, question: "你更相信你能看到和觸摸到的事物。", dimension: "SN", direction: "positive" },
  { id: 20, question: "你經常依靠直覺和預感做決定。", dimension: "SN", direction: "negative" },
  { id: 21, question: "你注重細節和具體的事實。", dimension: "SN", direction: "positive" },
  { id: 22, question: "你喜歡看到事物的大局和可能性。", dimension: "SN", direction: "negative" },
  { id: 23, question: "你傾向於按照既定的方式做事。", dimension: "SN", direction: "positive" },
  { id: 24, question: "你喜歡嘗試新的和不同的方法。", dimension: "SN", direction: "negative" },
  { id: 25, question: "你在處理實際問題時表現最好。", dimension: "SN", direction: "positive" },
  { id: 26, question: "你在處理抽象概念時表現最好。", dimension: "SN", direction: "negative" },
  { id: 27, question: "你喜歡有具體的指示和清晰的步驟。", dimension: "SN", direction: "positive" },
  { id: 28, question: "你喜歡自己解釋指示和創造方法。", dimension: "SN", direction: "negative" },
  { id: 29, question: "你傾向於相信經驗而不是理論。", dimension: "SN", direction: "positive" },
  { id: 30, question: "你傾向於相信理論而不是經驗。", dimension: "SN", direction: "negative" },
  { id: 31, question: "你喜歡專注於當下的現實。", dimension: "SN", direction: "positive" },
  { id: 32, question: "你喜歡思考未來的可能性。", dimension: "SN", direction: "negative" },
  { id: 33, question: "你是一個務實的人。", dimension: "SN", direction: "positive" },
  { id: 34, question: "你是一個富有想象力的人。", dimension: "SN", direction: "negative" },
  { id: 35, question: "你傾向於逐步完成任務。", dimension: "SN", direction: "positive" },
  { id: 36, question: "你傾向於跳躍式地完成任務。", dimension: "SN", direction: "negative" },

  // TF 維度 (思考 vs 感受) - 18 題
  { id: 37, question: "你做決定時主要基於邏輯和分析。", dimension: "TF", direction: "positive" },
  { id: 38, question: "你做決定時主要基於個人價值觀和感受。", dimension: "TF", direction: "negative" },
  { id: 39, question: "你傾向於客觀地評估情況。", dimension: "TF", direction: "positive" },
  { id: 40, question: "你傾向於考慮他人的感受。", dimension: "TF", direction: "negative" },
  { id: 41, question: "你認為批評是有幫助的和必要的。", dimension: "TF", direction: "positive" },
  { id: 42, question: "你傾向於避免傷害他人的感受。", dimension: "TF", direction: "negative" },
  { id: 43, question: "你在工作中保持專業和客觀的距離。", dimension: "TF", direction: "positive" },
  { id: 44, question: "你在工作中建立個人關係很重要。", dimension: "TF", direction: "negative" },
  { id: 45, question: "你傾向於相信頭腦而不是心。", dimension: "TF", direction: "positive" },
  { id: 46, question: "你傾向於相信心而不是頭腦。", dimension: "TF", direction: "negative" },
  { id: 47, question: "你在衝突中尋求公平和正義。", dimension: "TF", direction: "positive" },
  { id: 48, question: "你在衝突中尋求和諧和理解。", dimension: "TF", direction: "negative" },
  { id: 49, question: "你傾向於分析問題而不是同情。", dimension: "TF", direction: "positive" },
  { id: 50, question: "你傾向於同情而不是分析。", dimension: "TF", direction: "negative" },
  { id: 51, question: "你認為效率比人際關係更重要。", dimension: "TF", direction: "positive" },
  { id: 52, question: "你認為人際關係比效率更重要。", dimension: "TF", direction: "negative" },
  { id: 53, question: "你容易保持情緒距離。", dimension: "TF", direction: "positive" },
  { id: 54, question: "你容易被他人的情緒所影響。", dimension: "TF", direction: "negative" },

  // JP 維度 (判斷 vs 感知) - 16 題
  { id: 55, question: "你喜歡有計劃和結構的生活。", dimension: "JP", direction: "positive" },
  { id: 56, question: "你喜歡靈活和自發的生活。", dimension: "JP", direction: "negative" },
  { id: 57, question: "你傾向於提前完成任務。", dimension: "JP", direction: "positive" },
  { id: 58, question: "你傾向於在最後期限前完成任務。", dimension: "JP", direction: "negative" },
  { id: 59, question: "你喜歡事物井井有條。", dimension: "JP", direction: "positive" },
  { id: 60, question: "你喜歡事物自然發展。", dimension: "JP", direction: "negative" },
  { id: 61, question: "你傾向於快速做出決定。", dimension: "JP", direction: "positive" },
  { id: 62, question: "你傾向於延遲決定以獲得更多信息。", dimension: "JP", direction: "negative" },
  { id: 63, question: "你喜歡有明確的目標和期限。", dimension: "JP", direction: "positive" },
  { id: 64, question: "你喜歡保持選項開放。", dimension: "JP", direction: "negative" },
  { id: 65, question: "你傾向於遵循時間表和清單。", dimension: "JP", direction: "positive" },
  { id: 66, question: "你傾向於隨意行動。", dimension: "JP", direction: "negative" },
  { id: 67, question: "你喜歡完成事情。", dimension: "JP", direction: "positive" },
  { id: 68, question: "你喜歡探索可能性。", dimension: "JP", direction: "negative" },
  { id: 69, question: "你認為計劃很重要。", dimension: "JP", direction: "positive" },
  { id: 70, question: "你認為靈活性很重要。", dimension: "JP", direction: "negative" },
];

/**
 * MBTI 類型的詳細信息
 */
export const MBTI_TYPE_INFO: Record<string, MBTITypeInfo> = {
  INTJ: {
    type: "INTJ",
    chineseName: "邏輯學家",
    englishName: "The Logistician",
    description: "獨立、分析型、有遠見的領導者，擅長戰略規劃和系統思維。",
    traits: ["獨立", "分析型", "戰略性", "決定性", "有遠見"],
  },
  INTP: {
    type: "INTP",
    chineseName: "思想家",
    englishName: "The Thinker",
    description: "好奇、創意、邏輯型的問題解決者，喜歡探索新想法。",
    traits: ["好奇", "創意", "邏輯型", "獨立", "理論型"],
  },
  ENTJ: {
    type: "ENTJ",
    chineseName: "指揮官",
    englishName: "The Commander",
    description: "自信、決定性、有魅力的領導者，擅長組織和執行。",
    traits: ["自信", "決定性", "領導力", "雄心勃勃", "有效率"],
  },
  ENTP: {
    type: "ENTP",
    chineseName: "辯手",
    englishName: "The Debater",
    description: "聰慧、好奇、富有挑戰精神的創新者，喜歡辯論和探索。",
    traits: ["聰慧", "好奇", "創新", "靈活", "有說服力"],
  },
  INFJ: {
    type: "INFJ",
    chineseName: "倡導者",
    englishName: "The Advocate",
    description: "富有同情心、有遠見、理想主義者，致力於幫助他人。",
    traits: ["同情心", "理想主義", "有遠見", "敏感", "有目標"],
  },
  INFP: {
    type: "INFP",
    chineseName: "調停者",
    englishName: "The Mediator",
    description: "富有同情心、創意、理想主義者，尋求意義和真實。",
    traits: ["同情心", "創意", "理想主義", "敏感", "真實"],
  },
  ENFJ: {
    type: "ENFJ",
    chineseName: "主人公",
    englishName: "The Protagonist",
    description: "魅力十足、有同情心的領導者，致力於激勵他人。",
    traits: ["魅力", "同情心", "領導力", "社交型", "有激情"],
  },
  ENFP: {
    type: "ENFP",
    chineseName: "活動家",
    englishName: "The Campaigner",
    description: "熱情、創意、自發的人，喜歡新經歷和與人互動。",
    traits: ["熱情", "創意", "自發", "社交型", "樂觀"],
  },
  ISTJ: {
    type: "ISTJ",
    chineseName: "後勤官",
    englishName: "The Logistician",
    description: "可靠、務實、有責任感的人，擅長組織和執行計劃。",
    traits: ["可靠", "務實", "責任感", "有序", "忠誠"],
  },
  ISFJ: {
    type: "ISFJ",
    chineseName: "守護者",
    englishName: "The Defender",
    description: "溫暖、有同情心、盡職的人，致力於幫助和保護他人。",
    traits: ["溫暖", "同情心", "盡職", "忠誠", "謙虛"],
  },
  ESTJ: {
    type: "ESTJ",
    chineseName: "總經理",
    englishName: "The Executive",
    description: "有效率、決定性、有領導力的人，擅長組織和管理。",
    traits: ["有效率", "決定性", "領導力", "傳統", "實際"],
  },
  ESFJ: {
    type: "ESFJ",
    chineseName: "領事",
    englishName: "The Consul",
    description: "友善、有同情心、社交型的人，致力於維護和諧。",
    traits: ["友善", "同情心", "社交型", "有責任感", "傳統"],
  },
  ISTP: {
    type: "ISTP",
    chineseName: "鑑賞家",
    englishName: "The Virtuoso",
    description: "邏輯型、實踐型、冷靜的人，擅長解決實際問題。",
    traits: ["邏輯型", "實踐型", "冷靜", "獨立", "靈活"],
  },
  ISFP: {
    type: "ISFP",
    chineseName: "冒險家",
    englishName: "The Adventurer",
    description: "溫和、有藝術感、敏感的人，喜歡新經歷和美的事物。",
    traits: ["溫和", "藝術感", "敏感", "靈活", "謙虛"],
  },
  ESTP: {
    type: "ESTP",
    chineseName: "企業家",
    englishName: "The Entrepreneur",
    description: "精力充沛、實踐型、大膽的人，喜歡冒險和挑戰。",
    traits: ["精力充沛", "實踐型", "大膽", "社交型", "靈活"],
  },
  ESFP: {
    type: "ESFP",
    chineseName: "表演者",
    englishName: "The Entertainer",
    description: "熱情、友善、自發的人，喜歡成為焦點和享受生活。",
    traits: ["熱情", "友善", "自發", "社交型", "樂觀"],
  },
};

/**
 * 計算 MBTI 類型
 * @param scores 四個維度的分數 (0-100)
 * @returns MBTI 類型
 */
export function calculateMBTIType(scores: {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
}): string {
  const e = scores.EI > 50 ? "E" : "I";
  const s = scores.SN > 50 ? "S" : "N";
  const t = scores.TF > 50 ? "T" : "F";
  const j = scores.JP > 50 ? "J" : "P";
  return e + s + t + j;
}

/**
 * 根據答案計算 MBTI 分數
 * @param answers 答案陣列，每個答案的分數 1-5
 * @returns 四個維度的分數 (0-100)
 */
export function calculateMBTIScores(
  answers: Array<{ questionId: number; score: number }>
): { EI: number; SN: number; TF: number; JP: number } {
  const scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
  const counts = { EI: 0, SN: 0, TF: 0, JP: 0 };

  answers.forEach((answer) => {
    const question = MBTI_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) return;

    const dimension = question.dimension;
    const rawScore = answer.score - 3; // 轉換為 -2 到 2 的範圍

    if (question.direction === "positive") {
      scores[dimension] += rawScore;
    } else {
      scores[dimension] -= rawScore;
    }
    counts[dimension]++;
  });

  // 轉換為 0-100 的範圍，50 為中性
  return {
    EI: Math.round((scores.EI / (counts.EI * 2)) * 50 + 50),
    SN: Math.round((scores.SN / (counts.SN * 2)) * 50 + 50),
    TF: Math.round((scores.TF / (counts.TF * 2)) * 50 + 50),
    JP: Math.round((scores.JP / (counts.JP * 2)) * 50 + 50),
  };
}
