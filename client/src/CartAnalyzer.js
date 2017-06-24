import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';


var searchIndex;
class CartAnalyzer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printers: [],
            searchResults: [],
        };
        // this.search = this.search.bind(this);
    }

    componentDidMount() {
        let self = this;
        axios.get('http://localhost:8080/api/cartanalyzer')
            .then(function (response) {
                self.setState({printers: response.data});
                console.log(response);
                self.setState({shoppingcart: response.data})
                for(let i in response.data) {
                    searchIndex.addDoc(response.data[i]);
                }



            })
            .catch(function (error) {
                console.log(error);
            });
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
        axios.get('http://localhost:8080/api/cartanalyzer?cartId=' + id)
            .then(function (response) {
                console.log(response.data);
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
                    </div>
                    <div className="row col-xs-12" style={{margin: "20px", minHeight: "200px", padding:"0px", borderRadius: "3px"}}>
                    </div>
                </div>
            </div>
        );
    }

}

export default CartAnalyzer;
