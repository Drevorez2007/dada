import React, { useEffect, useMemo, useState } from 'react';
import FlightItem from '../flight-item';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Spin, Anchor, message } from 'antd';
import classes from './flight-list.module.scss';

import filterFlights from '../../utils/filtering';
import sortFlights from '../../utils/sorting';

import { fetchTickets } from '../../redux/actions/tickets';

export default function FlightList() {
  const [displayedTicketsCount, setDisplayedTicketsCount] = useState(5);
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.tickets.loading);
  const currentFilter = useSelector((state) => state.filter.filter);
  const tickets = useSelector((state) => state.tickets.tickets);

  const stops = {
    noStops: useSelector((store) => store.checkbox.noStopsChecked),
    oneStop: useSelector((store) => store.checkbox.oneStopChecked),
    twoStops: useSelector((store) => store.checkbox.twoStopsChecked),
    threeStops: useSelector((store) => store.checkbox.threeStopsChecked),
  };
  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const error = useSelector((state) => state.tickets.error);
  const allTicketsLoaded = useSelector(
    (state) => state.tickets.allTicketsLoaded
  );

  const showMessage = (error) => {
    message.error(error);
  };
  useEffect(() => {
    if (error) {
      showMessage(error);
    }
  }, [error]);

  const handleShowMore = () => {
    setDisplayedTicketsCount((prevCount) => prevCount + 5);
  };
  const filteredTickets = useMemo(() => {
    return filterFlights(tickets, stops);
  }, [stops, tickets]);

  const sortedTickets = useMemo(() => {
    return sortFlights(filteredTickets, currentFilter);
  }, [currentFilter, filteredTickets]);

  return (
    <section>
      <Anchor />
      {!allTicketsLoaded && !error && (
        <div className={classes['loading-field']}>
          <Spin></Spin> <span>Загрузка билетов</span>
        </div>
      )}
      {!loading && filteredTickets.length === 0 ? (
        <Alert
          className={classes['filter-info']}
          showIcon={true}
          defaultPadding={'8px 12px'}
          message={`Рейсов, подходящих под заданные фильтры, не найдено`}
        ></Alert>
      ) : loading ? (
        <div className={classes['loading-wrapper']}>
          <Spin size={'large'} />
        </div>
      ) : (
        <ul>
          {sortedTickets.slice(0, displayedTicketsCount).map((flight) => (
            <FlightItem
              key={`${flight.price}${flight.carrier}${flight.segments[0].date}${flight.segments[0].duration}`}
              price={flight.price}
              carrier={flight.carrier}
              segments={flight.segments}
            />
          ))}
          {displayedTicketsCount < sortedTickets.length && (
            <Button onClick={handleShowMore}>Показать еще 5 билетов</Button>
          )}
        </ul>
      )}
    </section>
  );
}
