const Blog = ({ blogs }) => {
  // <div style={{fontSize : 24}}>
  //   {blog.author} : {blog.title}
  // </div>  
  return (
    <table style={{
      margin: 'auto',
      fontSize: 24,
      }}>
      <thead>
        <tr>
          <th>Author</th><th>Title</th>
        </tr>
      </thead>
      <tbody>
        {
          blogs.map(blog => {
            return <tr key={blog.id}  style={{fontSize: 16}}>
              <td>{blog.author}</td><td>{blog.title}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}

export default Blog