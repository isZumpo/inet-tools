import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

class CartCloner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingCart: {
                products: []
            },
            selectedProductIndex: 0,
            displayCloneModal: false
        };
        this.renderShoppingCart = this.renderShoppingCart.bind(this);
        this.search = this.search.bind(this);
        this.clickCloneButton = this.clickCloneButton.bind(this);
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
        axios.get(process.env.REACT_APP_API_URL + 'shoppingcart?cartId=' + id)
            .then(function (response) {
                self.setState({shoppingCart: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    clickCloneButton() {
        this.setState({displayCloneModal: !this.state.displayCloneModal});
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
                    </div>

                    <CartClonerModal display={this.state.displayCloneModal}/>

                    {this.state.shoppingCart.products.length > 0 &&
                        <Button onClick={this.clickCloneButton}>Clone</Button>
                    }
                    {this.renderShoppingCart()}
                    <div className="row col-xs-12" style={{margin: "20px", minHeight: "200px", padding:"0px", borderRadius: "3px"}}></div>
                </div>
            </div>
        );
    }

    renderShoppingCart() {
        return this.state.shoppingCart.products.map((product, index) => (
            <div className="col-xs-3 shoppingcart-item" id={index == this.state.selectedProductIndex && "isCloneSelected"} key={product.id}>{product.name} : {product.price}
                <img className="shoppingcart-item-image" src={product.image} alt=""/>
            </div>
        ));
    }
}




class CartClonerModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.display) {
            return(
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Kopiera</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl //Should be readonly
                                type="text"
                                id="copyinput"
                                value={this.state.shoppingcart.products[this.state.modalSelect].id}
                                placeholder="Produktnr"
                                //onChange={(e)=>{e.target.select()}}
                                onFocus={(e)=>{e.target.select()}}
                            />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.cloneDec}>Förra</Button>
                            <Button onClick={this.cloneInc}>Nästa</Button>
                            <Button onClick={this.cloneToggle} bsStyle="primary">Stäng</Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </div>
            )
        }else {
            return (<div></div>);
        }
    }

}

export default CartCloner;
