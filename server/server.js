const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const get = require('./db.js');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(compression());

app.use(express.static('./dist'));

app.get('/api/similaritems/:id', function (req, res) {
  var group = Number(req.params.id);
  get(group, () => {
    res.status(200).json({shaw: 'test'});
  });
});

const port = 8086;

app.listen(port, () => console.log('connect on port ' + port));
