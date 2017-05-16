import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
    componentDidMount() {
        let self = this;
        axios.get('http://localhost:8080/api/shoppingcart?cartId=10402169')
            .then(function (response) {
                console.log(response.data);
                self.setState(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                {getShoppingItems(this.state)}
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

function getShoppingItems(props) {
    if(props && props.items) {
        return props.items.map(item => (
            <h1 key={item.id}>
                {item.title}
                ({item.price})
                <img src={item.imageUrl} alt=""/>
            </h1>))
    }
}

export default App;
