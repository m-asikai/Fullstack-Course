import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { updateBlogs } from "../reducers/blogReducer";

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const deleteBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        blogService.deleteBlog(blog);
        const index = blogs.indexOf(blog);
        const newBlogs = blogs.toSpliced(index, 1);
        dispatch(updateBlogs(newBlogs));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const likeAPost = async (updatedBlog) => {
    try {
      blogService.update(updatedBlog);
      dispatch(setBlogs(newBlogs));
    } catch (e) {
      dispatch(createErrorMessage("Creation failed"));
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  };

  return (
    <div>
      {blogs.map((blog) => {
        return (
          <Blog
            blog={blog}
            key={blog.id}
            handleLike={likeAPost}
            handleDelete={deleteBlog}
            user={user}
          />
        );
      })}
    </div>
  );
};

export default BlogList;
