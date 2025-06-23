import React from 'react';
import classes from './tabs.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  cheapest,
  shortest,
  resetFilter,
} from '../../redux/features/sortSlice'; // путь под твой проект

export default function Tabs() {
  const dispatch = useDispatch();
  const currentSort = useSelector((state) => state.sort.sort);

  const handleButtonClick = (sortType) => {
    if (currentSort === sortType) {
      dispatch(resetFilter());
    } else if (sortType === 'cheapest') {
      dispatch(cheapest());
    } else if (sortType === 'shortest') {
      dispatch(shortest());
    }
  };

  return (
    <section className={classes.tabs}>
      <nav>
        <button
          className={
            currentSort === 'cheapest'
              ? `${classes.button} ${classes.active}`
              : classes.button
          }
          onClick={() => handleButtonClick('cheapest')}
        >
          Самый Дешевый
        </button>
        <button
          className={
            currentSort === 'shortest'
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
