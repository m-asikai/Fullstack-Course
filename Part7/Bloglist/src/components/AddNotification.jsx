import { useSelector } from "react-redux";

const AddNotification = () => {
  const message = useSelector((state) => state.notifications);

  if (!message || !message.startsWith("New")) {
    return null;
  }
  const notificationStyle = {
    color: "green",
    fontSize: 24,
    border: "3px solid green",
    borderRadius: 4,
    backgroundColor: "lightblue",
    textAlign: "center",
    margin: "auto",
    marginTop: 8,
    padding: 8,
    width: "fit-content",
  };
  return <p style={notificationStyle}>{message}</p>;
};

export default AddNotification;
