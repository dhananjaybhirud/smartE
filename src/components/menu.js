import React, { Component } from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";


class Menu extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" >
                <Navbar.Brand href="#home" className='p-0'>
                    <img src={window.location.origin + '/download.png'} height='40'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="ml-auto">
                        <Nav.Link href="#deets">Home</Nav.Link>
                        <NavDropdown title="Submenu" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#deets">About Us</Nav.Link>
                        <Nav.Link href="#deets">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


export default Menu;
