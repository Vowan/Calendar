var React = require('react');


import addMonths from 'date-fns/add_months';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import startOfMonth from 'date-fns/start_of_month';
import formatDate from 'date-fns/format';


export default class MonthHeader extends React.Component {

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this._switchMonth = this._switchMonth.bind(this);
    }

    _switchMonth(offset) {
        const {onMonthChange, activeMonth} = this.props

        onMonthChange(addMonths(activeMonth, parseInt(offset)))
    }

    render() {
        const {
            activeMonth,
        } = this.props

        return (
                <tr>     
                    <td 
                        onClick={() => this._switchMonth(-1)}
                        >
                        <button className='btn btn-info'> &lArr;</button>
                    </td>
                
                    <td className="month_header_title" 
                        colSpan="5">
                        {formatDate(activeMonth, 'MMMM YYYY')}
                    </td>
                
                    <td
                        onClick={() => this._switchMonth(1)}
                        >
                        <button className='btn btn-info'> &rArr;</button>
                    </td>
                </tr>
                )
    }
}


MonthHeader.propTypes = {
    activeMonth: React.PropTypes.instanceOf(Date).isRequired,
    onMonthChange: React.PropTypes.func.isRequired
};


