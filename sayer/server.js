const express = require('express');
const cors = require('cors');

let app = express();

const PORT = process.env.PORT || 3000;

app.use(cors('*'));
app.use(express.static('public'));

app.listen(PORT, function(){
  console.log('Express server is up on port:' + PORT);
})
