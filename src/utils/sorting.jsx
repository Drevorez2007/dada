export const sortFlights = (flights, filter) => {
  return flights.slice().sort((a, b) => {
    if (filter === 'cheapest') {
      return a.price - b.price;
    } else if (filter === 'shortest') {
      const durationA = a.segments.reduce(
        (sum, segment) => sum + segment.duration,
        0
      );
      const durationB = b.segments.reduce(
        (sum, segment) => sum + segment.duration,
        0
      );
      return durationA - durationB;
    }
    return 0;
  });
};

export default sortFlights;
