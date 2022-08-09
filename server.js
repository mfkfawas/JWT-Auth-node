const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.use(express.json());

const posts = [
  {
    id: 1,
    title: 'Hello World',
    body: 'This is the first post',
  },
  {
    id: 2,
    title: 'Second Post',
    body: 'This is the second post',
  },
];

app.post('/login', (req, res) => {
  // 1 Authenticate User
});

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
