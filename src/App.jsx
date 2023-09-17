import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const userStorageKey = 'loggedInBlogUser';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () =>{
      setBlogs(await blogService.getAll());
    }
    fetchBlogs();
  }, []);

  useEffect(()=>{
    const userString = window.localStorage.getItem(userStorageKey);
    if(userString){
      const user = JSON.parse(userString)
      setUser(user);
      blogService.setUser(user);
    }
  }, []);

  const addBlog = (blog) =>{
    setBlogs(blogs.concat(blog));
  }

  const handleLogin = async (target) => {
    target.preventDefault();
    try{
      const token = await loginService.login(username, password);
      if(token){
        console.log('login successful');
        window.localStorage.setItem(userStorageKey,JSON.stringify(token));
        setUser(token);
        blogService.setUser(token);

        setUsername('');
        setPassword('');
      }
      else {
        console.log('login unsuccessful');
      }
    } catch(error) {
      console.log(error);
    }
  };

  const handleLogout = async (target) => {
    console.log('logging out');

    target.preventDefault();
    window.localStorage.removeItem(userStorageKey);
    setUser(null);

    console.log('logged out');
  }

  if(user === null){
    return (
      <div>
        <h2>Log in to the application</h2>
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <CreateBlogForm addBlog={addBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App