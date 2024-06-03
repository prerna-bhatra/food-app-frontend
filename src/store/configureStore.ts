import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../reducers/authReducer';
import addressReducer from '../reducers/addressReducer';

const rootReducer:any = combineReducers({
  auth: authReducer,
  address: addressReducer, // Add address reducer to the root reducer

});

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can whitelist or blacklist reducers to persist
  // whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
