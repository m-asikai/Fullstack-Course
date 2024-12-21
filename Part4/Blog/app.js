const blogRouter = require('./controllers/blogs');
const express = require('express');
const app = express();
const config = require('./utils/config');
const cors = require('cors');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;