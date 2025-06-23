import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './features/filterSlice';
import sortReducer from './features/sortSlice';
import ticketsReducer from './features/ticketsSlice';
import checkboxReducer from './features/checkboxSlice';  

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer,
    tickets: ticketsReducer,
    checkbox: checkboxReducer, 
  },
});
