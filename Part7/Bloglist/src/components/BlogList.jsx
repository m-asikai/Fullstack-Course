import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
      }}
    >
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link
                  to={`/blog/${blog.id}`}
                  style={{ textDecoration: "none" }}
                >
                  {blog.title}
                </Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
