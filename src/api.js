const express = require('express');
const loginRoute = require('./routes/login.route');
const userRoute = require('./routes/user.route');
const categoryRoute = require('./routes/categories.route');
const blogPostRoute = require('./routes/blogPost.route');
const erroHandler = require('./middlewares/erro.middleware');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoryRoute);
app.use('/post', blogPostRoute);
app.use(erroHandler);

// ...inicio

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
