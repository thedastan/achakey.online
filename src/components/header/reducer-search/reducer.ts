import { SearchAction, SearchState, SearchTypes } from "../types/Index";

const initialState: SearchState = {
  searchChange: "",
};

export const searchReducer = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case SearchTypes.SERACH_CHANGE:
      return { ...state, searchChange: action.payload };

    default:
      return state;
  }
};
