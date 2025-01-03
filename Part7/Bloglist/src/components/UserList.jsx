import { Link } from "react-router-dom";
const UserList = ({ users }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <ul style={{ listStylePosition: "inside", padding: 0 }}>
        {users.map((user) => {
          return (
            <Link to={`/users/${user.id}`} key={user.id}>
              <li>{user.username}</li>{" "}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
