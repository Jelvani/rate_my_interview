import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap"
import {handleLogout} from "./login"

const Navigation = () => {

    if(localStorage.getItem("token")){
        return (

            <Navbar fixed="top" className="material-black">
                <Container>
                    <Nav className="mr-auto material-black" to="/">
    
                        <Nav.Link as={Link} to="/" className="material-black">Home</Nav.Link>
                        <Nav.Link as={Link} to="/reviews" className="material-black">Reviews</Nav.Link>
                        <Nav.Link as={Link} to="/create" className="material-black">Submit Review</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="material-black">Contact</Nav.Link>
                        <Nav.Link as={Link} onClick={() => handleLogout()} className="material-black ml-auto">Logout</Nav.Link>
                    </Nav>
    
    
                </Container>
            </Navbar>
    
    
        );
    }else{
        return (

            <Navbar fixed="top" className="material-black">
                <Container>
                    <Nav className="mr-auto material-black" to="/">
    
                        <Nav.Link as={Link} to="/" className="material-black">Home</Nav.Link>
                        <Nav.Link as={Link} to="/reviews" className="material-black">Reviews</Nav.Link>
                        <Nav.Link as={Link} to="/login" onClick={() => window.location.href="/login"} className="material-black ml-auto">Login</Nav.Link>
                    </Nav>
    
    
                </Container>
            </Navbar>
    
    
        );
    }
    
};

export default Navigation