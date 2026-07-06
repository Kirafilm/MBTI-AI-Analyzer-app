import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  MBTIResult,
  PsychologyTestResult,
  PersonalityAnalysis,
  CareerGuide,
  AppSettings,
  AppLocalStorage,
} from "@/shared/types";
import type { AnalysisLocale } from "@/shared/i18n";

const STORAGE_KEYS = {
  MBTI_RESULTS: "mbti_results",
  PSYCHOLOGY_RESULTS: "psychology_results",
  PERSONALITY_ANALYSES: "personality_analyses",
  CAREER_GUIDES: "career_guides",
  SETTINGS: "app_settings",
};

/**
 * 初始化應用設定
 */
const DEFAULT_SETTINGS: AppSettings = {
  theme: "auto",
  language: "zh-HK",
  notificationsEnabled: true,
  lastUpdated: new Date(),
};

/**
 * 保存 MBTI 測驗結果
 */
export async function saveMBTIResult(result: MBTIResult): Promise<void> {
  try {
    const results = await getMBTIResults();
    const newResult = {
      ...result,
      id: result.id || `mbti_${Date.now()}`,
      createdAt: new Date(result.createdAt),
    };
    results.push(newResult);
    await AsyncStorage.setItem(STORAGE_KEYS.MBTI_RESULTS, JSON.stringify(results));
  } catch (error) {
    console.error("Error saving MBTI result:", error);
    throw error;
  }
}

/**
 * 獲取所有 MBTI 測驗結果
 */
export async function getMBTIResults(): Promise<MBTIResult[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.MBTI_RESULTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error retrieving MBTI results:", error);
    return [];
  }
}

/**
 * 获取最新的 MBTI 測驗結果
 */
export async function getLatestMBTIResult(): Promise<MBTIResult | null> {
  try {
    const results = await getMBTIResults();
    if (results.length === 0) return null;
    const sorted = [...results].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return sorted[0] ?? null;
  } catch (error) {
    console.error("Error retrieving latest MBTI result:", error);
    return null;
  }
}

/**
 * 刪除特定的 MBTI 測驗結果
 */
export async function deleteMBTIResult(resultId: string): Promise<void> {
  try {
    const results = await getMBTIResults();
    const filtered = results.filter((r) => r.id !== resultId);
    await AsyncStorage.setItem(STORAGE_KEYS.MBTI_RESULTS, JSON.stringify(filtered));

    const analyses = await getPersonalityAnalyses();
    await AsyncStorage.setItem(
      STORAGE_KEYS.PERSONALITY_ANALYSES,
      JSON.stringify(analyses.filter((a) => a.resultId !== resultId)),
    );

    const guides = await getCareerGuides();
    await AsyncStorage.setItem(
      STORAGE_KEYS.CAREER_GUIDES,
      JSON.stringify(guides.filter((g) => g.resultId !== resultId)),
    );
  } catch (error) {
    console.error("Error deleting MBTI result:", error);
    throw error;
  }
}

/**
 * 保存心理測驗結果
 */
export async function savePsychologyTestResult(
  result: PsychologyTestResult
): Promise<void> {
  try {
    const results = await getPsychologyTestResults();
    const newResult = {
      ...result,
      id: result.id || `psych_${Date.now()}`,
      createdAt: new Date(result.createdAt),
    };
    results.push(newResult);
    await AsyncStorage.setItem(
      STORAGE_KEYS.PSYCHOLOGY_RESULTS,
      JSON.stringify(results)
    );
  } catch (error) {
    console.error("Error saving psychology test result:", error);
    throw error;
  }
}

/**
 * 獲取所有心理測驗結果
 */
export async function getPsychologyTestResults(): Promise<PsychologyTestResult[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PSYCHOLOGY_RESULTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error retrieving psychology test results:", error);
    return [];
  }
}

/**
 * 保存性格分析結果
 */
export async function savePersonalityAnalysis(
  analysis: PersonalityAnalysis
): Promise<void> {
  try {
    const analyses = await getPersonalityAnalyses();
    const newAnalysis = {
      ...analysis,
      createdAt: new Date(analysis.createdAt),
    };
    analyses.push(newAnalysis);
    await AsyncStorage.setItem(
      STORAGE_KEYS.PERSONALITY_ANALYSES,
      JSON.stringify(analyses)
    );
  } catch (error) {
    console.error("Error saving personality analysis:", error);
    throw error;
  }
}

/**
 * 獲取所有性格分析結果
 */
export async function getPersonalityAnalyses(): Promise<PersonalityAnalysis[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PERSONALITY_ANALYSES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error retrieving personality analyses:", error);
    return [];
  }
}

/**
 * 獲取特定 MBTI 類型的性格分析
 */
export async function getPersonalityAnalysisByResultId(
  resultId: string,
  locale: AnalysisLocale = "zh-HK",
): Promise<PersonalityAnalysis | null> {
  try {
    const analyses = await getPersonalityAnalyses();
    return (
      analyses.find(
        (a) => a.resultId === resultId && (a.locale ?? "zh-HK") === locale,
      ) || null
    );
  } catch (error) {
    console.error("Error retrieving personality analysis:", error);
    return null;
  }
}

/**
 * 保存職業指引
 */
export async function saveCareerGuide(guide: CareerGuide): Promise<void> {
  try {
    const guides = await getCareerGuides();
    const newGuide = {
      ...guide,
      createdAt: new Date(guide.createdAt),
    };
    guides.push(newGuide);
    await AsyncStorage.setItem(STORAGE_KEYS.CAREER_GUIDES, JSON.stringify(guides));
  } catch (error) {
    console.error("Error saving career guide:", error);
    throw error;
  }
}

/**
 * 獲取所有職業指引
 */
export async function getCareerGuides(): Promise<CareerGuide[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CAREER_GUIDES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error retrieving career guides:", error);
    return [];
  }
}

/**
 * 獲取特定 MBTI 類型的職業指引
 */
export async function getCareerGuideByResultId(
  resultId: string,
  locale: AnalysisLocale = "zh-HK",
): Promise<CareerGuide | null> {
  try {
    const guides = await getCareerGuides();
    return (
      guides.find(
        (g) => g.resultId === resultId && (g.locale ?? "zh-HK") === locale,
      ) || null
    );
  } catch (error) {
    console.error("Error retrieving career guide:", error);
    return null;
  }
}

/**
 * 獲取應用設定
 */
export async function getSettings(): Promise<AppSettings> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error retrieving settings:", error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * 保存應用設定
 */
export async function saveSettings(settings: AppSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }
}

/**
 * 清除所有本地數據
 */
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error("Error clearing all data:", error);
    throw error;
  }
}

/**
 * 導出所有本地數據
 */
export async function exportAllData(): Promise<AppLocalStorage> {
  try {
    const [mbtiResults, psychologyResults, personalityAnalyses, careerGuides, settings] =
      await Promise.all([
        getMBTIResults(),
        getPsychologyTestResults(),
        getPersonalityAnalyses(),
        getCareerGuides(),
        getSettings(),
      ]);

    return {
      mbtiResults,
      psychologyResults,
      personalityAnalyses,
      careerGuides,
      settings,
    };
  } catch (error) {
    console.error("Error exporting data:", error);
    throw error;
  }
}
