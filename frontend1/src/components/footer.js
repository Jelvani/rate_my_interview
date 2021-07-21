import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import '../App.css';
import { Link } from "react-router-dom";

const Footer = () => {
    return (

        <footer id="footer" className='footer material-black'>
            <Container>
                <br />
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Link to="/privacy-policy" className='footerLinks'>Privacy Policy</Link>
                    </Col>
                </Row>
            </Container>
        </footer>

    );
};
export default Footer