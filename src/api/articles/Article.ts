export interface Article {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

export interface NewArticle extends Omit<Article, "id" | "createdAt"> {}
