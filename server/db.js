const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'similar',
});

const Q = 'SELECT * FROM similar.db WHERE id IN (?, ?, ?, ?, ?, ?)';

const get = function (n, cb) {
  client.execute(Q, [n * 6 + 0, n * 6 + 1, n * 6 + 2, n * 6 + 3, n * 6 + 4, n * 6 + 5], { prepare: true })
    .then(data => cb(data))
    .catch(err => {
      throw err;
    });
}

module.exports = get;