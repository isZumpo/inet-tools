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
        this.cloneInc = this.cloneInc.bind(this);
        this.cloneDec = this.cloneDec.bind(this);
        this.isCloneSelected = this.isCloneSelected.bind(this);
        this.cloneCopyKeyPress = this.cloneCopyKeyPress.bind(this);
        document.addEventListener("keydown", this.cloneCopyKeyPress);

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
                self.setState({modalSelect: 0});
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
        if(this.state.modalSelect < this.state.shoppingcart.items.length - 1) {
            this.setState({modalSelect: this.state.modalSelect + 1});
        }
    }

    cloneDec(event) {
        if(this.state.modalSelect > 0) {
            this.setState({modalSelect: this.state.modalSelect - 1});
        }
    }

    cloneCopyKeyPress(event) {
        if(this.state && this.state.showModal) {
            console.log(event.code);
            if(event.code == "KeyC" && event.ctrlKey) {
                this.cloneInc();
            }else if(event.code == "ArrowLeft") {
                this.cloneDec();
            }else if(event.code == "ArrowRight") {
                this.cloneInc();
            }else if(event.code == "Escape") {
                this.setState({showModal: false});
            }
        }
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
                                value={this.state.shoppingcart.items[this.state.modalSelect].id}
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

    isCloneSelected(index) {
        if(index == this.state.modalSelect) {
            return "isCloneSelected";
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
            return props.shoppingcart.items.map((item, index) => (
                <div className="col-xs-6 col-sm-4 col-lg-3">
                    <div key={item.id} className="shoppingcart-item col-xs-12" id={this.isCloneSelected(index)}>
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
