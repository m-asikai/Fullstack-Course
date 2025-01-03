import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [showDetail, setShowDetail] = useState(false);

  const visible = { display: showDetail ? "" : "None" };

  const buttonText = !showDetail ? "View" : "Hide";
  const style = {
    border: "solid",
    borderWidth: 1,
    padding: 4,
    width: "fit-content",
    margin: "auto",
    marginBottom: 4,
  };

  const addLike = () => {
    const newBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: Number(blog.likes + 1),
      user: blog.user ? blog.user.id : null,
    };
    handleLike(newBlog);
    blog.likes++;
  };

  const remove = () => {
    handleDelete(blog);
  };

  return (
    <div style={style} className="blog">
      <div>
        {blog.title} {blog.author}
        <button
          style={{ margin: 4 }}
          onClick={() => setShowDetail(!showDetail)}
        >
          {buttonText}
        </button>
      </div>
      <div style={visible}>
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes}</div>
        <div>Added by: {blog.user.username}</div>
        <button onClick={addLike}>Like</button>
        <div
          style={{
            display: user && user.username === blog.user.username ? "" : "None",
            margin: 8,
          }}
        >
          <button onClick={remove}>Delete</button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
