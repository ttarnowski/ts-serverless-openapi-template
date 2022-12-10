import { v4 } from "uuid";
import { NewArticle, Article } from "./Article";
import { ArticlesRepository } from "./ArticlesRepository";

export class ArticlesRepositoryInMemory implements ArticlesRepository {
  private articleMap: Record<string, Article> = {};

  create(newArticle: NewArticle): Promise<Article> {
    const article = {
      ...newArticle,
      id: v4(),
      createdAt: new Date(),
    };

    this.articleMap[article.id] = article;

    return Promise.resolve(article);
  }

  fetchOneById(id: string): Promise<Article | undefined> {
    return Promise.resolve(this.articleMap[id]);
  }
}
