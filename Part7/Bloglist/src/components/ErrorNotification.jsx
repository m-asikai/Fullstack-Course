import { useSelector } from "react-redux";

const ErrorNotification = () => {
  const notification = useSelector((state) => state.notifications);
  if (!notification || notification.startsWith("New")) {
    return null;
  }

  const style = {
    color: "red",
    fontSize: 24,
    border: "3px solid red",
    borderRadius: 4,
    backgroundColor: "lightblue",
    textAlign: "center",
    margin: "auto",
    marginTop: 8,
    width: "fit-content",
    padding: 8,
  };
  return <p style={style}> {notification} </p>;
};

export default ErrorNotification;
