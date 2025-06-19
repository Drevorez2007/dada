import {
  CHEAPEST_FILTER,
  SHORTEST_FILTER,
  RESET_FILTER,
} from '../actions/sort';

const initialState = {
  filter: null,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHEAPEST_FILTER:
      return {
        filter: 'cheapest',
      };
    case SHORTEST_FILTER:
      return {
        filter: 'shortest',
      };
    case RESET_FILTER:
      return { filter: null };

    default:
      return state;
  }
};

export default filterReducer;
