import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import elasticlunr from 'elasticlunr'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'

var searchIndex;
class InkFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printers: [],
            searchResults: [],
        };
        searchIndex = elasticlunr(function () {
            this.addField('title');
            this.setRef('id');
        })
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        let self = this;
        axios.get('http://localhost:8080/api/inkfinder')
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
        let searchString = event.target.value;
        let search = [];
        searchIndex.search(searchString, {expand: true}).map((item) => (
            search.push(parseInt(item.ref))
        ));
        this.setState({searchResults: search});
    }

    getSearchResults() {
        //Show just 15 items
        return this.state.searchResults.slice(0, 15).map((item, index) => (
            <a href={this.state.shoppingcart[item].url}><h1>{this.state.shoppingcart[item].title}</h1></a>
        ));
    }

    render() {
        return (
            <div className="container">
                <div className="col-xs-6">
                    <h1>Hello mate!</h1>
                    <FormGroup>
                        <FormControl type="text" placeholder="Search" onChange={this.search} />
                        {this.getSearchResults()}
                    </FormGroup>
                </div>
            </div>
        );
    }

}

export default InkFinder;
