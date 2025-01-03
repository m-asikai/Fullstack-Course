import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const SingleUserView = () => {
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const usersBlogs = blogs.filter((blog) => blog.user.id === id);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Blogs added by: {usersBlogs[0].user.username}</h2>
      <div>
        <ul style={{ listStylePosition: "inside", padding: 0 }}>
          {usersBlogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>;
          })}
        </ul>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/users">Users</Link>
        </div>
      </div>
    </div>
  );
};

export default SingleUserView;
