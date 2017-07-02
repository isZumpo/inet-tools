import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import elasticlunr from 'elasticlunr';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FontAwesome from 'react-fontawesome';


class InkFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printers: [],
            searchResults: [],
        };
        this.searchIndex = elasticlunr(function () {
            this.addField('title');
            this.setRef('id');
        })
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        let self = this;
        axios.get(process.env.REACT_APP_API_URL + 'inkfinder')
            .then(function (response) {
                self.setState({printers: response.data});
                console.log(response);
                self.setState({shoppingcart: response.data})
                for(let i in response.data) {
                    self.searchIndex.addDoc(response.data[i]);
                }



            })
            .catch(function (error) {
                console.log(error);
            });
    }

    search(event) {
        let searchString = event.target.value;
        let search = [];
        this.searchIndex.search(searchString, {expand: true}).map((item) => (
            search.push(parseInt(item.ref))
        ));
        this.setState({searchResults: search});
    }

    getSearchResults() {
        //Show just 15 items
        if(this.state.searchResults.length > 0) {
            return this.state.searchResults.slice(0, 15).map((item, index) => (
                <div className={"stripe-" + index % 2}>
                    <a href={this.state.shoppingcart[item].url} target="_blank"><div>{this.state.shoppingcart[item].title}</div></a>
                </div>
            ));
        } else {
            return (
                <div className="text-center">
                    <FontAwesome
                        name='print'
                        style={{ color: 'black' }}
                        size='5x'
                    />
                    <FontAwesome
                        name='paint-brush'
                        style={{ color: 'black' }}
                        size='5x'
                    />
                </div>

            )
        }

    }

    render() {
        return (
            <div className="container">
                <div className="col-xs-10 col-xs-offset-1">
                    <div className="col-xs-8 col-xs-offset-2">
                        <h1 className="text-center">Ink Finder</h1>
                        <FormGroup >
                            <FormControl bsSize="large" type="text" placeholder="Sök efter skrivare" onChange={this.search} />
                        </FormGroup>
                    </div>
                    <div className="row col-xs-12" style={{margin: "20px", minHeight: "200px", padding:"0px", borderRadius: "3px"}}>
                        {this.getSearchResults()}
                    </div>
                </div>
            </div>
        );
    }

}

export default InkFinder;
