//import styles from 'bootstrap/dist/css/bootstrap.css';
//import style from '../css/styles.css';
var React = require('react');
var ReactDOM = require('react-dom');

import 'whatwg-fetch';

import Calendar from "./src/calendar.js";
import InputField from "./src/input_field.js";

import formatDate from 'date-fns/format';

typeof window !== "undefined" && (window.React = React)

class App extends React.Component {

    constructor(props) {
        super(props);

        this.onStartDate = this.onStartDate.bind(this);
        this.onEndDate = this.onEndDate.bind(this);
        this.onChoosenDate = this.onChoosenDate.bind(this);

        this.startDate = formatDate(new Date(2016, 11, 17), 'D M YYYY');
        this.endDate = formatDate(new Date(2017, 11, 17), 'D M YYYY');
        this.choosenDate = false;
    }

    onStartDate(date) {
        this.startDate = date;

    }

    onEndDate(date) {
        this.endDate = date;
    }

    onChoosenDate(date) {
        this.choosenDate = formatDate(date, 'D M YYYY');

        fetch('/TestCalendar/web/app_dev.php/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                choosenDate: this.choosenDate,
                startDate: this.startDate,
                endDate: this.endDate
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            alert(json);
        }).catch(function (ex) {
            alert('parsing failed', ex);
        })

    }

    render() {



        return (
                <div className="container-fluid">
                
                    <div className="row">
                        <div className="col-xs-12 col-md-12">Calendar</div>
                
                    </div>
                
                
                    <div className="row">
                        <div className="col-xs-12 col-md-4"></div>
                        <div className="col-xs-12 col-md-4">
                            <Calendar 
                                onClick ={this.onChoosenDate}
                                />
                        </div>
                        <div className="col-xs-12 col-md-4"></div>
                
                    </div>
                
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <InputField
                
                                onClick ={this.onStartDate}
                                initDate ={this.startDate}
                                />
                
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <InputField
                
                                onClick ={this.onEndDate}
                                initDate ={this.endDate}
                                />
                        </div>
                
                    </div>
                
                </div>
                )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));