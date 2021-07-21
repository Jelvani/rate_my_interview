import React, { Component } from "react";
import axios from "axios"
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import StarRatings from 'react-star-ratings';

axios.defaults.withCredentials = true;

export default class Create extends Component {
  constructor(props) {
    super(props)

    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangeReview = this.onChangeReview.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeRating = this.onChangeRating.bind(this);

    this.state = {
      company: "",
      review: "",
      rating: 0,
      validated: false
    };
  }

  onChangeCompany(e) {
    this.setState({
      company: e.target.value
    });
  }

  onChangeReview(e) {
    this.setState({
      review: e.target.value
    });
  }

  onChangeRating(newRating, name) {
    this.setState({
      rating: newRating
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || this.state.rating === 0) {
      e.stopPropagation();
      return
    }


    const review = {
      company: this.state.company,
      review: this.state.review,
      rating: this.state.rating
    };

    this.setState({ validated: true });

    axios.post(`api/review/add`, review, { withCredentials: true }).then(resp => {
      //return resp.data;
    }, (error) => {
      console.log(error);
      localStorage.removeItem('token');
      window.location.href = "/login";
    });


    this.setState({
      company: "",
      review: "",
      rating: 0,
      validated: false
    });
  }

  render() {
    return (
      <Container>

        <h3>Leave Review</h3>
        <br />
        <Form validated={this.state.validated} onSubmit={this.onSubmit}>

          <Form.Group as={Row}>
            <Col>
              <Form.Control as={StarRatings}
                required
                custom
                type={StarRatings}
                rating={this.state.rating}
                starRatedColor="black"
                changeRating={this.onChangeRating}
                numberOfStars={5}
                id='star-rating'
              />

            </Col>
          </Form.Group>

          <br />
          <Form.Group as={Row}>
            <Col>
              <Form.Label>Company</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Company Name"
                value={this.state.company}
                onChange={this.onChangeCompany}
              />
            </Col>
          </Form.Group>
          <br />
          <Form.Group as={Row}>
            <Col fluid>
              <Form.Label>Review</Form.Label>
              <Form.Control as="textarea"
                required
                value={this.state.review}
                onChange={this.onChangeReview}
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