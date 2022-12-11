import { Article, NewArticle } from "../../src/api/articles/Article";
import { ArticlesRepositoryInMemory } from "../../src/api/articles/ArticlesRepositoryInMemory";
import { createArticle } from "../helpers/createArticle";

const getRepository = () => new ArticlesRepositoryInMemory();

describe("ArticlesRepositoryInMemory", () => {
  describe("create", () => {
    it("stores a NewArticle in the memory and returns Article with newly generated id and actual createdAt date", async () => {
      const newArticle: NewArticle = createArticle({
        id: undefined,
        createdAt: undefined,
      });
      const expectedArticle: Article = {
        ...newArticle,
        id: expect.anything(),
        createdAt: expect.anything(),
      };

      const actual = await getRepository().create(newArticle);

      expect(actual).toEqual(expectedArticle);
      expect(typeof actual.id).toBe("string");
      expect(actual.createdAt).toBeInstanceOf(Date);
      expect(new Date().getTime() - actual.createdAt.getTime()).toBeLessThan(1000);
    });
  });

  describe("fetchOneById", () => {
    it("returns undefined if there is no article with given id in the memory", async () => {
      const actual = await getRepository().fetchOneById("non-existent");

      expect(actual).toBeUndefined();
    });

    it("returns an article if there is an article with given id in the memory", async () => {
      const repository = getRepository();
      const newArticle: NewArticle = createArticle({ id: undefined, createdAt: undefined });
      const expectedArticle = await repository.create(newArticle);

      const actualArticle = await repository.fetchOneById(expectedArticle.id);

      expect(actualArticle).toEqual(expectedArticle);
    });
  });
});
