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
        super(props);
        this.state = {
            activeMonth: this.initialMonth(props),
           
        };

        // This binding is necessary to make `this` work in the callback
        this._switchMonth = this._switchMonth.bind(this);
    }

    _switchMonth(date) {


        const {onMonthChange} = this.props
        if (typeof onMonthChange === 'function') {
            onMonthChange(date)
        } else {
            this.setState({
                activeMonth: date
            })
        }
    }

    initialMonth(props) {
        const {selected, activeMonth, mode, today} = props || this.props

        if (isValid(activeMonth)) {
            return activeMonth
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

    _today() {
        return this.props.today || new Date()
    }
    
    

    render() {

        const { onClick,  startDate, endDate} = this.props;

        return (
                <table className="table table-bordered">
                    <thead>
                
                    <MonthHeader
                        onMonthChange={this._switchMonth} 
                        activeMonth={this.activeMonth()}
                        />
                
                </thead>
                <Month
                    activeMonth={this.activeMonth()}
                    today={this._today()}
                    onClick={onClick}
                    startDate = {startDate}
                    endDate = {endDate}
                    />
                </table>
                )
    }
}


