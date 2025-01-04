import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import { updateBlogs } from "../reducers/blogReducer";
import { createErrorMessage, reset } from "../reducers/notificationReducer";
import ErrorNotification from "./ErrorNotification";
import { useState } from "react";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  const [comments, setComments] = useState(blog.comments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const style = {
    border: "solid",
    borderWidth: 1,
    padding: 4,
    width: "fit-content",
    margin: "auto",
    marginBottom: 4,
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        blogService.deleteBlog(blog);
        const index = blogs.indexOf(blog);
        const newBlogs = blogs.toSpliced(index, 1);
        dispatch(updateBlogs(newBlogs));
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleLike = async (updatedBlog) => {
    try {
      let index;
      for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].id === updatedBlog.id) {
          index = i;
          break;
        }
      }
      const newBlogs = [...blogs];
      const res = await blogService.update(updatedBlog);
      updatedBlog.user = {
        username: user.username,
        name: user.name,
        id: res.data.id,
      };
      newBlogs[index] = updatedBlog;
      dispatch(updateBlogs(newBlogs));
    } catch (e) {
      dispatch(createErrorMessage("Like failed"));
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  };

  const addLike = () => {
    const newBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      comments: blog.comments,
      likes: Number(blog.likes + 1),
    };
    handleLike(newBlog);
  };

  const remove = () => {
    handleDelete(blog);
  };

  if (!blog) {
    return null;
  }

  const comment = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    setComments(comments.concat(comment));
    const res = await blogService.postComment(blog, { comment });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={style} className="blog">
        <div>
          {blog.title} {blog.author}
        </div>
        <div>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes}</div>
          <div>Added by: {blog.user.username}</div>
          <button onClick={addLike}>Like</button>
          <div
            style={{
              display:
                user && user.username === blog.user.username ? "" : "None",
              margin: 8,
            }}
          >
            <button onClick={remove}>Delete</button>
          </div>
          <div>
            <form onSubmit={comment}>
              <input name="comment"></input>
              <div style={{ margin: 8 }}>
                <button type="submit">Comment</button>
              </div>
            </form>
          </div>
          {comments.length > 0 && (
            <div>
              <h3>Comments</h3>
              <ul style={{ listStylePosition: "inside", padding: 0 }}>
                {comments.map((comment) => {
                  return <li key={Date.now() * Math.random()}>{comment}</li>;
                })}
              </ul>
            </div>
          )}
          <ErrorNotification />
        </div>
      </div>
    </div>
  );
};

export default Blog;
