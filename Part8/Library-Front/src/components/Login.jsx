import { useMutation } from "@apollo/client";
import { useState } from "react";
import { LOGIN } from "../Utils/queries";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN);

  if (!props.show) {
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        variables: {
          username,
          password,
        },
      });
      const token = res.data.login.value;
      props.setToken(token);
      props.setPage("authors");
      localStorage.setItem("book-token", token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          placeholder={"Username"}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        <input
          placeholder={"Password"}
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button>Login</button>
    </form>
  );
};

export default Login;
