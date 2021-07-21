import React, { Component } from "react";
import axios from "axios"
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { Route, Redirect } from "react-router-dom";

axios.defaults.withCredentials = true;

export default class Contact extends Component {
  constructor(props) {
    super(props)

    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      reason: "",
      validated: false
    };
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeReason(e) {
    this.setState({
      reason: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return
    }


    const contact = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      reason: this.state.reason,
    };

    this.setState({ validated: true });
    axios.post(`api/contact`, contact, { withCredentials: true }).then(resp => {
      return resp.data;
    }, (error) => {
      localStorage.removeItem('token');
      window.location.href = "/login";
    });

    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      reason: "",
      validated: false
    });
  }

  render() {
    return (
      <Container>

        <h3>Contact Us</h3>
        <br />
        <Form validated={this.state.validated} onSubmit={this.onSubmit}>
          <br />
          <Form.Group as={Row}>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={this.state.firstname}
                onChange={this.onChangeFirstname}
              />
            </Col>
          </Form.Group>
          <br />
          <Form.Group as={Row}>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={this.state.lastname}
                onChange={this.onChangeLastname}
              />
            </Col>
          </Form.Group>
          <br />
          <Form.Group as={Row}>
            <Col>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </Col>
          </Form.Group>
          <br />
          <Form.Group as={Row}>
            <Col fluid>
              <Form.Label>Reason</Form.Label>
              <Form.Control as="textarea"
                required
                value={this.state.reason}
                onChange={this.onChangeReason}
              />
            </Col>
          </Form.Group>
          <br />
          <Form.Group as={Row}>
            <Col>
              <Button type="submit" className="material-black">Submit</Button>
            </Col>
          </Form.Group>

        </Form>

      </Container>
    );
  }
}