const User = require('../models/user');

const blogs = [
    {
        title: "Tapsan seikkailut",
        author: "Tapsa Japsa",
        url: "127.0.0.1/blog",
        likes: 0
    },
    {
        title: "Japsan seikkailut",
        author: "Japsa Tapsa",
        url: "127.0.0.1/blog",
        likes: 77
    },
]

const getUsers = async () => {
    const users = await User.find({}).populate('blogs');
    return users;
}



module.exports = {
    blogs,
    getUsers,
}