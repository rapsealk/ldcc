const express = require('express');
const app = express();

const morgan = require('morgan');

const PORT = 3000; // 0x0184;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/', require('./routes/index'));

app.listen(PORT, () => {
    console.log(`Electron server is running at port ${PORT}..`);
});

exports.default = app;