import React, { Component } from 'react';
import './App.css';
import FormControl from 'react-bootstrap/lib/FormControl'
import InputGroup from 'react-bootstrap/lib/InputGroup'

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
            <div className="container">
                <div className="col-xs-6 col-xs-offset-3">
                    <MoneyCounterItem type="1" onChange={this.onItemChange}/>
                    <MoneyCounterItem type="2"  onChange={this.onItemChange}/>
                    <MoneyCounterItem type="5" onChange={this.onItemChange}/>
                    <MoneyCounterItem type="10" onChange={this.onItemChange}/>
                    <MoneyCounterItem type="20" onChange={this.onItemChange}/>
                    <MoneyCounterItem type="50" onChange={this.onItemChange}/>
                    <MoneyCounterItem type="100" onChange={this.onItemChange}/>
                    <MoneyCounterItem type="200" onChange={this.onItemChange}/>
                    <MoneyCounterItem type="500" onChange={this.onItemChange}/>
                    <MoneyCounterItem type="1000" onChange={this.onItemChange}/>
                    {this.getTotal()}
                </div>

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
        if(total === 0) {
            return <h1 className="text-center"></h1>
        }
        return(<h1 className="text-center">{total}kr</h1>)
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
        this.setState({count: count, total: total})
        this.props.onChange(this.props.type, total);
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroup.Addon className="money-counter-item-type">{this.props.type}kr</InputGroup.Addon>
                    <FormControl //Should be readonly
                        type="text"
                        placeholder="Antal"
                        onChange={this.onInputChange}
                    />
                    <InputGroup.Addon className="money-counter-item-total">{this.state.total}kr</InputGroup.Addon>

                </InputGroup>
            </div>
        );
    }
}

export default MoneyCounter;
