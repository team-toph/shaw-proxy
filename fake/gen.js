const wf = require('worker-farm');
const fs = require('fs');
// const { exit } = require('process');

const files = 32;
const max = 8;
const targets = 1000 * 1000 * 60;
const next = function (i=0) {
  if (i >= files) {
    return
  }
  const workers = wf(require.resolve('./worker.js'));
  const target = Math.floor(targets / files);

  const stm = fs.createWriteStream(`./fake/data_${i}.json`, { flags: 'w' });

  let strc = 0;

  console.log(`worker start: ${i}`);

  const before = function () {
    stm.write('[\n');
  };

  const after = function () {
    stm.write(']\n');
  };

  for (let j = 0; j < max; j++) {
    workers({ max: Math.ceil(target / (max)), place: i }, function (str) {
      if (strc === 0) {
        before();
      }
      strc += 1;
      if (strc === max) {
        stm.write(str.slice(0, -2) + '\n');
        after();
        wf.end(workers);
        next(i+1);
      }
      else {
        stm.write(str);
      }
      str = null;
    });
  }
}
next();
// exit();