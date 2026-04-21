export interface News {
  id: number;
  date: string;
  title: string;
  summary: string;
  importance: number;
  question?: string;
  answer?: string;
  created_at?: string;
}

export interface GenerateRequest {
  newsId: number;
}

export interface GenerateResponse {
  question: string;
  answer: string;
}
