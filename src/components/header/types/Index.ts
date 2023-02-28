export enum SearchTypes {
  SERACH_CHANGE = "SERACH_CHANGE",
}

interface SearchChangeAction {
  type: SearchTypes.SERACH_CHANGE;
  payload: string;
}

export type SearchAction = SearchChangeAction;
