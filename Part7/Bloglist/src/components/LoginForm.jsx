import { Button, Form } from "react-bootstrap";

const LoginForm = ({ handleLogin, handleUsername, handlePassword }) => {
  const style = { padding: 8 };
  return (
    <Form onSubmit={handleLogin} style={{ width: "50%", margin: "auto" }}>
      <Form.Group controlId="loginFormUsername" style={style}>
        <Form.Control placeholder="Username" onChange={handleUsername} />
      </Form.Group>
      <Form.Group controlId="loginFormPassword" style={style}>
        <Form.Control
          placeholder="Password"
          type="password"
          onChange={handlePassword}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        style={{
          ...style,
          borderRadius: 0,
        }}
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
