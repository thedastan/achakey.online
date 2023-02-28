export interface SearchState {
  searchChange: string;
}

export enum SearchTypes {
  SERACH_CHANGE = "SERACH_CHANGE",
}

interface SearchChangeAction {
  type: SearchTypes.SERACH_CHANGE;
  payload: SearchState;
}

export type SearchAction = SearchChangeAction;
