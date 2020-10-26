import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

import Stars from './Stars.jsx';
import { Helpful, ReviewStyled } from '../styled-components.jsx';

const Review = ({ review, clickReviewPhoto, clickHelpful }) => {
  console.log(review)
  return (
    <ReviewStyled>
      <img
        width={36}
        height={36}
        className="user-icon"
        src={review.userthumb}
        alt="User Image"
      />
      <ReviewStyled.Body className="align-center">
        <p className="quiet-text">
          <span className="link">{review.username}</span>
          {moment(review.createdat).format('ll')}
        </p>
        <Stars rating={review.rating} isHalf={false}/>
        <Container className="review-body" fluid>
          <Row>
            <Col>{review.body}</Col>
            {review.imageurl && <Col xs={3}>
              <img
                onClick={clickReviewPhoto}
                id={review.id}
                src={review.imageurl}
                className="review-photo"></img>
            </Col>}
          </Row>
        </Container>
        <div className="quiet-text">Purchased Item:</div>
        <ReviewStyled>
          <img
            width={36}
            height={36}
            className="item-icon"
            src={review.itemthumb}
            alt="Item Thumbnail"
          />
          <ReviewStyled.Body>
            <div className="link quiet-text">{review.itemname}</div>
          </ReviewStyled.Body>
        </ReviewStyled>
        <Helpful >
          <Button
            variant="light"
            onClick={clickHelpful}
            id={review.id} >
            Is this review helpful?
          </Button>
          <p id={`${review.id}-thanks`} style={{display: 'none'}}>Thanks for your feedback!</p>
        </Helpful>
      </ReviewStyled.Body>
    </ReviewStyled>
  )
}

export default Review;
