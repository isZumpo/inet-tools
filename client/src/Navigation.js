import React, { Component } from 'react';
import './App.css';
import {Navbar, Nav, NavItem} from 'react-bootstrap/lib'
import { Link } from 'react-router-dom'


class Navigation extends Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Inet tools</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1}><Link to="/">KassaCopy</Link></NavItem>
                        <NavItem eventKey={2}><Link to="/inkfinder">BläckFinder</Link></NavItem>
                        <NavItem eventKey={3}><Link to="/moneycounter">MoneyCounter</Link></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}



export default Navigation;
