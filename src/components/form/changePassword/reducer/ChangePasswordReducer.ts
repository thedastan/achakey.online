import {
  IForms,
  IFormsTypes,
  IStateChangePassword,
} from "../../formInterfaces";

const initialState = {
  loading: false,
  changePass: {},
  errorChangePassword: "",
} as IStateChangePassword;

export const reducerChangePassword = (state = initialState, action: IForms) => {
  switch (action.type) {
    case IFormsTypes.LOADING_CHANGE_PASSWORD: {
      return { ...state, loading: true };
    }
    case IFormsTypes.CHANGE_PASSWORD: {
      return {
        ...state,
        changePass: action.payload,
        errorChangePassword: "",
        loading: false,
      };
    }
    case IFormsTypes.ERROR_CHANGE_PASSWORD: {
      return { ...state, errorChangePassword: action.payload, loading: false };
    }
    default: {
      return state;
    }
  }
};
