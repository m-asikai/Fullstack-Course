import axios from 'axios'
const baseUrl = '/api/blogs'

let token;

const setToken = t => {
  token = `Bearer ${t}`
}

const create = async newBlog => {
  const config = {
    headers: { 
      Authorization: token
    },
  }
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const login = async (user) => {
  console.log('LOGIN', user);
  const response = await axios.post(`api/login`, user);
  return response.data;
}


export default { getAll, setToken, create, login, }