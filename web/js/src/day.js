import React from 'react'
        import classnames from 'classnames';

//import {BLOCK_CLASS_NAME} from './consts'

import formatDate from 'date-fns/format';

export default class Day extends React.Component {

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this._onClick = this._onClick.bind(this);
        
        this.state = {isToday: ''};
    }

    _onClick(e) {
        e.preventDefault()


        const {date, onClick, today} = this.props;

        console.log('today  ' + today);
        console.log('date  ' + date);

        if (onClick) {
            onClick(date)
        }
    }

    render() {
        const {date, className, today} = this.props
        
       
        return (
                <td
                    className={classnames('day', className)}
                    onClick={this._onClick}
                
                    >
                    {formatDate(date, 'D')}
                </td>
                )
    }
}

Day.propTypes = {

    className: React.PropTypes.string,
    date: React.PropTypes.instanceOf(Date).isRequired,
    onClick: React.PropTypes.func,

    today: React.PropTypes.instanceOf(Date).isRequired
};



