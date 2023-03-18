import {
  IForms,
  IFormsTypes,
  IStateEnterSequirityCode,
} from "../../formInterfaces";

export const initialState = {
  sequirityCode: {},
  loading: false,
  error: "",
} as IStateEnterSequirityCode;

export const reducerEnterSequirity = (state = initialState, action: IForms) => {
  switch (action.type) {
    case IFormsTypes.LOADING_SEQUIRITY_CODE: {
      return { ...state, loading: true };
    }
    case IFormsTypes.ENTER_SEQUIRITY_CODE: {
      return { ...state, sequirityCode: action.payload, loading: false };
    }
    case IFormsTypes.ERROR_USER: {
      return { ...state, error: action.payload, loading: false };
    }
    default: {
      return state;
    }
  }
};
