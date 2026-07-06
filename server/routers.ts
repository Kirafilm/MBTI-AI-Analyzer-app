import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { ENV } from "./_core/env";

const analysisLocaleSchema = z.enum(["zh-HK", "zh-CN", "en"]).optional();

function analysisLanguageDescription(locale: z.infer<typeof analysisLocaleSchema>): string {
  switch (locale ?? "zh-HK") {
    case "zh-CN":
      return "Simplified Chinese";
    case "en":
      return "English";
    default:
      return "Traditional Chinese";
  }
}

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
      .input(
        z.object({
          mbtiType: z.string().length(4),
          language: analysisLocaleSchema,
        }),
      )
      .mutation(async ({ input }) => {
        try {
          const lang = analysisLanguageDescription(input.language);
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are a professional psychologist providing accurate personality analysis. Write all user-visible strings in ${lang}. Always respond with valid JSON only, no markdown formatting.`,
              },
              {
                role: "user",
                content: `Provide a detailed personality analysis for MBTI type "${input.mbtiType}" in ${lang}. Return ONLY a JSON object (no markdown, no extra text) with these exact fields: overview (string), strengths (array of 3-4 strings), challenges (array of 3-4 strings), personalDevelopment (string), relationships (string), workStyle (string).`,
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
      .input(
        z.object({
          mbtiType: z.string().length(4),
          language: analysisLocaleSchema,
        }),
      )
      .mutation(async ({ input }) => {
        try {
          const lang = analysisLanguageDescription(input.language);
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are a professional career counselor providing practical career advice. Write all user-visible strings in ${lang}. Always respond with valid JSON only, no markdown formatting.`,
              },
              {
                role: "user",
                content: `Provide career guidance for MBTI type "${input.mbtiType}" in ${lang}. Return ONLY a JSON object (no markdown, no extra text) with these exact fields: recommendedCareers (array of 5-6 strings), workEnvironment (string), communicationStyle (string), leadershipStyle (string), careerPath (string).`,
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

  contact: router({
    sendMessage: publicProcedure
      .input(
        z.object({
          from_name: z.string().min(1),
          reply_to: z.string().email(),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        const serviceId = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY;
        const privateKey = process.env.EMAILJS_PRIVATE_KEY || ENV.emailjsPrivateKey;

        if (!serviceId || !templateId || !publicKey || !privateKey) {
          throw new Error("EmailJS is not configured on the server");
        }

        const response = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              service_id: serviceId,
              template_id: templateId,
              user_id: publicKey,
              accessToken: privateKey,
              template_params: {
                from_name: input.from_name,
                reply_to: input.reply_to,
                message: input.message,
                to_email: "hyphe.office@gmail.com",
              },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || `EmailJS returned ${response.status}`);
        }

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
