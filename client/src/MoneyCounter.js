import React, { Component } from 'react';
import './App.css';

class MoneyCounter extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MoneyCounterItem amount="1"/>
                <MoneyCounterItem amount="2"/>
                <MoneyCounterItem amount="5"/>
                <MoneyCounterItem amount="10"/>
                <MoneyCounterItem amount="20"/>
                <MoneyCounterItem amount="50"/>
                <MoneyCounterItem amount="100"/>
                <MoneyCounterItem amount="200"/>
                <MoneyCounterItem amount="500"/>
            </div>
        );
    }
}

class MoneyCounterItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <input type="text"/>
                <span>{this.props.amount}</span>
            </div>
        );
    }
}

export default MoneyCounter;
