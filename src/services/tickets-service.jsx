class TicketsService {
  _baseUrl = 'https://aviasales-test-api.kata.academy';
  searchId = null;
  _maxRetries = 3;

  getSearchId = async () => {
    try {
      const res = await fetch(`${this._baseUrl}/search`);
      const data = await res.json();
      this.searchId = data.searchId;
      return this.searchId;
    } catch (error) {
      console.error('Error while fetching searchId:', error);
      throw error;
    }
  };

  getTickets = async (dispatch) => {
    try {
      if (!this.searchId) {
        await this.getSearchId();
      }

      const url = new URL(`${this._baseUrl}/tickets`);
      url.searchParams.set('searchId', this.searchId);

      const fetchTicketsRecursively = async (retryCount = 0) => {
        try {
          const ticketsResponse = await fetch(url);
          const ticketsData = await ticketsResponse.json();

          dispatch({
            type: 'tickets/recieve-tickets',
            payload: ticketsData.tickets,
          });

          if (ticketsResponse.status === 500) {
            if (retryCount < this._maxRetries) {
              setTimeout(() => fetchTicketsRecursively(retryCount + 1), 1000);
              return;
            } else {
              dispatch({
                type: 'tickets/error',
              });
              return;
            }
          }

          if (!ticketsData.stop) {
            setTimeout(() => fetchTicketsRecursively(0), 0);
          }
        } catch (error) {
          if (retryCount < this._maxRetries) {
            setTimeout(() => fetchTicketsRecursively(retryCount + 1), 1000);
          } else {
            dispatch({
              type: 'tickets/error',
              payload: `Ошибка при получении данных: ${error}`,
            });
          }
        }
      };

      await fetchTicketsRecursively();
    } catch (error) {
      dispatch({
        type: 'tickets/recieve-searchId',
        payload: this.searchId,
      });
      dispatch({
        type: 'tickets/recieve-tickets',
        payload: [],
        error: 'Ошибка при получении данных',
      });
      console.error('Error in getTickets:', error);
    }
  };
}

export default new TicketsService();
