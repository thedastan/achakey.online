export const enum UserTypes {
  USER = "USER",
  USER_DETAILS = "USER_DETAILS",
  LOADING_USER = "LOADING_USER",
  ERROR_USER = "ERROR_USER",
}

export interface UserDetails {
  id?: string;
  email?: string;
  phone?: string;
}

export interface UserState {
  loading: boolean;
  user: UserDetails[];
  userDetails: UserDetails;
  error: any | string;
}

interface ActionUsers {
  type: UserTypes.USER;
  payload: UserDetails[];
}

interface ActionUserDetails {
  type: UserTypes.USER_DETAILS;
  payload: UserDetails;
}
interface ActionUserLoading {
  type: UserTypes.LOADING_USER;
}

interface ActionErrorUser {
  type: UserTypes.ERROR_USER;
  payload: any | string;
}

export type ActionUser =
  | ActionUsers
  | ActionUserDetails
  | ActionUserLoading
  | ActionErrorUser;
