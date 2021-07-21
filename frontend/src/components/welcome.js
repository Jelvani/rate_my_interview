import React from 'react';
import { Link } from "react-router-dom";
import { Jumbotron, Button, Container, Row, Col} from 'react-bootstrap';
import '../App.css';

const Welcome = () => {
  return (
    <Row className="bg-light">
      <Col>
      <Container>
        <Jumbotron>
          <h1 className="display-3">A place to rate your interview experience.</h1>
          <p className="lead">This site is intended as a way to leave your honest review of
        any recent interview you have had with a company.</p>
          <hr className="my-2" />
          <p className="lead">
            <Button as={Link} to="/about" className="material-black">About</Button>
          </p>
        </Jumbotron>

      </Container>
      </Col>
    </Row>
    
  );
};
export default Welcome