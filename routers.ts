import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  analysis: router({
    generatePersonalityAnalysis: publicProcedure
      .input(z.object({ mbtiType: z.string().length(4), language: z.enum(["zh-HK", "zh-CN", "en"]).optional() }))
      .mutation(async ({ input }) => {
        try {
          const language = input.language || "zh-HK";
          const languageMap = {
            "zh-HK": "Traditional Chinese",
            "zh-CN": "Simplified Chinese",
            "en": "English",
          };
          const langName = languageMap[language];
          
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are a professional psychologist providing accurate personality analysis in ${langName}. Always respond with valid JSON only, no markdown formatting.`,
              },
              {
                role: "user",
                content: `Provide a detailed personality analysis for MBTI type "${input.mbtiType}" in ${langName}. Return ONLY a JSON object (no markdown, no extra text) with these exact fields: overview (string), strengths (array of 3-4 strings), challenges (array of 3-4 strings), personalDevelopment (string), relationships (string), workStyle (string)`,
              },
            ],
            responseFormat: { type: "json_object" },
          });

          const content = response.choices[0].message.content;
          if (typeof content !== "string") throw new Error("Invalid response format");
          
          // 嘗試提取 JSON（可能被 markdown 代碼塊包裹）
          let jsonStr = content.trim();
          if (jsonStr.startsWith("```json")) {
            jsonStr = jsonStr.replace(/^```json\n?/, "").replace(/\n?```$/, "");
          } else if (jsonStr.startsWith("```")) {
            jsonStr = jsonStr.replace(/^```\n?/, "").replace(/\n?```$/, "");
          }
          
          const parsed = JSON.parse(jsonStr);
          return parsed;
        } catch (error) {
          console.error("Error generating personality analysis:", error);
          throw new Error(`Failed to generate personality analysis: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }),

    generateCareerGuide: publicProcedure
      .input(z.object({ mbtiType: z.string().length(4), language: z.enum(["zh-HK", "zh-CN", "en"]).optional() }))
      .mutation(async ({ input }) => {
        try {
          const language = input.language || "zh-HK";
          const languageMap = {
            "zh-HK": "Traditional Chinese",
            "zh-CN": "Simplified Chinese",
            "en": "English",
          };
          const langName = languageMap[language];
          
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are a professional career counselor providing practical career advice in ${langName}. Always respond with valid JSON only, no markdown formatting.`,
              },
              {
                role: "user",
                content: `Provide career guidance for MBTI type "${input.mbtiType}" in ${langName}. Return ONLY a JSON object (no markdown, no extra text) with these exact fields: recommendedCareers (array of 5-6 strings), workEnvironment (string), communicationStyle (string), leadershipStyle (string), careerPath (string)`,
              },
            ],
            responseFormat: { type: "json_object" },
          });

          const content = response.choices[0].message.content;
          if (typeof content !== "string") throw new Error("Invalid response format");
          
          // 嘗試提取 JSON（可能被 markdown 代碼塊包裹）
          let jsonStr = content.trim();
          if (jsonStr.startsWith("```json")) {
            jsonStr = jsonStr.replace(/^```json\n?/, "").replace(/\n?```$/, "");
          } else if (jsonStr.startsWith("```")) {
            jsonStr = jsonStr.replace(/^```\n?/, "").replace(/\n?```$/, "");
          }
          
          const parsed = JSON.parse(jsonStr);
          return parsed;
        } catch (error) {
          console.error("Error generating career guide:", error);
          throw new Error(`Failed to generate career guide: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
