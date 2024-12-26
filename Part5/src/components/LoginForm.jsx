const LoginForm = ({ handleLogin, username, password, handleUsername, handlePassword }) => {
  return (
    <form onSubmit={handleLogin} data-testid='login-form'>
      <div>
                Username
        <input style={{ margin: 8 }}
          value={username}
          onChange={handleUsername}
        />
      </div>
      <div>
                Password
        <input style={{ margin: 8 }}
          value={password}
          onChange={handlePassword}
          type="password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

}

export default LoginForm