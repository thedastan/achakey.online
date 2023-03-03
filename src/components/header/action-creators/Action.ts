import { SearchAction, SearchTypes } from "../types/Index";

export const searchResult = (payload: string): SearchAction => {
  return { type: SearchTypes.SERACH_CHANGE, payload };
};
