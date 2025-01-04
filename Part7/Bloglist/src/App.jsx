import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "./services/users";
import { getBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import Home from "./components/Home";
import SingleUserView from "./components/SingleUserView";
import Blog from "./components/Blog";
import { Button } from "react-bootstrap";

const App = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    const logged = window.localStorage.getItem("user");
    if (logged) {
      const user = JSON.parse(logged);
      dispatch(setUser(user));
    }
  }, []);

  useEffect(() => {
    async function getUserInfo() {
      const res = await userService.getUsers();
      setUsers(res);
    }
    getUserInfo();
  }, []);

  const handleLogOut = () => {
    dispatch(setUser(null));
    window.localStorage.removeItem("user");
  };

  return (
    <Router>
      <div style={{ textAlign: "center" }} className="container">
        {user && (
          <div>
            <p>Logged in as {user.username}</p>
            <Button variant="danger" onClick={handleLogOut}>
              Logout
            </Button>
          </div>
        )}
        <div>
          <Link
            to="/"
            style={{
              padding: 4,
              textDecoration: "None",
            }}
          >
            Home
          </Link>
          <Link
            to="/users"
            style={{
              padding: 4,
              textDecoration: "None",
            }}
          >
            Users
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<SingleUserView />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </Router>
  );
};

export default App;
