// reducers/authReducer.ts
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, UPDATE_USER_NAME ,SET_GLOBAL_LOCATION  } from '../actions/authActions';

interface LocationState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  error: string | null;
  token:any
}

const initialState: LocationState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  token:null
};

const locationReducer = (state = initialState, action: any): LocationState => {  
  switch (action.type) {
    case SET_GLOBAL_LOCATION:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    default:
      return state;
  }
};

export default locationReducer;
