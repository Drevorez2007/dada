import React from 'react';
import classes from './tabs.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { cheapest, shortest, resetFilter } from '../../redux/actions/sort';

export default function Tabs() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filter.filter);

  const handleButtonClick = (filter) => {
    if (currentFilter === filter) {
      dispatch(resetFilter());
    } else {
      dispatch(filter === 'cheapest' ? cheapest() : shortest());
    }
  };

  return (
    <section className={classes.tabs}>
      <nav>
        <button
          className={
            currentFilter === 'cheapest'
              ? `${classes.button} ${classes.active}`
              : classes.button
          }
          onClick={() => handleButtonClick('cheapest')}
        >
          Самый Дешевый
        </button>
        <button
          className={
            currentFilter === 'shortest'
              ? `${classes.button} ${classes.active}`
              : classes.button
          }
          onClick={() => handleButtonClick('shortest')}
        >
          Самый быстрый
        </button>
      </nav>
    </section>
  );
}
