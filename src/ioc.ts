import { Container, decorate, injectable } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from "tsoa";
import { ArticleRepository } from "./api/articles/ArticlesRepository";
import { ArticlesRepositoryInMemory } from "./api/articles/ArticlesRepositoryInMemory";

const iocContainer = new Container();

decorate(injectable(), Controller);

iocContainer.load(buildProviderModule());

const inMemoryArticleRepository = new ArticlesRepositoryInMemory();
iocContainer.bind<ArticleRepository>("ArticlesRepository").toDynamicValue(() => inMemoryArticleRepository);

export { iocContainer };
