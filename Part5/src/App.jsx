import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import ErrorNotification from './components/ErrorNotification';
import BlogForm from './components/BlogForm';
import AddNotification from './components/AddNotification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [addMessage, setAddMessage] = useState({title: null, author: null});
  const [entry, setEntry] = useState({
    title: '',
    author: '',
    url: '',
    likes: ''
  });
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const logged = window.localStorage.getItem('user')
    if (logged){
      const user = JSON.parse(logged);
      setUser(user);
      blogService.setToken(user.token);
    }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await blogService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
      window.localStorage.setItem('user', JSON.stringify(user));
    } catch (e){
      setErrorMessage('Login failed');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  }

  const handleTitle = ({ target }) => {
    setEntry({
      ...entry, title: target.value
    })
  }

  const handleAuthor = ({ target }) => {
    setEntry({
      ...entry, author: target.value
    })
  }

  const handleUrl = ({ target }) => {
    setEntry({
      ...entry, url: target.value
    })
  }

  const handleLikes = ({ target }) => {
    setEntry({
      ...entry, likes: Number (target.value)
    })
  }

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      const postedBlog = await blogService.create(entry);
      setBlogs(blogs.concat(postedBlog));
      setEntry({
        title: '',
        author: '',
        url: '',
        likes: ''
      })
      console.log(postedBlog)
      setAddMessage({
        title: postedBlog.title,
        author: postedBlog.author
      });
      setTimeout(() => {
        setAddMessage({
          title: null,
          author: null
        });
      }, 3000);
    } catch (e) {
      setErrorMessage('Creation failed');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }

  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem('user');
  }
  

  return (
    <div style={{textAlign: 'center'}}>
      <h2 style={{fontSize: 32}}>Blogs</h2>
      <Blog blogs={blogs}/>
      {addMessage.title && <AddNotification title={addMessage.title} author={addMessage.author}/>}
      {
        !user && <LoginForm handleLogin={handleLogin} username={username} password={password} 
        handleUsername={handleUsername} handlePassword={handlePassword}/>
      }
      {
        user && <BlogForm addBlog={addBlog} blog={entry} handleAuthor={handleAuthor} 
        handleTitle={handleTitle} handleLikes={handleLikes} handleUrl={handleUrl} />
      }
      <ErrorNotification message={errorMessage} />
      {
        user && 
        <div>
        <p>Logged in as {user.username}</p>
        <button onClick={handleLogOut}>Logout</button>
        </div>
      }
    </div>
  )
}

export default App