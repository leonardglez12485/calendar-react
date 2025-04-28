import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice } from './';
import { authSlice } from './auth/authSlice';

export const store = configureStore({
  reducer: {
    ui:       uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth:     authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});