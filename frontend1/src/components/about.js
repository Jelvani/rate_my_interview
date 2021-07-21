import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import '../App.css';

const About = () =>{
    return(
        <Container>
            <Row class = 'align-items-start' style={{marginTop: '20px'}}>
                <h1 class= 'display-4 fw-normal'>About</h1>

                <Col lg='8'>
                <p class='fs-5 text-muted'>
                    This site was created to give transparancy to the interview process.
                    Many times, the interview process has flaws, and this fact is supressed
                    at many large firms. It is crucial that all candidates are aware, and can
                    share their experience to others, in a safe and anoymous manner.
                </p>
                </Col>
            </Row>

        </Container>

    );
};

export default About