import { SearchAction, SearchState, SearchTypes } from "../types/Index";

export const searchResult = (payload: SearchState): SearchAction => {
  return { type: SearchTypes.SERACH_CHANGE, payload };
};
