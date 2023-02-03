import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamPApi, shazam8Api } from './services/shazamCore'; 

export const store = configureStore({
  reducer: {
    [shazamPApi.reducerPath]: shazamPApi.reducer,
    [shazam8Api.reducerPath]: shazam8Api.reducer,
    player: playerReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(shazamPApi.middleware),
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(shazam8Api.middleware),
});
