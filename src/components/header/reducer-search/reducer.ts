import { SearchAction, SearchTypes } from "../types/Index";

interface SearchState {
  searchChange: string;
}

const initialState: SearchState = {
  searchChange: "",
};

export const searchChangeReducer = (
  state = initialState,
  action: SearchAction
):SearchState => {
  switch (action.type) {
    case SearchTypes.SERACH_CHANGE:
      return { ...state, searchChange: action.payload };
    default:
      return state;
  }
};
