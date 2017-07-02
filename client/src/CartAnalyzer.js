import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

class CartAnalyzer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingCart: {
                products: []
            }
        };
        this.search = this.search.bind(this);
        this.renderShoppingCart = this.renderShoppingCart.bind(this);
        this.getShoppingItemsOfType = this.getShoppingItemsOfType.bind(this);
    }
    search(event) {
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
        if(id == 0) {
            return;
        }
        let self = this;
        axios.get(process.env.REACT_APP_API_URL + 'cartanalyzer?cartId=' + id)
            .then(function (response) {
                console.log(response.data);
                self.setState({shoppingCart: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div className="container">
                <div className="col-xs-10 col-xs-offset-1">
                    <div className="col-xs-8 col-xs-offset-2">
                        <h1 className="text-center">Cart Analyzer</h1>
                        <FormGroup >
                            <FormControl bsSize="large" type="text" placeholder="Sök efter kundvagn" onChange={this.search} />
                        </FormGroup>
                        {this.renderShoppingCart()}
                    </div>
                    <div className="row col-xs-12" style={{margin: "20px", minHeight: "200px", padding:"0px", borderRadius: "3px"}}></div>
                </div>
            </div>
        );
    }

    renderShoppingCart() {
        return this.state.shoppingCart.products.map((product, index) => (
            <div key={product.id}>{product.name} : {product.type}
                <img src={product.image} alt=""/></div>
        ));
    }

    getShoppingItemsOfType(type) {
        let shoppingItems = [];
        this.state.shoppingCart.products.forEach(function (product) {
            if(product.type === type) {
                shoppingItems.push(product);
            }
        });
        return shoppingItems;
    }

    renderShoppingItemsOfType(type) {
        return this.getShoppingItemsOfType(type).map((product, index) => (
            <div>{product.name} : {product.type}
                <img src={product.image} alt=""/></div>
            
        ));
    }

}

export default CartAnalyzer;
