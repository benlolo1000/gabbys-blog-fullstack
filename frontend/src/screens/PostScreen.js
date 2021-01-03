import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listPostDetails, createPostReview } from '../actions/postActions';
import { POST_CREATE_REVIEW_RESET } from '../constants/postConstants';

const PostScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postReviewCreate = useSelector((state) => state.postReviewCreate);
  const {
    success: successPostReview,
    loading: loadingPostReview,
    error: errorPostReview,
  } = postReviewCreate;

  useEffect(() => {
    if (successPostReview) {
      setRating(0);
      setComment('');
    }
    if (!post._id || post._id !== match.params.id) {
      dispatch(listPostDetails(match.params.id));
      dispatch({ type: POST_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successPostReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPostReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div className="postScreen">
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={post.name} />
          <Image src={post.image} alt={post.name} fluid />
          <h3>{post.name}</h3>
          <Rating value={post.rating} text={`${post.numReviews} reviews`} />
          <div className="ingredients">
            {post.ingredients ? (
              <ul>
                {post.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="description">Description: {post.description}</div>
          <h2>Reviews</h2>
          {post.reviews.length === 0 && <div>No Reviews</div>}
          <ListGroup variant="flush">
            {post.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {successPostReview && (
                <Message variant="success">
                  Review submitted successfully
                </Message>
              )}
              {loadingPostReview && <Loader />}
              {errorPostReview && (
                <Message variant="danger">{errorPostReview}</Message>
              )}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingPostReview}
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review{' '}
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default PostScreen;
