const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const catchJsonParsingError = require('./middlewares/catchJsonParsingError');

const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const spaRouter = require('./routes/spa');
const notFoundRouter = require('./routes/notFound');

const { ip, port } = require('./config');

const app = express();

app.disable('x-powered-by');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(catchJsonParsingError);

app.use('/app', express.static(path.resolve(__dirname, './frontend/dist')));

app.use('/api', authRouter);
app.use('/api', apiRouter);
app.use(spaRouter);
app.use(notFoundRouter);

app.listen(port, ip, () => {

    console.log(`app is listening for requests at ${ip}:${port}`);
});