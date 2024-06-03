// src/reducers/addressReducer.ts
import { SET_ADDRESSES, AddressActionTypes, Address } from '../actions/addressActions';

interface AddressState {
  addresses: Address[];
}

const initialState: AddressState = {
  addresses: [],
};

const addressReducer = (state = initialState, action: AddressActionTypes): AddressState => {
  switch (action.type) {
    case SET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
