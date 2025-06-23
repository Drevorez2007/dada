class TicketsService {
  _baseUrl = 'https://aviasales-test-api.kata.academy';
  searchId = null;
  _maxRetries = 3;

  getSearchId = async () => {
    const res = await fetch(`${this._baseUrl}/search`);
    if (!res.ok) throw new Error('Failed to get searchId');
    const data = await res.json();
    this.searchId = data.searchId;
    return this.searchId;
  };

  getTickets = async () => {
    if (!this.searchId) {
      await this.getSearchId();
    }

    const url = new URL(`${this._baseUrl}/tickets`);
    url.searchParams.set('searchId', this.searchId);

    const fetchTicketsRecursively = async (retryCount = 0) => {
      const res = await fetch(url);
      if (!res.ok) {
        if (retryCount < this._maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return fetchTicketsRecursively(retryCount + 1);
        } else {
          throw new Error('Server error 500');
        }
      }
      const data = await res.json();

      if (!data.stop) {
        await fetchTicketsRecursively(0);
      }

      return data.tickets;
    };

    return fetchTicketsRecursively();
  };
}

export default new TicketsService();
