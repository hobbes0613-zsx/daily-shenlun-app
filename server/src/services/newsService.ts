import { News } from "../types/news.js";
import { databaseService } from "./databaseService.js";

export class NewsService {
  private newsData: News[] = [];
  private lastUpdateTime: string | null = null;

  constructor() {
    this.initSampleNews();
    this.initializeDatabase();
  }

  /**
   * 获取Kimi API Key
   */
  private getKimiApiKey(): string {
    const apiKey = process.env.KIMI_API_KEY;
    if (!apiKey) {
      console.error('KIMI_API_KEY not configured');
      throw new Error('Kimi API Key not configured');
    }
    return apiKey;
  }

  /**
   * 调用Kimi API生成申论
   */
  private async callKimiAPI(messages: Array<{ role: string; content: string }>): Promise<string> {
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getKimiApiKey()}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Kimi API error:', response.status, errorText);
      throw new Error(`Kimi API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * 初始化数据库连接
   */
  private async initializeDatabase() {
    await databaseService.initialize();
    await this.loadCachedNews();
  }

  /**
   * 初始化示例新闻数据
   */
  private initSampleNews() {
    const today = new Date().toISOString().split('T')[0];
    this.newsData = [
      {
        id: 1,
        date: today,
        title: "我国发布2025年政府工作报告",
        summary: "国务院发布2025年政府工作报告，明确今年经济社会发展主要预期目标",
        importance: 1,
        question: "",
        answer: ""
      },
      {
        id: 2,
        date: today,
        title: "全国两会圆满闭幕",
        summary: "十四届全国人大三次会议和全国政协十四届三次会议圆满完成各项议程闭幕",
        importance: 2,
        question: "",
        answer: ""
      },
      {
        id: 3,
        date: today,
        title: "我国首艘自主建造大型邮轮交付使用",
        summary: "我国首艘自主设计建造的大型邮轮正式交付，标志着我国船舶工业实现新突破",
        importance: 3,
        question: "",
        answer: ""
      },
      {
        id: 4,
        date: today,
        title: "新一轮大规模设备更新和消费品以旧换新行动启动",
        summary: "国务院印发行动方案，推动新一轮大规模设备更新和消费品以旧换新",
        importance: 4,
        question: "",
        answer: ""
      },
      {
        id: 5,
        date: today,
        title: "我国成功发射新型运载火箭",
        summary: "我国在酒泉卫星发射中心成功发射新型运载火箭，将多颗卫星送入预定轨道",
        importance: 5,
        question: "",
        answer: ""
      },
      {
        id: 6,
        date: today,
        title: "全国教育大会召开",
        summary: "全国教育大会在北京召开，强调加快建设教育强国，办好人民满意的教育",
        importance: 6,
        question: "",
        answer: ""
      },
      {
        id: 7,
        date: today,
        title: "我国科学家在量子计算领域取得重大突破",
        summary: "我国科学家成功研制新型量子计算机，在特定任务上实现量子优越性",
        importance: 7,
        question: "",
        answer: ""
      },
      {
        id: 8,
        date: today,
        title: "全国医疗保障体系建设取得新进展",
        summary: "国家医保局发布数据，全国基本医疗保险参保率稳定在95%以上",
        importance: 8,
        question: "",
        answer: ""
      },
      {
        id: 9,
        date: today,
        title: '我国与多国签署高质量共建"一带一路"合作协议',
        summary: '我国与多个国家签署共建"一带一路"合作协议，深化各领域务实合作',
        importance: 9,
        question: "",
        answer: ""
      },
      {
        id: 10,
        date: today,
        title: "全国生态环境保护大会召开",
        summary: "全国生态环境保护大会召开，强调持续推进生态文明建设，打好污染防治攻坚战",
        importance: 10,
        question: "",
        answer: ""
      }
    ];
  }

  /**
   * 模拟从网络获取最新新闻
   */
  private async fetchNewsFromNetwork(): Promise<News[]> {
    // 在实际项目中，这里应该调用真实的新闻API
    // 例如：https://newsapi.org/v2/top-headlines?country=cn&category=politics&apiKey=YOUR_API_KEY

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    const today = new Date().toISOString().split('T')[0];
    const news: News[] = [
      {
        id: Date.now(),
        date: today,
        title: `[${today}] 最新时政新闻：我国经济社会发展持续向好`,
        summary: "国家统计局发布数据显示，我国经济运行保持恢复态势，高质量发展扎实推进",
        importance: 1,
        question: "",
        answer: ""
      },
      {
        id: Date.now() + 1,
        date: today,
        title: `[${today}] 重要会议：中央召开经济工作会议`,
        summary: "会议分析当前经济形势，部署明年经济工作，强调稳中求进工作总基调",
        importance: 2,
        question: "",
        answer: ""
      },
      {
        id: Date.now() + 2,
        date: today,
        title: `[${today}] 科技创新：我国在人工智能领域取得新突破`,
        summary: "科研团队发布最新研究成果，在自然语言处理和计算机视觉方面达到国际领先水平",
        importance: 3,
        question: "",
        answer: ""
      },
      {
        id: Date.now() + 3,
        date: today,
        title: `[${today}] 民生保障：全国基本养老保险参保人数持续增加`,
        summary: "人社部数据显示，我国社会保障体系不断完善，民生福祉持续增进",
        importance: 4,
        question: "",
        answer: ""
      },
      {
        id: Date.now() + 4,
        date: today,
        title: `[${today}] 绿色发展：我国碳达峰碳中和工作稳步推进`,
        summary: "国家发改委发布报告，能源结构持续优化，新能源产业发展势头良好",
        importance: 5,
        question: "",
        answer: ""
      },
      {
        id: Date.now() + 5,
        date: today,
        title: `[${today}] 对外开放：我国与多国签署经贸合作协议`,
        summary: "商务部宣布，我国与多个国家签署经贸合作协议，深化双边互利合作",
        importance: 6,
        question: "",
        answer: ""
      },
      {
        id: Date.now() + 6,
        date: today,
        title: `[${today}] 乡村振兴：全国农村基础设施持续改善`,
        summary: "农业农村部发布数据，农村人居环境整治成效显著，农民生活水平稳步提升",
        importance: 7,
        question: "",
        answer: ""
      },
      {
        id: Date.now() + 7,
        date: today,
        title: `[${today}] 区域发展：京津冀协同发展取得新进展`,
        summary: "国家发改委发布报告，京津冀区域合作不断深化，协同发展成效显著",
        importance: 8,
        question: "",
        answer: ""
      },
      {
        id: Date.now() + 8,
        date: today,
        title: `[${today}] 教育改革：高等教育质量持续提升`,
        summary: "教育部发布报告，高校创新能力不断增强，人才培养质量稳步提高",
        importance: 9,
        question: "",
        answer: ""
      },
      {
        id: Date.now() + 9,
        date: today,
        title: `[${today}] 法治建设：全国依法治国工作深入推进`,
        summary: "司法部发布报告，法治中国建设成效显著，社会治理水平不断提升",
        importance: 10,
        question: "",
        answer: ""
      }
    ];

    return news;
  }

  /**
   * 加载缓存的新闻
   */
  private async loadCachedNews() {
    if (!databaseService.isAvailable()) {
      // 如果数据库不可用，使用内存数据
      console.log('Database not available, using sample data');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const cachedData = await databaseService.getNews(today);

    if (cachedData) {
      this.newsData = cachedData;
      this.lastUpdateTime = today;
      console.log(`Loaded ${cachedData.length} news items from database`);
    }
  }

  /**
   * 保存新闻到缓存
   */
  private async saveCachedNews() {
    if (!databaseService.isAvailable()) {
      console.log('Database not available, skipping save');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const saved = await databaseService.saveNews(today, this.newsData);
    if (saved) {
      this.lastUpdateTime = today;
      console.log(`Saved ${this.newsData.length} news items to database`);
    }
  }

  /**
   * 检查是否需要更新新闻
   */
  private needsUpdate(): boolean {
    const today = new Date().toISOString().split('T')[0];
    return this.lastUpdateTime !== today;
  }

  /**
   * 刷新新闻（联网获取）
   */
  async refreshNews(): Promise<{ success: boolean; message: string }> {
    try {
      if (this.needsUpdate()) {
        const newNews = await this.fetchNewsFromNetwork();
        this.newsData = newNews;
        await this.saveCachedNews();
        return { success: true, message: "新闻已更新" };
      } else {
        return { success: true, message: "今日新闻已是最新" };
      }
    } catch (error) {
      console.error("Error refreshing news:", error);
      return { success: false, message: "更新失败，请稍后重试" };
    }
  }

  /**
   * 获取当日新闻列表（按重要性排序）
   */
  async getDailyNews(): Promise<News[]> {
    // 自动检查是否需要更新
    if (this.needsUpdate()) {
      await this.refreshNews();
    }

    const today = new Date().toISOString().split('T')[0];
    const todayNews = this.newsData
      .filter(news => news.date === today)
      .sort((a, b) => a.importance - b.importance);
    return todayNews;
  }

  /**
   * 根据ID获取新闻详情
   */
  async getNewsById(id: number): Promise<News | null> {
    const news = this.newsData.find(n => n.id === id);
    return news || null;
  }

  /**
   * 使用AI生成申论题目和答案
   */
  async generateShenlun(newsId: number): Promise<{ question: string; answer: string }> {
    const news = this.newsData.find(n => n.id === newsId);
    if (!news) {
      throw new Error("News not found");
    }

    // 如果已经生成过，直接返回
    if (news.question && news.answer) {
      return { question: news.question, answer: news.answer };
    }

    const messages = [
      {
        role: "system" as const,
        content: `你是一位资深的申论命题专家和阅卷老师。请根据给定的时政新闻，完成以下任务：

1. 根据公务员考试申论命题要求，设计一道申论题目
2. 根据申论考试评分标准，给出标准答案

要求：
- 题目要紧扣新闻主题，符合申论考试命题规范
- 题目类型可以是概括题、分析题、对策题或文章写作题
- 答案要条理清晰、内容充实、语言规范
- 答案要体现对新闻背景、原因、影响、对策等方面的全面分析
- 答案格式要求：
  【题目】
  题目内容
  
  【答案】
  答案内容（分层分点）`
      },
      {
        role: "user" as const,
        content: `新闻标题：${news.title}\n新闻摘要：${news.summary}`
      }
    ];

    try {
      // 使用Kimi API生成申论
      const content = await this.callKimiAPI(messages);

      // 解析题目和答案
      let question = "";
      let answer = "";

      const questionMatch = content.match(/【题目】\s*\n([\s\S]*?)(?=\n【答案】|$)/);
      const answerMatch = content.match(/【答案】\s*\n([\s\S]*)/);

      if (questionMatch) {
        question = questionMatch[1].trim();
      }
      if (answerMatch) {
        answer = answerMatch[1].trim();
      }

      // 如果解析失败，尝试其他格式
      if (!question || !answer) {
        // 备选解析逻辑
        const lines = content.split('\n');
        let currentSection = '';
        let questionLines: string[] = [];
        let answerLines: string[] = [];

        for (const line of lines) {
          if (line.includes('题目')) {
            currentSection = 'question';
            continue;
          }
          if (line.includes('答案')) {
            currentSection = 'answer';
            continue;
          }

          if (currentSection === 'question') {
            questionLines.push(line.trim());
          } else if (currentSection === 'answer') {
            answerLines.push(line.trim());
          }
        }

        if (questionLines.length > 0) question = questionLines.join('\n');
        if (answerLines.length > 0) answer = answerLines.join('\n');
      }

      // 如果还是解析失败，生成默认内容
      if (!question) {
        question = "请根据上述时政新闻，结合申论考试要求，分析新闻的背景、原因、影响和对策。";
      }
      if (!answer) {
        answer = content; // 使用完整返回内容作为答案
      }

      // 更新新闻数据
      news.question = question;
      news.answer = answer;

      return { question, answer };
    } catch (error) {
      console.error("Error generating shenlun:", error);
      throw new Error("Failed to generate shenlun");
    }
  }
}
