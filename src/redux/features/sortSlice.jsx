import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sort: 'cheapest', 
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    cheapest(state) {
      state.sort = 'cheapest';
    },
    shortest(state) {
      state.sort = 'shortest';
    },
    resetFilter(state) {
      state.sort = 'cheapest'; 
    },
  },
});

export const { cheapest, shortest, resetFilter } = sortSlice.actions;
export default sortSlice.reducer;
