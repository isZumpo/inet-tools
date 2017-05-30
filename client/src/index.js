import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Navigation from './Navigation'
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom'
import MoneyCounter from './MoneyCounter'
import InkFinder from './InkFinder'



const Application = () => (
    <div>
        <Navigation />
        <Route exact path="/" component={App} />
        <Route path="/moneycounter" component={MoneyCounter} />
        <Route path="/inkfinder" component={InkFinder} />
    </div>
)

ReactDOM.render(
    <BrowserRouter>
        <Application />
    </BrowserRouter>, document.getElementById('root'));
// ReactDOM.render(navbarInstance, document.getElementById('navbar'));

