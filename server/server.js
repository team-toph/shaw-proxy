require('newrelic');
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

const clean = function(point) {
  return {
    name: point.name,
    guitarImage: point.img,
    Ratings: point.rating,
    ReviewCount: Math.ceil(1 / Math.random()),
    Price: point.price,
    Condition: point.good ? 'New' : 'Old',
  };
};

app.get('/api/similaritems/:id', function (req, res) {
  var group = Number(req.params.id);
  if (isNaN(group)) {
    group = 0;
  }
  get(group, (data) => {
    res.status(200).json(data.map(clean));
  });
});

const port = 8086;

app.listen(port, () => console.log('connect on port ' + port));
