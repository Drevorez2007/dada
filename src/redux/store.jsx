import { configureStore, combineReducers } from '@reduxjs/toolkit';

import ticketsReducer from './reducer/tickets';
import checkboxReducer from './reducer/filter';
import filterReducer from './reducer/sort';

const rootReducer = combineReducers({
  checkbox: checkboxReducer,
  filter: filterReducer,
  tickets: ticketsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
