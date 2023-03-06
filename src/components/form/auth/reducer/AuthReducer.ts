import { IForms, IFormsTypes, IStateAuth } from "../../formInterfaces";

const initialState = {
  loading: false,
  error: "",
  authUser: {},
} as IStateAuth;

export const reducerAuth = (state = initialState, action: IForms) => {
  switch (action.type) {
    case IFormsTypes.LOADING_USER: {
      return { ...state, loading: true };
    }
    case IFormsTypes.LOGIN_USER: {
      return { ...state, authUser: action.payload, loading: false };
    }
    case IFormsTypes.ERROR_USER: {
      return { ...state, error: action.payload, loading: false };
    }
    default:
      return state;
  }
};
