import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <p>
              {blog.title} {blog.author}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
