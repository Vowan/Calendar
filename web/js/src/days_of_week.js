import React from 'react';
import classnames from 'classnames';


const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default class DaysOfWeek extends React.Component {
  
  render() {
   
    return (
      <tr className='days_of_week'>
        {daysOfWeek.map((day, index) => {
          return (
            <td
              className={classnames('days_of_week_day', {
                'info': index > 4 // 4 is an index of Friday
              })}
              key={day}
            >
              {day}
            </td>
          )
        })}
      </tr>
    );
  }
}

