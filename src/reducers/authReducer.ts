// reducers/authReducer.ts
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, UPDATE_USER_NAME  } from '../actions/authActions';

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  error: string | null;
  token:any
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  token:null
};

const authReducer = (state = initialState, action: any): AuthState => {  
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token:action.payload.token,
        user: action.payload.user,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
      case UPDATE_USER_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
      case LOGOUT:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
          token:null,
          user: null,
        };
    default:
      return state;
  }
};

export default authReducer;
