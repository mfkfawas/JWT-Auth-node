const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const app = express();

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name));
});

app.use(express.json());

// Implementing refresh token - refresh token is a token that is sent to the client to get a new access token.
// Refresh token is sent to the client when the access token expires.
// Implementing refresh token allow us to actually take our authentication server and move it to a separate server.
// So we can have one server that handles creation of tokens, deletion of tokens and refresh tokens and other server that handles all API related tasks.
const posts = [
  {
    id: 1,
    title: 'Hello World',
    body: 'This is the first post',
    username: 'test',
  },
  {
    id: 2,
    title: 'Second Post',
    body: 'This is the second post',
    username: 'test2',
  },
];

async function authenticateToken(req, res, next) {
  let token =
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'You are not logged in' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'You are not logged in' });
    req.user = user;
    next();
  });
}

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
