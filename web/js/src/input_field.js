import React from 'react';
import classnames from 'classnames';

import Calendar from "./calendar.js";

import formatDate from 'date-fns/format';

export default class InputField extends React.Component {

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.onCalendarClick = this.onCalendarClick.bind(this);

        this.state = {
            startDayVisible: false,
            visibleDay: formatDate(props.initDate, 'D MMMM YYYY')
        };


    }

    onCalendarClick(date) {

        //    console.log('Calendar click ' + date);
        this.setState({
            startDayVisible: false,
            visibleDay: formatDate(date, 'D MMMM YYYY')
        });

        const {onClick} = this.props;

        if (onClick) {
            onClick(date);
        }

    }

    handleClick() {
        this.setState({startDayVisible: !this.state.startDayVisible});

    }
    render() {
        
        const {rangeDate} = this.props;

        return (
                <div className ="form-group">
                    <label >Click to change  {rangeDate} date
                    </label>
                    <input
                       
                        type="text"
                        value={this.state.visibleDay}
                        onClick={this.handleClick}
                        className ="form-control"
                        />
                    <div>
                        {
                            this.state.startDayVisible
                                    ? <Calendar 
                                        onClick={this.onCalendarClick}
                                        />
                                        : null
                        }
                    </div>
                </div>
                );
    }
}


