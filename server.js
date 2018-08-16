const express = require('express');
const app = express();

const morgan = require('morgan');

const PORT = 3000; // 0x0184;

app.use(morgan('dev'));
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Electron server is running at port ${PORT}..`);
});

exports.default = app;