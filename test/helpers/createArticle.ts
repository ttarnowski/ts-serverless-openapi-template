import { v4 } from "uuid";
import { Article } from "../../src/api/articles/Article";

export const createArticle = (article: Partial<Article> = {}): Article => ({
  id: v4(),
  title: `title-${v4()}`,
  description: `description-${v4()}`,
  createdAt: new Date(),
  ...article,
});
