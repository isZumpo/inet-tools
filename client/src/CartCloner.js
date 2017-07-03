import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

class CartCloner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingCart: {
                products: []
            }
        };
        this.renderShoppingCart = this.renderShoppingCart.bind(this);
    }


    render() {
        return (
            <div className="container">
                <div className="col-xs-10 col-xs-offset-1">
                    <div className="col-xs-8 col-xs-offset-2">
                        <h1 className="text-center">Cart Cloner</h1>
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
}

export default CartCloner;
