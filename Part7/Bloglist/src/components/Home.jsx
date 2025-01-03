import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import userService from "../services/users";
import LoginForm from "./LoginForm";
import ErrorNotification from "./ErrorNotification";
import BlogForm from "./BlogForm";
import AddNotification from "./AddNotification";
import Togglable from "./Togglable";
import {
  createAddMessage,
  createErrorMessage,
  reset,
} from "../reducers/notificationReducer";
import { createNewBlog, getBlogs } from "../reducers/blogReducer";
import BlogList from "./BlogList";
import { setUser } from "../reducers/userReducer";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const formRef = useRef();
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
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    async function getUserInfo() {
      const res = await userService.getUsers();
      setUsers(res);
    }
    getUserInfo();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await blogService.login({ username, password });
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      dispatch(createErrorMessage("Login failed."));
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  };

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const addBlog = async (entry) => {
    try {
      dispatch(createNewBlog(entry, user));
      formRef.current.toggleVisibility();
      dispatch(
        createAddMessage({
          title: entry.title,
          author: entry.author,
        }),
      );
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    } catch (e) {
      dispatch(createErrorMessage("Creation failed."));
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: 32 }}>Blogs</h2>
      <BlogList user={user} />
      <AddNotification />
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
        />
      )}
      {user && (
        <Togglable ref={formRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      )}
      <ErrorNotification />
    </div>
  );
};

export default Home;
