import { interfaces } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done();
};
