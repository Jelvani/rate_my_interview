import React, { Component } from "react";
import axios from 'axios';
import { Card, Container, Col, Row } from 'react-bootstrap'
import StarRatings from 'react-star-ratings';

axios.defaults.withCredentials = true;

const Review = (props) => {

  return (
    <Card bg="light" className="mx-auto" text="dark">
      <Card.Body>
        <Row className="justify-content-between">
          <Col md="auto" className="mt-4">
            <Card.Title >{props.company}</Card.Title>
          </Col>
          <Col md="auto">

            <Row>
              <StarRatings
                rating={props.rating}
                starRatedColor="black"
                numberOfStars={5}
                starDimension="2rem"
                starSpacing="0.1rem"
              />
            </Row>
            <Row className="justify-content-end mt-2">
              <Col md="auto">
                {props.date}
              </Col>
            </Row>
          </Col>

        </Row>


        <hr />
        <Card.Text>
          {props.review}


          {/*readmorereact has problem when rerendering*/}

          {/* <ReadMoreReact text={props.review}
            min={100}
            ideal={150}
            max={250}
            readMoreText="read more" /> */}
        </Card.Text>
      </Card.Body>
    </Card>
  )
};



export default class ReviewList extends Component {
  constructor(props) {
    super(props);

    this.Sort = this.Sort.bind(this);
    this.sortCallback = this.sortCallback.bind(this);

    this.state = {
      reviews: [],
      sortBy: 'newest'
    };
  }

  //get reviews to list on homepage
  componentDidMount() {
    axios.get(`api/reviews`)
      .then((response) => {
        this.setState({ reviews: response.data });
        this.Sort(this.state.sortBy);
      })
      .catch(function (error) {
        console.log(error);
      });



  }

  sortCallback(e) {
    this.Sort(e.target.value);
  };

  Sort(key) {


    let sortList = [...this.state.reviews];

    if (key === 'newest') {
      sortList.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    } else if (key === 'oldest') {
      sortList.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    } else if (key === 'name-desc') {
      sortList.sort((a, b) => {
        return a.company.localeCompare(b.company)
      });
    } else if (key === 'name-asc') {
      sortList.sort((a, b) => {
        return b.company.localeCompare(a.company)
      });
    }

    this.setState({ reviews: [...sortList], sortBy: key });
  };

  reviewList() {
    try {
      return this.state.reviews.map((currentReview) => {
        return (
          <Row className="justify-content-md-center" style={{ marginTop: '20px' }}>
            <Col md='6'>
              <Review
                company={currentReview.company}
                review={currentReview.review}
                rating={currentReview.rating}
                date={currentReview.date}
              />
            </Col>
          </Row>
        );
      });
    } catch (exception) {
      console.log("Reviews not loaded!")
      return(
        <p>Not Loaded!</p>
      );
    }
  };




  render() {
    return (

      <Container fluid="sm">

        <Row className="justify-content-md-center" style={{ margin: '20px' }}>
          <Col>
            <h3>Interview Reviews</h3>
          </Col>
          <Col>
            <select class="form-select" onChange={this.sortCallback}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name-desc">Sort Name (A - Z)</option>
              <option value="name-asc">Sort Name (Z - A)</option>
            </select>
          </Col>
        </Row>
        {this.reviewList()}
      </Container>


    );
  }
}




