const initialState = "";

const notificationReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD":
      if (!payload.title || !payload.author) {
        return null;
      }
      return (state = `New blog ${payload.title} created by ${payload.author}`);
    case "ERROR":
      state = payload.message;
      return state;
    case "RESET":
      return (state = null);
    default:
      return state;
  }
};

export const createErrorMessage = (message) => {
  return {
    type: "ERROR",
    payload: { message },
  };
};

export const createAddMessage = (message) => {
  return {
    type: "ADD",
    payload: message,
  };
};

export const reset = () => {
  return {
    type: "RESET",
  };
};

export default notificationReducer;
