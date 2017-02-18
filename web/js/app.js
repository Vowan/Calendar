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
        
        this.state = {
            startDate: new Date(2016, 11, 17),
            endDate: new Date(2017, 11, 17)
        }
        
        this.choosenDate = false;
    }

    onStartDate(date) {
         this.setState({
            startDate:date
        });

    }

    onEndDate(date) {
       
        this.setState({
            endDate:date
        });
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
                startDate: formatDate(this.state.startDate, 'D M YYYY'),
                endDate: formatDate(this.state.endDate, 'D M YYYY')
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            alert(json['ответ']);
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
                                startDate = {this.state.startDate}
                                endDate = {this.state.endDate}
                                />
                        </div>
                        <div className="col-xs-12 col-md-4"></div>
                
                    </div>
                
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <InputField
                
                                onClick ={this.onStartDate}
                                initDate ={this.state.startDate}
                                />
                
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <InputField
                
                                onClick ={this.onEndDate}
                                initDate ={this.state.endDate}
                                />
                        </div>
                
                    </div>
                
                </div>
                )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));