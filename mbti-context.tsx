import React, { createContext, useContext, useState, useCallback } from "react";
import type { MBTIResult, MBTIAnswer } from "@/shared/types";
import { calculateMBTIScores, calculateMBTIType, MBTI_QUESTIONS } from "@/shared/mbti-questions";
import { saveMBTIResult } from "./storage";

interface MBTIContextType {
  currentQuestionIndex: number;
  answers: MBTIAnswer[];
  isLoading: boolean;
  error: string | null;
  lastResult: MBTIResult | null;

  // Actions
  answerQuestion: (questionId: number, score: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  submitQuiz: () => Promise<MBTIResult>;
  resetQuiz: () => void;
  loadLastResult: () => Promise<void>;
}

const MBTIContext = createContext<MBTIContextType | undefined>(undefined);

export function MBTIProvider({ children }: { children: React.ReactNode }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<MBTIAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<MBTIResult | null>(null);

  const answerQuestion = useCallback((questionId: number, score: number) => {
    setAnswers((prev) => {
      const existingIndex = prev.findIndex((a) => a.questionId === questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { questionId, score };
        return updated;
      }
      return [...prev, { questionId, score }];
    });
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < MBTI_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < MBTI_QUESTIONS.length) {
      setCurrentQuestionIndex(index);
    }
  }, []);

  const submitQuiz = useCallback(async (): Promise<MBTIResult> => {
    try {
      setIsLoading(true);
      setError(null);

      // 確保所有題目都已回答
      if (answers.length !== MBTI_QUESTIONS.length) {
        throw new Error("請回答所有題目");
      }

      // 計算分數
      const scores = calculateMBTIScores(answers);
      const type = calculateMBTIType(scores);

      const result: MBTIResult = {
        id: `mbti_${Date.now()}`,
        type: type as any,
        scores,
        createdAt: new Date(),
        answers,
      };

      // 保存到本地存儲
      await saveMBTIResult(result);
      setLastResult(result);

      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "提交測驗失敗";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [answers]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setError(null);
  }, []);

  const loadLastResult = useCallback(async () => {
    try {
      setIsLoading(true);
      // 這裡可以從存儲中加載最後的結果
      // const result = await getLatestMBTIResult();
      // setLastResult(result);
    } catch (err) {
      console.error("Error loading last result:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: MBTIContextType = {
    currentQuestionIndex,
    answers,
    isLoading,
    error,
    lastResult,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuiz,
    resetQuiz,
    loadLastResult,
  };

  return <MBTIContext.Provider value={value}>{children}</MBTIContext.Provider>;
}

export function useMBTI() {
  const context = useContext(MBTIContext);
  if (!context) {
    throw new Error("useMBTI must be used within MBTIProvider");
  }
  return context;
}
