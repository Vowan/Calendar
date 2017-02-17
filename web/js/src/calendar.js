var React = require('react');

import MonthHeader from "./month-header.js";
import Month from "./month.js";

import startOfMonth from 'date-fns/start_of_month';
import isSameMonth from 'date-fns/is_same_month';
import isValidDate from 'date-fns/is_valid';

const isValid = function (date) {
    try {
        return isValidDate(date)
    } catch (e) {
        return false
    }
}


export default class Calendar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeMonth: this.initialMonth(props),
            selection: null
        }
    }

    initialMonth(props) {
        const {selected, activeMonth, mode, today} = props || this.props

        if (isValid(activeMonth)) {
            return activeMonth
        } else {
            if (selected) {
                const selectionStart = (mode === SINGLE_MODE ? selected : selected.start)
                if (isValid(selectionStart)) {
                    return startOfMonth(selectionStart)
                }
            }
        }
        return startOfMonth(today || new Date());

    }

    activeMonth() {
        const {onMonthChange, activeMonth} = this.props;
        if (onMonthChange) {
            return activeMonth;
        } else {
            return this.state.activeMonth;
        }
    }

    render() {

        const {
            blockClassName,
            disableDaysOfWeek,
            headerNextArrow,
            headerNextTitle,
            headerPrevArrow,
            headerPrevTitle,
            highlighted,
            maxDate,
            minDate,
            minNumberOfWeeks,
            mode,
            onDayHover,
            rangeLimit
        } = this.props;
        
        console.log(this.activeMonth());

        return (
                <div>
                    <p>Yes I am here </p>
                    
                    <MonthHeader/>
                    <Month
                        activeMonth={this.activeMonth()}
                        />
                </div>
                )
    }
}


