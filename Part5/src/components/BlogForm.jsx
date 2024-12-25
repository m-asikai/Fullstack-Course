const BlogForm = ({ addBlog, handleTitle, handleAuthor, handleUrl, handleLikes, blog }) => {
    return(
        <form onSubmit={addBlog}>
            <div >
                <div >
                    Title
                    <input style={{margin: 8}}
                        value={blog.title}
                        onChange={handleTitle}
                    />
                </div>
                <div >
                    Author
                    <input style={{margin: 8}}
                        value={blog.author}
                        onChange={handleAuthor}
                    />
                </div>
                <div >
                    Url
                    <input style={{margin: 8}}
                        value={blog.url}
                        onChange={handleUrl}
                    />
                </div>
                <div >
                    Likes
                    <input style={{margin: 8}}
                        value={blog.likes}
                        onChange={handleLikes}
                    />
            </div>
            <button type="submit">Add blog</button>
            </div>
        </form>
    )
}

export default BlogForm;