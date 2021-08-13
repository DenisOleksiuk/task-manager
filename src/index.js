const express = require('express');
require('./db/mongoose');
const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
