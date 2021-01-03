import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Post from '../components/Post';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { listPosts } from '../actions/postActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { loading, error, posts, page, pages } = postList;

  useEffect(() => {
    dispatch(listPosts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? null : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      <h1 style={{ textAlign: 'center' }}>Latest Posts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {posts.map((post) => (
              <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
                <Post post={post} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
