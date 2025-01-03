import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    addBlog(state, action) {
      return state.concat(action.payload).sort((a, b) => b.likes - a.likes);
    },
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

export default blogSlice.reducer;

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const updateBlogs = (blogs) => {
  return (dispatch) => {
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (blog, user) => {
  return async (dispatch) => {
    const postedBlog = await blogService.create(blog);
    postedBlog.user = {
      id: postedBlog.user,
      name: user.name,
      username: user.username,
    };
    dispatch(addBlog(postedBlog));
  };
};
