import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  noStopsChecked: true,
  oneStopChecked: true,
  twoStopsChecked: true,
  threeStopsChecked: true,
};

const checkboxSlice = createSlice({
  name: 'checkbox',
  initialState,
  reducers: {
    allChecked(state) {
      const allCheckedNow =
        state.noStopsChecked &&
        state.oneStopChecked &&
        state.twoStopsChecked &&
        state.threeStopsChecked;

      const newValue = !allCheckedNow;

      state.noStopsChecked = newValue;
      state.oneStopChecked = newValue;
      state.twoStopsChecked = newValue;
      state.threeStopsChecked = newValue;
    },
    noStopsChecked(state) {
      state.noStopsChecked = !state.noStopsChecked;
    },
    oneStopChecked(state) {
      state.oneStopChecked = !state.oneStopChecked;
    },
    twoStopChecked(state) {
      state.twoStopsChecked = !state.twoStopsChecked;
    },
    threeStopChecked(state) {
      state.threeStopsChecked = !state.threeStopsChecked;
    },
  },
});

export const {
  allChecked,
  noStopsChecked,
  oneStopChecked,
  twoStopChecked,
  threeStopChecked,
} = checkboxSlice.actions;

export default checkboxSlice.reducer;
