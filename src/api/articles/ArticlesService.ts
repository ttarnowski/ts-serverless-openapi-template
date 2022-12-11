import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { ApiError } from "../ApiError";
import { Article, NewArticle } from "./Article";
import { ArticlesRepository } from "./ArticlesRepository";

@provide(ArticlesService)
export class ArticlesService {
  constructor(@inject("ArticlesRepository") private articlesRepository: ArticlesRepository) {}

  public async getArticle(id: string) {
    const article = await this.articlesRepository.fetchOneById(id);

    if (!article) {
      throw new ApiError({
        message: "article not found",
        statusCode: 404,
        type: "ARTICLE_NOT_FOUND",
      });
    }

    return article;
  }

  public async createArticle(newArticle: NewArticle): Promise<Article> {
    const article = await this.articlesRepository.create(newArticle);

    return article;
  }
}
