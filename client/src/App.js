import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

/**
 * Inet tools basic shoppingcart checker
 */
class App extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

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

    /**
     * Handle change in input field for id or url of shoppingcart
     * @param event Change event
     */
    handleChange(event) {
        let id;
        //Check if id is correct
        if(!isNaN(event.target.value)) {
            id = event.target.value;
        } else  {
            id = event.target.value.split("/")[5];
            if(isNaN(id)) {
                return;
            }
        }
        let self = this;
        axios.get('http://localhost:8080/api/shoppingcart?cartId=' + id)
            .then(function (response) {
                console.log(response.data);
                self.setState(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <form>
                        <input type="text" name="shoppingcarturl" onChange={this.handleChange}/>
                    </form>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Inet tools</h2>
                </div>
                {getShoppingCart(this.state)}
            </div>
        );
    }
}

const shoppingCartStyle = {
    listStyleType: 'none'
}


/**
 * A method that renders a shoppingcart containing shoppingcart items
 * @param props Props containing a object with proper structure for a shoppingcart
 */
function getShoppingCart(props) {
    if(props) {
        return (<div className="shoppingcart">
            <h1><a href={props.cartURL}>Shopping Cart: </a></h1>
            <ul style={shoppingCartStyle}>{getShoppingItems(props)}</ul>
        </div>)
    }
}

/**
 *
 * A method that renders a shoppingcart item
 * @param props Props containing a shoppingcart item object
 * @returns {Array}
 */
function getShoppingItems(props) {
    if(props && props.items) {
        return props.items.map(item => (
            <li key={item.id} className="shoppingcart-item">
                {item.title}
                ({item.price})
                <img src={item.imageUrl} alt=""/>
            </li>))
    }
}

export default App;
