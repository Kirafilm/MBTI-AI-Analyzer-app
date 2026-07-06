// 增強版新心理測驗數據 - 包含詳細的結果分析

import { COLOR_PERSONALITY_DETAILED, LOVE_STYLE_DETAILED, WORK_STYLE_DETAILED, CREATIVITY_INDEX_DETAILED } from './new-psychology-detailed-results';

export interface EnhancedTestResult {
  id: string;
  typeId: string;
  nameZh: string;
  nameZhCN: string;
  nameEn: string;
  
  // 詳細分析
  detailedAnalysis: {
    titleZh: string;
    titleZhCN: string;
    titleEn: string;
    
    overviewZh: string;
    overviewZhCN: string;
    overviewEn: string;
    
    characteristicsZh: string[];
    characteristicsZhCN: string[];
    characteristicsEn: string[];
    
    strengthsZh: string[];
    strengthsZhCN: string[];
    strengthsEn: string[];
    
    areasForGrowthZh: string[];
    areasForGrowthZhCN: string[];
    areasForGrowthEn: string[];
    
    lifeAdviceZh: string[];
    lifeAdviceZhCN: string[];
    lifeAdviceEn: string[];
    
    relationshipAdviceZh: string[];
    relationshipAdviceZhCN: string[];
    relationshipAdviceEn: string[];
    
    careerAdviceZh: string[];
    careerAdviceZhCN: string[];
    careerAdviceEn: string[];
    
    compatibleTypesZh: string[];
    compatibleTypesZhCN: string[];
    compatibleTypesEn: string[];
  };
}

// 性格色彩測驗 - 增強版結果
export const COLOR_PERSONALITY_ENHANCED: Record<string, EnhancedTestResult> = {
  red: {
    id: 'color-red',
    typeId: 'red',
    nameZh: '紅色性格',
    nameZhCN: '红色性格',
    nameEn: 'Red Personality',
    detailedAnalysis: COLOR_PERSONALITY_DETAILED.red,
  },
  blue: {
    id: 'color-blue',
    typeId: 'blue',
    nameZh: '藍色性格',
    nameZhCN: '蓝色性格',
    nameEn: 'Blue Personality',
    detailedAnalysis: COLOR_PERSONALITY_DETAILED.blue,
  },
  green: {
    id: 'color-green',
    typeId: 'green',
    nameZh: '綠色性格',
    nameZhCN: '绿色性格',
    nameEn: 'Green Personality',
    detailedAnalysis: {
      titleZh: "綠色性格 - 平衡者與和平使者",
      titleZhCN: "绿色性格 - 平衡者与和平使者",
      titleEn: "Green Personality - Balancer & Peacemaker",
      overviewZh: "你是一個平衡、冷靜和理性的人。綠色性格代表著和平、穩定和中庸之道。你喜歡尋求平衡，避免極端，並能夠看到問題的多個角度。你是一個很好的傾聽者和調解者，能夠幫助他人找到共同點。",
      overviewZhCN: "你是一个平衡、冷静和理性的人。绿色性格代表着和平、稳定和中庸之道。你喜欢寻求平衡，避免极端，并能够看到问题的多个角度。你是一个很好的倾听者和调解者，能够帮助他人找到共同点。",
      overviewEn: "You are balanced, calm, and rational. Green personality represents peace, stability, and the middle way. You seek balance, avoid extremes, and see multiple perspectives. You are a good listener and mediator.",
      characteristicsZh: [
        "冷靜理性，能夠在衝突中保持客觀",
        "尋求平衡和和諧，不喜歡極端",
        "很好的傾聽者，能夠理解他人的觀點",
        "適應能力強，能夠靈活應對變化",
        "不喜歡衝突，傾向於尋求妥協"
      ],
      characteristicsZhCN: [
        "冷静理性，能够在冲突中保持客观",
        "寻求平衡和和谐，不喜欢极端",
        "很好的倾听者，能够理解他人的观点",
        "适应能力强，能够灵活应对变化",
        "不喜欢冲突，倾向于寻求妥协"
      ],
      characteristicsEn: [
        "Calm and rational, stay objective in conflicts",
        "Seek balance and harmony, avoid extremes",
        "Good listener, understand others' perspectives",
        "Adaptable, flexible in responding to change",
        "Dislike conflict, seek compromise"
      ],
      strengthsZh: [
        "平衡思維 - 能夠看到問題的多個角度",
        "調解能力 - 善於解決衝突和尋求妥協",
        "適應能力 - 能夠靈活應對各種情況",
        "耐心 - 願意花時間理解他人",
        "穩定性 - 提供可靠和穩定的支持"
      ],
      strengthsZhCN: [
        "平衡思维 - 能够看到问题的多个角度",
        "调解能力 - 善于解决冲突和寻求妥协",
        "适应能力 - 能够灵活应对各种情况",
        "耐心 - 愿意花时间理解他人",
        "稳定性 - 提供可靠和稳定的支持"
      ],
      strengthsEn: [
        "Balanced thinking - see multiple perspectives",
        "Mediation - good at resolving conflicts",
        "Adaptability - flexible in various situations",
        "Patience - willing to understand others",
        "Stability - provide reliable support"
      ],
      areasForGrowthZh: [
        "主動性 - 有時過於被動，需要更多主動",
        "決策能力 - 有時難以做出決定，過度尋求平衡",
        "自信 - 需要相信自己的判斷",
        "表達想法 - 有時不敢表達自己的觀點",
        "行動力 - 有時過於思考，不夠行動"
      ],
      areasForGrowthZhCN: [
        "主动性 - 有时过于被动，需要更多主动",
        "决策能力 - 有时难以做出决定，过度寻求平衡",
        "自信 - 需要相信自己的判断",
        "表达想法 - 有时不敢表达自己的观点",
        "行动力 - 有时过于思考，不够行动"
      ],
      areasForGrowthEn: [
        "Initiative - sometimes too passive, need more action",
        "Decision-making - sometimes struggle to decide",
        "Confidence - trust your own judgment",
        "Express thoughts - sometimes hesitant to share views",
        "Action - sometimes overthink, not enough action"
      ],
      lifeAdviceZh: [
        "學會表達你的想法和需求，不要總是尋求妥協",
        "發展你的領導能力，不要總是跟隨他人",
        "設定明確的目標，並採取行動實現它們",
        "學會說「不」，保護你的時間和精力",
        "定期評估你的進展，調整你的策略"
      ],
      lifeAdviceZhCN: [
        "学会表达你的想法和需求，不要总是寻求妥协",
        "发展你的领导能力，不要总是跟随他人",
        "设定明确的目标，并采取行动实现它们",
        "学会说「不」，保护你的时间和精力",
        "定期评估你的进展，调整你的策略"
      ],
      lifeAdviceEn: [
        "Express your thoughts and needs, don't always compromise",
        "Develop leadership, don't always follow others",
        "Set clear goals and take action to achieve them",
        "Learn to say 'no', protect your time and energy",
        "Regularly assess progress and adjust strategies"
      ],
      relationshipAdviceZh: [
        "清楚地表達你的感受和需求，不要假設他人知道",
        "學會在必要時堅持你的立場",
        "給予伴侶足夠的空間和自主權",
        "定期進行深入的溝通，分享你的想法",
        "學會接受他人的不完美"
      ],
      relationshipAdviceZhCN: [
        "清楚地表达你的感受和需求，不要假设他人知道",
        "学会在必要时坚持你的立场",
        "给予伴侣足够的空间和自主权",
        "定期进行深入的沟通，分享你的想法",
        "学会接受他人的不完美"
      ],
      relationshipAdviceEn: [
        "Express your feelings and needs clearly",
        "Stand firm when necessary",
        "Give your partner space and autonomy",
        "Have regular deep conversations",
        "Accept others' imperfections"
      ],
      careerAdviceZh: [
        "尋求能夠發揮調解和溝通能力的職位",
        "考慮從事人力資源、管理或諮詢工作",
        "建立強大的人脈網絡，利用你的溝通能力",
        "發展你的領導能力，但保持你的平衡風格",
        "考慮成為團隊中的和平使者和調解者"
      ],
      careerAdviceZhCN: [
        "寻求能够发挥调解和沟通能力的职位",
        "考虑从事人力资源、管理或咨询工作",
        "建立强大的人脉网络，利用你的沟通能力",
        "发展你的领导能力，但保持你的平衡风格",
        "考虑成为团队中的和平使者和调解者"
      ],
      careerAdviceEn: [
        "Seek positions leveraging mediation and communication",
        "Consider HR, management, or consulting roles",
        "Build strong networks, leverage communication skills",
        "Develop leadership while maintaining balance",
        "Be a peacemaker and mediator in your team"
      ],
      compatibleTypesZh: ["紅色性格", "黃色性格"],
      compatibleTypesZhCN: ["红色性格", "黄色性格"],
      compatibleTypesEn: ["Red Personality", "Yellow Personality"],
    },
  },
  yellow: {
    id: 'color-yellow',
    typeId: 'yellow',
    nameZh: '黃色性格',
    nameZhCN: '黄色性格',
    nameEn: 'Yellow Personality',
    detailedAnalysis: {
      titleZh: "黃色性格 - 樂觀者與社交家",
      titleZhCN: "黄色性格 - 乐观者与社交家",
      titleEn: "Yellow Personality - Optimist & Socialite",
      overviewZh: "你是一個充滿樂觀、熱情和社交能力的人。黃色性格代表著快樂、創意和人際吸引力。你喜歡與他人互動，能夠輕鬆地建立新的友誼，並且總是能夠找到生活中的光明面。你的能量是感染性的，能夠鼓舞和激勵周圍的人。",
      overviewZhCN: "你是一个充满乐观、热情和社交能力的人。黄色性格代表着快乐、创意和人际吸引力。你喜欢与他人互动，能够轻松地建立新的友谊，并且总是能够找到生活中的光明面。你的能量是感染性的，能够鼓舞和激励周围的人。",
      overviewEn: "You are optimistic, enthusiastic, and socially skilled. Yellow personality represents happiness, creativity, and interpersonal charm. You enjoy interacting with others, build friendships easily, and always find the bright side. Your energy is contagious.",
      characteristicsZh: [
        "樂觀向上，總能看到光明面",
        "社交能力強，容易與他人建立聯繫",
        "充滿熱情和能量，感染他人",
        "創意豐富，喜歡嘗試新事物",
        "喜歡成為注意力的焦點"
      ],
      characteristicsZhCN: [
        "乐观向上，总能看到光明面",
        "社交能力强，容易与他人建立联系",
        "充满热情和能量，感染他人",
        "创意丰富，喜欢尝试新事物",
        "喜欢成为注意力的焦点"
      ],
      characteristicsEn: [
        "Optimistic, always see the bright side",
        "Strong social skills, build connections easily",
        "Full of enthusiasm and energy, contagious",
        "Creative, enjoy trying new things",
        "Like being the center of attention"
      ],
      strengthsZh: [
        "社交能力 - 能夠輕鬆建立和維持關係",
        "樂觀心態 - 能夠在困難中找到希望",
        "創意思維 - 能夠想到新穎的想法",
        "激勵他人 - 能夠鼓舞和激勵周圍的人",
        "適應能力 - 能夠靈活應對各種情況"
      ],
      strengthsZhCN: [
        "社交能力 - 能够轻松建立和维持关系",
        "乐观心态 - 能够在困难中找到希望",
        "创意思维 - 能够想到新颖的想法",
        "激励他人 - 能够鼓舞和激励周围的人",
        "适应能力 - 能够灵活应对各种情况"
      ],
      strengthsEn: [
        "Social skills - build and maintain relationships easily",
        "Optimistic mindset - find hope in difficulties",
        "Creative thinking - come up with novel ideas",
        "Inspire others - motivate and encourage people",
        "Adaptability - handle various situations flexibly"
      ],
      areasForGrowthZh: [
        "深度思考 - 有時過於表面，缺乏深度",
        "責任感 - 有時不夠認真，容易分心",
        "耐心 - 容易對重複的工作感到厭倦",
        "專注力 - 有時難以長期專注於一個目標",
        "情感穩定 - 有時情緒波動較大"
      ],
      areasForGrowthZhCN: [
        "深度思考 - 有时过于表面，缺乏深度",
        "责任感 - 有时不够认真，容易分心",
        "耐心 - 容易对重复的工作感到厌倦",
        "专注力 - 有时难以长期专注于一个目标",
        "情感稳定 - 有时情绪波动较大"
      ],
      areasForGrowthEn: [
        "Deep thinking - sometimes too superficial",
        "Responsibility - sometimes not serious enough",
        "Patience - easily bored with repetitive work",
        "Focus - sometimes struggle with long-term focus",
        "Emotional stability - mood fluctuations"
      ],
      lifeAdviceZh: [
        "學會深入思考，不要只停留在表面",
        "發展你的專注力，完成你開始的項目",
        "學會在樂觀和現實之間找到平衡",
        "建立穩定的日常習慣，提供結構和穩定性",
        "定期反思你的決定和行動，從中學習"
      ],
      lifeAdviceZhCN: [
        "学会深入思考，不要只停留在表面",
        "发展你的专注力，完成你开始的项目",
        "学会在乐观和现实之间找到平衡",
        "建立稳定的日常习惯，提供结构和稳定性",
        "定期反思你的决定和行动，从中学习"
      ],
      lifeAdviceEn: [
        "Learn to think deeply, don't stay on the surface",
        "Develop focus, complete projects you start",
        "Balance optimism with reality",
        "Establish stable daily habits for structure",
        "Regularly reflect on decisions and actions"
      ],
      relationshipAdviceZh: [
        "學會傾聽伴侶的擔憂，不要總是試圖樂觀地看待",
        "給予伴侶足夠的關注和時間",
        "學會在承諾中堅持，不要輕易改變主意",
        "定期進行深入的溝通，分享你的真實感受",
        "學會在社交和與伴侶的時間之間找到平衡"
      ],
      relationshipAdviceZhCN: [
        "学会倾听伴侣的担忧，不要总是试图乐观地看待",
        "给予伴侣足够的关注和时间",
        "学会在承诺中坚持，不要轻易改变主意",
        "定期进行深入的沟通，分享你的真实感受",
        "学会在社交和与伴侣的时间之间找到平衡"
      ],
      relationshipAdviceEn: [
        "Listen to your partner's concerns, don't always be optimistic",
        "Give your partner enough attention and time",
        "Stick to commitments, don't change your mind easily",
        "Have regular deep conversations, share true feelings",
        "Balance socializing with quality time with partner"
      ],
      careerAdviceZh: [
        "尋求能夠與他人互動的職位，如銷售、市場營銷或公關",
        "利用你的社交能力建立強大的人脈網絡",
        "考慮從事創意工作，充分發揮你的創意思維",
        "發展你的專注力和責任感，完成重要項目",
        "考慮成為團隊中的激勵者和士氣提升者"
      ],
      careerAdviceZhCN: [
        "寻求能够与他人互动的职位，如销售、市场营销或公关",
        "利用你的社交能力建立强大的人脉网络",
        "考虑从事创意工作，充分发挥你的创意思维",
        "发展你的专注力和责任感，完成重要项目",
        "考虑成为团队中的激励者和士气提升者"
      ],
      careerAdviceEn: [
        "Seek interactive roles in sales, marketing, or PR",
        "Leverage social skills to build strong networks",
        "Consider creative work to showcase creativity",
        "Develop focus and responsibility to complete projects",
        "Be a motivator and morale booster in your team"
      ],
      compatibleTypesZh: ["綠色性格", "藍色性格"],
      compatibleTypesZhCN: ["绿色性格", "蓝色性格"],
      compatibleTypesEn: ["Green Personality", "Blue Personality"],
    },
  },
};

export const ALL_ENHANCED_TESTS = {
  colorPersonality: COLOR_PERSONALITY_ENHANCED,
  loveStyle: Object.entries(LOVE_STYLE_DETAILED).reduce((acc, [key, value]) => {
    acc[key] = {
      id: `love-${key}`,
      typeId: key,
      nameZh: value.titleZh.split(' - ')[0],
      nameZhCN: value.titleZhCN.split(' - ')[0],
      nameEn: value.titleEn.split(' - ')[0],
      detailedAnalysis: value,
    };
    return acc;
  }, {} as Record<string, EnhancedTestResult>),
  workStyle: Object.entries(WORK_STYLE_DETAILED).reduce((acc, [key, value]) => {
    acc[key] = {
      id: `work-${key}`,
      typeId: key,
      nameZh: value.titleZh.split(' - ')[0],
      nameZhCN: value.titleZhCN.split(' - ')[0],
      nameEn: value.titleEn.split(' - ')[0],
      detailedAnalysis: value,
    };
    return acc;
  }, {} as Record<string, EnhancedTestResult>),
  creativityIndex: Object.entries(CREATIVITY_INDEX_DETAILED).reduce((acc, [key, value]) => {
    acc[key] = {
      id: `creativity-${key}`,
      typeId: key,
      nameZh: value.titleZh.split(' - ')[0],
      nameZhCN: value.titleZhCN.split(' - ')[0],
      nameEn: value.titleEn.split(' - ')[0],
      detailedAnalysis: value,
    };
    return acc;
  }, {} as Record<string, EnhancedTestResult>),
};
