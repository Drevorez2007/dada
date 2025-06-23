import React, { useEffect, useMemo, useState } from 'react';
import FlightItem from '../flight-item';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Spin, message } from 'antd';
import classes from './flight-list.module.scss';

import filterFlights from '../../utils/filtering';
import sortFlights from '../../utils/sorting';

import { fetchTickets } from '../../redux/features/ticketsSlice';

export default function FlightList() {
  const [displayedTicketsCount, setDisplayedTicketsCount] = useState(5);
  const dispatch = useDispatch();


  const loading = useSelector((state) => state.tickets.loading);
  const tickets = useSelector((state) => state.tickets.items);
  const error = useSelector((state) => state.tickets.error);


  const currentSort = useSelector((state) => state.sort.sort);


  const stops = {
    noStops: useSelector((state) => state.checkbox.noStopsChecked),
    oneStop: useSelector((state) => state.checkbox.oneStopChecked),
    twoStops: useSelector((state) => state.checkbox.twoStopsChecked),
    threeStops: useSelector((state) => state.checkbox.threeStopsChecked),
  };


  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);


  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleShowMore = () => {
    setDisplayedTicketsCount((prev) => prev + 5);
  };


  const filteredTickets = useMemo(() => {
    return filterFlights(tickets, stops);
  }, [tickets, stops]);


  const sortedTickets = useMemo(() => {
    return sortFlights(filteredTickets, currentSort);
  }, [filteredTickets, currentSort]);

  return (
    <section>
      {!loading && filteredTickets.length === 0 ? (
        <Alert
          className={classes['filter-info']}
          showIcon
          message="Рейсов, подходящих под заданные фильтры, не найдено"
        />
      ) : loading ? (
        <div className={classes['loading-wrapper']}>
          <Spin size="large" />
        </div>
      ) : (
<>
  <ul>
    {sortedTickets.slice(0, displayedTicketsCount).map((flight) => (
      <FlightItem
        key={`${flight.price}${flight.carrier}${flight.segments[0].date}${flight.segments[0].duration}`}
        price={flight.price}
        carrier={flight.carrier}
        segments={flight.segments}
      />
    ))}
  </ul>
  {displayedTicketsCount < sortedTickets.length && (
    <div className={classes['show-more-wrapper']}>
      <Button onClick={handleShowMore}>Показать еще 5 билетов</Button>
    </div>
  )}
</>

      )}
    </section>
  );
}
