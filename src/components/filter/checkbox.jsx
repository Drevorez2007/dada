import classes from './filter.module.scss';
import PropTypes from 'prop-types';

export default function Checkbox({ children, checked, onChange }) {
  return (
    <label>
      <input
        checked={checked}
        className={classes.check_input}
        type="checkbox"
        onChange={onChange}
      />
      <span className={classes.check_box}></span>
      {children}
    </label>
  );
}

Checkbox.propTypes = {
  children: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
