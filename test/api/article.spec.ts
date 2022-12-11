import { v4 } from "uuid";
import { request } from "../helpers/app";
import { getAuthToken } from "../helpers/auth";
import { iocContainer } from "../../src/ioc";
import { ArticlesRepository } from "../../src/api/articles/ArticlesRepository";
import { ArticleController } from "../../src/api/articles/ArticleController";
import { createArticle } from "../helpers/createArticle";

describe("Articles", () => {
  const getArticlesRepository = () => iocContainer.get<ArticlesRepository>("ArticlesRepository");

  describe("POST /article", () => {
    it("responds with 401 status code and unauthorized error message if auth token is invalid", async () => {
      const response = await request.post(`/article`).send({ article: createArticle() });

      expect(response.body).toHaveProperty("type", "UNAUTHORIZED");
      expect(response.statusCode).toEqual(401);
    });

    // optional request body validation test case if we don't trust tsoa validation inferred from OpenAPI specs
    it("responds with 422 status code and validation error if request body has been invalid", async () => {
      const invalidRequestBody = {
        invalid: {
          invalidField: "invalid value",
        },
        article: {
          invalid: 0,
        },
      };
      const expectedErrorDetails = {
        reqBody: {
          message: '"invalid" is an excess property and therefore is not allowed',
          value: {
            invalid: {
              invalidField: "invalid value",
            },
          },
        },
        "reqBody.article.description": {
          message: "'description' is required",
        },
        "reqBody.article.invalid": {
          message: '"invalid" is an excess property and therefore is not allowed',
          value: "invalid",
        },
        "reqBody.article.title": {
          message: "'title' is required",
        },
      };

      const response = await request.post("/article").set("Authorization", getAuthToken(v4())).send(invalidRequestBody);

      expect(response.body.details).toEqual(expectedErrorDetails);
      expect(response.statusCode).toEqual(422);
    });

    it("responds with 201 status code and newly created article data if article has been created successfully", async () => {
      const expectedArticle = createArticle({
        id: undefined,
        createdAt: undefined,
      });
      const requestBody = {
        article: expectedArticle,
      };
      const expectedResponseBody = {
        article: {
          ...expectedArticle,
          id: expect.anything(),
          createdAt: expect.anything(),
        },
      };

      const response = await request
        .post("/article")
        .set("Authorization", getAuthToken(expectedArticle.id))
        .send(requestBody);
      const actualArticle = await getArticlesRepository().fetchOneById(response.body.article.id);

      expect(response.body).toEqual(expectedResponseBody);
      expect(response.statusCode).toEqual(201);
      expect(actualArticle).not.toBeUndefined();
      expect(actualArticle?.id).toEqual(response.body.article.id);
      expect(actualArticle?.createdAt.toISOString()).toEqual(response.body.article.createdAt);
    });

    describe("with repository stub", () => {
      // this is an example with alternative test where we stub repository instead of calling it
      beforeEach(() => {
        iocContainer.snapshot();
        iocContainer.rebind(ArticleController).toSelf();
      });

      afterEach(() => {
        iocContainer.restore();
      });

      it("responds with 201 status code and newly created article data if article has been created successfully", async () => {
        const expectedArticle = createArticle();
        const requestBody = {
          article: {
            ...expectedArticle,
            id: undefined,
            createdAt: undefined,
          },
        };
        const expectedResponseBody = {
          article: { ...expectedArticle, createdAt: expectedArticle.createdAt.toISOString() },
        };
        const articlesRepositoryStub = {
          fetchOneById: jest.fn(),
          create: jest.fn(),
        };
        iocContainer.rebind<ArticlesRepository>("ArticlesRepository").toConstantValue(articlesRepositoryStub);

        articlesRepositoryStub.create.mockResolvedValue(expectedArticle);

        const response = await request
          .post("/article")
          .set("Authorization", getAuthToken(expectedArticle.id))
          .send(requestBody);

        expect(response.body).toEqual(expectedResponseBody);
        expect(response.statusCode).toEqual(201);
        expect(articlesRepositoryStub.create).toHaveBeenCalledWith(requestBody.article);
      });
    });
  });

  describe("GET /article/{id}", () => {
    it("responds with 200 status code and article data if article exists in database", async () => {
      const article = await getArticlesRepository().create(createArticle());
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
