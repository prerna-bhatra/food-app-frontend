// src/actions/addressActions.ts
export const SET_ADDRESSES = 'SET_ADDRESSES';

export interface Address {
  addressType: string;
  googleAddress: string;
  id: number;
  landMark: string;
  receiverContact: string;
  houseName: string;
  longitude: number;
  latitude: number;
  area: string;
}

interface SetAddressesAction {
  type: typeof SET_ADDRESSES;
  payload: Address[];
}

export type AddressActionTypes = SetAddressesAction;

export const setAddressesAction = (addresses: any) => ({
  type: SET_ADDRESSES,
  payload: addresses,
});
