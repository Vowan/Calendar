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
            visibleDay: props.initDate
        };


    }

    onCalendarClick(date) {

        //    console.log('Calendar click ' + date);
        this.setState({
            startDayVisible: false,
            visibleDay: formatDate(date, 'D M YYYY')
        });

        const {onClick} = this.props;

        if (onClick) {
            onClick(formatDate(date, 'D M YYYY'));
        }

    }

    handleClick() {
        this.setState({startDayVisible: !this.state.startDayVisible});

    }
    render() {


        return (
                <div>
                    <input
                        type="text"
                        value={this.state.visibleDay}
                        onClick={this.handleClick}
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


