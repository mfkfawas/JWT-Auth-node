const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name));
});

app.use(express.json());

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
