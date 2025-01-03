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
            data-testid="title-input"
          />
        </div>
        <div >
                    Author
          <input style={{ margin: 8 }}
            value={entry.author}
            onChange={handleAuthor}
            data-testid="author-input"
          />
        </div>
        <div >
                    Url
          <input style={{ margin: 8 }}
            value={entry.url}
            onChange={handleUrl}
            data-testid="url-input"
          />
        </div>
        <div >
                    Likes
          <input style={{ margin: 8 }}
            value={entry.likes}
            onChange={handleLikes}
            data-testid="likes-input"
          />
        </div>
        <button type="submit">Add blog</button>
      </div>
    </form>
  )
}

export default BlogForm