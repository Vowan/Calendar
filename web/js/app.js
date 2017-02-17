//import styles from 'bootstrap/dist/css/bootstrap.css';
//import style from '../css/styles.css';
var React = require('react');
var ReactDOM = require('react-dom');

import Calendar from "./src/calendar.js";


typeof window !== "undefined" && (window.React = React)

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onSelect(selection) {
        console.log(selection)
        this.setState({selection: selection})
    }

    render() {
        return (
                <div className="container-fluid">
                
                    <div className="row">
                        <div className="col-xs-12 col-md-12">Calendar</div>
                
                    </div>
                
                    <div className="row">
                        <div className="col-xs-12 col-md-12">Range</div>
                
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-4"></div>
                        <div className="col-xs-12 col-md-4">
                            <Calendar 
                                selected ={this.state.selection}
                                onSelect ={this.onSelect}
                                />
                        </div>
                        <div className="col-xs-12 col-md-4"></div>
                
                    </div>
             
                </div>
                )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));