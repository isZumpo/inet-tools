import React, { Component } from 'react';
import './App.css';
import {Navbar, Nav, NavItem} from 'react-bootstrap/lib'


class Navigation extends Component {

    constructor(props) {
        super(props);
    }

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
                        <NavItem eventKey={1} href="/">KassaCopy</NavItem>
                        <NavItem eventKey={2} href="/inkfinder">BläckFinder</NavItem>
                        <NavItem eventKey={3} href="/peng">PengaCounter</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}



export default Navigation;
