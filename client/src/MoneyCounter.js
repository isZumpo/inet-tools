import React, { Component } from 'react';
import './App.css';

class MoneyCounter extends Component {

    constructor(props) {
        super(props);
        this.getTotal = this.getTotal.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
        this.state = {
            total: 0,
            items: []
        }

    }

    render() {
        return (
            <div>
                <MoneyCounterItem type="1" onChange={this.onItemChange}/>
                <MoneyCounterItem type="2"  onChange={this.onItemChange}/>
                <MoneyCounterItem type="5" onChange={this.onItemChange}/>
                <MoneyCounterItem type="10" onChange={this.onItemChange}/>
                <MoneyCounterItem type="20" onChange={this.onItemChange}/>
                <MoneyCounterItem type="50" onChange={this.onItemChange}/>
                <MoneyCounterItem type="100" onChange={this.onItemChange}/>
                <MoneyCounterItem type="200" onChange={this.onItemChange}/>
                <MoneyCounterItem type="500" onChange={this.onItemChange}/>
                {this.getTotal()}
            </div>
        );
    }

    onItemChange(type, total) {
        let items = this.state.items;
        items[type] = total;
        this.setState({items: items});
    }

    getTotal() {
        let total = 0;
        for(var item in this.state.items) {
            total += this.state.items[item];
        }
        return(<h1>{total}</h1>)
    }
}

class MoneyCounterItem extends Component {

    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.render = this.render.bind(this);
        this.state = {
            count: 0,
            total: 0
        }

    }

    onInputChange(event) {
        let count = event.target.value;
        let total = count * this.props.type;
        this.setState({count: count})
        this.setState({total: total})
        this.props.onChange(this.props.type, total);
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.onInputChange}/>
                <span>{this.props.type}</span>
                <span>- {this.state.total}</span>
            </div>
        );
    }
}

export default MoneyCounter;
