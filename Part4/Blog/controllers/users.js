const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');


userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {user: 0});
    res.json(users);
})



userRouter.post('/', async (request, res) => {
    const { username, name, password } = request.body

    if (username.length < 3 || password.length < 3){
        return res.status(400).json({
            error: 'Username and password have to be longer than 3 characters.'
        })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    res.status(201).json(savedUser)
  })


module.exports = userRouter;