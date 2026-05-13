export type News = {
  id: number;
  date: string;
  title: string;
  summary: string;
  importance: number;
  question?: string;
  answer?: string;
  created_at?: string;
};

export type GenerateRequest = {
  newsId: number;
};

export type GenerateResponse = {
  question: string;
  answer: string;
};
