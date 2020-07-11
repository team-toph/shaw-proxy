const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Similar = null;

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.get('/bundle.js', function (req, res) {
  res.sendFile('../path/bundle.js');
});

app.get('/', function (req, res) {
  res.sendFile('../path/index.html');
});

app.get('/index.html', function (req, res) {
  res.sendFile('../path/index.html');
});

app.get('/api/similartities', function (req, res) {
  var group = req.query.id;
  // Similar.get({id: id})
  //   .found(function (err, data) {
  //     if (err) {
  //       throw err;
  //     }
  //     res.json(data[0].diff);
  //   })
  res.status(200).json({shaw: 'test'});
});

const port = 8086;

app.listen(port, () => console.log('connect on port ' + port));
