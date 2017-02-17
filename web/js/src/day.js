import React from 'react'
        import classnames from 'classnames'

//import {BLOCK_CLASS_NAME} from './consts'

        import formatDate from 'date-fns/format'

        export default class Day extends React.Component {

    constructor(props) {
        super(props);
       
        // This binding is necessary to make `this` work in the callback
        this._onClick= this._onClick.bind(this);
    }

    _onClick(e) {
        e.preventDefault()

        console.log('day click');
        const {date, onClick} = this.props;
        if (onClick) {
            onClick(date)
        }
    }

    _onMouseMove(e) {
        e.preventDefault()
        const {date, onMouseMove} = this.props
        if (onMouseMove) {
            onMouseMove(date)
        }
    }

    render() {
        const {date, className, blockClassName} = this.props
        return (
                <td
                    className={classnames(`${blockClassName}-day`, className)}
                    onClick={this._onClick}
                    onMouseMove={this._onMouseMove.bind(this)}
                    >
                    {formatDate(date, 'D')}
                </td>
                )
    }
}

Day.propTypes = {
    blockClassName: React.PropTypes.string,
    className: React.PropTypes.string,
    date: React.PropTypes.instanceOf(Date).isRequired,
    onClick: React.PropTypes.func,
    onMouseMove: React.PropTypes.func,
    today: React.PropTypes.instanceOf(Date).isRequired
};

// Specifies the default values for props:
Day.defaultProps = {
    blockClassName: 'day'//BLOCK_CLASS_NAME

};

