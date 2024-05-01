// actions/authActions.ts
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';


interface IUserInfo {
  name: string,
  userType: string,
  email: string
}

export const loginRequest = (token: string, userInfo?: IUserInfo) => ({
  type: LOGIN_REQUEST,
  payload: { token, userInfo }
});

export const loginSuccess = (user: any) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error
});


export const logout = () => ({
  type: LOGOUT,
});

