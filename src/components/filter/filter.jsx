// import React, { useState } from 'react';
import Checkbox from './checkbox';
// import reducer from '../../redux/reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// import store from './index'

import * as actions from '../../redux/actions/filter';
import classes from './filter.module.scss';

export default function Filter() {
  const dispatch = useDispatch();

  const isNoStops = useSelector((store) => store.checkbox.noStopsChecked);
  const isOneStop = useSelector((store) => store.checkbox.oneStopChecked);
  const isTwoStops = useSelector((store) => store.checkbox.twoStopsChecked);
  const isThreeStops = useSelector((store) => store.checkbox.threeStopsChecked);

  return (
    <aside>
      <h2 className={classes.title}>Количество пересадок</h2>
      <form>
        <Checkbox
          checked={
            isNoStops && isOneStop && isTwoStops && isThreeStops ? true : false
          }
          onChange={() => dispatch(actions.allChecked())}
        >
          Все
        </Checkbox>
        <Checkbox
          checked={isNoStops}
          onChange={() => dispatch(actions.noStopsChecked())}
        >
          Без пересадок
        </Checkbox>
        <Checkbox
          checked={isOneStop}
          onChange={() => dispatch(actions.oneStopChecked())}
        >
          1 пересадка
        </Checkbox>
        <Checkbox
          onChange={() => dispatch(actions.twoStopChecked())}
          checked={isTwoStops}
        >
          2 пересадки
        </Checkbox>
        <Checkbox
          checked={isThreeStops}
          onChange={() => dispatch(actions.threeStopChecked())}
        >
          3 пересадки
        </Checkbox>
      </form>
    </aside>
  );
}
