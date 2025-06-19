const initialState = {
  searchId: null,
  tickets: [],
  loading: true,
  displayCount: 5,
  allTicketsLoaded: false,
  totalExpectedTickets: 7001, // 7729
  error: null,
};

export const areAllTicketsLoaded = (state) => state.tickets.allTicketsLoaded;

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'tickets/recieve-searchId':
      return {
        ...state,
        searchId: action.payload,
      };
    case 'tickets/recieve-tickets': {
      if (action.error) {
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      }

      const updatedTickets = [...state.tickets, ...action.payload];
      return {
        ...state,
        tickets: updatedTickets,
        loading: false,
        allTicketsLoaded: updatedTickets.length >= state.totalExpectedTickets,
        error: null,
      };
    }
    case 'tickets/update-display-count':
      return {
        ...state,
        displayCount: state.displayCount + action.payload,
      };
    case 'tickets/error':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ticketsReducer;
