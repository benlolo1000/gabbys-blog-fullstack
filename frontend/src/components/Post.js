import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Post = ({ post, index }) => {
  // const imageURL = post.image.substring(9);
  return (
    <>
      <Link to={`/post/${post._id}`}>
        <div
          style={{ backgroundImage: `url(${post.image})` }}
          className={`postContainer${index}`}

          // style={{
          //   backgroundImage: `url(http://localhost:3000/uploads/${imageURL})`,
          //   // this doesn't work.
          // }}
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
