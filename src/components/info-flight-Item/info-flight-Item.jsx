import React from 'react';
import PropTypes from 'prop-types';

import classes from './info-flight-Item.module.scss';

export default function InfoFlightItem({ keyText, valueText }) {
  return (
    <div className={classes['info-item']}>
      <span className={classes['item-key']}>{keyText}</span>
      <span className={classes['item-value']}>{valueText}</span>
    </div>
  );
}
InfoFlightItem.propTypes = {
  keyText: PropTypes.string,
  valueText: PropTypes.string,
};
