const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const app = express();
app.use(express.json());

// Implementing refresh token - refresh token is a token that is sent to the client to get a new access token.
// Refresh token is sent to the client when the access token expires.
// Implementing refresh token allow us to actually take our authentication server and move it to a separate server.
// So we can have one server that handles creation of tokens, deletion of tokens and refresh tokens and other server that handles all API related tasks.

// Why we need a refresh token? Right now our access token has no expiration date, which means it can be used inifinitely if anyone has that access token.
// The idea of refresh token is to save the refresh token in a safe spot and the normal access token has only very short and limited expiration date.
// So if someone has the access token, they can only use it for a few minutes
// This does have the same problem where your token get stolen and someone else can use it to refresh your token,
// but thats where the idea of invalidating a refresh token comes in. You can essesntially create a logout
// route which deletes the refresh token so the user can no longer use the refresh token to get a new access token.
//  So really the main reason to use refresh token and so that you can invalidate users that steal access that
// shouldn't have access.
// Second reason is that you can take all your authentication and authorization code and move it to a separate server.

app.post('/login', (req, res) => {
  // 1 Authenticate User

  // 2 Generate Token
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});

const server = app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
