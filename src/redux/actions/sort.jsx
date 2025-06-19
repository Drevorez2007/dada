export const CHEAPEST_FILTER = 'filter/cheapest';
export const SHORTEST_FILTER = 'filter/shortest';
export const RESET_FILTER = 'filter/reset';

export const cheapest = () => ({
  type: CHEAPEST_FILTER,
});

export const shortest = () => ({
  type: SHORTEST_FILTER,
});

export const resetFilter = () => ({
  type: RESET_FILTER,
});
