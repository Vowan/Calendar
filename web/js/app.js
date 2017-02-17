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
                <div className="panel panel-default">
                
                    <div  className="panel-heading">Panel heading</div>
                    <div  className="panel-body">
                        <p>Hello Calendar</p>
                    </div>
                
                
                    <Calendar 
                        selected ={this.state.selection}
                        onSelect ={this.onSelect}
                        />
                
                
                </div>
                )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));