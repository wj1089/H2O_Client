import React from "react";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <ul className="list">
      {posts.map((hospital) => (
        <li key={hospital.hospitalNo} className="list_item">
          {post.id}
        </li>
      ))}
    </ul>
  );
};

export default Posts;