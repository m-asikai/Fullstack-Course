const dummy = blogs => {
    return 1;
}

const totalLikes = blogs => {
    let sum = blogs.reduce((value, blog) => value + blog.likes, 0);
    return sum;
}

const favouriteBlog = blogs => {
    let likes = blogs[0].likes;
    let favourite;
    for (const blog of blogs){
        if (blog.likes > likes){
            likes = blog.likes;
            favourite = blog;
        }
    }
    return favourite;

}

const mostBlogs = blogs => {
    const authors = filterUniqueAuthors(blogs);
    const a = {
        author: null,
        blogs: 0
    }
    authors.forEach(author => {
        let blogposts = 0;
        blogs.forEach(blog =>{
            if (blog.author === author){
                blogposts++;
            }
        })
        if (blogposts > a.blogs){
            a.author = author;
            a.blogs = blogposts  
        }

    })
    return a;
}

const mostLikes = blogs => {
    const authors = filterUniqueAuthors(blogs);
    const a = {
        author: null,
        likes: 0
    }
    authors.forEach(author => {
        let likes = 0;
        blogs.forEach(blog =>{
            if (blog.author === author){
                likes += blog.likes;
            }
        })
        if (likes > a.likes){
            a.author = author;
            a.likes = likes 
        }

    })
    return a;
}

const filterUniqueAuthors = list => {
    const authors = [];
    list.forEach(element => {
        if (!authors.includes(element.author)){
            authors.push(element.author);
        }
    });
    return authors;
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
}