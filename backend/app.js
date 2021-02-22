const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const path = require('path');
const cors = require("cors");

const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

if (dotenv.error) { throw dotenv.error };

const app = express();

app.use(cors());
app.options("*", cors());

app.use(helmet());
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/user', userRoutes);


module.exports = app;
