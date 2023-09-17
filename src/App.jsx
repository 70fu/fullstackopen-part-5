import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const userStorageKey = 'loggedInBlogUser';

const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(()=>{
    const userString = window.localStorage.getItem(userStorageKey);
    if(userString){
      const user = JSON.parse(userString)
      setUser(user);
    }
  }, []);

  const handleLogin = async (target) => {
    target.preventDefault();
    try{
      const token = await loginService.login(username, password);
      if(token){
        console.log('login successful');
        window.localStorage.setItem(userStorageKey,JSON.stringify(token));
        setUser(token);

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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App