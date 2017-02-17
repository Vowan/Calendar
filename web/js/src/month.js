var React = require('react');

import DaysOfWeek from "./days_of_week.js";
import Week from "./week.js";


import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import isBefore from 'date-fns/is_before';
import isEqual from 'date-fns/is_equal';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import isSameDay from 'date-fns/is_same_day';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

export default class Month extends React.Component {

    _onDayMouseMove(date) {
        const {onDayHover} = this.props
        if (onDayHover) {
            onDayHover(date)
        }


    }

    _onDayClick(date) {
        const {mode} = this.props



    }

   
    render() {
        //const {blockClassName} = this.props
        return (
                <tbody className='callendar-month'>
                
                    {this.renderWeekDays()}
                
                    {this.renderWeeks()}
                </tbody>
                )
    }

    renderWeekDays() {
        const {blockClassName, disableDaysOfWeek} = this.props
        if (disableDaysOfWeek)
            return null

        return <DaysOfWeek blockClassName={blockClassName} />
    }

    renderWeeks() {
        const {
            activeMonth,
            today,
            onDayHover
        } = this.props
        const weeks = []

        let date = startOfWeek(startOfMonth(activeMonth), {weekStartsOn: 1})
        const endDate = endOfWeek(endOfMonth(activeMonth), {weekStartsOn: 1})


        while (isBefore(date, endDate) || isSameDay(date, endDate)) {
            weeks.push(date)
            date = addDays(date, 7)
        }


        return weeks.map((week) => {
            return (
                    <Week
                        key={week.getTime()}
                        date={week}
                    
                        activeMonth={activeMonth}
                        onDayHover={onDayHover}
                        onDayClick={this._onDayClick.bind(this)}
                        onDayMouseMove={this._onDayMouseMove.bind(this)}
                        today={today}
                    
                        />
                    )
        })
    }

}

