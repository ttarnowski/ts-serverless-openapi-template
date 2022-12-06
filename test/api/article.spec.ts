import { v4 } from "uuid";
import { request } from "../helpers/app";
import { getAuthToken } from "../helpers/auth";
import { Article } from "../../src/api/articles/Article";
import { iocContainer } from "../../src/ioc";
import { ArticleRepository } from "../../src/api/articles/ArticlesRepository";

const createArticle = (article: Partial<Article> = {}): Article => ({
  id: v4(),
  title: `title-${v4()}`,
  description: `description-${v4()}`,
  createdAt: new Date(),
  ...article,
});

describe("Articles", () => {
  describe("POST /article", () => {
    it("responds with 201 status code and newly created article data if article has been created successfully", async () => {
      const article = createArticle();
      const requestBody = {
        article: {
          ...article,
          id: undefined,
          createdAt: undefined,
        },
      };
      const expectedResponseBody = {
        article: {
          ...article,
          id: expect.anything(),
          createdAt: expect.anything(),
        },
      };

      const response = await request.post("/article").set("Authorization", getAuthToken(article.id)).send(requestBody);

      expect(response.body).toEqual(expectedResponseBody);
      expect(response.statusCode).toEqual(201);
    });
  });

  describe("GET /article/{id}", () => {
    it("responds with 200 status code and article data if article exists in database", async () => {
      const article = await iocContainer.get<ArticleRepository>("ArticlesRepository").create(createArticle());
      const expectedArticle = {
        ...article,
        createdAt: article.createdAt.toISOString(),
      };

      const response = await request
        .get(`/article/${expectedArticle.id}`)
        .set("Authorization", getAuthToken(expectedArticle.id));

      expect(response.body).toEqual({ article: expectedArticle });
      expect(response.statusCode).toEqual(200);
    });

    it("responds with 404 status code and error message if article does not exist in database", async () => {
      const articleId = v4();
      const uuid = v4();

      const response = await request.get(`/article/${articleId}`).set("Authorization", getAuthToken(uuid));

      expect(response.body).toHaveProperty("type", "ARTICLE_NOT_FOUND");
      expect(response.statusCode).toEqual(404);
    });

    it("responds with 401 status code and unauthorized error message if auth token is invalid", async () => {
      const response = await request.get(`/article/${v4()}`);

      expect(response.body).toHaveProperty("type", "UNAUTHORIZED");
      expect(response.statusCode).toEqual(401);
    });
  });
});
