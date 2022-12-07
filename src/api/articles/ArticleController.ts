import { inject } from "inversify";
import { Body, Controller, Get, Path, Post, Route, Security, SuccessResponse } from "tsoa";

import securities from "../auth/securities";
import { provideSingleton } from "../../util/provideSingleton";
import { Article, NewArticle } from "./Article";
import { ArticlesService } from "./ArticlesService";

export type ArticleRequestBody = {
  article: NewArticle;
};

export type ArticleResponseBody = {
  article: Article;
};

@Route("article")
@provideSingleton(ArticleController)
export class ArticleController extends Controller {
  constructor(@inject(ArticlesService) private articlesService: ArticlesService) {
    super();
  }

  @Security(securities.USER_AUTH)
  @Get("{id}")
  public async getArticle(@Path("id") id: string) {
    const article = await this.articlesService.getArticle(id);

    return { article };
  }

  @SuccessResponse(201)
  @Security(securities.USER_AUTH)
  @Post()
  public async postArticle(@Body() reqBody: ArticleRequestBody): Promise<ArticleResponseBody> {
    const article = await this.articlesService.createArticle(reqBody.article);

    return { article };
  }
}
