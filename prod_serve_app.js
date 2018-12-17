const express = require('express');
const path = require('path');
const { PORT = 5002 } = require('./config');
const app = express();

app.use(express.static(path.join(__dirname,'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'build','index.html'));
});

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`))