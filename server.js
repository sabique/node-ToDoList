let express = require('express');

let app = express();

app.get('/', (req, res) => {
    res.send(`
        Welcome to the app!!
    `);
});

app.listen(3000);