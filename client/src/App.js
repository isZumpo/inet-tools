import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';


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
        return (<div className="shoppingcart container">
            <h1><a href={props.cartURL}>Shopping Cart: </a></h1>
            <h2>Clone<FontAwesome
                name='clone'
                size='1x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            /></h2>
            <div style={shoppingCartStyle}>{getShoppingItems(props)}</div>
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
            <div className="col-xs-6 col-sm-4 col-lg-3">
                <div key={item.id} className="shoppingcart-item col-xs-12">
                    <img className="shoppingcart-item-image" src={item.imageUrl} alt=""/>
                    <h4>{item.title}
                        ({item.price})</h4>
                </div>
            </div>))
    }
}

export default App;
