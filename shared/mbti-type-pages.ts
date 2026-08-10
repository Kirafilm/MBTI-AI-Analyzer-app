// SEO-oriented long-form content for 16 MBTI type landing pages (zh-Hant).
// Personality frameworks are preference tools, not clinical diagnoses.

export type MbtiTypeFaq = { question: string; answer: string };

export type MbtiTypePage = {
  code: string;
  slug: string;
  nickname: string;
  englishName: string;
  summary: string;
  letters: { letter: string; title: string; text: string }[];
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  freelance: string;
  pairs: string;
  famous: string;
  faqs: MbtiTypeFaq[];
};

export const MBTI_TYPE_SLUGS = [
  "intj",
  "intp",
  "entj",
  "entp",
  "infj",
  "infp",
  "enfj",
  "enfp",
  "istj",
  "isfj",
  "estj",
  "esfj",
  "istp",
  "isfp",
  "estp",
  "esfp"
] as const;

export type MbtiTypeSlug = (typeof MBTI_TYPE_SLUGS)[number];

export const MBTI_TYPE_PAGES: Record<string, MbtiTypePage> = {
  "intj": {
    code: "INTJ",
    slug: "intj",
    nickname: "建築師",
    englishName: "Architect",
    summary: "INTJ（建築師型）是獨立、有遠見的戰略思考者，擅長把複雜系統拆解成可執行的長期計畫。",
    letters: [
          {
                "letter": "I",
                "title": "內向 Introversion",
                "text": "從獨處與深度思考中充電，偏好少量高品質的互動。"
          },
          {
                "letter": "N",
                "title": "直覺 Intuition",
                "text": "關注模式、可能性與未來趨勢，而非眼前細節。"
          },
          {
                "letter": "T",
                "title": "思考 Thinking",
                "text": "決策以邏輯、效率與客觀標準為先。"
          },
          {
                "letter": "J",
                "title": "判斷 Judging",
                "text": "喜歡結構、計畫與明確結論，厭惡無謂拖延。"
          }
    ],
    strengths: ["戰略規劃","系統思維","高自主性","長期專注","敢於挑戰低效流程"],
    weaknesses: ["對情緒訊號較不敏感","容易顯得疏離","完美主義導致過度挑剔","難容忍反覆無常"],
    careers: ["產品策略","軟體架構","數據分析","顧問研究","系統設計","獨立顧問／自由職策略規劃"],
    freelance: "INTJ 很適合作為獨立顧問、技術架構師或內容深度研究型自由工作者：交付標準高、可遠端、以結果計費。可在 HyphenJob 尋找策略、研究與技術類案件。",
    pairs: "較易與 ENFP、ENTP 互補；與同樣理性的 INTP、ENTJ 協作效率高。",
    famous: "常見被聯想到的人物類型包括戰略型創業者、科學家與作家（僅供趣味參考，非臨床判定）。",
    faqs: [
          {
                "question": "INTJ 是什麼意思？",
                "answer": "INTJ 代表內向、直覺、思考、判斷，常被稱為建築師型，擅長遠見與系統化解決問題。"
          },
          {
                "question": "INTJ 適合什麼工作？",
                "answer": "適合需要戰略、分析與獨立決策的工作，例如產品策略、架構設計、研究顧問與高深度自由職專案。"
          },
          {
                "question": "INTJ 準嗎？",
                "answer": "MBTI 是性格偏好工具而非醫學診斷。把它當自我認識與職涯探索起點最有用。"
          }
    ],
  },
  "intp": {
    code: "INTP",
    slug: "intp",
    nickname: "邏輯學家",
    englishName: "Logician",
    summary: "INTP（邏輯學家型）好奇心強、擅長抽象建模，喜歡拆解問題背後的原理。",
    letters: [
          {
                "letter": "I",
                "title": "內向 Introversion",
                "text": "需要安靜空間消化資訊與構思理論。"
          },
          {
                "letter": "N",
                "title": "直覺 Intuition",
                "text": "熱衷概念、假設與跨領域連結。"
          },
          {
                "letter": "T",
                "title": "思考 Thinking",
                "text": "以一致性與邏輯嚴謹度評估想法。"
          },
          {
                "letter": "P",
                "title": "感知 Perceiving",
                "text": "保持彈性，樂於修正假設與探索未知。"
          }
    ],
    strengths: ["深度分析","創新假設","學習速度快","客觀中立","解決非常規問題"],
    weaknesses: ["執行落地較慢","日程管理弱","社交耗能","對重複行政工作缺乏耐心"],
    careers: ["研究工程","演算法","學術／內容研究","產品原型","技術寫作","獨立開發與顧問"],
    freelance: "INTP 適合接研究、原型驗證、技術文件與工具開發類案件，在自由職中可專注「想清楚再做對」。",
    pairs: "與 ENTJ、ENFJ 搭配能補足推進力；與 INTJ、ENTP 討論火花多。",
    famous: "常與發明家、理論家與極客創作者形象連結。",
    faqs: [
          {
                "question": "INTP 適合什麼自由職？",
                "answer": "技術研究、工具開發、知識型內容與顧問分析都適合，關鍵是減少行政摩擦、保留深度工作時間。"
          },
          {
                "question": "INTP 和 INTJ 差在哪？",
                "answer": "INTP 更彈性和探索導向；INTJ 更目標導向、重視計畫落地。"
          }
    ],
  },
  "entj": {
    code: "ENTJ",
    slug: "entj",
    nickname: "指揮官",
    englishName: "Commander",
    summary: "ENTJ（指揮官型）果斷、有組織力，擅長帶領團隊把願景變成可衡量成果。",
    letters: [
          {
                "letter": "E",
                "title": "外向 Extraversion",
                "text": "從互動、協調與公開決策中獲得能量。"
          },
          {
                "letter": "N",
                "title": "直覺 Intuition",
                "text": "看大局與長期競爭優勢。"
          },
          {
                "letter": "T",
                "title": "思考 Thinking",
                "text": "以績效與邏輯分配資源。"
          },
          {
                "letter": "J",
                "title": "判斷 Judging",
                "text": "喜歡清晰目標、時程與責任歸屬。"
          }
    ],
    strengths: ["領導與決策","資源整合","高執行力","談判與推進","抗壓"],
    weaknesses: ["可能過於強勢","忽略情緒細節","對低效流程缺乏耐心"],
    careers: ["管理職","創業","營運","商務拓展","專案總監","成長顧問自由職"],
    freelance: "ENTJ 適合接專案管理、商業顧問、募資簡報與團隊流程優化案件，能快速建立交付節奏。",
    pairs: "與 INTP、INFP 互補創意與同理；與 ESTJ 在執行面合拍。",
    famous: "常被聯想為企業領導者與高強度專案負責人形象。",
    faqs: [
          {
                "question": "ENTJ 適合什麼工作？",
                "answer": "需要決策、帶人與擴張的角色最合適，例如營運主管、創業與商業顧問。"
          },
          {
                "question": "ENTJ 和自由職有什麼關係？",
                "answer": "ENTJ 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "entp": {
    code: "ENTP",
    slug: "entp",
    nickname: "辯論家",
    englishName: "Debater",
    summary: "ENTP（辯論家型）機智靈活，擅長挑戰假設、激發新點子並快速試作。",
    letters: [
          {
                "letter": "E",
                "title": "外向 Extraversion",
                "text": "喜歡腦力激盪與辯論式交流。"
          },
          {
                "letter": "N",
                "title": "直覺 Intuition",
                "text": "不斷看見新可能與另類路徑。"
          },
          {
                "letter": "T",
                "title": "思考 Thinking",
                "text": "用邏輯檢驗點子是否站得住。"
          },
          {
                "letter": "P",
                "title": "感知 Perceiving",
                "text": "擁抱變化，討厭過度僵化流程。"
          }
    ],
    strengths: ["創意發想","說服力","快速學習","危機應變","跨界連結"],
    weaknesses: ["難以收尾","興趣轉移快","規則感較低"],
    careers: ["產品創新","行銷策略","創業","顧問","內容創意","增長駭客自由職"],
    freelance: "ENTP 適合接提案發想、行銷活動、產品探索與簡報顧問，最好搭配清楚里程碑避免半途而廢。",
    pairs: "與 INFJ、INTJ 互補深度；與 ESTP 行動力相加。",
    famous: "常與發明家、辯論型創作者形象相關。",
    faqs: [
          {
                "question": "ENTP 職涯怎麼選？",
                "answer": "選擇變化多、需要說服與創新的環境，並用外部期限協助完成交付。"
          },
          {
                "question": "ENTP 和自由職有什麼關係？",
                "answer": "ENTP 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "infj": {
    code: "INFJ",
    slug: "infj",
    nickname: "提倡者",
    englishName: "Advocate",
    summary: "INFJ（提倡者型）理想主義且洞察力強，渴望把價值觀轉成對他人有益的長期影響。",
    letters: [
          {
                "letter": "I",
                "title": "內向 Introversion",
                "text": "需要安靜反思以維持敏感與專注。"
          },
          {
                "letter": "N",
                "title": "直覺 Intuition",
                "text": "看見意義、模式與人的潛力。"
          },
          {
                "letter": "F",
                "title": "情感 Feeling",
                "text": "決策重視價值、和諧與他人福祉。"
          },
          {
                "letter": "J",
                "title": "判斷 Judging",
                "text": "希望生活與使命有方向感。"
          }
    ],
    strengths: ["同理洞察","長期願景","文字與輔導力","堅持理念","細膩溝通"],
    weaknesses: ["易過度付出","完美主義","界線感不足時易耗竭"],
    careers: ["諮商相關","內容創作","品牌敘事","教育","非營利／社會創新","寫作與教練型自由職"],
    freelance: "INFJ 適合接品牌故事、課程設計、文字諮詢與一對一教練，把意義感轉成可收費專業。",
    pairs: "與 ENFP、ENTP 能量互補；與 INFP 價值觀接近。",
    famous: "常被聯想為作家、導師與社會倡議者形象。",
    faqs: [
          {
                "question": "INFJ 適合什麼工作？",
                "answer": "能發揮洞察與助人價值的工作，如內容、教育、諮詢與社會創新專案。"
          },
          {
                "question": "INFJ 和自由職有什麼關係？",
                "answer": "INFJ 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "infp": {
    code: "INFP",
    slug: "infp",
    nickname: "調停者",
    englishName: "Mediator",
    summary: "INFP（調停者型）重視真實與意義，創作力豐富，追求與價值觀一致的生活方式。",
    letters: [
          {
                "letter": "I",
                "title": "內向 Introversion",
                "text": "內在世界豐富，需要獨處恢復。"
          },
          {
                "letter": "N",
                "title": "直覺 Intuition",
                "text": "想像力強，關注理想與可能性。"
          },
          {
                "letter": "F",
                "title": "情感 Feeling",
                "text": "以真誠與價值排序人生選擇。"
          },
          {
                "letter": "P",
                "title": "感知 Perceiving",
                "text": "彈性開放，抗拒過度僵化安排。"
          }
    ],
    strengths: ["創意表達","同理心","價值驅動","獨特視角","深度傾聽"],
    weaknesses: ["拖延","過度自我批判","面對衝突易退縮"],
    careers: ["寫作","設計","心理／成長內容","藝術","翻譯","創作型自由職"],
    freelance: "INFP 很適合內容創作、文案、插畫、課程與個人品牌相關接案，關鍵是穩定交付節奏。",
    pairs: "與 ENFJ、ENTJ 可補推進力；與 INFJ 互相理解。",
    famous: "常與詩人、小說家與理想主義創作者形象連結。",
    faqs: [
          {
                "question": "INFP 適合什麼自由職？",
                "answer": "寫作、設計、品牌內容與成長類服務，選能表達自我價值的案件最持久。"
          },
          {
                "question": "INFP 和自由職有什麼關係？",
                "answer": "INFP 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "enfj": {
    code: "ENFJ",
    slug: "enfj",
    nickname: "主人公",
    englishName: "Protagonist",
    summary: "ENFJ（主人公型）擅長激勵他人、建立社群，並把人放在成長路徑的中心。",
    letters: [
          {
                "letter": "E",
                "title": "外向 Extraversion",
                "text": "從帶領與連結人群中獲得動能。"
          },
          {
                "letter": "N",
                "title": "直覺 Intuition",
                "text": "看見他人潛能與團體方向。"
          },
          {
                "letter": "F",
                "title": "情感 Feeling",
                "text": "重視關係品質與共同價值。"
          },
          {
                "letter": "J",
                "title": "判斷 Judging",
                "text": "喜歡有組織地推動成長計畫。"
          }
    ],
    strengths: ["激勵與教導","組織社群","溝通力","責任感","衝突協調"],
    weaknesses: ["易忽略自身需求","過度承擔","對批評敏感"],
    careers: ["教育訓練","HR／人才發展","社群經營","顧問教練","客戶成功","培訓型自由職"],
    freelance: "ENFJ 適合企業培訓、職涯教練、社群營運與工作坊設計，擅長把人帶進成果。",
    pairs: "與 INFP、ISTP 互補；與 ENTJ 在領導面合拍。",
    famous: "常被聯想為教師、演說者與社群領袖形象。",
    faqs: [
          {
                "question": "ENFJ 職涯優勢是什麼？",
                "answer": "能同時顧及人情與目標，適合教育、人才與客戶成長相關角色。"
          },
          {
                "question": "ENFJ 和自由職有什麼關係？",
                "answer": "ENFJ 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "enfp": {
    code: "ENFP",
    slug: "enfp",
    nickname: "競選者",
    englishName: "Campaigner",
    summary: "ENFP（競選者型）熱情洋溢、創意十足，擅長點燃靈感並連結不同的人與想法。",
    letters: [
          {
                "letter": "E",
                "title": "外向 Extraversion",
                "text": "從交流與新體驗充電。"
          },
          {
                "letter": "N",
                "title": "直覺 Intuition",
                "text": "不斷產生點子與故事。"
          },
          {
                "letter": "F",
                "title": "情感 Feeling",
                "text": "在意真實連結與正向影響。"
          },
          {
                "letter": "P",
                "title": "感知 Perceiving",
                "text": "彈性高，喜歡保留選擇。"
          }
    ],
    strengths: ["創意腦力激盪","影響力","適應力強","人情味","跨界合作"],
    weaknesses: ["注意力分散","細節執行弱","承諾過多"],
    careers: ["行銷","內容","活動企劃","品牌","顧問","創意自由職"],
    freelance: "ENFP 適合品牌活動、短影音腳本、社群與創意顧問；建議用夥伴或工具補強專案收尾。",
    pairs: "與 INTJ、INFJ 深度互補；與 ENTP 創意加倍。",
    famous: "常與表演者、活動家與創意思維領袖形象相關。",
    faqs: [
          {
                "question": "ENFP 適合遠端工作嗎？",
                "answer": "可以，但需要社群連結與清楚里程碑，否則容易失焦。"
          },
          {
                "question": "ENFP 和自由職有什麼關係？",
                "answer": "ENFP 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "istj": {
    code: "ISTJ",
    slug: "istj",
    nickname: "物流師",
    englishName: "Logistician",
    summary: "ISTJ（物流師型）可靠務實，重視責任、流程與可驗證的細節品質。",
    letters: [
          {
                "letter": "I",
                "title": "內向 Introversion",
                "text": "安靜專注完成任務。"
          },
          {
                "letter": "S",
                "title": "實感 Sensing",
                "text": "重視事實、經驗與細節正確性。"
          },
          {
                "letter": "T",
                "title": "思考 Thinking",
                "text": "以客觀標準評估對錯。"
          },
          {
                "letter": "J",
                "title": "判斷 Judging",
                "text": "喜歡計畫、清單與可預期節奏。"
          }
    ],
    strengths: ["可靠交付","流程紀律","風險控管","耐心","高責任感"],
    weaknesses: ["對突變較抗拒","彈性不足時顯得固執","情感表達含蓄"],
    careers: ["營運","財務","品管","行政系統","專案協調","流程優化自由職"],
    freelance: "ISTJ 適合接營運建置、資料整理、SOP 撰寫與專案控管，客戶最看重你的穩定交付。",
    pairs: "與 ESFP、ENFP 互補活力；與 ESTJ 執行風格接近。",
    famous: "常與務實管理者、專業技術官僚形象連結。",
    faqs: [
          {
                "question": "ISTJ 適合什麼工作？",
                "answer": "需要準確、穩定與制度的工作最合適，如營運、財務、品管與專案協調。"
          },
          {
                "question": "ISTJ 和自由職有什麼關係？",
                "answer": "ISTJ 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "isfj": {
    code: "ISFJ",
    slug: "isfj",
    nickname: "守衛者",
    englishName: "Defender",
    summary: "ISFJ（守衛者型）溫暖盡責，擅長照顧細節並默默支撐他人與團隊穩定。",
    letters: [
          {
                "letter": "I",
                "title": "內向 Introversion",
                "text": "偏好一對一深度支持。"
          },
          {
                "letter": "S",
                "title": "實感 Sensing",
                "text": "記住具體需求與實用細節。"
          },
          {
                "letter": "F",
                "title": "情感 Feeling",
                "text": "以關懷與責任回應他人。"
          },
          {
                "letter": "J",
                "title": "判斷 Judging",
                "text": "喜歡有秩序的服務流程。"
          }
    ],
    strengths: ["細心可靠","服務精神","忠誠","觀察入微","穩定輸出"],
    weaknesses: ["不擅長拒絕","壓力內耗","改變時需要更多安全感"],
    careers: ["客戶支援","行政","教育輔助","醫療行政","人力協調","虛擬助理自由職"],
    freelance: "ISFJ 非常適合虛擬助理、客戶成功、內容校對與後勤支援型接案。",
    pairs: "與 ESTP、ENTP 互補行動；與 ESFJ 價值相近。",
    famous: "常被聯想為照顧者、幕後英雄形象。",
    faqs: [
          {
                "question": "ISFJ 自由職方向？",
                "answer": "選擇能發揮細心與可靠性的服務型案件，並練習設立界線避免過勞。"
          },
          {
                "question": "ISFJ 和自由職有什麼關係？",
                "answer": "ISFJ 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "estj": {
    code: "ESTJ",
    slug: "estj",
    nickname: "總經理",
    englishName: "Executive",
    summary: "ESTJ（總經理型）務實果斷，擅長建立秩序、推動標準並確保事情完成。",
    letters: [
          {
                "letter": "E",
                "title": "外向 Extraversion",
                "text": "透過協調與指揮現場推進。"
          },
          {
                "letter": "S",
                "title": "實感 Sensing",
                "text": "聚焦可執行細節與即時結果。"
          },
          {
                "letter": "T",
                "title": "思考 Thinking",
                "text": "以效率與規則做決定。"
          },
          {
                "letter": "J",
                "title": "判斷 Judging",
                "text": "喜歡清楚權責與期限。"
          }
    ],
    strengths: ["組織管理","決策速度","執行力","標準化","抗壓推進"],
    weaknesses: ["彈性較低","可能過於直接","對模糊目標不耐"],
    careers: ["營運主管","專案經理","業務管理","公共事務","供應鏈","管理顧問自由職"],
    freelance: "ESTJ 適合接流程重整、專案救火、營運顧問與團隊管理培訓。",
    pairs: "與 INFP、INTP 互補視角；與 ISTJ 在制度面合拍。",
    famous: "常與企業主管、指揮官式管理者形象相關。",
    faqs: [
          {
                "question": "ESTJ 職涯優勢？",
                "answer": "能快速建立秩序並推動結果，適合管理、營運與高責任專案。"
          },
          {
                "question": "ESTJ 和自由職有什麼關係？",
                "answer": "ESTJ 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "esfj": {
    code: "ESFJ",
    slug: "esfj",
    nickname: "執政官",
    englishName: "Consul",
    summary: "ESFJ（執政官型）友善有責任感，擅長維護關係和諧並讓社群運作順暢。",
    letters: [
          {
                "letter": "E",
                "title": "外向 Extraversion",
                "text": "從服務與社交互動中充電。"
          },
          {
                "letter": "S",
                "title": "實感 Sensing",
                "text": "關注實際需求與當下氛圍。"
          },
          {
                "letter": "F",
                "title": "情感 Feeling",
                "text": "重視被需要與彼此照顧。"
          },
          {
                "letter": "J",
                "title": "判斷 Judging",
                "text": "喜歡可預期的合作節奏。"
          }
    ],
    strengths: ["人際協調","服務意識","執行細節","團隊凝聚","可靠"],
    weaknesses: ["過度在意評價","界線模糊","變化壓力大"],
    careers: ["客戶成功","活動企劃","教育","公關","社群管理","活動企劃自由職"],
    freelance: "ESFJ 適合活動執行、客戶關係、社群維運與服務設計類案件。",
    pairs: "與 ISFP、ISTP 互補；與 ENFJ 在照顧人方面相近。",
    famous: "常與接待者、社群組織者形象連結。",
    faqs: [
          {
                "question": "ESFJ 適合遠端接案嗎？",
                "answer": "適合，尤其是需要高溝通與客戶照顧的服務；記得安排固定社交充電。"
          },
          {
                "question": "ESFJ 和自由職有什麼關係？",
                "answer": "ESFJ 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "istp": {
    code: "ISTP",
    slug: "istp",
    nickname: "工匠",
    englishName: "Virtuoso",
    summary: "ISTP（工匠型）冷靜務實，擅長動手拆解問題並在壓力下找到可行解法。",
    letters: [
          {
                "letter": "I",
                "title": "內向 Introversion",
                "text": "安靜觀察後再行動。"
          },
          {
                "letter": "S",
                "title": "實感 Sensing",
                "text": "信任實測與身體經驗。"
          },
          {
                "letter": "T",
                "title": "思考 Thinking",
                "text": "以效能與邏輯排除故障。"
          },
          {
                "letter": "P",
                "title": "感知 Perceiving",
                "text": "臨場應變，保持選項開放。"
          }
    ],
    strengths: ["故障排除","實作力","冷靜危機處理","工具學習快","獨立"],
    weaknesses: ["長期規劃動機低","情感表達少","易覺儀式化會議無聊"],
    careers: ["工程技術","維運","產品實作"," Motions / 製作","技術支援","技術自由職"],
    freelance: "ISTP 適合接技術修復、自動化腳本、實作型專案與短期救火案件。",
    pairs: "與 ESFJ、ENFJ 互補關係面向；與 ESTP 行動合拍。",
    famous: "常與技師、極限運動者與實作者形象相關。",
    faqs: [
          {
                "question": "ISTP 適合什麼工作？",
                "answer": "能動手解決具體問題的技術與實作角色最合適。"
          },
          {
                "question": "ISTP 和自由職有什麼關係？",
                "answer": "ISTP 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "isfp": {
    code: "ISFP",
    slug: "isfp",
    nickname: "探險家",
    englishName: "Adventurer",
    summary: "ISFP（探險家型）溫和敏銳，追求美感與當下體驗，用行動表達價值。",
    letters: [
          {
                "letter": "I",
                "title": "內向 Introversion",
                "text": "需要個人空間孕育感受。"
          },
          {
                "letter": "S",
                "title": "實感 Sensing",
                "text": "對美感、材質與現場體驗敏感。"
          },
          {
                "letter": "F",
                "title": "情感 Feeling",
                "text": "以和諧與真誠指導選擇。"
          },
          {
                "letter": "P",
                "title": "感知 Perceiving",
                "text": "彈性自由，抗拒過度管控。"
          }
    ],
    strengths: ["審美","手作／創作","彈性","溫和合作","觀察細節"],
    weaknesses: ["長期規劃弱","衝突迴避","自我推銷困難"],
    careers: ["設計","攝影","手作","品牌視覺","體驗設計","創作自由職"],
    freelance: "ISFP 適合攝影、視覺設計、手作商品與體驗內容創作，作品集比話術更重要。",
    pairs: "與 ESTJ、ENTJ 互補結構；與 ESFP 共享感官樂趣。",
    famous: "常與藝術家、設計師形象連結。",
    faqs: [
          {
                "question": "ISFP 如何接案？",
                "answer": "用作品集說話，選擇小而美的專案逐步建立口碑與價格。"
          },
          {
                "question": "ISFP 和自由職有什麼關係？",
                "answer": "ISFP 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "estp": {
    code: "ESTP",
    slug: "estp",
    nickname: "企業家",
    englishName: "Entrepreneur",
    summary: "ESTP（企業家型）行動導向、臨場反應快，擅長抓住機會並立刻測試。",
    letters: [
          {
                "letter": "E",
                "title": "外向 Extraversion",
                "text": "從現場互動與行動中充電。"
          },
          {
                "letter": "S",
                "title": "實感 Sensing",
                "text": "關注當下資訊與即時回饋。"
          },
          {
                "letter": "T",
                "title": "思考 Thinking",
                "text": "務實評估利弊後快決策。"
          },
          {
                "letter": "P",
                "title": "感知 Perceiving",
                "text": "喜歡彈性與高變化節奏。"
          }
    ],
    strengths: ["談判","臨場應變","銷售推進","風險嘗試","實戰學習"],
    weaknesses: ["長線耐心不足","細節文書弱","衝動決策風險"],
    careers: ["業務","創業","活動","實戰營運","商務開發","業績導向自由職"],
    freelance: "ESTP 適合業務成長、活動執行、銷售顧問與短週期高回饋案件。",
    pairs: "與 ISFJ、INFJ 互補穩定；與 ENTP 一起衝刺機會。",
    famous: "常與業務高手、行動派創業者形象相關。",
    faqs: [
          {
                "question": "ESTP 職涯建議？",
                "answer": "選擇能快速看到結果的環境，並找夥伴補足長期系統建設。"
          },
          {
                "question": "ESTP 和自由職有什麼關係？",
                "answer": "ESTP 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  },
  "esfp": {
    code: "ESFP",
    slug: "esfp",
    nickname: "表演者",
    englishName: "Entertainer",
    summary: "ESFP（表演者型）熱情外向，擅長帶動氣氛，讓體驗變得有趣且具感染力。",
    letters: [
          {
                "letter": "E",
                "title": "外向 Extraversion",
                "text": "享受人群與即時互動。"
          },
          {
                "letter": "S",
                "title": "實感 Sensing",
                "text": "活在當下，重視體驗細節。"
          },
          {
                "letter": "F",
                "title": "情感 Feeling",
                "text": "在意他人感受與歡樂氛圍。"
          },
          {
                "letter": "P",
                "title": "感知 Perceiving",
                "text": "彈性自發，討厭過度拘束。"
          }
    ],
    strengths: ["舞台魅力","人際溫度","臨場表演","團隊氣氛","客戶體驗"],
    weaknesses: ["長線規劃弱","衝突時情緒化","對重複文書缺乏興趣"],
    careers: ["活動主持","內容創作","客戶體驗","旅遊／體驗","品牌大使","表演與內容自由職"],
    freelance: "ESFP 適合短影音、活動主持、體驗活動企劃與品牌合作露出。",
    pairs: "與 ISTJ、INTJ 互補紀律；與 ENFP 一起創造熱鬧專案。",
    famous: "常與藝人、活動達人與體驗創作者形象連結。",
    faqs: [
          {
                "question": "ESFP 適合自由職嗎？",
                "answer": "很適合以人際與內容為核心的接案，記得找人協助財務與排程。"
          },
          {
                "question": "ESFP 和自由職有什麼關係？",
                "answer": "ESFP 可把性格優勢轉成可收費技能；先選符合節奏的案件，再逐步建立個人品牌。"
          }
    ],
  }
};

export function getMbtiTypePage(slugOrCode: string): MbtiTypePage | null {
  const key = slugOrCode.trim().toLowerCase();
  if (MBTI_TYPE_PAGES[key]) return MBTI_TYPE_PAGES[key];
  const byCode = Object.values(MBTI_TYPE_PAGES).find((p) => p.code.toLowerCase() === key);
  return byCode ?? null;
}

export function allMbtiTypePages(): MbtiTypePage[] {
  return MBTI_TYPE_SLUGS.map((slug) => MBTI_TYPE_PAGES[slug]!);
}
