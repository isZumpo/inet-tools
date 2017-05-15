import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
    componentWillMount() {
        axios.get('https://cors-anywhere.herokuapp.com/https://www.inet.se/api/cart/react/')
            .then(function (response) {
                console.log(response + "asdasd");
            })
            .catch(function (error) {
                console.log(error + "asdasd");
            });
    }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
            <iframe src="https://www.inet.se/kundvagn/visa/10402073/namnlos"></iframe>

        </p>
      </div>
    );
  }
}

export default App;
