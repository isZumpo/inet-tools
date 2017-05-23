import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'


/**
 * Inet tools basic shoppingcart checker
 */
class App extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getCopyModal = this.getCopyModal.bind(this);
        this.cloneToggle = this.cloneToggle.bind(this);
    }

    componentDidMount() {
        let self = this;
        self.setState({showModal: false});
        self.setState({modalSelect: 0});
        axios.get('http://localhost:8080/api/shoppingcart?cartId=10402169')
            .then(function (response) {
                self.setState({shoppingcart: response.data})
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
                console.log({shoppingcart: response.data});
                self.setState({shoppingcart: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    cloneToggle(event) {
        if(this.state.shoppingcart.items.length > 0) {
            this.setState({showModal: !this.state.showModal});
        }
    }

    cloneInc(event) {

    }

    cloneDec(event) {

    }

    getCopyModal() {
        if(this.state && this.state.showModal) {
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
                                value="91823123"
                                placeholder="Produktnr"
                                //onChange={(e)=>{console.log("saijsad")}}
                                onFocus={(e)=>{console.log(e.target.select())}}
                            />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button>Förra</Button>
                            <Button>Nästa</Button>
                            <Button onClick={this.cloneToggle} bsStyle="primary">Stäng</Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </div>
            )
        }
    }

    /**
     * A method that renders a shoppingcart containing shoppingcart items
     * @param props Props containing a object with proper structure for a shoppingcart
     */
    getShoppingCart(props) {
        if(props) {
            return (<div className="shoppingcart container">
                <h1><a href={props.cartURL}>Shopping Cart: </a></h1>
                <button type="button" className="btn" onClick={this.cloneToggle}><FontAwesome
                    name='cloneToggle'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                /></button>
                <div>{this.getShoppingItems(props)}</div>
            </div>)
        }
    }

    /**
     *
     * A method that renders a shoppingcart item
     * @param props Props containing a shoppingcart item object
     * @returns {Array}
     */
    getShoppingItems(props) {
        if(props && props.shoppingcart && props.shoppingcart.items) {
            return props.shoppingcart.items.map(item => (
                <div className="col-xs-6 col-sm-4 col-lg-3">
                    <div key={item.id} className="shoppingcart-item col-xs-12">
                        <img className="shoppingcart-item-image" src={item.imageUrl} alt=""/>
                        <h4>{item.title}
                            ({item.price})</h4>
                    </div>
                </div>))
        }
    }

    render() {
        return (
            <div className="App container">
                {this.getCopyModal()}
                <ControlLabel>Sök efter kundvagn</ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Kundvagns Url eller id"
                    onChange={this.handleChange}
                />
                {this.getShoppingCart(this.state)}
            </div>
        );
    }
}



export default App;
