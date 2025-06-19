import { createAsyncThunk } from '@reduxjs/toolkit';
import ticketsServiceInstance from '../../services/tickets-service';

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { dispatch }) => {
    try {
      await ticketsServiceInstance.getTickets(dispatch);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }
);
