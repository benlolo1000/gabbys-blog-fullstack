import React, { useEffect } from 'react';
import '../styles/homeScreen.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

      <h1 className="homeScreenTitle">Latest Posts</h1>
      <div className="homeScreen">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {posts
              ? posts.map((post, index) => (
                  <div key={post._id} className={`item${index}`}>
                    <Post index={index} post={post} />
                  </div>
                ))
              : null}

            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
