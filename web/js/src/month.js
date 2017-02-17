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

        if (!this._selectionInProgress)
            return

        const {rangeLimit} = this.props
        const dateLimit = subDays(this._selectionStart, rangeLimit)

        if (!isEqual(date, this._selectionEnd)) {
            if (!rangeLimit || rangeLimit && !isBefore(date, dateLimit)) {
                this._selectionEnd = date
                this._pushUpdate()
            }
        }
    }

    _onDayClick(date) {
        const {mode} = this.props
//        if (mode === RANGE_MODE) {
//            if (this._selectionInProgress) {
//                this._selectionInProgress = false
//                this._selectionEnd = date
//            } else {
//                this._selectionInProgress = true
//                this._selectionStart = date
//                this._selectionEnd = date
//            }
//        } else if (mode === SINGLE_MODE) {
//            this._selectionInProgress = false
//            this._selectionStart = date
//            this._selectionEnd = date
//        } else {
//            return
//        }
//        this._pushUpdate()
    }

    _pushUpdate() {
        const {onChange, rangeLimit} = this.props
        let start, end

        if (isBefore(this._selectionStart, this._selectionEnd)) {
            start = this._selectionStart
            end = this._selectionEnd
        } else {
            start = this._selectionEnd
            end = this._selectionStart
        }

        if (rangeLimit && rangeLimit < differenceInCalendarDays(end, start)) {
            end = addDays(start, rangeLimit)
        }

        return onChange({
            start,
            end,
            inProgress: this._selectionInProgress
        })
    }

    render() {
        //const {blockClassName} = this.props
        return (
                <table className='callendar-month'>
                
                    {this.renderWeekDays()}
                
                    {this.renderWeeks()}
                </table>
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
            selectedMin,
            selectedMax,
            highlightedStart,
            highlightedEnd,
            activeMonth,
            today,
            blockClassName,
            minNumberOfWeeks,
            rangeLimit,
            onDayHover
        } = this.props
        const weeks = []
        let {minDate, maxDate} = this.props
        let date = startOfWeek(startOfMonth(activeMonth), {weekStartsOn: 1})
        const endDate = endOfWeek(endOfMonth(activeMonth), {weekStartsOn: 1})

        if (this._selectionInProgress && rangeLimit) {
            minDate = this._getMinDate()
            maxDate = this._getMaxDate()
        }

        while ((typeof minNumberOfWeeks == 'number' && minNumberOfWeeks > weeks.length)
                || (isBefore(date, endDate) || isSameDay(date, endDate))) {
            weeks.push(date)
            date = addDays(date, 7)
        }

        weeks.map((week) => {
            console.log(week);
        })



        return weeks.map((week) => {
            return (
                    <Week
                        key={week.getTime()}
                        date={week}
                        minDate={minDate}
                        maxDate={maxDate}
                        selectedMin={selectedMin}
                        selectedMax={selectedMax}
                        highlightedStart={highlightedStart}
                        highlightedEnd={highlightedEnd}
                        activeMonth={activeMonth}
                        onDayHover={onDayHover}
                        onDayClick={this._onDayClick.bind(this)}
                        onDayMouseMove={this._onDayMouseMove.bind(this)}
                        today={today}
                        blockClassName={blockClassName}
                        />
                    )
        })
    }

}

