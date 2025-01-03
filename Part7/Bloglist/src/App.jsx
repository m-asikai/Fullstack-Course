import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import userService from "./services/users";
import { getBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import Home from "./components/Home";
import SingleUserView from "./components/SingleUserView";

const App = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<SingleUserView />} />
      </Routes>
    </Router>
  );
};

export default App;
