import { sign } from "jsonwebtoken";
import config from "config";

export const getAuthToken = (uuid: string) => {
  return `Bearer ${sign({ uuid }, config.get("authSecret"))}`;
};
