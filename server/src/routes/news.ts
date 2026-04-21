import express from "express";
import { NewsService } from "../services/newsService";

const router = express.Router();
const newsService = new NewsService();

/**
 * GET /api/v1/news
 * 获取当日新闻列表（按重要性排序）
 */
router.get('/', async (req, res) => {
  try {
    const newsList = await newsService.getDailyNews();
    res.status(200).json({ data: newsList });
  } catch (error) {
    console.error("Error fetching news list:", error);
    res.status(500).json({ error: "Failed to fetch news list" });
  }
});

/**
 * GET /api/v1/news/:id
 * 获取新闻详情
 */
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const news = await newsService.getNewsById(id);

    if (!news) {
      res.status(404).json({ error: "News not found" });
      return;
    }

    res.status(200).json({ data: news });
  } catch (error) {
    console.error("Error fetching news detail:", error);
    res.status(500).json({ error: "Failed to fetch news detail" });
  }
});

/**
 * POST /api/v1/news/:id/generate
 * 生成申论题目和答案
 * Body: { newsId: number }
 */
router.post('/:id/generate', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await newsService.generateShenlun(id);
    res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error generating shenlun:", error);
    res.status(500).json({ error: "Failed to generate shenlun" });
  }
});

export default router;
