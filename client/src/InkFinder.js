import Search from 'react-search'
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class InkFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printers: []
        }
    }

    componentDidMount() {
        let self = this;
        axios.get('http://localhost:8080/api/inkfinder')
            .then(function (response) {
                self.setState({printers: response.data});
                console.log(response);
                self.setState({shoppingcart: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="col-xs-6">
                    <h1>Hello mate!</h1>
                    <Search items={this.state.printers} />
                </div>
            </div>
        );
    }

}

export default InkFinder;
