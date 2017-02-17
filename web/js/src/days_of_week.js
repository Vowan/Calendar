import React from 'react';
import classnames from 'classnames';

//import {BLOCK_CLASS_NAME} from './consts'

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default class DaysOfWeek extends React.Component {
  
  render() {
    const {blockClassName} = this.props;
    return (
      <thead className={`${blockClassName}-days_of_week`}>
        {daysOfWeek.map((day, index) => {
          return (
            <th
              className={classnames(`${blockClassName}-days_of_week_day`, {
                'is-weekend': index > 4 // 4 is an index of Friday
              })}
              key={day}
            >
              {day}
            </th>
          )
        })}
      </thead>
    );
  }
}

DaysOfWeek.propTypes = {
    blockClassName: React.PropTypes.string
};

// Specifies the default values for props:
DaysOfWeek.defaultProps = {
    blockClassName:  "qqqqq"// BLOCK_CLASS_NAME
};