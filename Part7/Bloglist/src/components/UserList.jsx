import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
const UserList = ({ users }) => {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "auto",
        width: "50%",
      }}
    >
      <Table striped>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link
                  to={`/users/${user.id}`}
                  key={user.id}
                  style={{ textDecoration: "none" }}
                >
                  {user.username}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
