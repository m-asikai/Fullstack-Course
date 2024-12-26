import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import ErrorNotification from './components/ErrorNotification'
import BlogForm from './components/BlogForm'
import AddNotification from './components/AddNotification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [addMessage, setAddMessage] = useState({ title: null, author: null })
  const formRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    )
  }, [])

  useEffect(() => {
    const logged = window.localStorage.getItem('user')
    if (logged){
      const user = JSON.parse(logged)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await blogService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (e){
      setErrorMessage('Login failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }



  const addBlog = async (entry) => {
    try {
      const postedBlog = await blogService.create(entry)
      formRef.current.toggleVisibility()
      setBlogs(blogs.concat(postedBlog))
      setAddMessage({
        title: postedBlog.title,
        author: postedBlog.author
      })
      setTimeout(() => {
        setAddMessage({
          title: null,
          author: null
        })
      }, 3000)
    } catch (e) {
      setErrorMessage('Creation failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const likeAPost = async (updatedBlog) => {
    try {
      blogService.update(updatedBlog)
      setBlogs(blogs)
    } catch (e){
      setErrorMessage('Like failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)){
      try {
        blogService.deleteBlog(blog)
        const index = blogs.indexOf(blog)
        const newBlogs = blogs.toSpliced(index, 1)
        setBlogs(newBlogs)
      } catch (e) {
        console.log(e)
      }
    }
  }


  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: 32 }}>Blogs</h2>
      {
        blogs.map(blog => {
          return <Blog blog={blog} key={blog.id} handleLike={likeAPost} handleDelete={deleteBlog} user={user}/>
        })
      }
      {addMessage.title && <AddNotification title={addMessage.title} author={addMessage.author}/>}
      {
        !user && <LoginForm handleLogin={handleLogin} username={username} password={password}
          handleUsername={handleUsername} handlePassword={handlePassword}/>
      }
      {
        user && <Togglable ref={formRef}>
          <BlogForm
            addBlog={addBlog} />
        </Togglable>
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