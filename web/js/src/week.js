import React from 'react';
import classnames from 'classnames';

import Day from './day.js';
//import {BLOCK_CLASS_NAME} from './consts'

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
    
    _dateSelectable(date) {
        const {minDate, maxDate} = this.props
        if (minDate && maxDate) {
            return isWithinRange(date, minDate, maxDate)
        } else if (minDate && !maxDate) {
            return isAfter(date, minDate) || isEqual(date, minDate)
        } else if (maxDate && !minDate) {
            return isBefore(date, maxDate) || isEqual(date, maxDate)
        } else {
            return true
        }
    }

    _dateSelected(date) {
        const {selectedMin, selectedMax} = this.props
        return (selectedMin && selectedMax)
                && isWithinRange(
                        startOfDay(date),
                        startOfDay(selectedMin),
                        startOfDay(selectedMax)
                        )
    }

    _dateHighlighted(date) {
        const {highlightedStart, highlightedEnd} = this.props
        if (!highlightedStart || !highlightedEnd)
            return false

        return isWithinRange(
                startOfDay(date),
                startOfDay(highlightedStart),
                startOfDay(highlightedEnd)
                )
    }

    _dateClasses(date) {
        const {today, activeMonth, selectedMax, selectedMin} = this.props

        return classnames({
            'is-selected': this._dateSelected(date),
            'is-highlighted': this._dateHighlighted(date),
            'is-today': isSameDay(today, date),
            'is-current_month': isSameMonth(date, activeMonth),
            'is-start_selection': selectedMin && isSameDay(selectedMin, date),
            'is-end_selection': selectedMax && isSameDay(selectedMax, date),
            'is-prev_month': (date.getMonth() !== activeMonth.getMonth() && isBefore(date, activeMonth)),
            'is-next_month': (date.getMonth() !== activeMonth.getMonth() && isAfter(date, activeMonth)),
            [isWeekend(date) ? 'is-weekend' : 'is-working_day']: true,
            [this._dateSelectable(date) ? 'is-selectable' : 'is-not_selectable']: true
        })
    }

    render() {
        return (
                <tr className={`${this.props.blockClassName}-week`}>
                    {this._renderDays()}
                </tr>
                )
    }

    _renderDays() {
        
       // console.log(this.props);
        // console.log(this.props['data']);
        
        const {date, today, onDayClick, onDayMouseMove, blockClassName} = this.props;
        
       // console.log(date);
        
        const startDate = startOfWeek(date, {weekStartsOn: 1});
        const endDate = endOfWeek(date, {weekStartsOn: 1});
        return eachDay(startDate, endDate).map((day) => {
            const data = this.props.data[format(day, 'YYYY-MM-DD')]
            const selectable = this._dateSelectable(day)
            return (
                    <Day
                        blockClassName={blockClassName}
                        key={day.getTime()}
                        date={day}
                        data={data}
                        className={this._dateClasses(day, data)}
                        today={today}
                        onClick={selectable ? onDayClick : null}
                        onMouseMove={selectable ? onDayMouseMove : null}
                        />
                    )
        })
    }
}


Week.propTypes = {
    activeMonth: React.PropTypes.instanceOf(Date).isRequired,
    blockClassName: React.PropTypes.string,
    data: React.PropTypes.object,
    date: React.PropTypes.instanceOf(Date).isRequired,
    highlightedEnd: React.PropTypes.instanceOf(Date),
    highlightedStart: React.PropTypes.instanceOf(Date),
    maxDate: React.PropTypes.instanceOf(Date),
    minDate: React.PropTypes.instanceOf(Date),
    onDayClick: React.PropTypes.func.isRequired,
    onDayMouseMove: React.PropTypes.func.isRequired,
    selectedMax: React.PropTypes.instanceOf(Date),
    selectedMin: React.PropTypes.instanceOf(Date),
    today: React.PropTypes.instanceOf(Date).isRequired
};

// Specifies the default values for props:
Week.defaultProps = {
    data: {},
    blockClassName: 'week'// BLOCK_CLASS_NAME

};