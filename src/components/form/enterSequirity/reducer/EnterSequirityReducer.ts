import {
  IEnterSequirityTypes,
  ISequirityCode,
  IStateEnterSequirityCode,
} from "../EnterSecuirityInterface";

export const initialState = {
  sequirityCode: {},
  loading: false,
  error: "",
} as IStateEnterSequirityCode;

export const reducerEnterSequirity = (
  state = initialState,
  action: ISequirityCode
) => {
  switch (action.type) {
    case IEnterSequirityTypes.LOADING_SEQUIRITY_CODE: {
      return { ...state, loading: true };
    }
    case IEnterSequirityTypes.ENTER_SEQUIRITY_CODE: {
      return {
        ...state,
        sequirityCode: action.payload,
        loading: false,
        error: "",
      };
    }
    case IEnterSequirityTypes.ERROR_SEQUIRITY_CODE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
