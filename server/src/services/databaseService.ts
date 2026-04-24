import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { News } from '../types/news.js';

/**
 * 数据库服务 - 用于持久化存储新闻数据
 * 使用Supabase作为数据库后端
 */
class DatabaseService {
  private supabase: SupabaseClient | null = null;
  private isInitialized = false;

  /**
   * 初始化数据库连接
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase credentials not found, using memory cache');
      return;
    }

    try {
      this.supabase = createClient(supabaseUrl, supabaseKey);
      this.isInitialized = true;
      console.log('Database service initialized');
    } catch (error) {
      console.error('Failed to initialize database service:', error);
    }
  }

  /**
   * 保存新闻数据
   */
  async saveNews(date: string, news: News[]): Promise<boolean> {
    if (!this.isInitialized || !this.supabase) return false;

    try {
      const { error } = await this.supabase
        .from('daily_news')
        .upsert({
          date,
          data: news,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'date'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Failed to save news to database:', error);
      return false;
    }
  }

  /**
   * 获取新闻数据
   */
  async getNews(date: string): Promise<News[] | null> {
    if (!this.isInitialized || !this.supabase) return null;

    try {
      const { data, error } = await this.supabase
        .from('daily_news')
        .select('data')
        .eq('date', date)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // 没有找到数据
          return null;
        }
        throw error;
      }

      return data?.data || null;
    } catch (error) {
      console.error('Failed to get news from database:', error);
      return null;
    }
  }

  /**
   * 检查数据库是否可用
   */
  isAvailable(): boolean {
    return this.isInitialized && this.supabase !== null;
  }
}

// 导出单例
export const databaseService = new DatabaseService();
