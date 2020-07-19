const fs = require('fs');
const cassandra = require('cassandra-driver');
const { exit } = require('process');

let files = 32;
let each = 300;

const client = new cassandra.Client({
  contactPoints:['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'similar',
});

const query = 'INSERT INTO similar.db (id, name, img, rating, price, good) VALUES (?, ?, ?, ?, ?, ?)'

let fremain = files;

const end = function (i) {
  if (--fremain === 0) {
    process.stdout.write('\nexiting with code 0\n');
    exit(0);
  }
};

const loop = function (i) {
  if (i === files) {
    return undefined;
  }

  let data = JSON.parse(fs.readFileSync(`./fake/data_${i}.json`));
  let queries = data.map((row) =>
    ({ query, params: row })
  );

  let total = data.length;
  let curtotal = 0;
  let last = -1;

  const next = function (from, each) {
    let qsc = queries.slice(from, from + each);
    if (qsc.length === 0) {
      return undefined;
    }
    client.batch(qsc, { prepare: true })
      .then(function () {
        let cur = Math.round((curtotal += each) / total * 100);
        if (cur !== last) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`workers[${i}]: ${cur}%`);
          last = cur;
        }
        if (cur > 99.9) {
          loop(i + 1);
          end(i);
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`workers[${i}]: 100%\n`);
          data = null;
          queries = null;
        }
        else {
          next(from + each, each);
        }
      })
      .catch(function (err) {
        throw err;
      });
  }

  next(i, each);
};

loop(0);