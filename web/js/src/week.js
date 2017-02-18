import React from 'react';
import classnames from 'classnames';

import Day from './day.js';


import eachDay from 'date-fns/each_day';
import startOfDay from 'date-fns/start_of_day';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import isWithinRange from 'date-fns/is_within_range';
import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';
import isWeekend from 'date-fns/is_weekend';
import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';

export default class Week extends React.Component {

    constructor(props) {
        super(props);

    }

    

    _dateSelected(date) {
        const {startDate, endDate} = this.props
        
        if(isAfter(startDate, endDate)){
            return false;
        }

        return (startDate && endDate)
                && isWithinRange(
                        startOfDay(date),
                        startOfDay(startDate),
                        startOfDay(endDate)
                        )
    }

    _dateClasses(date) {
        const {today, activeMonth} = this.props

        return classnames({
            'danger': this._dateSelected(date) && !isSameDay(today, date),
            'warning': isSameMonth(date, activeMonth) && !isSameDay(today, date),
            'success': isSameDay(today, date),

            'is-prev_month': (date.getMonth() !== activeMonth.getMonth() && isBefore(date, activeMonth)),
            'is-next_month': (date.getMonth() !== activeMonth.getMonth() && isAfter(date, activeMonth)),
            [isWeekend(date) ? 'is-weekend' : 'is-working_day']: true,

        })
    }

    render() {
        return (
                <tr className='week'>
                    {this._renderDays()}
                </tr>
                )
    }

    _renderDays() {

        // console.log(this.props);
        // console.log(this.props['data']);

        const {date, today, onClick} = this.props;

        // console.log(date);

        const startDate = startOfWeek(date, {weekStartsOn: 1});
        const endDate = endOfWeek(date, {weekStartsOn: 1});
        return eachDay(startDate, endDate).map((day) => {
            
            return (
                    <Day
                       
                        key={day.getTime()}
                        date={day}
                        
                        className={this._dateClasses(day)}
                        today={today}
                        onClick={onClick}
                       
                        />
                    )
        })
    }
}


Week.propTypes = {
    activeMonth: React.PropTypes.instanceOf(Date).isRequired,
    
    date: React.PropTypes.instanceOf(Date).isRequired,

    today: React.PropTypes.instanceOf(Date).isRequired
};

