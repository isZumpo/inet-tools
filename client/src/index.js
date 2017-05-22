import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Navbar, Nav, NavItem} from 'react-bootstrap/lib'
import './index.css';


const navbarInstance = (
    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Inet tools</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <NavItem eventKey={1} href="#">KassaCopy</NavItem>
                <NavItem eventKey={2} href="#">BläckFinder</NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(navbarInstance, document.getElementById('navbar'));



