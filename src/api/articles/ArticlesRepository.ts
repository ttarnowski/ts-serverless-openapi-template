import { Article, NewArticle } from "./Article";

export interface ArticleRepository {
  fetchOneById(id: string): Promise<Article | undefined>;
  create(article: NewArticle): Promise<Article>;
}
