// reducers/authReducer.ts
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT  } from '../actions/authActions';

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
  console.log({action , state});
  
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
