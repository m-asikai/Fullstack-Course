import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (t) => {
  token = `Bearer ${t}`;
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const login = async (user) => {
  const response = await axios.post("api/login", user);
  return response.data;
};

const update = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return res;
};

const postComment = async (blog, comment) => {
  const res = await axios.post(`${baseUrl}/${blog.id}/comment`, comment);
  return res;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios.delete(`${baseUrl}/${blog.id}`, config);
};

export default {
  getAll,
  setToken,
  create,
  login,
  update,
  deleteBlog,
  postComment,
};
