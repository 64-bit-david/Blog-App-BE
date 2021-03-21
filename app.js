const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require("cookie-session");
const cors = require('cors');



require('./services/passport');
const storyRoutes = require('./routes/story');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const snippetRoutes = require('./routes/snippets');

const MONGODB_URI = keys.mongoURI;

const app = express();


app.use(bodyParser.json());



app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS', 'GET', 'PUT', 'POST', 'PATCH', 'DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(
  cookieSession({
    maxAge: 7 * 24860 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());



app.use(storyRoutes);
app.use(authRoutes);
app.use(usersRoutes);
app.use(snippetRoutes);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
})

const PORT = process.env.PORT || 5000;


mongoose.connect(MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(result => {
    const server = app.listen(PORT);
    const io = require('./socket').init(server);
    io.on('connection')
  }).catch(err => console.log(err))
