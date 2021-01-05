import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Post = ({ post, index }) => {
  return (
    <>
      {console.log(post.image)}
      <Link to={`/post/${post._id}`}>
        <div
          style={{ backgroundImage: `url(${post.image})` }}
          className={`postContainer${index}`}
        >
          {/* <img src={post.image} className="postImage" /> */}
          <h3>{post.name}</h3>

          <Rating
            index={index}
            value={post.rating}
            text={`${post.numReviews} reviews`}
          />
          <p>{post.createdAt.substring(0, 10)}</p>
        </div>
      </Link>
    </>
  );
};

export default Post;
