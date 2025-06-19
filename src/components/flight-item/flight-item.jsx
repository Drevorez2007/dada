import React from 'react';
import InfoFlightItem from '../info-flight-Item';
import classes from './flight-item.module.scss';
import PropTypes from 'prop-types';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const formatDuration = (minutes) => {
  if (isNaN(minutes) || minutes < 0) {
    return 'Invalid input';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hoursText = hours > 0 ? `${hours}ч ` : '';
  const minutesText = remainingMinutes > 0 ? `${remainingMinutes}м` : '';

  return `${hoursText}${minutesText}`;
};

const formatTime = (dateTimeString, minutesOffset = 0) => {
  const dateObject = new Date(dateTimeString);
  const adjustedDateObject = new Date(
    dateObject.getTime() + minutesOffset * 60 * 1000
  );

  const hours = adjustedDateObject.getUTCHours();
  const minutes = adjustedDateObject.getUTCMinutes();

  return `${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
};

const FlightItem = ({ price, carrier, segments }) => {
  const departureTimeSegment0 = segments[0].date;
  const departureTimeSegment1 = segments[1].date;

  const arrivalTimeSegment0 = formatTime(
    departureTimeSegment0,
    segments[0].duration
  );
  const arrivalTimeSegment1 = formatTime(
    departureTimeSegment1,
    segments[1].duration
  );

  return (
    <li>
      <div className={classes.item_inner}>
        <div className={classes.top_content}>
          <span className={classes.price}>{formatPrice(price)} Р</span>
          <span className={classes.company_logo}>
            <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="" />
          </span>
        </div>
        <div className={classes.bottom_content}>
          <div>
            <InfoFlightItem
              keyText={`${segments[0].origin} - ${segments[0].destination}`}
              valueText={`${formatTime(
                departureTimeSegment0
              )} – ${arrivalTimeSegment0}`}
            />
            <InfoFlightItem
              keyText={`${segments[1].origin} - ${segments[1].destination}`}
              valueText={`${formatTime(
                departureTimeSegment1
              )} – ${arrivalTimeSegment1}`}
            />
          </div>
          <div>
            <InfoFlightItem
              keyText="В пути"
              valueText={formatDuration(segments[0].duration)}
            />
            <InfoFlightItem
              keyText="В пути"
              valueText={formatDuration(segments[1].duration)}
            />
          </div>
          <div>
            <InfoFlightItem
              keyText={`${segments[0].stops.length} пересад${getPluralSuffix(
                segments[0].stops.length
              )}`}
              valueText={
                segments[0].stops.length > 0 ? segments[0].stops.join(', ') : ''
              }
            />
            <InfoFlightItem
              keyText={`${segments[1].stops.length} пересад${getPluralSuffix(
                segments[1].stops.length
              )}`}
              valueText={
                segments[1].stops.length > 0 ? segments[1].stops.join(', ') : ''
              }
            />
          </div>
        </div>
      </div>
    </li>
  );
};

const getPluralSuffix = (count) => {
  if (count === 1) {
    return 'ка';
  } else if (count === 1 || (count > 1 && count < 5)) {
    return 'ки';
  } else {
    return 'ок';
  }
};

export default FlightItem;

FlightItem.propTypes = {
  price: PropTypes.number,
  carrier: PropTypes.string,
  segments: PropTypes.array,
};
