import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Quote {
  id: string;
  content: string;
  newsId: number;
  newsTitle: string;
  createdAt: string;
}

const QUOTES_KEY = 'saved_quotes';

export class QuoteService {
  /**
   * 获取所有金句
   */
  async getAllQuotes(): Promise<Quote[]> {
    try {
      const quotesJson = await AsyncStorage.getItem(QUOTES_KEY);
      return quotesJson ? JSON.parse(quotesJson) : [];
    } catch (error) {
      console.error('Error getting quotes:', error);
      return [];
    }
  }

  /**
   * 添加金句
   */
  async addQuote(quote: Omit<Quote, 'id' | 'createdAt'>): Promise<void> {
    try {
      const quotes = await this.getAllQuotes();
      const newQuote: Quote = {
        ...quote,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      quotes.unshift(newQuote); // 添加到开头
      await AsyncStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
    } catch (error) {
      console.error('Error adding quote:', error);
      throw error;
    }
  }

  /**
   * 删除金句
   */
  async deleteQuote(id: string): Promise<void> {
    try {
      const quotes = await this.getAllQuotes();
      const filteredQuotes = quotes.filter(q => q.id !== id);
      await AsyncStorage.setItem(QUOTES_KEY, JSON.stringify(filteredQuotes));
    } catch (error) {
      console.error('Error deleting quote:', error);
      throw error;
    }
  }

  /**
   * 检查金句是否已存在
   */
  async isQuoteExist(content: string): Promise<boolean> {
    try {
      const quotes = await this.getAllQuotes();
      return quotes.some(q => q.content === content);
    } catch (error) {
      console.error('Error checking quote existence:', error);
      return false;
    }
  }
}

export const quoteService = new QuoteService();
