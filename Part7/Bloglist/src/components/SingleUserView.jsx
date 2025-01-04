import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const SingleUserView = () => {
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const usersBlogs = blogs.filter((blog) => blog.user.id === id);

  if (usersBlogs.length < 1) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "red",
        }}
      >
        <p>Selected user has not added any blogs.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", width: "50%", margin: "auto" }}>
      <h2>Blogs added by: {usersBlogs[0].user.username}</h2>
      <ListGroup variant="flush">
        {usersBlogs.map((blog) => (
          <ListGroup.Item key={blog.id} variant="dark">
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SingleUserView;
