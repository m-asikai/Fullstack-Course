import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const visibleForm = { display: visible ? "" : "None" };
  const hideButton = { display: !visible ? "" : "None" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <Button variant="primary" style={hideButton} onClick={toggleVisibility}>
        New blog
      </Button>
      <div style={visibleForm}>
        {props.children}
        <Button
          variant="outline-dark"
          onClick={toggleVisibility}
          style={{ margin: 8 }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";
export default Togglable;
