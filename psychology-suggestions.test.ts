import { describe, it, expect } from "vitest";
import { calculatePsychologyResult } from "../../shared/psychology-data";

describe("Psychology Test Suggestions", () => {
  describe("Anxiety Test Suggestions", () => {
    it("should return very-low anxiety suggestions in Traditional Chinese", () => {
      const answers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      const result = calculatePsychologyResult("anxiety", answers);

      expect(result.level).toBe("low");
      expect(result.suggestionsZh).toBeDefined();
      expect(result.suggestionsZh.length).toBeGreaterThan(0);
    });

    it("should return high anxiety suggestions in English", () => {
      const answers = [3, 3, 3, 3, 3, 3, 3, 3, 3, 2];
      const result = calculatePsychologyResult("anxiety", answers);

      expect(result.level).toBe("high");
      expect(result.suggestions).toBeDefined();
      expect(result.suggestions.length).toBeGreaterThan(0);
    });

    it("should return very-high anxiety suggestions in Simplified Chinese", () => {
      const answers = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
      const result = calculatePsychologyResult("anxiety", answers);

      expect(result.level).toBe("very-high");
      expect(result.suggestionsZhSimplified).toBeDefined();
      expect(result.suggestionsZhSimplified.length).toBeGreaterThan(0);
    });
  });

  describe("Happiness Test Suggestions", () => {
    it("should return low happiness suggestions", () => {
      const answers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      const result = calculatePsychologyResult("happiness", answers);

      expect(result.level).toBe("low");
      expect(result.suggestionsZh).toBeDefined();
      expect(result.suggestionsZh.length).toBeGreaterThan(0);
    });

    it("should return high happiness suggestions", () => {
      const answers = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
      const result = calculatePsychologyResult("happiness", answers);

      expect(result.level).toBe("very-high");
      expect(result.suggestions).toBeDefined();
      expect(result.suggestions.length).toBeGreaterThan(0);
    });
  });

  describe("Stress Test Suggestions", () => {
    it("should return medium stress suggestions", () => {
      const answers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
      const result = calculatePsychologyResult("stress", answers);

      expect(result.level).toBe("medium");
      expect(result.suggestionsZh).toBeDefined();
      expect(result.suggestionsZh.length).toBeGreaterThan(0);
    });

    it("should return very-high stress suggestions", () => {
      const answers = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
      const result = calculatePsychologyResult("stress", answers);

      expect(result.level).toBe("very-high");
      expect(result.suggestions).toBeDefined();
      expect(result.suggestions.length).toBeGreaterThan(0);
    });
  });

  describe("Multi-language Support", () => {
    it("should provide suggestions in all three languages", () => {
      const answers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
      const result = calculatePsychologyResult("anxiety", answers);

      expect(result.suggestions).toBeDefined();
      expect(result.suggestionsZh).toBeDefined();
      expect(result.suggestionsZhSimplified).toBeDefined();

      expect(result.suggestions.length).toBe(result.suggestionsZh.length);
      expect(result.suggestionsZh.length).toBe(result.suggestionsZhSimplified.length);
    });

    it("should have different content for different languages", () => {
      const answers = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
      const result = calculatePsychologyResult("anxiety", answers);

      expect(result.suggestions[0]).not.toBe(result.suggestionsZh[0]);
      expect(result.suggestionsZh[0]).not.toBe(result.suggestionsZhSimplified[0]);
    });
  });

  describe("Suggestions Count", () => {
    it("should have appropriate number of suggestions for each level", () => {
      const veryLowAnswers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      const veryLowResult = calculatePsychologyResult("anxiety", veryLowAnswers);
      expect(veryLowResult.suggestionsZh.length).toBeGreaterThan(0);

      const veryHighAnswers = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
      const veryHighResult = calculatePsychologyResult("anxiety", veryHighAnswers);
      expect(veryHighResult.suggestionsZh.length).toBeGreaterThan(0);
    });
  });
});
