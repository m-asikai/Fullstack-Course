import { useState } from 'react'


const BlogForm = ({ addBlog }) => {

  const [entry, setEntry] = useState({
    title: '',
    author: '',
    url: '',
    likes: ''
  })

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

  const create = (e) => {
    console.log(e, entry)
    e.preventDefault()
    addBlog(entry)
    setEntry({
      title: '',
      author: '',
      url: '',
      likes: ''
    })
  }

  return(
    <form onSubmit={create}>
      <div >
        <div >
                    Title
          <input style={{ margin: 8 }}
            value={entry.title}
            onChange={handleTitle}
          />
        </div>
        <div >
                    Author
          <input style={{ margin: 8 }}
            value={entry.author}
            onChange={handleAuthor}
          />
        </div>
        <div >
                    Url
          <input style={{ margin: 8 }}
            value={entry.url}
            onChange={handleUrl}
          />
        </div>
        <div >
                    Likes
          <input style={{ margin: 8 }}
            value={entry.likes}
            onChange={handleLikes}
          />
        </div>
        <button type="submit">Add blog</button>
      </div>
    </form>
  )
}

export default BlogForm