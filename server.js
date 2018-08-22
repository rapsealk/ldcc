const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const PORT = 3000; // 0x0184;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'Lotte Data Communication Company',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false   // requires trust proxy
    }
}));
app.use(express.static('public'));

app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));

app.listen(PORT, () => {
    console.log(`Electron server is running at port ${PORT}..`);
});

exports.default = app;