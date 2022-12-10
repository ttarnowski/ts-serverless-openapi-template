import { Article, NewArticle } from "./Article";

export interface ArticlesRepository {
  fetchOneById(id: string): Promise<Article | undefined>;
  create(article: NewArticle): Promise<Article>;
}
