import React from 'react';
import classnames from 'classnames';


import formatDate from 'date-fns/format';

export default class Day extends React.Component {

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this._onClick = this._onClick.bind(this);
 
    }

    _onClick(e) {
        e.preventDefault()

        const {date, onClick, today} = this.props;

       if (onClick) {
            onClick(date)
        }
    }

    render() {
        const {date, className} = this.props


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
   
};



