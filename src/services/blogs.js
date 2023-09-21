import axios from 'axios'
const baseUrl = '/api/blogs'

let loggedInUser = null;

const setUser = (user) => {
  loggedInUser = user;
}

const getConfig = () => {
  const config = {
    headers:{}
  }
  if(loggedInUser){
    config.headers.Authorization = `Bearer ${loggedInUser.token}`;
  }
  return config;
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const create = async (blog) => {
  const response = await axios.post(baseUrl,{ ...blog,user:loggedInUser.id },getConfig())
  return response.data;
}

export default { getAll, create, setUser }