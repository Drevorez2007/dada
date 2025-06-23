import { Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  allChecked,
  noStopsChecked,
  oneStopChecked,
  twoStopChecked,
  threeStopChecked,
} from '../../redux/features/checkboxSlice';
import classes from './filter.module.scss';

export default function Filter() {
  const dispatch = useDispatch();

  const isNoStops = useSelector((state) => state.checkbox.noStopsChecked);
  const isOneStop = useSelector((state) => state.checkbox.oneStopChecked);
  const isTwoStops = useSelector((state) => state.checkbox.twoStopsChecked);
  const isThreeStops = useSelector((state) => state.checkbox.threeStopsChecked);

  const allSelected = isNoStops && isOneStop && isTwoStops && isThreeStops;

  const handleAllToggle = () => {
    dispatch(allChecked());
  };

  return (
    <aside className={classes.filter}>
      <h2 className={classes.title}>Количество пересадок</h2>
      <form className={classes.form}>
        <Checkbox checked={allSelected} onChange={handleAllToggle}>
          Все
        </Checkbox>
        <Checkbox
          checked={isNoStops}
          onChange={() => dispatch(noStopsChecked())}
        >
          Без пересадок
        </Checkbox>
        <Checkbox
          checked={isOneStop}
          onChange={() => dispatch(oneStopChecked())}
        >
          1 пересадка
        </Checkbox>
        <Checkbox
          checked={isTwoStops}
          onChange={() => dispatch(twoStopChecked())}
        >
          2 пересадки
        </Checkbox>
        <Checkbox
          checked={isThreeStops}
          onChange={() => dispatch(threeStopChecked())}
        >
          3 пересадки
        </Checkbox>
      </form>
    </aside>
  );
}
