// store.ts
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import UserSlice from '../store/slices/UserSlice';
import GoodsSlice from './slices/GoodsSlice';

const persistNoteConfig = {
  key: 'users',
  storage: AsyncStorage,
};

const persistGoodsConfig = {
  key: 'goods',
  storage: AsyncStorage,
};

const persistLoginReducer = persistReducer(persistNoteConfig, UserSlice);
const persistGoodsReducer = persistReducer(persistGoodsConfig, GoodsSlice);

const store = configureStore({
  reducer: {
    login: persistLoginReducer,
    goods: persistGoodsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

declare global {
  type RootState = ReturnType<typeof store.getState>;
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
export default store;
