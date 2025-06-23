const filterFlights = (flights = [], stops) => {
  return flights.filter((flight) => {
    const stopsLength = flight.segments.reduce(
      (totalStops, segment) => totalStops + segment.stops.length,
      0
    );
    return (
      (stops.noStops && stopsLength === 0) ||
      (stops.oneStop && stopsLength === 1) ||
      (stops.twoStops && stopsLength === 2) ||
      (stops.threeStops && stopsLength === 3)
    );
  });
};

export default filterFlights;
