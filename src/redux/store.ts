import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers/combineReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Storage Method (React Native)
  // whitelist: ['userReducer'], // Whitelist (Save Specific Reducers)
  // blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
console.log('* Store at startup:', store.getState());

const persistor = persistStore(store )
export { store, persistor };

//
