const express = require('express');

const PORT = 7000;

const app = new express();

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})