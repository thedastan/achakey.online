import { IForms, IFormsTypes, IStateRegister } from "../../formInterfaces";

const initialState = {
  loading: false,
  error: "",
  registerUser: {},
  validateRegister: {},
} as IStateRegister;

export const registerReducer = (state = initialState, action: IForms) => {
  switch (action.type) {
    case IFormsTypes.LOADING_REGISTER: {
      return { ...state, loading: true };
    }
    case IFormsTypes.VALIDATE_REGISTER: {
      return { ...state, validateRegister: action.payload };
    }
    case IFormsTypes.REGISTER_USER: {
      return {
        ...state,
        registerUser: action.payload,
        loading: false,
        errorEmail: "",
        errorPhone: "",
      };
    }
    case IFormsTypes.ERROR_USER: {
      return { ...state, error: action.payload, loading: false };
    }
    default:
      return state;
  }
};
